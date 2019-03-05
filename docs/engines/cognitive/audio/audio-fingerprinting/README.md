# Building an Audio Fingerprinting Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Partial/yellow)

Audio fingerprinting engines identify pre-recorded audio snippets in audio files based on a particular signature or "fingerprint."

In aiWARE, audio fingerprinting engines are always trained based on one or more libraries containing entities with audio fingerprint identifiers.
The engines report time spans where one of these audio snippets has been matched.

## Use Cases

TODO: Document use cases

## Engine Profile Creation Checklist

TODO: What goes here?  A full tutorial for creating the engine?  If so, let's :include a lot of that content

- [ ] Item 1
- [ ] Item 2

TODO: Note that library required should be checked (cuz all audio fingerprint engines are trainable)

## Engine Build Checklist

TODO: What goes here?  A full tutorial for creating the build?  If so, let's :include a lot of that content

- [ ] Item 1
- [ ] Item 2

TODO: Note that audio fingerprinting engines are typically network isolated due to requiring libraries and engine models.

### Recommended Manifest Fields

Manifest fields of unique importance for audio fingerprinting engines include:

- `preferredInputFormat`: The MIME type of files that work best with your engine
- `supportedInputFormats`: All MIME types that your engine can take as input
- `engineMode`: Most audio engines choose to run in `stream` mode so that they can process data in real-time
- `clusterSize`: `small` is usually a sufficient cluster size for audio fingerprinting engines

Here is a minimal example `manifest.json` that could apply to an audio fingerprinting engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/engines/standards/engine-manifest/) for more details.

### Training and Libraries

Since all audio fingerprinting engines identify entities, they are all required to be [trainable via libraries](/libraries/engines).

## Engine Input

TODO: Point to the [stream processing](/engines/processing-modes/stream-processing/) docs to explain how to actually process the data and create output?

## Engine Output

Audio fingerprinting engine output should be stored as `object`s in the time-based `series` array in [vtn-standard](/engines/standards/engine-output/).
Each detected section of audio is represented as an object of type `fingerprint`.
Because audio fingerprints always map back to an entity in a library, they should always include the `entityId` of the fingerprint in their output.

### Example

Here is an example of proper engine output:

[](vtn-standard.example.json ':include :type=code json')

> The official engine output json-schema validation contract is available
[here](/schemas/vtn-standard/audio-fingerprint.json ':ignore').

TODO: Include info on logging, etc.?  This would be global to all.
