# Real-time Cognitive Engines

Cognitive engines can run in three modes on Veritone's real-time pipeline:

* batch
* chunk
* stream

Batch engines process data in large discrete quantities, like files or records, and as such, there can be considerable delay from the time that the data was generated and saved to when it's available for processing by a cognitive engine. Engines that don't operate in real-time are typically batch engines.

Chunk engines process data in small discrete quantities, like image frames. Chunk engines operate out of a stateless queue, where they can process each small bit of content without having any knowledge of the content that came before or after the content that they processed. Example: an engine that performs object or face detection.

Stream engines process data in streams. Stream engines operate out of a stateful queue, where the order of the data does matter. Example: a transcription engine.

## Constructing a Real-time Cognitive Engine in Batch Mode

The basic steps for a real-time cognitive engine:

1. Receive the task payload
1. Retrieve the input per the configuration specified in the task payload
1. Begin writing messages to the streamOutKafkaTopic specified in the taskPayload

Throughout this process, write an engine_hearbeat message every 5 seconds or 20 messages to let us know that your adapter is functioning correctly.

## Constructing a Real-time Cognitive Engine in Chunk Mode


## Constructing a Real-time Cognitive Engine in Stream Mode
