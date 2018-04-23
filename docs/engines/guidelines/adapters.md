# Construction of Adapters

As engines with engineType set as ingestion, adapters are constructed very similarly to cognitive engines. The basic job of an adapter is to connect to the data source and bring the data into the platform. Beyond that, adapters can also include functionality like managing authentication, scanning for new data on a schedule, and filtering or transforming the data.

At a high level, the VDA platform allows you to create and upload two types of adapters: _pull_, which is the most common type of adapter where the adapter does the work of pulling the raw data from the source where the data is located, and _push_, where the source pushes data to a service on the Veritone platform, which then ingests the data onto the platform. We'll focus on pull adapters here, but if you're interested in push scenarios, check out our HTTP Push adapter in CMS or contact us for more information.

When uploading an adapter build through VDA, be sure to set the engineMode to 'batch' or 'stream' in the manifest. Adapters that work in batch mode will ingest the entire file or record and then upload it as a new asset, either as a Temporal Data Object (TDO) or a Structured Data Object (SDO). Adapters that work in stream mode will ingest small bytes of the data and make it immediately available for processing by real-time engines. The steps for each of these types of adapters are described in more detail below.

## Constructing a Batch Pull Adapter

The basic steps for a batch adapter:

1. Receive the task payload.
1. Set the task to running.
1. Perform the task.
    1. First create the TDO or SDO.
    1. Then ingest the data and store it using the API.
1. When the task is complete, use the API to change the status of the task to Complete, or to report any Errors.

More details and examples for API calls are provided below.

**1. Receive the Task Payload**

When an adapter gets a task to run, a payload with arguments specific to the task and references to the data source is passed as a JSON file. In order for your engine to accept and execute on the task sent from Veritone, your code must support the fields specified in the payload. The task payload is accessed through the PAYLOAD_FILE environment variable.

_Best Practice Tip_: For local development, it&rsquo;s recommended to support accepting the payload file location through a command line variable.

**Task Payload Attributes**

| Field              | Type   | Description                                                                                                                                                                                  |
| ------------------ | ------ | -------------------------------------------------------------- |
| applicationId      | string | The application ID associated with the task.                                                                                                                                                 |
| jobId              | string | The unique ID of the job associated with the task.                                                                                                                                           |
| taskId             | string | The unique ID associated with the task.                                                                                                                                                      |
| token              | string | A single-use token provided to the engine to access the recording container. All engine requests to the Veritone API must use this token.  |
| source             | object | Provides more information about the source of the data, including credentials if needed.  |
| metadata           | object | Provides labels for the data that can be displayed to end users and/or used to query for the content.  |
| job           | object | Contains the task array. See below for the contents of the object.                       |
| veritoneApiBaseUrl | string | The base URL for making API requests in Veritone. Use the base URL to construct the GraphQL endpoint for your requests. (e.g., graphqlEndpoint = payload.veritoneApiBaseUrl + "/v3/graphql") |

*Note:* We reserve the right to add additional properties to the payload. Any additional properties in the payload are considered undocumented and unreliable.

**Example Task Payload**
```
{
    "applicationId": string,
    "jobId": string,
    "taskId": string,
    "token": string,
    "mode": "scan"|ingest",
    "fileId": string, ("ingest" mode only)
    "source": {
        "ingestionId": string,
        "ingestionType": string,
        "name": string,
        "lastProcessedDateTime": string, (if supported, key name may vary)
        "config": {
            "foo": any,
            "bar": any,
            ...
        }
    },
    "job": {
        "tasks": array
    }
}
```

**2. Set Task Status to Running**

Once you have the Task Payload, call the _Update Task_ mutation and provide the Task ID and Job ID to set the task status to _running_.

**Request Payload: Set Task Status to Running**

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

**GraphiQL Sample Request: Set Task Status to Running**

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

**cURL Sample Request: Set Task Status to Running**

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer <YOUR TOKEN>' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { updateTask( input: { id: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180\", jobId: \"5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49\", status: \"running\" } ) { id,  status } }" }'
```

**Sample Response: Set Task Status to Running**

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

**3. Process the Task and Store the Data**

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

**4. Write Task Status Message or Report Errors**

When a task is completed, a status message should be written that set to "complete" or "failed" if any errors occurred and the task could not be completed. These can all be accomplished by using the updateTask mutator.

The _output_ field of the task should also be updated to include some information about task results. If an error occurred, the task output should include the error message. For example:

```
{
    "error": "server returned 404"
}
```


## Constructing a Stream Pull Adapter

The basic steps for a real-time stream pull adapter:

1. Receive the task payload
1. Ingest the data per the configuration specified in the task payload
1. Begin writing messages to the `streamOutKafkaTopic` specified in the taskPayload
    1. First message written to the topic is a `stream_init` message
    1. Then write a sequence of `raw_stream` messsages containing up to 10 KB of data each
    1. When all of the data has been ingested, write a `stream_eof` message
1. Throughout this process, write an `engine_heartbeat` message every 5-10 seconds to let us know that your adapter is functioning correctly.

### Example Adapter Payloads

For a video file:
```
{
  "jobId": "8cf4c75f-5f5e-45cf-9331-3877a6782955",
  "taskId": "8cf4c75f-5f5e-45cf-9331-3877a6782955-2cd7faf5-4f60-4da3-be02-d2d391c6d176",
  "recordingId": "400002379",
  "streamOutKafkaTopic": "stream_00000015",
  "taskPayload": {
    "url": "https://inspirent.s3.amazonaws.com/assets/62505002/4f4f520b-9d0d-4754-9c5d-608411082435.mp4"
  }
}
```

For a live stream:
```
{
  "jobId": "89259689-966d-4e03-91b7-fb1509050a7e",
  "taskId": "89259689-966d-4e03-91b7-fb1509050a7e-2357fa3b-da3b-481f-afbc-8cde95ac193a",
  "recordingId": "400002379",
  "streamOutKafkaTopic": "stream_00000012",
  "taskPayload": {
    "url": "http://18763.live.streamtheworld.com/WWWQFMAAC",
    "isLiveStream": true,
    "recordDuration": "1m"
  }
}
```

To ingest a stream and produce chunks:
```
{
	"jobId": "89259689-966d-4e03-91b7-fb1509050a7e",
	"taskId": "89259689-966d-4e03-91b7-fb1509050a7e-2357fa3b-da3b-481f-afbc-8cde95ac193a",
	"recordingId": "400002379",
	"streamOutKafkaTopic": "stream_00000012",
	"taskPayload": {
		"url": "http://18763.live.streamtheworld.com/WWWQFMAAC",
		"isLiveStream": true,
		"recordDuration": "1m",
		"generateMediaAssets": true,
		"outputChunkDuration": "10s"
	}
}
```

Note that if user credentials are required to access the data source, they may be included in the taskPayload or passed in as a `sourceId`, which can be retrieved by querying on the `source` object using the GraphQL API.

### Message Formats

The message formats that adapters may encounter are documented below.

**stream_init:** Context information about a stream, sent as the first message on a stream topic.

Key: `stream_init`

Value: JSON
```
{
    "type": "stream_init",
    "timestampUTC": int64,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "relativeStartOffsetMS": int64,
    "durationMS": int64,
    "chunkSize": int64,
    "mimeType": string,
    "ffmpegFormat": string
}
```

| field | definition |
| ----- | ---------- |
| type	| message type ("stream_init") |
| timestampUTC	| UTC timestamp (milliseconds since epoch) when message was created |
| taskId	| taskId of the producer instance (adapter or filter) |
| jobId	| ID of job being processed |
| tdoId	| ID of the TDO the engine results/assets should be written to |
| relativeStartOffsetMS	| time offset, in milliseconds, from the start of the TDO that incoming stream maps to. Outgoing engine results should be offset by this number. |
| durationMS	| estimated duration, in milliseconds, of the incoming stream (if available) |
| chunkSize	| size in bytes of each raw_stream message payload. Ex: 10240 |
| mimeType	| MIME type of the stream contents. Can be a container format like "video/x+matroska" or a raw audio/video stream type, such as "video/h264" |
| ffmpegFormat	| The FFMPEG format name of the stream contents. Ex: "webm", "pcm_s16le", "h264" |

**raw_stream:** A chunk of raw bytes from a stream.

Key: `raw_stream`

Value: Raw bytes (up to 10KB)

**engine_heartbeat:** Heartbeat message.

Key: {engineInstanceId}

Value: JSON

```
{
    "type": "engine_heartbeat",
    "timestampUTC": int64,
    "engineId": string,
    "engineInstanceId": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "count": int64,
    "status": string,
    "upTime": int64,
    "bytesRead": int64,
    "bytesWritten": int64,
    "messagesWritten": int64,
    "errorMsg": string
}
```

| field | definition |
| ----- | ---------- |
| type	| message type (constant string "engine_heartbeat") |
| timestampUTC	| UTC timestamp (milliseconds since epoch) when message created |
| engineId	| engineId of producer of heartbeat |
| engineInstanceId	| instanceId to distinguish multiple instances of same engine (can be AMI + containerId) |
| taskId	| taskId engine is working on |
| tdoId	| tdoId engine is working on |
| count	| the heartbeat count, starting at 1 and incrementing on each heartbeat |
| status | Signal for whether an engine terminates unexpectedly or expectedly.  It helps with cleaning up after engine terminates and also to gather better metrics on system health. </br>Possible values: </br>"RUNNING" - engine is running and will send further heartbeats </br>"DONE" - engine will terminate successfully and this is last heartbeat message </br> "FAILED" - engine will terminate due to failure and this is last heartbeat message |
| upTime	| continuous time (in milliseconds) engine instance has been running. |
| bytesRead	| cummulative number of bytes read (for engines that read streams) |
| bytesWritten	| cummulative number of bytes written (for engines that write streams) |
| messagesWritten	| cummulative number of messages published (for engines that write chunks) |
| errorMsg	| an optional error message if the heartbeat indicates a failure status |


**stream_eof:** Indicates when the stream has reached its end.

Key: stream_eof

Value: JSON

```
{
    "type": "stream_eof",
    "timestampUTC": int64,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "forcedEOF": boolean
}
```

| field | definition |
| ----- | ---------- |
| type | message type (constant string "stream_eof") |
| timestampUTC | UTC timestamp (milliseconds since epoch) when message created |
| taskId | taskId of the producer instance |
| tdoId | ID of the TDO the engine results/assets should be written to |
| jobId | ID of the job being processed on stream |
| forcedEOF | Set to true if the EOF was forced due to terminatation of a stream task. Coordinator should disregard messages with this flag set.|

