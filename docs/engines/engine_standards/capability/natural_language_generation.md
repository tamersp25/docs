# Engine Standard for Natural Language Generation

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-text-standard.md ':include')

[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT
```javascript
var sample = {
    // Preamble

    ...

    'object': [{
    
      'text': 'The quick brown fox jumped over the brown fence'

      ...

      }]
    }], // END OBJECT

    // CUSTOM DATA FOR FILE
    // Add keys here that do not conflict with above
    'vendor': {

    },

    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          // Transcript; JSON utterance (all word edges between 2 time nodes)
          // Array of n objects describing each alternative word
          'words': [{
            'word': '!silence',
              
            // Optional
            // Range should be from: 0.0 - 1.00
            'confidence': 0.794,

            // Optional
            // TTML -> Path
            // If Lattice is provided
            'bestPath': true,
            // Number of consecutive time-slices the utterance spans.
            // example: of->thrones----->
            of - > their-- > own - >
            // utteranceLenght: thrones: 2; their,own: 1
            'utteranceLength': 1
          }]
          
          // CUSTOM DATA FOR TIME SLICE
          // Add keys here that do not conflict with above
          'vendor': {

          }
        };
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
