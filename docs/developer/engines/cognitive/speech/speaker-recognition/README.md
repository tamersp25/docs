# Building a Speaker Recognition Engine

[badge/API/Yes/green]
[badge/Search/Partial/yellow]
[badge/UI/No/red]

Speaker recognition (aka *speaker identification*) engines identify when speakers change and who those speakers are in a piece of audio.
They expand upon the capabilities of [speaker detection](/developer/engines/cognitive/speaker-detection/) engines by identifying the individual whose voice was detected in addition to specifying where in time the person started and stopped talking.

## Engine Manifest

<!-- TODO
All speaker recognition engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |
-->

<!--TODO:  Here is a minimal example `manifest.json` that could apply to a speaker recognition engine: -->

<!--TODO: Define [](manifest.example.json ':include :type=code json')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

<!-- ## Engine Input -->

<!-- TODO -->

### Training and Libraries

Since speaker recognition engines identify entities, they are required to be [trainable via libraries](/developer/libraries/engines).

## Engine Input

Audio-processing engines can be [stream processing](/developer/engines/processing-modes/stream-processing/) engines, or (if processing will be stateless) they can be [segment processing](/developer/engines/processing-modes/segment-processing/).

[](../../_snippets/audio-engine-mime-type.md ':include')

## Engine Output

Within the time-based `series` array (see [vtn-standard](/developer/engines/standards/engine-output/)) in the engine's output, each speaker recognition record (that is, each `series` entry) should contain an `object` of type `speaker`.
Because each speaker maps back to an entity in a library, each `object` should include the `entityId` of that original entity, along with the `libraryId` where it can be found.

### Example

Here is an example of the simplest type of speaker recognition output:

[](vtn-standard.example.json ':include :type=code json')

### Legacy Format

!> There is a legacy format that is still supported but has been deprecated.

[](vtn-standard-legacy.example.json ':include :type=code json')
