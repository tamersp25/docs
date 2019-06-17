# Stream Engine Processing

Stream Engines process data in streams, where the stream is broken up into stream bytes.
They operate out of a stateful queue, where the order of the data does matter.

> The "stream" engine mode is identified as `EngineMode=Stream` in the GraphQL API

## Use Cases

Stream engines are used when the engine wants to work directly on the raw stream of data or needs to store state.
Because they store state, stream engines can use results for earlier cognition to inform later cognition
(e.g. determining whether to output "red" or "read" in a transcript based on the words that came before).
Because message order is important for context, input message order is guaranteed.
Because they work off the raw stream, they need to take care of decoding the raw input stream themselves.

They are often used in situations like:

- Transcription
- Object tracking through a scene
- Gesture recognition

## Basic Steps

The lifecycle for a stream engine is as follows:

1. The Docker container for your engine will be started up with the environment variables set.
1. The engine consumes `raw_stream` messages from its `KAFKA_INPUT_TOPIC`.
1. For each `raw_stream` message, the engine does its processing.
1. When processing of each `raw_stream` is done, the engine produces an `engine_output` message conforming to the [vtn-standard format](/developer/engines/standards/engine-output/).
1. The engine produces the `engine_output` message to `KAFKA_CHUNK_TOPIC`.
1. When the entire stream is processed (the engine should receive a `stream_eof` message), produce a `stream_eof` message.
1. Throughout this process, produce an `engine_heartbeat` message every 5-10 seconds to let us know that your engine is working correctly.

## Environment Variables

| Key Name | Description | Example |
| -------- | ----------- | ------- |
| CHUNK_CACHE_AWS_REGION|Stream/Batch|AWS region for Chunk Cache S3 bucket. Ex: "us-east-1" |
| CHUNK_CACHE_BUCKET|Stream/Batch|Chunk Cache S3 bucket name. Ex: "chunk-cache" |
| ENGINE_ID|All|The engine ID |
| ENGINE_INSTANCE_ID|All|Unique instance ID for the engine instance |
| KAFKA_BROKERS | Comma-separated list of Kafka Broker addresses | "kafka1:9092,kafka2:9092" |
| KAFKA_CHUNK_TOPIC | The Chunk Queue Kafka topic | "chunk_all" |
| KAFKA_HEARTBEAT_TOPIC|Stream/Batch|The Kafka topic the engine should publish heartbeat messages to. Ex: engine_status |
| KAFKA_INGESTION_TOPIC|Stream/Batch|The Kafka topic adapters publish ingestion request messages to to. Ex: ingestion_queue |
| PAYLOAD_JSON|Stream/Batch|JSON encoded task payload. Ex: "{\"lang\": \"en\", \"token\":\"....\"}" |
| STREAM_INPUT_TOPIC|Stream|Kafka topic for input stream |
| STREAM_OUTPUT_TOPIC|Stream|Kafka topic for output stream |
| VERITONE_API_BASE_URL | Base URL for Veritone APIs | "https://api.veritone.com" |

## Messages

Stream engines deal with four different Kafka messages:

- `raw_stream`
- `engine_output`
- `engine_heartbeat`
- `stream_eof`

### raw_stream

[](../_messages/raw_stream.md ':include')

### engine_output

[](../_messages/engine_output.md ':include')

### engine_heartbeat

[](../_messages/engine_heartbeat.md ':include')

### stream_eof

[](../_messages/stream_eof.md ':include')

## Sample Engines

Please contact us directly for sample stream engine code.
