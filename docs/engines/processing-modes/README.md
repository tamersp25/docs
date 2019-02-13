# Engine Processing Modes

TODO: Things are going weird with includes in this section

TODO: Incorporate all comments from PR https://github.com/veritone/docs/pull/30

At a high level aiWARE engines, receive input data, process that data, and put processing results back onto the platform.
The format of the input and output depends on the engine's processing mode (defined in the [manifest file](engines/standards/engine-manifest)).
Engines can run in two modes on aiWARE's processing pipeline: `segment` and `stream`.

## Segment Engines

[](segment-processing/_overview.md ':include')

For construction guidelines, see [Segment Engine Processing](engines/processing-modes/segment-processing/).

> Examples: an engine that performs object or face detection on frames of a video stream

## Stream Engines

[](stream-processing/_overview.md ':include')

For construction guidelines, see [Stream Engine Processing](engines/processing-modes/stream-processing/).

> Examples: a transcription engine or a gesture identification engine

## Batch Engines

!> Batch engines are deprecated.  Please use the message or stream engine modes instead.

Previously, aiWARE supported engines that processed and completed an entire file and task in one invocation and communicated directly with the GraphQL API.
This engine mode has since been deprecated

Please [contact us](mailto:ecosystem@veritone.com) directly for support with legacy batch engines.
