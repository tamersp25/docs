# Segment Engine Processing

Segment engines process data in small discrete quantities, which are produced by segmenting the input data into messages.
They operate out of a stateless queue, where they can process each small bit of content without having any knowledge of the content that came before or after the piece of content that they are processing.

> In the GraphQL API, "segment" engine mode is identified as `EngineMode=Chunk`

?> The **[Engine Toolkit SDK (BETA)](/developer/engines/toolkit/)**
is an alternative interface for building message engines.
If you'd like a simpler interface and are comfortable using beta software in production,
you might consider using it instead of the specifications below.

## Use Cases

Segment engines are currently the most commonly used engine mode due to the simplicity of how they process data.
For media files, segment engines are often given a particular piece of a larger media file (i.e. a single frame of a video) and output results only for that single piece of data.
Because they do not store state, segment engines can scale horizontally.

They are often used in situations like:

- Face detection
- Object detection
- Optical character recognition
- Translation
- Text analytics
- Pose estimation
- License plate recognition
- Text to speech

## Basic Steps

The basic lifecycle for a segment engine is as follows:

1. The Docker container for your engine will be started up with the environment variables set.
1. The engine consumes `media_chunk` messages from its `KAFKA_INPUT_TOPIC`.
1. For each `media_chunk` message, the engine does its processing.
1. When processing of each `media_chunk` is done, the engine compiles an `engine_output` message conforming to the [vtn-standard format](/developer/engines/standards/engine-output/).
1. The engine produces the `engine_output` message to `KAFKA_CHUNK_TOPIC`, along with a `ChunkProcessedStatus` message.
1. If there is no work for the engine within the timeframe set in `END_IF_IDLE_SECS`, the engine shuts itself down.

## Environment Variables

| Key Name | Description | Example |
| -------- | ----------- | ------- |
| ENGINE_ID|All|The engine ID |
| ENGINE_INSTANCE_ID|All|Unique instance ID for the engine instance |
| KAFKA_BROKERS | Comma-separated list of Kafka Broker addresses | "kafka1:9092,kafka2:9092" |
| KAFKA_CHUNK_TOPIC | The Chunk Queue Kafka topic | "chunk_all" |
| KAFKA_CONSUMER_GROUP|Chunk|The consumer group the engine must use (shared with all other chunk engines consuming that topic)  |
| KAFKA_INPUT_TOPIC|Chunk|The Kafka topic the engine should consume chunks from. Ex: "chunk_in_084f457c-4363-4aca-a455-66c07a9670d9" |
| VERITONE_API_BASE_URL | Base URL for Veritone APIs | "https://api.veritone.com" |

## Messages

Segment engines deal with three different messages:

- `media_chunk`
- `engine_output`
- `ChunkProcessedStatus`

### media_chunk

[](../_messages/media_chunk.md ':include')

### engine_output

[](../_messages/engine_output.md ':include')

### ChunkProcessedStatus

[](../_messages/chunkprocessedstatus.md ':include')

## Sample Engines

- https://github.com/veritone/task-rt-test-engine/
