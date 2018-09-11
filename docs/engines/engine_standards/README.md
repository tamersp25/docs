# Engine Standards

## Overview
Veritone has architected its platform to be flexible and extensible to accommodate development partners across many different categories of cognition.  

Due to the wide variety in cognitive engine capabilities, inputs/outputs, and parameter settings potentially available from ecosystem partners, we have created a modular framework that seeks to normalize and standardize engine outputs. 

For example, there are many different ways to define a Bounding Box (4 coordinates, 2 coordinates, coordinates with height and width, % of image size, etc), so we have chosen what we believe to be the best and/or most universal definition as our “standard”.  In cases where nomenclature or definitions do not match our standards, we will normalize to those standards by making translations internally within our platform.

This section outlines the VERI standard.


## Engine Taxonomy

Veritone has built a taxonomy framework to classify cognitive engines across the ecosystem of AI companies.  

This classification system is at the heart of how engines are onboarded, and selected to process data from the Veritone platform.

Engines are grouped into engine classes, where each class represents general capabilities such as speech processing, text analytics, or vision related models.  Each class breaks down further into Capabilities, which describe specific functionality related to that class.  

For example, there are many AI models in the Vision sphere.  Logo recognition models operate and behave differently than motion detection engines, and require a different format to describe what is happening.  Within a video, logos may only be detected sporatically throughout, and be described by the brand detected, and a series of bounding boxes against a time series.  Motion detection may only detect the presence of motion, and be only defined by a time stamp.  

Please refer to the full list of 


## Structure

The VERI Engine Standard is the output format the all of our engines aims to conform.  The format allows for describing a single data object (SDO) or a series of time based data objects (a.k.a. temporal data objects - TDOs).

Engine output
  |
  +-- Message Envelope
     |
     +-- Metadata
     |
     +-- Single Data Object
        |
        +-- Object Series (Temporal Data Objects)


At the top level, each task's output will contain a message envelop that describes information on the schema references, engines correlated to the data output, the data format, and any singular data components (e.g. confidence intervals, sentiment, location data, etc.)

In cases where multiple result sets are returned, say in a case of object recognition outputs within a video clip, the VERI Engine standard expects an array of objects with defined attributes of timestamps and data objects.

For example, note the following formatted template.
  
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
    // For gender: gender[value=male|female]
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
 ```
