# Engine Standard for Color

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-vision-standard.md ':include')

[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON Output

```javascript
var sample = {
    // Preamble


    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          // OPTIONAL:
          // Object (Face, Object, Logo, OCR, ..)
          // This is for detecting something
          'object': {
            // REQUIRED
            'label': 'Satya Nadella', // Tag/main label

            // Type: object, face, libraryEntity, licensePlate, speakerId, soundId, concept, keyword, namedEntity, barcode
            'type': 'libraryEntity',
              
            // Used in the UI. E.g. thumbnail image of the face or object to use in search results
            // Provided to enable the json asset file to standalone yet enable access to the thumbnail from veritone api
            // All coordinates are in fraction of frame (e.g. 0.573 for 57.3%)
            // Points are in order of connection. No points implies entire frame. 2 points implies rectangle of opposite corners.
            // Time stamp indicates absolute time of frame determined by offset into media relative to start time of TDO
            // e.g. 2017-12-18T15:53:00 or 2017-12-18T15:53:00.250
            // Format: /media-streamer/image/<tdoId>/<ISO 8601 time_stamp>?x[0]=<x0-coord>&y[0]=<y0-coord>&...&x[i]=<xi-coord>&y[i]=<yi-coord>
            'uri': '<URI>'

            // Optional: Entity
            'entityId': '<GUID>',
            'libraryId': '<GUID>',

            // Optional
            'confidence': 0.99234, //0-1.00

            // REQUIRED FOR OCR
            'text': 'The quick brown fox jumped over the brown fence', // Required for OCR

            // Face detection, voice analysis, text analysis: Optional
            // Face detection, voice analysis, text analysis: Optional
            'emotions': [{
              'emotion': 'angry', // STRING: angry, happy, sad.  Can be any string field.
              'emotionValue': 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
              'emotionConfidence': 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
            }],

            // Age: Optional
            'age': {
              'min': 20,
              'max': 50,
              'confidence': 0.2
            },

            // Face landmarks: Optional
            'faceLandmarks': [{
              'type': 'mouth',
              'locationPoly': [{
                'x': 0.1,
                'y': 0.2
              }], // ordered array of (x,y) coords in percentage of axis.  Implicit line from last to first.
            }],

            // Object detection / keyword detection
            'objectCategory': [{
              'class': 'animal',
              '@id': 'kg:/m/0dl567'
            }],

            // Optional: specifies the region match was found. valid: left, right, top, bottom
            'region': 'left',

            // ordered array of (x,y) coords in percentage of axis.  Implicit line from last to first.
            'boundingPoly': [{
              'x': 0.1,
              'y': 0.2
            }],

            // OPTIONAL
            // GPS Coords for this object in time slice - UTM (preferred) | WGS
            'gps': [{
              'latitude': 59.123,
              'longitude': 213.123,
              'precision': 100, //in meters
              'direction': 10.1, // 0-360
              'velocity': 100.00, //in meters
              'altitude': 123.12 //in meters
            }],

            // OPTIONAL
            // This provides the structured data values for this object in the time slice
            'structuredData': {
              '<schemaGuid>': {
                '<key>': '<value>',
                // ...
                '<keyN>': '<value>',
              }
            },

            // CUSTOM DATA FOR TIME SLICE
            // Add keys here that do not conflict with above
            'vendor': {

            }
          }, // END OBJECT

          // OPTIONAL
          // GPS Coords for this time slice - UTM (preferred) | WGS
          'gps': [{
            'latitude': 59.123,
            'longitude': 213.123,
            'precision': 100, //in meters
            'direction': 10.1, // 0-360
            'velocity': 100.00, //in meters
            'altitude': 123.12 //in meters
          }],

          // OPTIONAL
          // This provides the structured data values for the time slice
          'structuredData': {
            '<schemaGuid>': {
              '<key>': '<value>',
              // ...
              '<keyN>': '<value>',
            }
          },

          // CUSTOM DATA FOR TIME SLICE
          // Add keys here that do not conflict with above
          'vendor': {

          }
        };
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
