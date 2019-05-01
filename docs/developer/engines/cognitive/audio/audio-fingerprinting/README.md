# Building an Audio Fingerprinting Engine

[badge/API/Yes/green]
[badge/Search/No/red]
[badge/UI/Partial/yellow]

Audio fingerprinting engines identify pre-recorded audio snippets in audio files based on a particular signature or "fingerprint."

In aiWARE, audio fingerprinting engines are always trained based on one or more libraries containing entities with audio fingerprint identifiers.
The engines report time spans where one of these audio snippets has been matched.

<!--TODO: Add these sections back in when we have good content for them
## Use Cases

Document use cases

## Engine Profile Creation Checklist

What goes here?  A full tutorial for creating the engine?  If so, let's :include a lot of that content

- [ ] Item 1
- [ ] Item 2

Note that library required should be checked (cuz all audio fingerprint engines are trainable)

## Engine Build Checklist

What goes here?  A full tutorial for creating the build?  If so, let's :include a lot of that content

- [ ] Item 1
- [ ] Item 2

Note that audio fingerprinting engines are typically network isolated due to requiring libraries and engine models.
-->

## Engine Manifest

Manifest fields of unique importance for audio fingerprinting engines include:

- `preferredInputFormat`: The MIME type of files that work best with your engine
- `supportedInputFormats`: All MIME types that your engine can take as input
- `engineMode`: Most audio engines choose to run in `stream` mode so that they can process data in real-time
- `clusterSize`: `small` is usually a sufficient cluster size for audio fingerprinting engines

Here is a minimal example `manifest.json` that could apply to an audio fingerprinting engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

### Training and Libraries

Since all audio fingerprinting engines identify entities, they are all required to be [trainable via libraries](/developer/libraries/engines).

## Engine Input

Audio-fingerprinting engines are usually [stream processing](/developer/engines/processing-modes/stream-processing/) engines.

?> All engines that process audio will receive audio data with MIME type `"audio/mp4"` (.wav and .mp3 are _not_ natively supported).
If your engine needs a format other than `mp4`, you will need to transcode incoming `mp4` data to the appropriate target format using something like [ffmpeg](https://ffmpeg.org/).

## Engine Output

Audio fingerprinting engine output should be stored as `object`s in the time-based `series` array in [vtn-standard](/developer/engines/standards/engine-output/).
Each detected section of audio is represented as an object of type `fingerprint`.
Because audio fingerprints always map back to an entity in a library, they should always include the `entityId` of the fingerprint in their output.

### Example

Here is an example of proper engine output:

[](vtn-standard.example.json ':include :type=code json')

> The official engine output json-schema validation contract is available
[here](/schemas/vtn-standard/audio-fingerprint.json ':ignore').

<!--TODO: Include info on logging, etc.?  This would be global to all.-->
