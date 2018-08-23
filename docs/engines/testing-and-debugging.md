# Testing your Engine

Before submitting your build, use the following information to test it thoroughly.


## Batch & Legacy Engines

When either a Batch or Legacy engine is deployed to Veritone, a `PAYLOAD_FILE` environment variable is passed to them at runtime which contains the location of the payload file they need to process. The payload file itself contains all of the information the engine needs in order to process the job correctly. In order to test an engine of this type, you will need to simulate an incoming payload to verify your engine can process it successfully. You can get a valid payload to test locally with by following the steps below.


#### Testing locally

1\. Click on the "Create Task" button shown on the tasks page of your engine.

![create task button](images/testing-and-debugging/create-task-button.png)

2\. Next click "Browse to Upload" and then choose a media file for your engine to process.

![browse to upload](images/testing-and-debugging/browse-to-upload.png)


3\. Once you have chosen an appropiate media file, click Next to proceed to the next step `Select Options`.
From the dropdown, select the build version `Local` in order to create a test task.

![select build](images/testing-and-debugging/select-build.png)

If your engine requires a library or requires any parameters then you will also have the option to input them on this page.

Once you are done click on submit. You will then be redirected back to the tasks page where you will see the new test task in the tasks table.

4\. Expand the task by clicking on the row. You may notice that the payload is not yet available and instead you're met with a message and a retry spinner. This is normal; there are several tasks running in the background that need to finish in order to generate a payload for you to consume. This normally takes a few minutes but varies depending on the size of the media file that you chosen to process.

![waiting for payload](images/testing-and-debugging/waiting-for-payload.png)

Once your payload is available it will look similar to the example below.

Example payload:

```json
{
  "jobId": "18083209_n3kEqWG6ON",
  "taskId": "18083209_n3kEqWG6ONnL9lj",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "recordingId": "400017204",
  "taskPayload": {
    "language": "en-us",
  },
  "veritoneApiBaseUrl": "https://api.veritone.com"
}
```


5\. Now that you have generated a valid payload, copy and save its contents into a `.json` file on your computer.

As mentioned previously, when this type of engine is deployed to Veritone a `PAYLOAD_FILE` environment variable is passed to it at runtime which contains the location of the payload file it needs to process.

You can simulate this by creating an environment variable locally called `PAYLOAD_FILE` and setting it's value to the file path of the file you have just created. Once you have done that, you can now run your engine locally using a valid payload in order to test your engine end to end to ensure it behaves correctly.


##### Optional

Once you have created the initial test payload, you may optionally prefer to create additional test tasks via curl rather than going through the GUI every time. Below is a curl snippet you can copy and modify to do so. Be sure to replace `engineId` with the id of your engine, as well as the `targetId` with the recording id of the payload from the original test task.

<b>Note</b> - If your engine requires custom fields or a library, you will need to update the mutation below to include those.

```bash
  curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer <insert your bearer token goes here>' \
  -H 'content-type: application/json' \
  -d '{"query":"mutation{createJob(input:{targetId:\"<the recordingId>\" tasks:[{engineId:\"<your engineId>\" testTask:true}]}){id}}"}'
```


#### Testing a VDA build

Before submitting your build, we also recommend testing it on our platform. To do this you should follow the same steps listed for testing your engine locally, except that you should now choose the build version that correlates to your uploaded build when asked to select a build on the select options page. This will create a job that will be processed in the Veritone platform by your uploaded build, instead of creating a test task as is the case when you select `Local` as your build version.


## Chunk & Stream Engines

#### Testing locally

The recommended way to test these types of engines locally is by simulating and verifying locally that your engine can consume and produce the messages documented in the construction guidelines listed below.

* [Chunk Engine Construction Guidelines](https://docs.veritone.com/#/engines/guidelines/real-time-engines?id=constructing-an-engine-in-chunk-mode)

* [Stream Engine Construction Guidelines](https://docs.veritone.com/#/engines/guidelines/real-time-engines?id=constructing-an-engine-in-stream-mode)

#### Testing a VDA build

You can test your uploaded build in CMS by following the steps below.


1\. Click on the `New` button and then select `Ingestion Job`

![cms ingestion job 1](images/testing-and-debugging/cms-ingestion-job-1.png)


2\. Select an adapter. For this example we're going to select the Web Stream Adapter.


![select an adapter](images/testing-and-debugging/select-an-adapter.png)

3\. If you don't have any existing sources, click on the `Select a Source` dropdown and then click on `Create New Source`


![create new source](images/testing-and-debugging/create-new-source.png)

4\. On the new source page, fill out the `Source Name` and the `Stream URL` fields and then click `Create`.


![new source page](images/testing-and-debugging/new-source-page.png)

5\. Select the newly created source from the `Select a Source` dropdown and click `Next`.


![select new source](images/testing-and-debugging/select-new-source.png)


6\. On the schedule page, choose immediate and then click `Next`.


![schedule page](images/testing-and-debugging/schedule-page.png)


7\. The default view of the processing step displays the Simple Cognitive Workflow which allows users to select a category in which Veritone chooses the best engine of that given category to process their media with. As the intention is to test your own engine, you need to click on `Show Advanced Congnitive Workflow` at the upper right corner.

![advanced workflow](images/testing-and-debugging/advanced-workflow.png)


8\. On the Advanced Cognitive Workflow page, click on the dropdown under Available Engines and choose the category that corresponds to your engine. You will then see your engine in the engine list. Click on the green plus icon to select your engine and move it to the Selected Engines panel. If your engine requires either engine parameters or a library you will now be asked to input these. After configuring your engine parameters, click `Next`.

![select engine](images/testing-and-debugging/select-engine.png)

9\. Click `Next` on the Content Templates step which will take you to the final step `Customize`. Fill out the `Customize` step with any information you'd like, and finally click `Save` to finish.  That will redirect you to the CMS main page.


![customize step](images/testing-and-debugging/customize-step.png)


10\. You have now successfully created an ingestion job, which your engine build will be asked to process. You can click on the `Processing Status` button in the left navigation panel to view the processing list, which gives an overview of all of the recently processed files and their status. You can also click on a file in the processing list to view its media details page where you can view the output of a successfully processed file, as well as make additional actions against the file such as reprocessing.

If your ingestion job results in an error, please read the section below on debugging to get a better understanding of how to debug your engine in the Veritone Platform.


## Debugging

Any time your engine is asked to process a task which belongs to you, it will be displayed as a new task row under the tasks page of your engine in VDA. This is the best starting point for debugging.

By expanding the task row, you will be able to view additional information about your task in the tabs provided which are detailed below.

##### Payload

The payload tab displays the JSON payload that your engine will receive at runtime. You should verify that you are handling the payload correctly in your engine and also that the correct parameters (custom fields) are being passed to your engine inside of the payload.

You can view your task payload via graphql by using the snippet below:

```graphql
query {
  task(id: "replaceMe") {
    payload
  }
}
```

##### Task Log

The task log tab displays your engines task log in JSON format. The task log is the primary way for you to debug as it allows you to view the standard output (stdout) of your engine. The only exception to this is for Chunk engines, for which we do not attach stdout as part of the task log. For both Stream and Chunk engines you will also be able to view kafka events here if they are related to your task.

<b>Note</b> - We only return the task log for completed or failed tasks so it is vital that your engine correctly updates the task status in response to both success/errors in order for you to view your logs.


You can view your task log via graphql by using the snippet below:

```graphql
query {
  task(id: "replaceMe") {
    log {
      uri
      text
      jsondata
    }
  }
}
```


##### Task Output
The task output tab displays your engine results. Take a look [here](https://docs.veritone.com/#/apis/tutorials/engine-results?id=uploading-engine-results) for more information about engine results.

You can view your task output via graphql by using the snippet below:

```graphql
query {
  task(id: "replaceMe") {
    output # JSON
    outputString # stringified
  }
}
```

##### Assets
The assets tab displays all of the assets that were produced by your engine for that particular task. This allows you to view the type of asset that was produced, and also allows you to view the source by clicking on the asset ID. This is useful for verifying that the assets produced have been processed by your engine correctly.

You can also view the assets created by your engine by using the graphql query below.  Replace the ID `replaceMe` with the `recordingId` from your task payload.

```graphql
query{
  temporalDataObject(id:"replaceMe"){
    assets(orderBy:createdDateTime) {
      records  {
        id
        assetType
        contentType
        createdDateTime
        jsondata
        signedUri
      }
    }
  }
}
```

This query orders the assets by when they were created, with the most recent asset first. Use the `signedUri` value to view the asset in your browser.

You can also filter by specific types of assets by including the `type` filter. This filters against the `assetType` of the asset. See the query below for an example.

```graphql
query{
  temporalDataObject(id:"replaceMe"){
    assets(type: "vtn-standard" orderBy:createdDateTime) {
      records  {
        id
        assetType
        contentType
        createdDateTime
        jsondata
        signedUri
      }
    }
  }
}
```

<!-- Talk about VDA tasklog / task output / assets.
Show how to debug via graphql examples.

Chunk engines are multi-tenant so are often processing chunks from a variety of different jobs at any given time. -->
