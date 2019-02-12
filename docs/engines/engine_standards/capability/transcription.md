# Engine Standard for Transcription

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-speech-standard.md ':include')

[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT
```javascript
var sample = {
    /*
    * PREAMBLE
    * The preamble contains various high-level information for this vtn-standard document.
    */

    // Language Identification: BCP-47 https://tools.ietf.org/rfc/bcp/bcp47.txt
    'language': 'en-US',
    'summary': "", // OPTIONAL. String.  Summary of doc

    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
        // REQUIRED
        // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
        'startTimeMs': 1260,
        'stopTimeMs': 1360,

        // Language BCP-47
        'language': "en-US",

        // JSON utterance (all word edges between 2 time nodes)
        // Array of n objects describing each alternative word
        "words": [{
            // The word spoken (required)
            "word": "!silence",

            // The confidence level of the detected word spoken (optional)
            // Range should be from: 0.0 - 1.00
            "confidence": 0.794,

            // Is this word included in the best path through a transcript lattice? (optional)
            "bestPath": true,

            // Number of consecutive time-slices the utterance spans (optional)
            // example: of->thrones----->
            //          of->their-->own->
            // utteranceLength: thrones: 2; their,own: 1
            "utteranceLength": 1
        }]

    }];
}
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
