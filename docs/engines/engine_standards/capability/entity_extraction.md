# Engine Standard For Entity Extraction

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-text-standard.md ':include')


[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT
```javascript
var sample = {
    // Object (Face, Object, Logo, OCR, ..)
    // This is for detecting something
    'object': [{
      // REQUIRED
      'label': 'Satya Nadella', // Tag/main label

      // Type: object, face, libraryEntity, licensePlate, speakerId, soundId, concept, keyword, namedEntity
      'type': 'library_entity',
      'uri': '<URI>', // Used in the UI.  E.g., image of the face or object to use in search results

      // Optional: Entity
      'entityId': '<GUID>',
      'libraryId': '<GUID>',

  
    }], // END OBJECT

    // CUSTOM DATA FOR FILE
    // Add keys here that do not conflict with above
    'vendor': {

    },

    // Optional
    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          'object': {
            // REQUIRED
            'label': 'Satya Nadella', // Tag/main label

          }, // END OBJECT

 
        };
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
