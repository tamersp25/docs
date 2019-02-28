# Speech Transcription

## Engine Output

Transcribed words can be reported in engine output by using the `words` array within the `series` array.

Here is an example of the simplest type of transcript output:

[](vtn-standard-simple.example.json ':include :type=code json')

TODO: Add description of the more complicated lattice and confidence additions

[](vtn-standard-lattice.example.json ':include :type=code json')

TODO: Figure out if that is a proper lattice example

The official engine output json-schema is available
[here](/schemas/vtn-standard/transcript.json ':ignore').
