# Engine Standard for Text Moderation

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-text-standard.md ':include')


[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT

```javascript
var sample = {
    // Preamble

    // Tags associated with this output. Format { 'key': 'name', 'value': 'value' }
    // FOR GROUND TRUTH:  Set tag to be 'groundTruth': '<provider>'
    // For Moderation, Key must be: moderation:adult, moderation:violence, moderation:nsfw,
    //  moderation:nudity, moderation:fakeNews, moderation:pii
    // For gender: gender[value=male|female]
    'tags': [{
      'key': 'foo',
      'value': 'bar', // OPTIONAL.  If not specified, defaults to TRUE
      'score': 0.12 // OPTIONAL
    }, {
      'key': 'foo',
      'value': 'bar2'
    }],

  

    // Optional
    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          // Optional
          // Tags associated with this output. Format { 'key': 'name', 'value': 'value' }
          /* Known tags:
            speech=true (Speech Detected)
            silence=true (Silence Detected)
            partial=true (Partial output)
          */
          // For Moderation, Key must be: moderation:adult, moderation:violence, moderation:nsfw,
          //  moderation:nudity, moderation:fakeNews, moderation:pii
          // For gender: gender[value=male|female]
          'tags': [{
            'key': 'foo',
            'value': 'bar', // OPTIONAL.  If not specified, defaults to TRUE
            'score': 0.12 // OPTIONAL
          }, {
            'key': 'foo',
            'value': 'bar2'
          }]
      }]


        };
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
