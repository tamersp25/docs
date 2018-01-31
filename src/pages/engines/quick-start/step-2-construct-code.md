---
title: Step 2 - Construct Your Code for the Veritone Platform
---

Engines in Veritone are designed with a functional architecture that ensures easy integration to receive tasks, perform work, and return responses. The task processing pipeline follows a logical sequence of actions to fetch the input, retrieve a media asset, process the data, output the results to an asset, and send insights back to Veritone.
This section covers everything you need to properly construct your code for task processing. We’ll walk through the entire task workflow in detail and specify behaviors and API calls required for your engine to successfully operate in the Veritone platform. Veritone API is built around the GraphQL paradigm and, where applicable in this documentation, we include sample requests configured in cURL and for use in our GraphiQL interface. Please note that the examples in this documentation do not use client information and are not language specific. For fields that require account-specific data (such as a Recording ID), replace the value with your own. In addition, the sample requests shown are not all-inclusive — they highlight the minimum requirements and relevant information. Additional attributes for each request can be found in our GraphQL docs.

Veritone’s GraphiQL interface is recommended for making test API requests, but calls can also be made using other HTTP clients. All requests must be HTTP POST to the https://api.veritone.com/v3/graphql endpoint with application/json encoded bodies. In addition, requests must be authenticated using an API Token. Pass the token in your request using the Authorization header with a value Bearer <token>. If you’re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.

The task processing workflow is detailed in the steps below:

1. Receive the Task Payload
2. Set Task Status to Running
3. Get the Recording Container
4. Download an Existing Asset
5. Process the Task
6. Format and Generate Output
7. Create and Upload a New Asset to Veritone
8. Set Task Status to Complete
9. Reporting Task Failure

<br><div>1. Receive the Task Payload</div>

When an engine gets a task to run, a payload with arguments specific to the task and references to media assets is passed as a JSON file. In order for your engine to accept and execute on the task sent from Veritone, your code must support the the fields specified in the payload.The task payload is accessed through the PAYLOAD_FILE environment variable.

Best Practice Tip: For local development, it’s recommended to support accepting the payload file location through a command line variable.

```json
{
    "applicationId": "fb901454-1ef2-4130-a65d-0a831443f675",
    "jobId": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49",
    "taskId": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
    "recordingId": "38828568",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6W3siYWN0aW9ucyI6WyJhc3NldDp1cmkiL
                CJyZWNvcmRpbmc6cmVhZCIsInJlY29yZGluZzp1cGRhdGUiXSwicmVzb3VyY2VzIjp7InJlY29yZGluZ0lk
                cyI6WyIxNDg5MDI1MiIsIjIwOTA0MTExIiwiMjAwNDQyMDQiLCIxMTA5MzQ3OSJdfX0seyJhY3Rpb25zIj"
    "veritoneApiBaseUrl": "https://api.veritone.com"
}
```

| Task               | Payload | Attributes                                                                                                                                                                                   |
| ------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Field              | Type    | Description                                                                                                                                                                                  |
| applicationId      | string  | The application ID associated with the task.                                                                                                                                                 |
| jobId              | string  | The unique ID of the job associated with the task.                                                                                                                                           |
| recordingId        | string  | The unique ID of the recording container that holds assets associated with the task.                                                                                                         |
| taskId             | string  | The unique ID associated with the task.                                                                                                                                                      |
| token              | string  | A single-use token provided to the engine to access the recording container. All engine requests to the Veritone API must use this token.                                                    |
| veritoneApiBaseUrl | string  | The base URL for making API requests in Veritone. Use the base URL to construct the GraphQL endpoint for your requests. (e.g., graphqlEndpoint = payload.veritoneApiBaseUrl + "/v3/graphql") |

We reserve the right to add additional properties to the payload. Any additional properties in the payload are considered undocumented and unreliable.

<br><div>2. Set Task Status to Running</div>

Once you have the Task Payload, call the Update Task mutation and provide the Task ID and Job ID to set the task status to running.

#### Request Payload: Set Task Status to Running

```graphql(disable)
mutation{
# -------request fields-----------
  updateTask(input :{ # => The mutation type and input variable. (required)
    id: "string"      # => The Task ID received in the Task Payload. (required)
    status: enum      # => The status of the task. Set the value to running (without quotes). (required)
    jobId: "string"   # => The Job ID received in the task payload. (required)
  }){
# -------return fields------------
    id      # => The unique ID associated with the task. (required)
    status  # => The current status of the task. (required)
  }
}
```

#### GraphiQL Sample Request: Set Task Status to Running

```graphql(disable)
mutation{
  updateTask(input :{
    id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
    jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
    status: running
  }){
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
      "id": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "running"
    }
  }
}
```

<br><div>3. Get the Recording Container</div>

When the task status is set to running, make a request to the Temporal Data Object query with the Recording ID received in the task payload to retrieve the recording container. Your engine will later download one of the assets in the recording container and use it as the base definition file for processing the task. When structuring your query to retrieve the recording container, there are a few core fields you’ll want to specify in the request. Additional fields may also be required based on your engine’s class. The query fields that apply to most engines are described in the request payload shown below and in the sample requests. A list of all possible request fields can be found in the Temporal Data Object schema definition of our GraphQL docs.


#### Request Payload: Get Recording Container

```graphql(disable)
query {
# -------request fields-----------------------
  temporalDataObject    # => The query operation to retrieve a recording container object. (required)
  (id: string) {        # => The Recording ID received in the Task Payload. (required)
    assets              # => The asset object parameter to access the recording’s assets. (required)
    (type: "string") {   # => A label that classifies an asset, such as “transcript,” “media,” or “text.” The type field can be
                        #   added as a filter to return a list of assets that match the given value. If the “type” filter is used in
                        #   the request, a value must be specified. (optional)
# -------return fields-------------------------
      records {         # => The records object parameter used to access individual asset data. (required)
        id              # => The unique ID associated with an asset. (required)
        contentType     # => The asset’s MIME type (e.g., audio/mp3). (required)
        type            # => A label that classifies an asset. The type field is helpful in determining whether your engine is
                        #   able to use an asset for processing. Common types are include “media” (audio/video),
                        #  “transcript” (TTML format), and “v-vlf” (Veritone Lattice Format). (optional)
        signedUri       # => The secure URI of an asset. The signed URI value is used to download an asset for processing
                        #   by your engine. (required)
        createdDateTime # => The date and time (in Unix/Epoch format) that an asset was created. (required)
      }
    }
  }
```

#### GraphiQL Sample Request: Get Recording Container

```graphql(disable)
query {
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
            "signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/e212ae40-c570-49c3-ab5d-c6595a2067bb.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=e8e3ea1f163539cee439b100262c7f72eb5c6edd7a7edf5b23e5ea4387043549&X-Amz-SignedHeaders=host"
          },
          {
            "id": "6504ad93-edb5-4e5c-a0a8-8edb915bd921",
            "contentType": "application/ttml+xml",
            "assetType": "transcript",
            "createdDateTime": "1509383487",
            "signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/2e446059-3958-479e-b333-d3a77d0b7b56.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=2d8f79d6ec73ab9d7c8a1bb554047c58e9d941e74b544afbd730594ead9cc665&X-Amz-SignedHeaders=host"
          },
          {
            "id": "d7133668-79f3-4682-bff5-94be751318a4",
            "contentType": "image/jpeg",
            "assetType": "thumbnail",
            "createdDateTime": "1509382441",
            "signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/8d78a978-890c-406f-afc1-8d495d20f3ad.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=4902cd2d518dd14369063667fea27877020d425b928cea78e9912b55ba12526b&X-Amz-SignedHeaders=host"
          },
          {
            "id": "7d7b04a9-a1b8-432b-86d8-8150ee61c3a7",
            "contentType": "video/mp4",
            "assetType": "media",
            "createdDateTime": "1509382096",
            "signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/909b4ac0-3218-4026-812d-afca91ba0d14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=26447f611793e8a7e6b510b174d7ffd0b94a84fda9cbf59a79a8e936f17dc009&X-Amz-SignedHeaders=host"
          }
        ]
      }
    }
  }
}
```


<br><div>4. Download an Existing Asset</div>

Next, iterate through the retrieved assets and find the most relevant file to use as the input for your engine. Asset data files are stored in Veritone’s S3 environment. Once the most relevant asset has been identified, download the file from the signed URI.

Note: Veritone accepts a variety of media formats, so it’s important that your code supports all of the applicable formats for your engine’s class. Each of your engine’s supported format types must also be specified in the Supported Input Formats section of the manifest.

Best Practice Tip: A recording’s original asset has the highest fidelity. If a recording has multiple assets, it’s recommended to sort by createdDateTime and select the oldest asset in a format that your engine can process.   


<br><div>5. Process the Task</div>

After downloading the asset, execute your engine’s core code against it to process the task.


<br><div>6. Format and Generate Output</div>

When processing is complete, convert your engine’s raw output to a Veritone-compatible format. Output formats and required fields differ by engine category. Select the engine category below that best matches your environment to view complete output configuration details. 

* Transcription
* Object Recognition


<br><div>7. Create and Upload a New Asset to Veritone</div>

Engine output is uploaded to Veritone as an asset by calling the Create Asset mutation. In some cases, multiple asset are generated as output. For example, a transcription engine may produce a Time Text Markup Language (TTML) transcript and a Veritone Lattice Format (VLF) lattice — both of which are individual assets with unique Asset IDs.

There are two available options for setting up your Create Asset request:

Option 1:

Upload the file to an external host location that’s accessible to Veritone and pass the raw, signed URI in the request.

#### Option 1 Request Payload: Create Asset

```graphql(disable)
mutation {
# -------request fields-----------
  createAsset(input: {     # => The Create Asset mutation type and input variable. (required)
    containerId: "string"  # => The Recording ID received in the Task Payload. (required)
    contentType: "string"  # => The MIME type of the asset (e.g., audio/mp3). (required)
    type: "string"         # => A label that classifies an asset, such as “transcript,” “media,” or “text.” (required)
    sourceData: {          # => An object that specifies the source engine and Task ID. (required)
      name: "string"       # => The unique ID of the engine that processed the task. (required)
      taskId: "string"     # => The Task ID received in the Task Payload. (required)
    signedUri: "string"    # => The secure URI of the file to be passed in the request. (required)
  }){
# -------return fields------------
  id        # => The unique ID of the new asset. (required)
  type      # => A label that classifies an asset. The returned value reflects the input value specified in the request. (required)
  signedUri # => The secure URI of the new asset. (required)
  }
}
```

#### Option 1 GraphiQL Sample Request: Create Asset

```graphql(disable)
mutation {
  createAsset(input: {
    containerId: "38828568"
    contentType: "application/ttml+xml"
    type: "transcript"
    sourceData: {
      name: "619d7252-d473-b42c-96c6-5675b5e56afd"
      taskId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
    }
    signedUri: "https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba088a582.ttml"
  }) {
    id
    type
    signedUri
  }
}
```

#### Option 1 cURL Sample Request: Create Asset

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { createAsset( input: { containerId: \"38828568\", contentType: \"application/ttml+xml\", type: \"transcript\", signedUri: \"https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba088a582.ttml\", sourceData: { name: \"619d7252-d473-b42c-96c6-5675b5e56afd\", taskId: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180\" } } ) { id,  type, signedUri } }" }'
```

#### Option 1 Sample Response: Create Asset

```json

{
  "data": {
    "createAsset": {
      "id": "f2f31230-d4f4-463e-bf3f-a6eb32bb5c80",
      "type": "transcript",
      "signedUri": "https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba087a582.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171122T175331Z&X-Amz-Expires=604800&X-Amz-Signature=e46a0c239c1f4bd66358313bfcb221a9c7543546135f03c8fe3a0540e77b0a3e&X-Amz-SignedHeaders=host"
    }
  }
}
```

Option 2:

The second option allows you to send the file contents as part of the request. This option uses the multipart/form-data header and requires use of the file and filename parameters. Requests using this option are structured in two parts: the form-data that specifies the file information and a query containing details about the asset. Currently, GraphiQL does not support multipart/form requests, so a different HTTP client must be used for making sample calls.

#### Option 2 Request Payload: Create Asset (in cURL structure)

```bash
-H 'content-type: => A header that specifies the content type. Enter multipart/form-data as the value. (required)
-F filename       => The name of the file to upload. The value must match the name of the saved file. (required)
-F file           => The path of the file to upload. (required)
-F 'query=mutation {
-------request fields-----------
    createAsset(input :{    => The Create Asset mutation type and input variable. (required)
      containerId: "string" => The Recording ID received in the Task Payload. (required)
      contentType: "string" => The MIME type of the asset (e.g., audio/mp3). (required)
      type: "string"        => A label that classifies an asset, such as “transcript,” “media,” or “text.” (required)
      sourceData: {         => An object that specifies the source engine and Task ID. (required)
        name: "string"      => The unique ID of the engine that processed the task. (required)
        taskId: "string"    => The Task ID received in the Task Payload. (required)
  }){
-------return fields------------
    id       => The unique ID of the new asset. (required)
    type     => A label that classifies an asset. The returned value reflects the input value specified in the request. (required)
    signedUri => The secure URI of the new asset. (required)
  }
}
```

#### Option 2 Sample Request: Create Asset

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e33029893e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'query=mutation {
          createAsset(
            input: {
                containerId: "38828568",
                contentType: "application/ttml+xml",
                type: "transcript"
                sourceData: {
                  name: "619d7252-d473-b42c-96c6-5675b5e56afd",
                  taskId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
              },
          }) {
            id
            type
            signedUri
          }
        }' \
  -F filename=test.ttml \
  -F file=@/Users/bobjones/Downloads/test.ttml
```

#### Option 2 Sample Response: Create Asset

```json
{
  "data": {
    "createAsset": {
      "id": "f2f31230-d4f4-463e-bf3f-a6eb32bb5c80",
      "type": "transcript",
      "signedUri": "https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba087a582.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171122T175331Z&X-Amz-Expires=604800&X-Amz-Signature=e46a0c239c1f4bd66358313bfcb221a9c7543546135f03c8fe3a0540e77b0a3e&X-Amz-SignedHeaders=host"
    }
  }
}
```


<br><div>8. Set Task Status to Complete</div>

Once the asset has been uploaded, mark the task status as complete by calling the Update Task mutation. Requests from all engine categories other than Transcription must include the output string parameter and use the series data from the engine output as the value.

#### Request Payload: Set Task Status to Complete

```graphql(disable)
mutation {
# -------request fields-----------
  updateTask(input :{           # => The Update Task mutation type and input variable. (required)
    id: "string"                # => The Task ID received in the Task Payload. (required)
    jobId: "string"             # => The Job ID received in the Task Payload. (required)
    status: enum                # => The status of the task. Set the value to complete (without quotes). (required)
    outputString: "JSON string" # => A JSON file containing an array of Series objects with details about each instance of a
                                #   found item. (Refer to your engine category’s output specifications for Series
                                #   information.) All quotes in the string must be properly escaped for the task to be
                                #   updated and stored. *The output string parameter is required for all engine categories
                                #   except Transcription. (required*)
  }){
# -------return fields------------
  id      # => The unique ID associated with the task. (required)
  status  # => The current status of the task. (required)
  }
}
```

#### GraphiQL Sample Request: Set Task Status to Complete

```graphql
mutation{
  updateTask(input :{
    id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
    jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
    status: complete
    outputString: "{ \"series\": [ { \"found\": \"outdoor\", \"start\": 0, \"end\": 109050, \"confidence\": 825 }, { \"found\": \"minivan\", \"start\": 3375, \"end\": 5875, \"confidence\": 763 } ] }"
}) {
    id
    status
}}
```

#### cURL Sample Request: Set Task Status to Complete

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { updateTask( input: { id: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180\", jobId: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49\", status: \"complete\", outputString: \"{ \\\"series\\\": [ { \\\"found\\\": \\\"outdoor\\\", \\\"start\\\": 0, \\\"end\\\": 109050, \\\"confidence\\\": 825}, { \\\"found\\\": \\\"minivan\\\", \\\"start\\\": 3375, \\\"end\\\": 5875, \\\"confidence\\\": 763 } ] }\" } ) { id,  status } }" }'
```

#### Sample Response: Set Task Status to Complete

```json
{
  "data": {
    "updateTask": {
      "id": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "complete"
    }
  }
}
```

<br><div>9. Reporting Task Failure</div>

If an error occurs during processing or if your engine does not support the task content type, mark the task status as failed by calling the Update Task mutation. The output parameter should be included in your request and specify a JSON object with the error field to indicate the reason for the task failure. When a task fails, no further engine processing should occur.

#### Request Payload: Set Task Status to Failed

```graphql(disable)
mutation{
# -------request fields-----------
  updateTask(input :{       # => The Update Task mutation type and input variable. (required)
    id: "string"            # => The Task ID received in the Task Payload. (required)
    jobId: "string"         # => The Job ID received in the Task Payload. (required)
    status: enum            # => The status of the task. Set the value to failed (without quotes). (required)
    output:{error: "string" # => A JSON object containing the error field with a free-text value describing the reason
                            #   for the task failure. (recommended)
  }){
# -------return fields------------
    id     # => The unique ID associated with the task. (required)
    status # => The current status of the task. (required)
    output # => The error message value entered in the output parameter of the request. (required)
  }
}
```


#### GraphiQL Sample Request: Set Task Status to Failed

```graphql(disable)
mutation{
  updateTask(input :{
    id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
    jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
    status: failed
    output:{error: "Invalid file type"
    }
  }) {
    id
    status
    output
}}
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
