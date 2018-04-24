# Real-time Cognitive Engines

At a high level, the workflow of a real-time cognitive engine on Veritone's real-time pipeline involves receiving the inputs from the Veritone platform, processing that input and then putting that output back onto the Veritone platform. The format of the input and output depends on the engineMode for the engine. Cognitive engines can run in three engineModes on Veritone's real-time pipeline:

* batch
* chunk
* stream

__[Batch engines](#constructing-an-engine-in-batch-mode)__ process data in discrete quantities serially. The contents of a particular batch are processed by the engine before moving on to the next batch. The input to a batch engine is a file, and the output is an asset file.

__[Chunk engines](#constructing-an-engine-in-chunk-mode)__ process data in small discrete quantities, which are produced by segmenting the input data into chunks. Chunk engines operate out of a stateless queue, where they can process each small bit of content without having any knowledge of the content that came before or after the bit of content that they are processing. The output of a chunk engine is an engine output fragment. Example: an engine that performs object or face detection on frames of a video stream.

__[Stream engines](#constructing-an-engine-in-stream-mode)__ process data in streams, where the stream is broken up into stream bytes. Stream engines operate out of a stateful queue, where the order of the data does matter. The output of a stream engine is an engine output fragment. Example: a transcription engine or a gesture identification engine.

More information about how to construct each type of engine is provided below.

## Constructing an Engine in Batch Mode

Batch Mode engines process and complete an entire task in one invocation.

1. The Docker container for your engine will be started up with the environment variables set.
1. The engine will receive a payload with information about where to retrieve the input data from the GraphQL API.
1. The engine will process the payload, update the task status, create any updated assets, and exit.

Contact us if you are interested in a building a batch engine.

## Constructing an Engine in Chunk Mode

The basic work steps for a 'chunk' engine:

1. The Docker container for your engine will be started up with the environment variables set.
1. The engine consumes `media_chunk` messages from its KAFKA_INPUT_TOPIC.
1. For each `media_chunk` message, the engine does its processing.
1. When processing of each `media_chunk` is done, the engine produces an `engine_output` message to KAFKA_CHUNK_TOPIC, along with a `ChunkProcessedStatus` message.
1. If there is no work for the engine within the timeframe set in END_IF_IDLE_SECS, the engine shuts itself down.

### Environment Variables for Engines in Chunk Mode

| Key Name | Description | Example |
| -------- | ----------- | ------- |
| KAFKA_BROKERS | Comma-separated list of Kafka Broker addresses | "kafka1:9092,kafka2:9092" |
| KAFKA_CHUNK_TOPIC | The Chunk Queue Kafka topic | "chunk_all" |
| VERITONE_API_BASE_URL | Base URL for Veritone APIs | "https://api.veritone.com" |
| ENGINE_ID | The engine ID | "5e323ad7-2c5b-48f6-b53a-0b1ca42ceab3"
| ENGINE_INSTANCE_ID | The engine instance ID | "5e323ad7-2c5b-48f6-b53a-0b1ca42ceab3_324" |
| KAFKA_INPUT_TOPIC | The Kafka topic the engine should consume chunks from | "chunk_in_084f457c-4363-4aca-a455-66c07a9670d9" |
| KAFKA_CONSUMER_GROUP | The consumer group the engine must use (shared with all other chunk engines consuming that topic | "cg_chunk_in_084f457c-4363-4aca-a455-66c07a9670d9" |
| END_IF_IDLE_SECS | Number of seconds to wait for a job (idle) before killing self.  Default will be 3600 (1 hour). If not present then engine can sit idle indefinitely. | 3600 |

### Message Formats
The message formats that real-time 'chunk' engines may encounter are documented below.

#### media_chunk
An image or audio/video/text fragment available for processing.

Key: `{taskId}`

Value: JSON

```
    "type": "media_chunk",
    "timestampUTC": int64,
    "mimeType": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "chunkIndex": int32,
    "startOffsetMs": int32,
    "endOffsetMs": int32,
    "width": int32,
    "height": int32,
    "cacheURI": string,
    "content": string,
    "taskPayload": JSON,
    "chunkUUID": string,
}
```
| field | definition | required |
| ----- | ---------- | -------- |
| type	| message type (constant string "media_chunk") | yes |
| timestampUTC| UTC timestamp (milliseconds since epoch) when message created | no |
| mimeType |MIME type of content (ex: "image/jpeg", "audio/wav", "video/mp4", "application/json", "application/octet-stream", "text/plain", "text/html") | yes |
| taskId | taskId of the producer instance | yes |
| tdoId	| ID of the TDO the media_chunk is from | yes |
| jobId	| ID of job being processed | yes |
| chunkIndex | index of this chunk in the entire TDO | no |
| startOffsetMs	| offset of start of media chunk from beginning of TDO. For frames, this will be calculated using (index * 1000) / fps | no |
| endOffsetMs	| offset of end of media chunk from beginning of TDO. For frames, this will be calculated using ((index+1) * 1000) / fps | no |
| width	| width of the media in pixels (only applicable to images and video) | no |
| height	| height of the media in pixels (only applicable to images and video) | no |
| cacheURI | location of the media_chunk in cache (either cacheURI or content is populated but not both) | no |
| content	| data value of media_chunk. Note: only text chunks would fit and goes here; audio/video would be cached and cacheURI populated. | no |
| taskPayload	| task payload for engine | no |
| chunkUUID	| UUID for this chunk, used to report status for the chunk  | no |

#### engine_output
An engine_output fragment available for processing or to be written as output.

Key: {taskId}

Value: JSON

```
{
    "type": "engine_output",
    "timestampUTC": int64,
    "outputType": string,
    "mimeType": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "startOffsetMs": int32,
    "endOffsetMs": int32,
    "content": JSON,
    "rev": int32,
    "taskPayload": JSON,
    "chunkUUID": string,
}
```
| field | definition |
| ----- | ---------- |
| type	| message type (constant string "engine_output") |
| timestampUTC	| UTC timestamp (milliseconds since epoch) when message created |
| outputType  | type of engine output data (ex: "transcript", "object-series", etc) |
| mimeType	| the mime type of engine output data (ex: "application/json", "application/ttml", "application/xml", "object-series", etc) |
| taskId	| taskId of the producer instance |
| tdoId	| ID of the TDO the frame is from |
| jobId	| ID of job being processed |
| startOffsetMs	| offset of start of the engine output from beginning of TDO |
| endOffsetMs	| offset of end of the engine output from beginning of TDO |
| content	| data value (content) of the engine output from engine standard. |
| rev	| A revision number that is incremented each time the engine output is updated |
| taskPayload	| task payload for next engine |
| chunkUUID	| UUID for this chunk, used to report status for the chunk |

#### ChunkProcessedStatus
Status of the chunk processed, to be sent after processing the chunk.

Key: `chunkprocessedstatus`

Value: JSON

```
ChunkProcessedStatus: {
    "chunkUUID": uuid
    "timestampUTC": int64
    "status": Success|Error
    "errorMsg": string (optional in case of error)
    "infoMsg": string (optional)
}
```

| field | definition |
| ----- | ---------- |
| chunkUUID | The UUID from the chunk_message of the chunk just processed |
| timestampUTC | UTC timestamp (milliseconds since epoch) of when the message was created |
| status | The status of the chunk. Possible values are </br> * Success: the chunk was processed successfully. </br> * Error: the chunk was not completed. |
| errorMsg | If error, the error message. |
| infoMsg | Add any additional information about the status. |

## Constructing an Engine in Stream Mode

The basic work steps for a 'stream' engine:

1. The Docker container for your engine will be started up with the environment variables set.
1. The engine consumes `raw_stream` messages from its KAFKA_INPUT_TOPIC.
1. For each `raw_stream` message, the engine does its processing.
1. When processing of each `raw_stream` is done, the engine produces an `engine_output` message to KAFKA_CHUNK_TOPIC.
1. When the entire stream is processed (the engine should receive a `stream_eof` message), produce a `stream_eof` message.
1. Throughout this process, produce an `engine_heartbeat` message every 5-10 seconds to let us know that your engine is working correctly.

### Environment Variables for Engines in Stream Mode

| Key Name | Description | Example |
| -------- | ----------- | ------- |
| KAFKA_BROKERS | Comma-separated list of Kafka Broker addresses | "kafka1:9092,kafka2:9092" |
| KAFKA_CHUNK_TOPIC | The Chunk Queue Kafka topic | "chunk_all" |
| VERITONE_API_BASE_URL | Base URL for Veritone APIs | "https://api.veritone.com" |
| ENGINE_ID | The engine ID | "5e323ad7-2c5b-48f6-b53a-0b1ca42ceab3"
| ENGINE_INSTANCE_ID | The engine instance ID | "5e323ad7-2c5b-48f6-b53a-0b1ca42ceab3_1" |
| PAYLOAD_JSON | JSON encoded task payload | "{\"lang\": \"en\", \"token\":\"....\"}" |
| CHUNK_CACHE_BUCKET | Chunk Cache bucket name. Present for pipelines running on AWS only | "chunk-cache" |
| CHUNK_CACHE_AWS_REGION | AWS region for Chunk Cache bucket | "us-east-1"|


### Message Formats

The message formats that real-time 'stream' engines may encounter are documented below.

#### raw_stream ###
A chunk of raw bytes from a stream.

Key: `raw_stream`

Value: Raw bytes (up to 10KB)

#### engine_output
An engine_output fragment available for processing or to be written as output.

Key: {taskId}

Value: JSON

```
{
    "type": "engine_output",
    "timestampUTC": int64,
    "outputType": string,
    "mimeType": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "startOffsetMs": int32,
    "endOffsetMs": int32,
    "content": JSON,
    "rev": int32,
    "taskPayload": JSON,
    "chunkUUID": string,
}
```
| field | definition |
| ----- | ---------- |
| type	| message type (constant string "engine_output") |
| timestampUTC	| UTC timestamp (milliseconds since epoch) when message created |
| outputType  | type of engine output data (ex: "transcript", "object-series", etc) |
| mimeType	| the mime type of engine output data (ex: "application/json", "application/ttml", "application/xml", "object-series", etc) |
| taskId	| taskId of the producer instance |
| tdoId	| ID of the TDO the frame is from |
| jobId	| ID of job being processed |
| startOffsetMs	| offset of start of the engine output from beginning of TDO |
| endOffsetMs	| offset of end of the engine output from beginning of TDO |
| content	| data value (content) of the engine output from engine standard. |
| rev	| A revision number that is incremented each time the engine output is updated |
| taskPayload	| task payload for next engine |
| chunkUUID	| UUID for this chunk, used to report status for the chunk |

#### engine_heartbeat ###
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


#### stream_eof ###
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
| forcedEOF | Set to true if the EOF was forced due to termination of a stream task.|

