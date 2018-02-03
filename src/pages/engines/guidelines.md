---
title: Construction Guidelines
---

Engines in Veritone are designed with a functional architecture that ensures easy integration to receive tasks, perform work, and return responses. The task processing pipeline follows a logical sequence of actions to fetch the input, retrieve a media asset, process the data, output the results to an asset, and send insights back to Veritone.

This section covers everything you need to properly construct your code for task processing. We&rsquo;ll walk through the entire task workflow in detail and specify behaviors and API calls required for your engine to successfully operate in the Veritone platform. Veritone API is built around the [GraphQL](http://graphql.org/learn/) paradigm and, where applicable in this documentation, we include sample requests configured in cURL and for use in our [GraphiQL interface](https://api.veritone.com/v3/graphiql). Please note that the examples in this documentation do not use client information and are not language specific. For fields that require account-specific data (such as a Recording ID), replace the value with your own. In addition, the sample requests shown are not all-inclusive &mdash; they highlight the minimum requirements and relevant information. Additional attributes for each request can be found in our [GraphQL docs](https://api.veritone.com/v3/graphqldocs/).

Veritone&rsquo;s GraphiQL interface is recommended for making test API requests, but calls can also be made using other HTTP clients. All requests must be HTTP POST to the [_https://api.veritone.com/v3/graphql_](https://api.veritone.com/v3/graphql) endpoint with *application/json *encoded bodies. In addition, requests must be authenticated [using an API Token](https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/13959365/Get+a+User+Session+or+API+Token). Pass the token in your request using the _Authorization_ header with a value _Bearer <token>_. If you&rsquo;re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.

The task processing workflow is detailed in the steps below:

1. Receive the Task Payload
2. Set Task Status to Running
3. Get the Recording Container
4. Download an Existing Asset
5. Process the Task
6. Format and Generate Output
7. Upload Engine Result & Create a New Asset
8. Reporting Task Failure

**1. Receive the Task Payload**

When an engine gets a task to run, a payload with arguments specific to the task and references to media assets is passed as a JSON file. In order for your engine to accept and execute on the task sent from Veritone, your code must support the the fields specified in the payload.The task payload is accessed through the PAYLOAD_FILE environment variable.

_Best Practice Tip_: For local development, it&rsquo;s recommended to support accepting the payload file location through a command line variable.
Sample Task Payload

**Task Payload Attributes**

| Field              | Type   | Description                                                                                                                                                                                  |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applicationId      | string | The application ID associated with the task.                                                                                                                                                 |
| jobId              | string | The unique ID of the job associated with the task.                                                                                                                                           |
| recordingId        | string | The unique ID of the recording container that holds assets associated with the task.                                                                                                         |
| taskId             | string | The unique ID associated with the task.                                                                                                                                                      |
| token              | string | A single-use token provided to the engine to access the recording container. All engine requests to the Veritone API must use this token.                                                    |
| veritoneApiBaseUrl | string | The base URL for making API requests in Veritone. Use the base URL to construct the GraphQL endpoint for your requests. (e.g., graphqlEndpoint = payload.veritoneApiBaseUrl + "/v3/graphql") |

false
We reserve the right to add additional properties to the payload. Any additional properties in the payload are considered undocumented and unreliable.

**2. Set Task Status to Running**

Once you have the Task Payload, call the _Update Task_ mutation and provide the Task ID and Job ID to set the task status to _running_.

#### Request Payload: Set Task Status to Running

```graphql
mutation {
  # -------request fields-----------
  updateTask(
    input: {
      # => The mutation type and input variable. (required)
      id: "string" # => The Task ID received in the Task Payload. (required)
      status: enum # => The status of the task. Set the value to running (without quotes). (required)
      jobId: "string" # => The Job ID received in the task payload. (required)
    }
  ) {
    # -------return fields------------
    id # => The unique ID associated with the task. (required)
    status # => The current status of the task. (required)
  }
}
```

#### GraphiQL Sample Request: Set Task Status to Running

```graphql
mutation {
  updateTask(
    input: {
      id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
      jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
      status: running
    }
  ) {
    id
    status
  }
}
```

#### cURL Sample Request: Set Task Status to Running

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer <YOUR TOKEN>' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { updateTask( input: { id: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180\", jobId: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49\", status: \"running\" } ) { id,  status } }" }'
```

#### Sample Response: Set Task Status to Running

```json
{
  "data": {
    "updateTask": {
      "id":
        "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "running"
    }
  }
}
```

**3. Get the Recording Container**

When the task status is set to _running_, make a request to the _Temporal Data Object_ query with the Recording ID received in the task payload to retrieve the recording container. Your engine will later download one of the assets in the recording container and use it as the base definition file for processing the task. When structuring your query to retrieve the recording container, there are a few core fields you&rsquo;ll want to specify in the request. Additional fields may also be required based on your engine&rsquo;s class. The query fields that apply to most engines are described in the request payload shown below and in the sample requests. A list of all possible request fields can be found in the [Temporal Data Object](https://api.veritone.com/v3/graphqldocs/temporaldataobject.doc.html) schema definition of our GraphQL docs.

#### Request Payload: Get Recording Container

```graphql
query {
# -------request fields-----------------------
  temporalDataObject    # => The query operation to retrieve a recording container object. (required)
  (id: string) {        # => The Recording ID received in the Task Payload. (required)
    assets              # => The asset object parameter to access the recording’s assets. (required)
    (type: "string"){   # => A label that classifies an asset, such as “transcript,” “media,” or “text.” The type field can be
                        #  added as a filter to return a list of assets that match the given value. If the “type” filter is used in
                        #  the request, a value must be specified. (optional)
# -------return fields-------------------------
    records {           # => The records object parameter used to access individual asset data. (required)
      id                # => The unique ID associated with an asset. (required)
      contentType       # => The asset’s MIME type (e.g., audio/mp3). (required)
      type              # => A label that classifies an asset. The type field is helpful in determining whether your engine is
                        #  able to use an asset for processing. Common types are include “media” (audio/video),
                        #  “transcript” (TTML format), and “v-vlf” (Veritone Lattice Format). (optional)
      signedUri         # => The secure URI of an asset. The signed URI value is used to download an asset for processing
                        #  by your engine. (required)
      createdDateTime   # => The date and time (in Unix/Epoch format) that an asset was created. (required)
    }
  }
}
```

#### GraphiQL Sample Request: Get Recording Container

```graphql
query {
  temporalDataObject(id: "38828568") {
    assets(type: "media") {
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

#### cURL Sample Request: Get Recording Container

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{ "query": "query { temporalDataObject(id: \"38828568\") { assets(type: \"media\") { records { id contentType type signedUri createdDateTime } } } }" }'
```

#### Sample Response: Get Recording Container

```json
{
  "data": {
    "temporalDataObject": {
      "assets": {
        "records": [
          {
            "id": "af206121-7238-490d-9b7f-51a3be38cce3",
            "contentType": "video/mp4",
            "assetType": "media",
            "createdDateTime": "1509387272",
            "signedUri":
              "https://inspirent.s3.amazonaws.com/assets/39528568/e212ae40-c570-49c3-ab5d-c6595a2067bb.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=e8e3ea1f163539cee439b100262c7f72eb5c6edd7a7edf5b23e5ea4387043549&X-Amz-SignedHeaders=host"
          },
          {
            "id": "6504ad93-edb5-4e5c-a0a8-8edb915bd921",
            "contentType": "application/ttml+xml",
            "assetType": "transcript",
            "createdDateTime": "1509383487",
            "signedUri":
              "https://inspirent.s3.amazonaws.com/assets/39528568/2e446059-3958-479e-b333-d3a77d0b7b56.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=2d8f79d6ec73ab9d7c8a1bb554047c58e9d941e74b544afbd730594ead9cc665&X-Amz-SignedHeaders=host"
          },
          {
            "id": "d7133668-79f3-4682-bff5-94be751318a4",
            "contentType": "image/jpeg",
            "assetType": "thumbnail",
            "createdDateTime": "1509382441",
            "signedUri":
              "https://inspirent.s3.amazonaws.com/assets/39528568/8d78a978-890c-406f-afc1-8d495d20f3ad.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=4902cd2d518dd14369063667fea27877020d425b928cea78e9912b55ba12526b&X-Amz-SignedHeaders=host"
          },
          {
            "id": "7d7b04a9-a1b8-432b-86d8-8150ee61c3a7",
            "contentType": "video/mp4",
            "assetType": "media",
            "createdDateTime": "1509382096",
            "signedUri":
              "https://inspirent.s3.amazonaws.com/assets/39528568/909b4ac0-3218-4026-812d-afca91ba0d14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=26447f611793e8a7e6b510b174d7ffd0b94a84fda9cbf59a79a8e936f17dc009&X-Amz-SignedHeaders=host"
          }
        ]
      }
    }
  }
}
```

**4. Download an Existing Asset**

Next, iterate through the retrieved assets and find the most relevant file to use as the input for your engine. Asset data files are stored in Veritone&rsquo;s S3 environment. Once the most relevant asset has been identified, download the file from the signed URI.

_Note:_ Veritone accepts a variety of media formats, so it&rsquo;s important that your code supports all of the applicable formats for your engine&rsquo;s class. Each of your engine&rsquo;s supported format types must also be specified in the *Supported Input Formats *section of the [manifest](https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/18874416/Engine+Manifests).

_Best Practice Tip:_ A recording&rsquo;s original asset has the highest fidelity. If a recording has multiple assets, it&rsquo;s recommended to sort by _createdDateTime_ and select the oldest asset in a format that your engine can process.

**5. Process the Task**

After downloading the asset, execute your engine&rsquo;s core code against it to process the task.

**6. Format and Generate Output**

When processing is complete, convert your engine&rsquo;s raw output to a Veritone-compatible format. Output formats and required fields differ by engine category. Select the engine category below that best matches your environment to view complete output configuration details.

* [Transcription](https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/14024956/Transcription)
* [Object Recognition](https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/13992129/Object+Recognition)

**7. Upload Engine Results and Create a New Asset**

Once your output file is created, upload it to Veritone, create a new asset, and set the task status to complete using the Upload Engine Result mutation. If your engine outputted to multiple files, make individual calls to create a separate asset for each file. 

Upload Engine Result mutation requests are submitted as multipart form post. This type of request is structured in two parts: the form-data that specifies the file information and a query containing details about the asset to create. Specify multipart/form-data as the Content-Type header and use the file and filename parameters to send the file contents in the request. 

Note: GraphiQL does not currently support multipart form requests, so a different HTTP client must be used to make sample requests to the Upload Engine Result mutation.

#### Upload Engine Result Request Payload

```bash
-H 'content-type: => A header that specifies the content type. Enter multipart/form-data as the value. (required)
-F filename       => The name of the file to upload. The value must match the name of the saved file. (required)
-F file           => The path of the file to upload. (required)
-F 'query=mutation {
-------request fields-----------
    uploadEngineResult(input :{ => The Upload Engine Result mutation type and input variable. (required)
      taskId: "string"          => The Task ID received in the Task Payload. (required)
      contentType: "string"     => The MIME type of the asset (e.g., audio/mp3). (required)
      completeTask: Boolean     => A Boolean that marks the task as complete when set to true. Important Note: If you’re creating multiple assets for a task, only set the value to true in the final request. Otherwise, the task status will be marked as complete and additional requests made with the Task ID will result in an error. (required)
  }){
-------return fields------------
    id        => The unique ID of the new asset. (required)
    type      => A label that classifies an asset. The returned value reflects the request input value. (required)
    signedUri => The secure URI of the new asset. (required)
  }
}
```

#### Sample Request: Upload Engine Result

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e33029893e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'query=mutation {
          uploadEngineResult(
            input: {
                taskId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
                contentType: "application/ttml+xml",
                assetType: "transcript",
                completeTask: true
          }) {
            id
            type
            signedUri
          }
        }' \
  -F filename=your-filename.ttml \
  -F file=@/Users/bobjones/Downloads/your-filename.ttml
```

#### Sample Response: Upload Engine Result

```json
{
  "data": {
    "createAsset": {
      "id": "f2f31230-d4f4-463e-bf3f-a6eb32bb5c80",
      "type": "transcript",
      "signedUri":
        "https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba087a582.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171122T175331Z&X-Amz-Expires=604800&X-Amz-Signature=e46a0c239c1f4bd66358313bfcb221a9c7543546135f03c8fe3a0540e77b0a3e&X-Amz-SignedHeaders=host"
    }
  }
}
```

**8. Reporting Task Failure**

If an error occurs during processing or if your engine does not support the task content type, mark the task status as _failed_ by calling the _Update Task_ mutation. The _output_ parameter should be included in your request and specify a JSON object with the _error_ field to indicate the reason for the task failure. When a task fails, no further engine processing should occur.

#### Request Payload: Set Task Status to Failed

```graphql
mutation {
# -------request fields-----------
  updateTask(input :{       # => The Update Task mutation type and input variable. (required)
    id: "string"            # => The Task ID received in the Task Payload. (required)
    jobId: "string"         # => The Job ID received in the Task Payload. (required)
    status: enum            # => The status of the task. Set the value to failed (without quotes). (required)
    output:{error: "string" # => A JSON object containing the error field with a free-text value describing the reason
                            #  for the task failure. (recommended)
  }){
# -------return fields------------
    id     # => The unique ID associated with the task. (required)
    status # => The current status of the task. (required)
    output # => The error message value entered in the output parameter of the request. (required)
  }
}
```

#### GraphiQL Sample Request: Set Task Status to Failed

```graphql
mutation {
  updateTask(
    input: {
      id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
      jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
      status: failed
      output: { error: "Invalid file type" }
    }
  ) {
    id
    status
    output
  }
}
```

#### cURL Sample Request: Set Task Status to Failed

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { updateTask( input: { id: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180\", jobId: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49\", status: \"failed\", output: { error: \"Invalid file type\" } } ) { id,  status, output } }" }'
```

#### Sample Response: Set Task Status to Failed

```json
{
  "data": {
    "updateTask": {
      "id": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "failed”,
      "output": {
        "error": "Invalid file type"
      }
    }
  }
}
```
