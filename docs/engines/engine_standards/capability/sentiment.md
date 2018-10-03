# Engine Standard for Sentiment

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-text-standard.md ':include')


[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT
```javascript
var sample = {
    // Preamble

    // Sentiment -1.00 (Negative) - 1.00 (Postive)
    // For this time slice, provides a scale of how negative to positive it is
    // If a single number is returned, then positive must be used
    'sentiment': {
      'positiveValue': 0.12, // REQUIRED
      'positiveConfidence': 0.12, // OPTIONAL
      'negativeValue': 0.12, // OPTIONAL
      'negativeConfidence': 0.12 // OPTIONAL
    },
    
    // Emotions can be specified at file (overall tone), series (transcript/sentiment)
    // or series.object (face recognition)
    'emotions': [{
      'emotion': 'angry', // STRING: angry, happy, sad.  Can be any string field.
      'emotionValue': 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
      'emotionConfidence': 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
    }],

    // OPTIONAL:
    // Object (Face, Object, Logo, OCR, ..)
    // This is for detecting something
    'object': [{
    
      // Sentiment -1.00 (Negative) - 1.00 (Postive)
      // For this time slice, provides a scale of how negative to positive it is
      // If a single number is returned, then positive must be used
      'sentiment': {
        'positiveValue': 0.12, // REQUIRED
        'positiveConfidence': 0.12, // OPTIONAL
        'negativeValue': 0.12, // OPTIONAL
        'negativeConfidence': 0.12 // OPTIONAL
      },

      // Face detection, voice analysis, text analysis: Optional
      'emotions': [{
        'emotion': 'angry', // STRING: angry, happy, sad.  Can be any string field.
        'emotionValue': 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
        'emotionConfidence': 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
      }],

    }], // END OBJECT

    // Optional
    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          // OPTIONAL:
          // Sentiment -1.00 (Negative) - 1.00 (Postive)
          // For this time slice, provides a scale of how negative to positive it is
          // If a single number is returned, then positive must be used
          'sentiment': {
            'positiveValue': 0.12, // REQUIRED
            'positiveConfidence': 0.12, // OPTIONAL
            'negativeValue': 0.12, // OPTIONAL
            'negativeConfidence': 0.12, // OPTIONAL
          },

          'emotions': [{
            'emotion': 'angry', // STRING: angry, happy, sad.  Can be any string field.
            'emotionValue': 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
            'emotionConfidence': 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
          }]

    };
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
