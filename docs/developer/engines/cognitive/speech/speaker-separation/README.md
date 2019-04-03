# Building a Speaker Separation Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

A speaker separation (aka *diarization*) engine partitions an audio stream into segments, based on who is speaking when.

## Engine Manifest

<!-- TODO
All speaker separation engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |
-->

<!--TODO:  Here is a minimal example `manifest.json` that could apply to a speaker separation engine: -->

<!--TODO: Define [](manifest.example.json ':include :type=code json')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

<!-- ## Engine Input -->

<!-- TODO -->

## Engine Input

Audio-processing engines can be [stream processing](/developer/engines/processing-modes/stream-processing/) engines, or (if processing will be stateless) they can be [segment processing](/developer/engines/processing-modes/segment-processing/).

?> All engines that process audio will receive audio data with MIME type `"audio/mp4"` (.wav and .mp3 are _not_ natively supported).
If your engine needs a format other than `mp4`, you will need to transcode incoming `mp4` data to the appropriate target format using something like [ffmpeg](https://ffmpeg.org/).

## Engine Output

Within the time-based `series` array (see [vtn-standard](/developer/engines/standards/engine-output/)) in the engine's output, each speaker separation record (that is, each `series` entry) should contain an `object` of type `speaker`.
Because each speaker maps back to an entity in a library, each `object` should include the `entityId` of that original entity, along with the `libraryId` where it can be found.

### Example

Here is an example of the simplest type of speaker separation output:

[](vtn-standard.example.json ':include :type=code json')

### Legacy Format

!> There is a legacy format that is still supported but has been deprecated.

[](vtn-standard-legacy.example.json ':include :type=code json')
