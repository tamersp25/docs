# Construction of Adapters

As engines with engineType set as ingestion, adapters are constructed very similarly to cognitive engines. The basic job of an adapter is to connect to the data source and bring the data into the platform. Beyond that, adapters can also include functionality like managing authentication, scanning for new data on a schedule, and filtering or transforming the data.
The basic steps for constructing an adapter or ingestion engine:

The workflow steps for adapters:

1. [Receive the Task Payload](#1.-receive-the-task-payload)
2. [Set Task Status to Running](#2.-set-task-status-to-running)
3. [Process the Task](#3.-process-the-task)
4. [Set Task Status to Completed or Report Errors](#4.-set-task-status-to-completed-or-report-errors)

**1. Receive the Task Payload**

When an adapter gets a task to run, a payload with arguments specific to the task and references to the data source is passed as a JSON file. In order for your engine to accept and execute on the task sent from Veritone, your code must support the fields specified in the payload. The task payload is accessed through the PAYLOAD_FILE environment variable.

_Best Practice Tip_: For local development, it&rsquo;s recommended to support accepting the payload file location through a command line variable.

**Task Payload Attributes**

| Field              | Type   | Description                                                                                                                                                                                  |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applicationId      | string | The application ID associated with the task.                                                                                                                                                 |
| jobId              | string | The unique ID of the job associated with the task.                                                                                                                                           |
| taskId             | string | The unique ID associated with the task.                                                                                                                                                      |
| token              | string | A single-use token provided to the engine to access the recording container. All engine requests to the Veritone API must use this token.                                                    |
| source             | object | Provides more information about the source of the data. See below for the contents of the object.                                                    |
| metadata           | object | Provides more information to describe the data. See below for the contents of the object.                                                       |
| job           | object | Contains the task array. See below for the contents of the object.                                                   |
| veritoneApiBaseUrl | string | The base URL for making API requests in Veritone. Use the base URL to construct the GraphQL endpoint for your requests. (e.g., graphqlEndpoint = payload.veritoneApiBaseUrl + "/v3/graphql") |

*Note:* We reserve the right to add additional properties to the payload. Any additional properties in the payload are considered undocumented and unreliable.

The source object contains user input configurations, including credentials.

```
  "source": {
        "ingestionId": string,
        "ingestionType": string,
        "name": string,
        "lastProcessedDateTime": string, (if supported, key name may vary)
        "config": {
            "foo": any,
            "bar": any,
            ...
        },
        "schemaId": string (for structured data only)
   }
```
The metadata object contains additional information that the user would like to attach to the ingested data.

```
    "metadata": {
        "date": string,
        "tags": array,
        "veritone-program": {
            "programId": string,
            "programName": string,
            "programImage": string,
            "programLiveImage": string
        },
        "veritone-permissions": {
            "acls": array,
            "isPublic": boolean
        }
    },
```
The job object contains the task array, for ingestion jobs that require multiple tasks.

```
    "job": {
        "tasks": array
    }
```

**2. Set Task Status to Running**

Once you have the Task Payload, call the _Update Task_ mutation and provide the Task ID and Job ID to set the task status to _running_.

#### Request Payload: Set Task Status to Running

```graphql
mutation {
-----------request fields-----------
  updateTask(
    input: {           => The mutation type and input variable. (required)
      id: "string"     => The Task ID received in the Task Payload. (required)
      status: enum     => The status of the task. Set the value to running (without quotes). (required)
      jobId: "string"  => The Job ID received in the task payload. (required)
    }
  ) {
-----------return fields-----------
    id      => The unique ID associated with the task. (required)
    status  => The current status of the task. (required)
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

**3. Process the Task**

Next, execute your ingestion engine's core code against the data source. You will need to create a data object for the data ingested. Note that Veritone supports two types of data objects:

* Temporal Data Object (TDO): This is a data object that can be described as a time series. TDOs include audio and video files and streams.
* Structured Data Object (SDO): This is a data object that is described by a schema. Veritone currently supports SDOs with a JSON content type.

**TDOs:** When creating a new TDO, use the createTDO mutator and provide at least the following fields:
* startDateTime: use the date from the "metadata" object in the payload
* stopDateTime: use the file duration to determine
* source: source name from the payload
* status: "recording" or "downloaded"

After creating the TDO, an asset must be created on the TDO using the ingested file. To do so, the createAsset mutator can be used. A few specific fields to note:

* type should be set to "media"
* contentType is the MIME type and should be set
* details should be set to the metadata value provided in the payload

For both createTDO and createAsset, refer to the documentation from GraphiQL for the full list of fields supported.

On a successful completion of the "ingest" mode, the task output should, at the minimum, include the ID of the TDO created, specified as the field, "recordingId". Additional data fields from TDO can also be included under a "recording" object. Additional data fields from TDO can also be included under a "recording" object. For instance:

```
{
    "recordingId": "400001621",
    "recording": {
        "id": "400001621",
        "name": "video.mp4",
        "startDateTime": "2017-12-21T00:29:07.885Z",
        "stopDateTime": "2017-12-21T00:30:07.885Z",
        "assets": [{
            "id": "8285929482",
            "type": "media",
            "contentType": "video/mp4"
        }]
    }
}
```

**SDOs:** When creating a new SDO, use the createStructuredData mutator and provide the following fields:
* externalId: if you want to use an ID that you'll remember for future processing, include it here; otherwise Veritone will assign an ID
* schemaId: the ID of the schema used to validate this object
* data: the structured data in JSON format
* dataString: the structured data in string format

For SDOs, you do not need to create an asset. Once the SDO is created, the data passed in the _data_ or _dataString_ field will be attached to the SDO.

**4. Set Task Status to Completed or Report Errors**

When a task is completed, it should be set to "complete" or "failed" if any errors occurred and the task could not be completed. These can all be accomplished by using the updateTask mutator.

The _output_ field of the task should also be updated to include some information about task results. If an error occurred, the task output should include the error message. For example:

```
{
    "error": "server returned 404"
}
```
