# Engine Standard Template (e.g. Object)

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-audio-standard.md ':include')


[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON Output
```javascript
var sample = {
    // Preamble

    // Document Format: CAMEL CASE

    // Optional
    // Schema version to validate engine outputs against
    'schemaId': 'https://www.veritone.com/schema/engine/20180524',

    // Optional
    // Provided by Veritone
    // Denotes the engine that created it
    'sourceEngineId': '<GUID>',

    // Optional
    // Provided by Veritone
    // Engine name used to generate output
    'sourceEngineName': 'engine_x',

    // Optional
    // Provided by Veritone
    // Task payload describing the associated tasks that summon the engine
    'taskPayload': {
      object
    },

    // Optional
    // Provided by Veritone
    // The associated task
    'taskId': '<TASK_ID>',

    // Optional: Set by Veritone if not included.  Format: ISO8601
    'generatedDateUtc': '2017-12-08T17:19:02Z',

    // Optional: Vendor specific reference.  Used to map engine output against vendor referenced data ID
    'externalSourceId': '<string>',

    // Optional: Specification for the contracts used for output validation
    // See <url... to the contracts page> for more information
    'validationContracts': [
      'ocr', 'face', // ...
    ],

    // Optional for whole file
    // Tags associated with this output. Format { 'key': 'name', 'value': 'value' }
    // FOR GROUND TRUTH:  Set tag to be 'groundTruth': '<provider>'
    // For Moderation, Key must be: moderation:adult, moderation:violence, moderation:nsfw,
    //  moderation:nudity, moderation:fakeNews, moderation:pii
    // For gender: gender (value=male|female)

    'tags': [{
      'key': 'foo',
      'value': 'bar', // OPTIONAL.  If not specified, defaults to TRUE
      'score': 0.12 // OPTIONAL
    }, {
      'key': 'foo',
      'value': 'bar2'
    }],

    // Optional for whole file
    // Language Identification: BCP-47 https://tools.ietf.org/rfc/bcp/bcp47.txt
    'language': 'en-US',
    'summary': "", // OPTIONAL. String.  Summary of doc

    // Entity
    'entityId': '<GUID>',
    'libraryId': '<GUID>',

    // OPTIONAL:
    // Sentiment -1.00 (Negative) - 1.00 (Postive)
    // For this time slice, provides a scale of how negative to positive it is
    // If a single number is returned, then positive must be used
    'sentiment': {
      'positiveValue': 0.12, // REQUIRED
      'positiveConfidence': 0.12, // OPTIONAL
      'negativeValue': 0.12, // OPTIONAL
      'negativeConfidence': 0.12 // OPTIONAL
    },

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
      // REQUIRED
      'label': 'Satya Nadella', // Tag/main label

      // Type: object, face, libraryEntity, licensePlate, speakerId, soundId, concept, keyword, namedEntity
      'type': 'library_entity',
      'uri': '<URI>', // Used in the UI.  E.g., image of the face or object to use in search results

      // Optional: Entity
      'entityId': '<GUID>',
      'libraryId': '<GUID>',

      // Optional
      'confidence': 0.99234, //0-1.00

      // REQUIRED FOR OCR
      'text': 'The quick brown fox jumped over the brown fence', // Required for OCR

      // Face detection, voice analysis, text analysis: Optional
      'emotions': [{
        'emotion': 'angry', // STRING: angry, happy, sad.  Can be any string field.
        'emotionValue': 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
        'emotionConfidence': 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
      }],

      // OPTIONAL: Age in years
      'age': {
        'min': 20,
        'max': 50,
        'confidence': 0.2
      },

      // OPTIONAL: Face landmarks: Optional
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

      // OPTIONAL: GPS Coords for this object in time slice - UTM (preferred) | WGS
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
          }],

          // Optional
          // Language BCP-47
          'language': "en-US",

          'summary': "", // OPTIONAL. String.  Summary of time slice

          // Optional
          // Speaker (String): 'channel0', 'speaker1', ...
          // Can be '<libraryId>:<entityId>'
          'speakerId': 'Speaker Identifier',
        
          // Optional
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
          }],


          // Optional for series
          // Language Identification: BCP-47 https://tools.ietf.org/rfc/bcp/bcp47.txt
          'language': 'en-US',

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
          }],

          // Entity
          'entityId': '<GUID>',
          'libraryId': '<GUID>',

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

