# Segment Engine Processing

TODO: Replace all references to "chunk" engines with "segment" engines

Message engines process data in small discrete quantities, which are produced by segmenting the input data into messages.
They operate out of a stateless queue, where they can process each small bit of content without having any knowledge of the content that came before or after the piece of content that they are processing.

TODO: Note on how segment is often called "chunk" in the API

?> The **[Engine Toolkit SDK (BETA)](engines/toolkit/)**
is an alternative interface for building message engines.
If you'd like a simpler interface and are comfortable using beta software in production, 
you might consider using it instead of the specifications below.

## Use Cases

Message engines are currently the most commonly used engine mode due to the simplicity of how they process data.
For media files, message engines are often given a particular piece of a larger media file (i.e. a single frame of a video)
and output results only for that single piece of data.
Because they do not store state, message engines can scale horizontally.

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

The basic lifecycle for a message engine is as follows:

1. The Docker container for your engine will be started up with the environment variables set.
1. The engine consumes `media_chunk` messages from its `KAFKA_INPUT_TOPIC`.
1. For each `media_chunk` message, the engine does its processing.
1. When processing of each `media_chunk` is done, the engine compiles an `engine_output` message conforming to the vtn-standard format. <!-- TODO: Link to vtn-standard format -->
1. The engine produces the `engine_output` message to `KAFKA_CHUNK_TOPIC`, along with a `ChunkProcessedStatus` message.
1. If there is no work for the engine within the timeframe set in `END_IF_IDLE_SECS`, the engine shuts itself down.

## Environment Variables

| Key Name | Description | Example |
| -------- | ----------- | ------- |
| KAFKA_BROKERS | Comma-separated list of Kafka Broker addresses | "kafka1:9092,kafka2:9092" |
| KAFKA_CHUNK_TOPIC | The Chunk Queue Kafka topic | "chunk_all" |
| VERITONE_API_BASE_URL | Base URL for Veritone APIs | "https://api.veritone.com" |
| ENGINE_ID | The engine ID | "5e323ad7-2c5b-48f6-b53a-0b1ca42ceab3"
| ENGINE_INSTANCE_ID | The engine instance ID | "5e323ad7-2c5b-48f6-b53a-0b1ca42ceab3_324" |
| KAFKA_INPUT_TOPIC | The Kafka topic the engine should consume chunks from | "chunk_in_084f457c-4363-4aca-a455-66c07a9670d9" |
| KAFKA_CONSUMER_GROUP | The consumer group the engine must use (shared with all other chunk engines consuming that topic) | "cg_chunk_in_084f457c-4363-4aca-a455-66c07a9670d9" |
| END_IF_IDLE_SECS | Number of seconds to wait for a job (idle) before killing self.  Default will be 3600 (1 hour). If not present then engine can sit idle indefinitely. | 3600 |

## Messages

Message engines deal with three different Kafka messages:

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

TODO: Verify sample engines
