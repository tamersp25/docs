# Real-time Adapters

There are two types of adapters that can operate on the real-time pipeline: pull, which is the most common type of adapter where the adapter does the work of pulling the raw data from the source where the data is located, and push, where the source pushes data to a service on the Veritone platform, which then ingests the data onto the platform. We'll focus on pull adapters here, but if you're interested in push scenarios, check out our HTTP Push adapter in CMS or contact us for more information.

When creating a real-time adapter, be sure to set the engineMode to 'stream' in the manifest.

## Constructing a Real-time Pull Adapter

The basic steps for constructing a real-time pull adapter:

1. Receive the task payload
1. Ingest the data per the configuration specified in the task payload
1. Begin writing messages to the `streamOutKafkaTopic` specified in the taskPayload
    1. First message written to the topic is a `stream_init` message
    1. Then write a sequence of `raw_stream` messsages containing up to 10 KB of data each
    1. When all of the data has been ingested, write a `stream_eof` message
1. Throughout this process, write an `engine_hearbeat` message every 5 seconds or 20 messages to let us know that your adapter is functioning correctly.

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

## Message Formats

The message formats that adapters may encounter are documented below.

### stream_init ###
Context information about a stream, sent as the first message on a stream topic.

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

### raw_stream ###
A chunk of raw bytes from a stream.

Key: `raw_stream`

Value: Raw bytes (up to 10KB)

### engine_heatbeat ###
Heartbeat message.

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


### stream_eof ###
Indicates when the stream has reached its end.

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
