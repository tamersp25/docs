---
title: Object Detection (Network Isolated)
---

### Overview

This purpose of this tutorial is to give you a starting point for creating an network isolated object detection engine ([YOLO](https://pjreddie.com/darknet/yolo/))
in Python and deploying it through VDA. The full code sample for this tutorial can be found at
 [Github](https://github.com/veritone/veritone-sample-engine-yolo "VDA Object Detection Sample").

The tutorial will walk through the following phases of an engine:

1. Receive the Task Payload
2. Updating Task Status to Running
3. Get the Recording Container
4. Select and Download the Asset
5. Process the Task
6. Format and Generate Output
7. Create and Upload a New Asset
8. Report Task Completion Status


### Prerequisites
We will be using Python 3 as part of this tutorial, so you can create a requirements.txt file with the following contents:
```
pep8==1.7.0
pylint==1.7.1
requests==2.13.0
tqdm==4.14.0
numpy==1.13.3
tensorflow==1.2.0
opencv-python==3.2.0.7
Cython==0.25.2
gql==0.1.0
```

and then run

```bash
$ pip3 install -r requirements.txt
```

### Receive the Task Payload
The first step is to receive the task payload of the format:
```json
{
  "applicationId": "fb901454-1ef2-4130-a65d-0a831443f675",
  "jobId": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49",
  "taskId": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
  "recordingId": "38828568",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```
The location of the file will be set as an environment variable, **PAYLOAD_FILE**, in your container during execution.
Every request we make to the api server will require the token as part of the **Authorization** header in the format
`Authorization: Bearer token`

For testing purposes we will create a `payload.json` file with the above contents and pass it as a command line parameter.

Let's create a file in src called `engine.py`

```python
import os
import json
import argparse

PAYLOAD_ENV = 'PAYLOAD_FILE'

def load_json(file):
    with open(file, 'r') as json_file:
        return json.loads(json_file.read())

def run(payload_arg)
    payload = load_json(payload_arg)
    print(payload)

if __name__ == '__main__':
    PARSER = argparse.ArgumentParser(description='Veritone Developer - YOLO object detection engine')
    PARSER.add_argument('-payload', type=str)
    ARGS = PARSER.parse_args()
    PAYLOAD = vars(ARGS).get('payload', '')
    if os.getenv(PAYLOAD_ENV) is not None:
        PAYLOAD = os.getenv(PAYLOAD_ENV)

    if PAYLOAD is None:
        PARSER.print_help()
        sys.exit(1)

    run(PAYLOAD)
```


We are using argparse to parse command line arguments; in this case we are looking for a `-payload` argument
for the location of the payload file. First we check if the payload is already set as part of the PAYLOAD_ENV variable
and if not we use the command line argument. Once we determine the location of the payload file, then we begin running the
engine. In this case we are just parsing the payload file and printing its contents.

You can test the engine as we go along by running

```python
python3 src/engine.py -payload payload.json
```


### Updating Task Status to Running
After you have loaded the task payload, we need to update the task status to `running`. This is achieved by calling the
 GraphQL endpoint with the payload:

```graphql
mutation{
  updateTask(input :{
    id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
    status: running
    jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
  }){
  id
  status
  }
}
```
This will update the task status to running and return us the task Id and Status.

Since we will be updating the task status multiple times, we can define a function that uses the gql library to make a
request and invoke on task status updates.

Let's create a file in src called `api.py` with the following contents:

```python
import json
import logging
from gql import gql, Client
from gql.transport.requests import RequestsHTTPTransport

VALID_TASK_STATUS = ['running', 'complete', 'failed']

class APIClient(object):
    def __new__(cls, baseUrl, token):
        if baseUrl is None or token is None:
            raise ValueError
        else:
            return super(APIClient, cls).__new__(cls)

    def __init__(self, baseUrl, token):
        self.baseUrl = baseUrl
        self.headers = {
            'Authorization': 'Bearer %s' % token,
        }
        transport = RequestsHTTPTransport(baseUrl, headers=self.headers,
                                          use_json=True)
        self.client = Client(transport=transport, fetch_schema_from_transport=True)

    def update_task(self, job_id, task_id, status, output=None):
        logging.debug("Updating task status to {} for task_id: {}".format(status, task_id))
        if status not in VALID_TASK_STATUS:
            return False

        if output is None:
            output = {}

        query = gql('''
            mutation {
              updateTask(input: {id: "%s", jobId: "%s", status: %s, outputString: "%s"}) {
                id
                status
              }
            }
        ''' % (task_id, job_id, status, json.dumps(output).replace('"','\\"')))
        try:
            self.client.execute(query)
        except Exception as e:
            logging.error('Failed to update task {} status to {} due to: {}'.format(task_id, status, e))
            return False
```

We are creating a class called APIClient which uses the bearer token that we received in our payload and a base url
to make requests. Then we set up a transport that will add our authorization header to every graphQL request and then
initialize a GraphQL Client. This client will perform validations against the graphQL schema before executing any
requests because we set the `fetch_schema_from_transport=True` which will allow us to fail fast for malformed queries.

The update_task function takes the job_id and task_id parameters from the task payload and calls the updateTask mutation
with the specified status. At this point in time, the output is not necessary but we will eventually use that for the
final task output as well logging any relevant information in case of failure.

We can then add a `conf/config.json` file with:

```json
{
  "baseUri": "https://api.veritone.com/v3/graphql",
  "detectionThreshold": 0.6,
  "fps": 1.0
}
```
The baseUri points to Veritone's graphQL endpoint and the detection threshold and fps will be used as variables for our
engine.

We also need to update engine.py to load this config file, initialize the api client and update the status.

```python
...
import logging
from api import ApiClient
...
PAYLOAD_ENV = 'PAYLOAD_FILE'
CONFIG_PATH = './conf/config.json'
...
def run(payload_arg)
    payload = load_json(payload_arg)
    config = load_json(CONFIG_PATH)

    client = APIClient(config['baseUri'], payload['token'])

    try :
        client.update_task(payload['jobId'], payload['taskId'], 'running')
    except Exception as ex:
        logging.error('Error during the execution {}'.format(ex))
        client.update_task(payload['jobId'], payload['taskId'], 'failed')
        raise ex
```
Note, you will need to place a valid token, jobId, and taskId in the payload.json for the program to successfully run.

### Get the Recording Container
Now that we have updated the task status, we need to get the assets for the recording specified in the task payload.

```graphql
query{
  temporalDataObject(id: "38828568") {
    assets(type: "media"){
      records {
        id
        contentType
        type
        signedUri
        createdDateTime
      }
    }
  }
}
```

Notice we are only fetching the assets for the recording and leaving out all the other unnecessary fields. We are also
filtering assets to a specific type, `media`, for this case.


In our api.py file, add
```python
def get_assets_for_recording(self, recording_id, asset_type):
    logging.debug("Getting {} assets for a recording {} ".format(asset_type, recording_id))
    query = gql('''
                query{
                  temporalDataObject(id:"%s"){
                    assets(type:"%s") {
                      records  {
                        id
                        contentType
                        createdDateTime
                        signedUri
                      }
                    }
                  }
                }
                ''' % (recording_id, asset_type))
    try:
        response = self.client.execute(query)
        return response['temporalDataObject']['assets']['records']

    except Exception as e:
        logging.error('Failed to find {} for recording_id {} due to: {}'.format(asset_type, recording_id, e))
    return None
```
We are not performing any validations on if temporalDataObject or assets are in the response because gql will throw
an error if there was error in the request. And the response from graphql will always have the structure we requested
if the object is not found.

And then in `engine.py` we need to add:

```python
...
 try :
    client.update_task(payload['jobId'], payload['taskId'], 'running')
    assets = client.get_assets_for_recording(payload['recordingId'], 'media')
    if not assets:
        raise ValueError('Cannot find assets for recording with id {}'.format(payload['recordingId']))
    print(assets)
...
```

Assuming we had a valid recordingId and it has media assets, we should see a list of assets print out.

### Select and Download the Asset
Once we have retrieved the media assets for the recording, we want to find an appropriate asset for our engine to run on.
For this case we want a `video/mp4` file, so we can iterate through the list of assets and check if is of the Content-Type we require.
If multiple supported assets are found in the recording container, we want to choose the oldest matching asset.

We can create a `helper.py` file in the src directory:

```python
def extract_original_video(assets, content_type):
    """Extracts the signedUri for the oldest asset of the specified content type."""
    logging.debug("Extracting video from assets {}".format(assets))
    # filter by video assets only
    filtered_assets = [asset for asset in assets if asset['contentType'] == content_type]

    if not filtered_assets:
        return None

    # Assume an oldest asset is original
    asset = min(filtered_assets, key=lambda x: x['createdDateTime'])
    return asset['signedUri']
```

After determining the asset we want to operate upon, we can download the asset to our system or operate directly upon
the asset url. In our case, we are extracting frames from the video so we can directly pass the video url to ffmpeg
which will then download and extract frames into jpeg files which will later be used for object detection.

### Process the Asset
This is where the core processing for your engine occurs. In our case, we use ffmpeg to extract frames from the video
and run object detection on each frame.

#### Prerequisites
There are a couple of prerequisites for running the YOLO engine locally:

1. Install ffmpeg
2. Clone https://github.com/thtrieu/darkflow.git to an external directory
3. Run `python3 setup.py build_ext --inplace && pip3 install .` in the darkflow directory
4. Copy deploy/yolo.weights to darkflow/yolo.weights

Once we have all the prerequisites set up we can  create `workflow.py` in our src directory and define a process function:
```python
import glob
import os
from darkflow.net.build import TFNet
import cv2
import logging
from helper import group_recognition_results, create_result, extract_original_video

DARKFLOW_DIR = "darkflow/"
TEMP_DIR = "temp/"

def process(assets, detectionThreshold, fps):
    video_url = extract_original_video(assets, 'video/mp4')
    if not video_url:
        raise ValueError("Can't find original video URL")

    os.chdir(DARKFLOW_DIR)
    jpegs = extract_frames(video_url, fps)
    predictions_per_frame = predict(jpegs, detectionThreshold, fps)

    return predictions_per_frame
```
Make sure you update the DARKFLOW_DIR to the location of darkflow in your workspace.

#### Extract the frames:
```python
def extract_frames(video_file, fps):
    logging.info("Generating thumbs for video file {0}".format(video_file))

    image_dir = TEMP_DIR + "jpeg/"
    if not os.path.exists(image_dir):
        os.makedirs(image_dir)

    image_path_template = image_dir + "frame{0}.jpg"
    frame_template = image_path_template.format("%09d")
    command = "ffmpeg -i \"{0}\" -f image2 -vf fps=fps={2} {1}".format(video_file, frame_template, fps)
    logging.info("Executing command: {0}".format(command))
    os.system(command)

    jpeg_file_mask = image_path_template.format("*")
    jpegs = glob.glob(jpeg_file_mask)
    jpegs_count = len(jpegs)
    logging.debug("Files generated = {0} at the dir {1}".format(jpegs_count, image_dir))

    if jpegs_count == 0:
        raise ValueError("No thumbs were generated")

    return jpegs
```

We are using ffmpeg with the asset's signedURI to download the video and extract frames based on the fps set in our
config file. The frames will be saved as jpegs to a temp directory and we will pass back the paths to the jpeg files.

#### Process each image
```python
def predict(images, detectionThreshold, fps):
    images.sort()

    results = []
    options = {"model": "cfg/yolo.cfg",
               "load": "yolo.weights",
               "threshold": detectionThreshold}

    tfnet = TFNet(options)

    for index, img in enumerate(images):
        imgcv = cv2.imread(img)
        predictions = tfnet.return_predict(imgcv)
        results.append(predictions)

    return results

```

Once we have our workflow setup, we need to update our `engine.py` to call it:

```python
...
from workflow import process
...
def run(payload_arg):
...
    try :
       client.update_task(payload['jobId'], payload['taskId'], 'running')
       assets = client.get_assets_for_recording(payload['recordingId'], 'media')
       if not assets:
           raise ValueError('Cannot find assets for recording with id {}'.format(payload['recordingId']))
       predictions_per_frame = process(assets, config['detectionThreshold'], config['fps'])
       print(prediections_per_frame)
   ...

```
If you run the engine at this point, you will notice it taking a lot longer than before because we are actually
downloading the video and running object detection. Once it's complete, we should see the program output the detection
results to the console for each frame.

### Format Output
After getting predictions for each frame from our object detection, the output needs to be formatted to Veritone's
Object Format. The format looks like:
```json
{
      "series": [
        {
          "found": "cat",
          "start": 0,
          "end": 3000,
          "confidence": 825
        },
        ...
      ]
    }
```
Let's add
```python
def create_result(json_data, start, fps):
    """Transforms yolo prediction data to Veritone Object."""
    left = json_data['topleft']['x']
    top = json_data['topleft']['y']
    width = json_data['bottomright']['x'] - left
    height = json_data['bottomright']['y'] - top

    result = {
        'boundingPoly': {
            'left': left,
            'top': top,
            'width': width,
            'height': height
        },
        'confidence': json_data['confidence'].astype(float),
        'found': json_data['label'],
        'start': start * 1000,  # in ms
        'end': int((start + 1) * 1000 / fps),
        'type': 'object',
    }

    return result

def group_recognition_results(data, clump_threshold_ms=1000):
    """Groups together objects that have been detected in previous frames."""
    sorted_data = sorted(data, key=lambda k: (str(k['found']), int(k['start'])))
    results = []
    prev_result = None
    for result in sorted_data:
        if not prev_result:
            prev_result = result
        else:
            clumped_together = (result['start'] - prev_result['end'] < clump_threshold_ms) or (
                    prev_result['start'] == result['start'])
            same_object = prev_result['found'] == result['found']

            if clumped_together and same_object:
                prev_result['end'] = result['end']
            else:
                results.append(prev_result)
                prev_result = result

    if prev_result:
        results.append(prev_result)

    return results

def format_output(predictions_per_frame, fps):
    results = []
    for index, predictions in enumerate(predictions_per_frame):
        for prediction in predictions:
            result = create_result(prediction, index, fps)
            results.append(result)

    clump_threshold_ms = 1000 / fps
    return {'series': group_recognition_results(results, clump_threshold_ms)}
```

There are two important functions here. The first transforms YOLO output json to Veritone format. The second groups
together objects that were detected in contiguous frames. In the end, we just need to call format_output with our
predictions_per_frame from the previous step and we will have properly formatted output.

We update `engine.py` to:
```python
...
from helper import format_output
...
def run(payload_arg):
...
    try :
       client.update_task(payload['jobId'], payload['taskId'], 'running')
       assets = client.get_assets_for_recording(payload['recordingId'], 'media')
       if not assets:
           raise ValueError('Cannot find assets for recording with id {}'.format(payload['recordingId']))
       predictions_per_frame = process(assets, config['detectionThreshold'], config['fps'])
       results = format_output(predictions_per_frame, config['fps'])
       print(results)
   ...

```

### Create and Upload a New Asset
Now that our engine has run successfully, we need to upload the results back to Veritone. To do this we need to execute a
Multi-Part Form request with the updateAsset mutation and the outputFile.
```graphql
mutation {
  createAsset(
    input: {
        containerId: "435423434",
        contentType: "application/json",
        assetType: "object"
    }) {
    id
    uri
  }
}
```

The one catch with the `gql` library is that it does not support Multi-Part Form with file upload so we will use `requests`
to make the request in this case.

Add the following to api.py
```python
...
import requests
from http import HTTPStatus
...
class APIClient(object):
    ...
    def publish_results(self, recording_id, results):
        """Performs a Multipart/form-data request with the graphql query and the output file"""
        logging.debug("Publishing results for recording: {} . Results: {}".format(recording_id, results))
        filename = 'tmpfile'

        query = '''
            mutation {
              createAsset(
                input: {
                    containerId: "%s",
                    contentType: "application/json",
                    assetType: "object"
                }) {
                id
                uri
              }
            }
            ''' % recording_id

        data = {
            'query': query,
            'filename': filename
        }

        files = {
            'file': (filename, json.dumps(results))
        }

        try:
            response = requests.post(self.baseUrl, data=data, files=files, headers=self.headers)
            return response.status_code == HTTPStatus.OK
        except Exception as e:
            logging.error('Failed to create asset for recording: {} due to: {}'.format(recording_id, e))
            return False
```
The request has query, filename and the file. Since we are not using `gql` we need to validate the response ourselves.

In our `engine.py` we just have to call this function to upload the results:

```python
...
from helper import format_output
...
def run(payload_arg):
...
    try :
       client.update_task(payload['jobId'], payload['taskId'], 'running')
       assets = client.get_assets_for_recording(payload['recordingId'], 'media')
       if not assets:
           raise ValueError('Cannot find assets for recording with id {}'.format(payload['recordingId']))
       predictions_per_frame = process(assets, config['detectionThreshold'], config['fps'])
       results = format_output(predictions_per_frame, config['fps'])

       results_published = client.publish_results(payload['recordingId'], results)
   ...

```

### Report Task Completion Status
#### Task Success
If the processing completed successfully and we were able to upload the new asset, we will need to update the
status and pass the task output back to the server. We can use the same mutation as updating the task status to running with a slight change:

```graphql
mutation{
  updateTask(input :{
    id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
    status: running
    jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
    outputString: "{\"series\":[{\"found\":\"car\", \"start\":1000, \"stop\":3000, \"confidence\":.834}]}"
  }){
  id
  status
  }
}
```

#### Task Failure
On the other hand, if there were some errors processing the file, we should set the task status to failed and add error information as part of the task output.
```graphql
mutation{
  updateTask(input :{
    id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
    status: running
    jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
    outputString: "{\"errors\":[\"Invalid file format\"]}"
  }){
  id
  status
  }
}
```

Since we have already published the results we need to update the final task status in our `engine.py`:
```python
   if not results_published:
       client.update_task(payload['jobId'], payload['taskId'], 'failed')
       raise ValueError('Failed to publish results')
   else:
       client.update_task(payload['jobId'], payload['taskId'], 'complete', results)

```

At this point we should have a fully functional object detection engine that is integrated with Veritone API.

### Packaging in Docker Container
To be able to deploy this code to VDA, we will need to package the code using Docker.

We need to first create a manifest file specifing our engineId, category, preferred formats, cluster size and
concurrency. The file can be generated from the developer app or manually created and should have the following
properties:

```json
{
	"engineId" : "4e28d46b-b0d8-44d8-b065-4b82a94ab120",
	"category": "objectRecognition",
	"preferredInputFormat": "video/mp4",
	"outputFormats": [
		"application/json"
	],
	"clusterSize": "small",
	"intialConcurrency": 50,
	"maxConcurrency": 50
}
```

The Dockerfile we will be using for this project looks like:

```dockerfile
FROM gcr.io/tensorflow/tensorflow

COPY . /

WORKDIR ../

RUN apt-get update && apt-get install -y git ffmpeg python-dev curl python3-pip cmake \
    pkg-config \
    python-opencv \
    libopencv-dev \
    libav-tools  \
    libjpeg-dev \
    libpng-dev \
    libtiff-dev \
    libjasper-dev \
    python-numpy \
    cython3 \
    python-pycurl \
    python-opencv && \
    cp manifest.json /var/manifest.json && \
    pip3 install --upgrade pip && \
	pip3 install virtualenv && \
	pip3 install -r requirements.txt && \
	make check && \
	git clone https://github.com/thtrieu/darkflow.git && \
	cd ./darkflow && \
	python3 setup.py build_ext --inplace && \
	pip3 install .

COPY ./deploy/yolo.weights ./darkflow/yolo.weights

ENTRYPOINT ["make", "run"]
```

We start with a tensorflow base image and copy over all our code onto the image. Then we install all our dependencies
including cloning darknet and copying over our pretrained `yolo.weights` file. It also copies the `manifest.json` file to
`/var/manifest.json`. Then we make it into an executable image by adding it's entrypoint. As you can see, we are calling
 make run so our make file is executing the engine using python3.

Our makefile looks like:
```make
python_version := 3.6
src_dir := src

.PHONY: check
#check: pylint pep8 test

.PHONY: test
test: ve
	. ve/bin/activate && find test/unit -name test*.py | PYTHONPATH=. xargs -n 1 python3

.PHONY: clean
clean:
	rm -rf ve/

ve:
	virtualenv $@ --python=python$(python_version)
	. ./$@/bin/activate && pip$(python_version) install -r requirements.txt

repl:
	. ve/bin/activate && python

lintable := $(src_dir) test

.PHONY: pylint
pylint: ve
	. ve/bin/activate && find $(lintable) -name *.py | xargs pylint --rcfile ./.pylintrc -d missing-docstring

.PHONY: pep8
pep8: ve
	. ve/bin/activate && find $(lintable) -name *.py | xargs pep8 --max-line-length=100

.PHONY: run
run:
	python3 $(src_dir)/engine.py
```

Now we can build and run the docker file and pass the payload file location as an environment variable to docker.

```bash
docker build -t yolo-engine .
docker run yolo-engine -e PAYLOAD_FILE='/payload.json'
```

At this point, you can tag and upload the build to Veritone's docker registry following the instructions in the
developer app.
