# Speaker Separation

## Engine Output

[](vtn-standard.example.json ':include :type=code json')

TODO: Separate out label-based detections vs. entity-based recognitions?

### Merging with Transcription Output

Speaker separation information is often coupled with [transcription](/engines/cognitive/transcription/) information.
A combined speaker-separated transcript would look like the following:

TODO: Show how it would be merged with transcription (validationContracts = ["transcript", "speaker"])

### Legacy Format

!> There is a legacy format that is still supported but has been deprecated.

[](vtn-standard-legacy.example.json ':include :type=code json')

### Schema

The official engine output json-schema is available
[here](/schemas/vtn-standard/speaker.json ':ignore').
