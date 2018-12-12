# Engine Modes

At a high level, aiWARE engines, receive input data, process that data, and put processing results back onto the platform.
The format of the input and output depends on the engine's mode (defined in the [manifest file]<!-- TODO: Link to manifest -->).
Engines can run in two modes on Veritone's real-time pipeline:

- `chunk`
- `stream`

## Chunk Engines

[](_chunk-processing-overview.md ':include')

For construction guidelines, see [Chunk Engine Processing](/engines/processing-modes/chunk-processing/).

> Examples: an engine that performs object or face detection on frames of a video stream

## Stream Engines

[](_stream-processing-overview.md ':include')

For construction guidelines, see [Stream Engine Processing](/engines/processing-modes/stream-processing/).

> Examples: a transcription engine or a gesture identification engine

## Batch Engines

!> Batch engines are deprecated.  Please use the message or stream engine modes instead.

Previously, aiWARE supported engines that processed and completed an entire file and task in one invocation and communicated directly with the GraphQL API.
This engine mode has since been deprecated

Please contact us directly for support with legacy batch engines.
