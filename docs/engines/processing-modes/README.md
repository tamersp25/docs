# Engine Processing Modes

TODO: Incorporate edge-messages from https://github.com/veritone/edge-messages

At a high level aiWARE engines, receive input data, process that data, and put processing results back onto the platform.
The format of the input and output depends on the engine's processing mode (defined in the [manifest file](engines/standards/engine-manifest)).
Engines can run in two modes on aiWARE's processing pipeline: `segment` and `stream`.

## Segment Engines {docsify-ignore}

Message engines process data in small discrete quantities, which are produced by segmenting the input data into messages.
They operate out of a stateless queue, where they can process each small bit of content without having any knowledge of the content that came before or after the piece of content that they are processing.

For construction guidelines, see [Segment Engine Processing](engines/processing-modes/segment-processing/).

> Examples: an engine that performs object or face detection on frames of a video stream

## Stream Engines {docsify-ignore}

Stream Engines process data in streams, where the stream is broken up into stream bytes.
They operate out of a stateful queue, where the order of the data does matter.

For construction guidelines, see [Stream Engine Processing](engines/processing-modes/stream-processing/).

> Examples: a transcription engine or a gesture identification engine

## Batch Engines

!> Batch engines are deprecated.  Please use the message or stream engine modes instead.

Previously, aiWARE supported engines that processed and completed an entire file and task in one invocation and communicated directly with the GraphQL API.
This engine mode has since been deprecated.

Please [contact us](mailto:ecosystem@veritone.com) directly for support with legacy batch engines.
