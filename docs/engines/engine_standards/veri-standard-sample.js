var sample = {
  /**
   * PREAMBLE
   * The preamble contains various high-level information for this vtn-standard document.
   */

  // Schema version to validate engine outputs against (optional)
  "schemaId": "https://www.veritone.com/schema/engine/20180524",

  // Denotes the engine that created it (optional, provided by Veritone)
  "sourceEngineId": "<GUID>",

  // Engine name used to generate output (optional, provided by Veritone)
  "sourceEngineName": "engine_x",

  // Task payload describing the associated tasks that summon the engine (optional, provided by Veritone)
  "taskPayload": {
    // "key": value pairs from the payload for this task
  },

  // The associated task (optional, provided by Veritone)
  "taskId": "<TASK_ID>",

  // Date this document was generated (optional, set by Veritone if not included)
  // Format: ISO8601
  "generatedDateUtc": "2017-12-08T17:19:02Z",

  // Vendor specific reference.  Used to map engine output against vendor referenced data ID (optional)
  "externalSourceId": "<string>",

  // Specification for the contracts used for output validation (optional)
  // See http://docs.veritone.com/#/engines/engine_standards/capability/ for more information
  "validationContracts": [
    "ocr", "face", // ...
  ],

  /**
   * OVERALL FILE DATA
   * Data in this section applies to the file being analyzed as a whole.
   * This is a commonly used section for files with no time spans like
   * images or text documents, or for expressing summary data that spans
   * the entire length of a media file.
   *
   * For data that is specific to a particular object or a particular
   * point in time inside the file, see the lower sections.
   */

  // Tags associated with this file (optional)
  // Format: { "key": "<name>", "value": "<value>" }
  // - For ground truth:  Set tag to be "groundTruth": "<provider>"
  // - For content moderation, Key must be: moderation:adult, moderation:violence, moderation:nsfw,
  //   moderation:nudity, moderation:fakeNews, moderation:pii
  // - For gender: gender[value=male|female]
  "tags": [{
    "key": "foo",
    "value": "bar", // OPTIONAL.  If not specified, defaults to true
    "score": 0.12 // OPTIONAL
  }, {
    "key": "foo",
    "value": "bar2"
  }],

  // Language Identification (optional)
  // Format: BCP-47 https://tools.ietf.org/rfc/bcp/bcp47.txt
  "language": "en-US",

  // Summary of document (optional)
  "summary": "",

  // Entity reference (optional)
  "entityId": "<GUID>",
  "libraryId": "<GUID>",

  // Sentiment (optional)
  // -1.00 (Negative) to 1.00 (Positive)
  // For this file, provides a scale of how negative to positive it is
  // If a single number is returned, then positive must be used
  "sentiment": {
    "positiveValue": 0.12, // REQUIRED
    "positiveConfidence": 0.12, // OPTIONAL
    "negativeValue": 0.12, // OPTIONAL
    "negativeConfidence": 0.12 // OPTIONAL
  },

  // GPS coordinates for this file (optional)
  // Format: UTM (preferred) | WGS 1984
  "gps": [{
    "latitude": 59.123,
    "longitude": 213.123,
    "precision": 100, //in meters
    "direction": 10.1, // 0-360
    "velocity": 100.00, //in meters
    "altitude": 123.12 //in meters
  }],

  // Emotions (optional)
  // Can be specified for whole file (here) for overall tone,
  // in an object (e.g. face recognition),
  // in series (e.g. for transcript/sentiment), or
  // in series.object (e.g. for time-specific face recognition)
  "emotions": [{
    "emotion": "angry", // STRING: angry, happy, sad.  Can be any string field.
    "emotionValue": 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
    "emotionConfidence": 0.88 // OPTIONAL: 0 = 0%, 1.0 = 100%
  }],

  /**
   * OVERALL FILE OBJECTS
   * Data in this section applies to things (e.g. faces, objects, logos, OCR)
   * detected in the file but not in a specific time range.
   */

  // Object (optional)
  "object": [{

    // Main label for this object (REQUIRED)
    "label": "Satya Nadella",

    // Object type (REQUIRED)
    // Options:
    // - object: Object detection
    // - face: Face detection
    // - libraryEntity: Library-based object/face recognition
    // - licensePlate: License plate detection
    // - speakerId: Speaker recognition
    // - soundId: Sound recognition
    // - concept: Concept recognition
    // - keyword: Keyword detection
    // - namedEntity
    "type": "library_entity",

    // URI to thumbnail to show in the UI (optional)
    // If not provided but boundingPoly is provided,
    // one can be constructed dynamically from the boundingPoly
    "uri": "<URI>",

    // Entity reference (optional)
    "entityId": "<GUID>",
    "libraryId": "<GUID>",

    // Confidence score (optional)
    "confidence": 0.99234, //0-1.00

    // Text found (REQUIRED for OCR)
    "text": "The quick brown fox jumped over the brown fence",

    // Emotions (optional)
    // For an object (e.g. face detection, voice analysis, text analysis) in the whole file
    "emotions": [{
      "emotion": "angry", // STRING: angry, happy, sad.  Can be any string field.
      "emotionValue": 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
      "emotionConfidence": 0.88 // OPTIONAL: 0 = 0%, 1.0 = 100%
    }],

    // Age in years (optional)
    "age": {
      "min": 20,
      "max": 50,
      "confidence": 0.2
    },

    // Face landmarks (optional)
    "faceLandmarks": [{
      "type": "mouth",

      // Ordered array of (x,y) coordinates in percentage of axis
      // Implicit line from last to first
      "locationPoly": [{
        "x": 0.1,
        "y": 0.2
      }],
    }],

    // Object detection / keyword detection (optional)
    "objectCategory": [{
      "class": "animal",
      "@id": "kg:/m/0dl567"
    }],

    // Specifies the region match was found (optional)
    // Valid values: "left", "right", "top", "bottomÆ
    "region": "left",

    // Bounding polygon (optional)
    // Ordered array of (x,y) coordinates in percentage of axis
    // Implicit line from last to first
    "boundingPoly": [{
      "x": 0.1,
      "y": 0.2
    }],

    // GPS coordinates for this object (optional)
    // Format: UTM (preferred) | WGS 1984
    "gps": [{
      "latitude": 59.123,
      "longitude": 213.123,
      "precision": 100, //in meters
      "direction": 10.1, // 0-360
      "velocity": 100.00, //in meters
      "altitude": 123.12 //in meters
    }],

    // Structured data values for this object (optional)
    "structuredData": {
      "<schemaGuid>": { // GUID of the aiWARE schema ID this structured data object conforms to
        "<key>": "<value>",
        // ...
        "<keyN>": "<value>",
      }
    },

    // Custom data for this object (optional)
    // You can add any arbitrary data inside this object.
    // It will not be indexed, searchable, or have any impact on the system.
    // But it will be returned when reading the data back out.
    "vendor": {
      // custom key:value pairs...
    }
  }], // END OBJECT

  // CUSTOM DATA FOR FILE
  // Add keys here that do not conflict with above
  "vendor": {},

  /**
   * TIME SERIES DATA
   * Data in this section applies to a specific time ranges within the file.
   * This is the most common section used for insights from audio and video files.
   */

  // Series (optional)
  "series": [{

    // Start and stop times (REQUIRED)
    // Time span in milliseconds (relative to the source asset start) of this time slice
    "startTimeMs": 1260,
    "stopTimeMs": 1360,

    // Tags associated with this time slice (optional)
    // Format: { "key": "<name>", "value": "<value>" }
    // - For speech detected: speech=true
    // - For silence detected: silence=true
    // - For partial output: partial=true
    // - For ground truth:  Set tag to be "groundTruth": "<provider>"
    // - For content moderation, Key must be: moderation:adult, moderation:violence, moderation:nsfw,
    //   moderation:nudity, moderation:fakeNews, moderation:pii
    // - For gender: gender[value=male|female]
    "tags": [{
      "key": "foo",
      "value": "bar", // OPTIONAL.  If not specified, defaults to true
      "score": 0.12 // OPTIONAL
    }, {
      "key": "foo",
      "value": "bar2"
    }],

    // Summary of time slice (optional)
    "summary": "",

    // Speaker identification (optional)
    // Example: "channel0", "speaker1", ...
    "speakerId": "<Speaker Identifier>", // can be "<libraryId>:<entityId>"

    // TODO: Continue...

    // Optional
    // Transcript; JSON utterance (all word edges between 2 time nodes)
    // Array of n objects describing each alternative word
    "words": [{
      "word": "!silence",

      // Optional
      // Range should be from: 0.0 - 1.00
      "confidence": 0.794,

      // Optional
      // TTML -> Path
      // If Lattice is provided
      "bestPath": true,
      // Number of consecutive time-slices the utterance spans.
      // example: of->thrones----->
      //          of->their-->own->
      // utteranceLength: thrones: 2; their,own: 1
      "utteranceLength": 1
    }],

    // Optional for series
    // Language Identification: BCP-47 https://tools.ietf.org/rfc/bcp/bcp47.txt
    "language": "en-US",

    // OPTIONAL:
    // Sentiment -1.00 (Negative) - 1.00 (Postive)
    // For this time slice, provides a scale of how negative to positive it is
    // If a single number is returned, then positive must be used
    "sentiment": {
      "positiveValue": 0.12, // REQUIRED
      "positiveConfidence": 0.12, // OPTIONAL
      "negativeValue": 0.12, // OPTIONAL
      "negativeConfidence": 0.12, // OPTIONAL
    },

    "emotions": [{
      "emotion": "angry", // STRING: angry, happy, sad.  Can be any string field.
      "emotionValue": 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
      "emotionConfidence": 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
    }],

    // Entity
    "entityId": "<GUID>",
    "libraryId": "<GUID>",

    // OPTIONAL:
    // Object (Face, Object, Logo, OCR, ..)
    // This is for detecting something
    "object": {
      // REQUIRED
      "label": "Satya Nadella", // Tag/main label

      // Type: object, face, libraryEntity, licensePlate, speakerId, soundId, concept, keyword, namedEntity, barcode
      "type": "libraryEntity",

      // Used in the UI. E.g. thumbnail image of the face or object to use in search results
      // Provided to enable the json asset file to standalone yet enable access to the thumbnail from veritone api
      // All coordinates are in fraction of frame (e.g. 0.573 for 57.3%)
      // Points are in order of connection. No points implies entire frame. 2 points implies rectangle of opposite corners.
      // Time stamp indicates absolute time of frame determined by offset into media relative to start time of TDO
      // e.g. 2017-12-18T15:53:00 or 2017-12-18T15:53:00.250
      // Format: /media-streamer/image/<tdoId>/<ISO 8601 time_stamp>?x[0]=<x0-coord>&y[0]=<y0-coord>&...&x[i]=<xi-coord>&y[i]=<yi-coord>
      "uri": "<URI>",

      // Optional: Entity
      "entityId": "<GUID>",
      "libraryId": "<GUID>",

      // Optional
      "confidence": 0.99234, //0-1.00

      // REQUIRED FOR OCR
      "text": "The quick brown fox jumped over the brown fence", // Required for OCR

      // Face detection, voice analysis, text analysis: Optional
      // Face detection, voice analysis, text analysis: Optional
      "emotions": [{
        "emotion": "angry", // STRING: angry, happy, sad.  Can be any string field.
        "emotionValue": 0.12, // OPTIONAL: How strong.  0 = none, 1.0 = 100%
        "emotionConfidence": 0.88 // OPTIONAL: 0 = 0, 1.0 = 100%
      }],

      // Age: Optional
      "age": {
        "min": 20,
        "max": 50,
        "confidence": 0.2
      },

      // Face landmarks: Optional
      "faceLandmarks": [{
        "type": "mouth",
        "locationPoly": [{
          "x": 0.1,
          "y": 0.2
        }], // ordered array of (x,y) coords in percentage of axis.  Implicit line from last to first.
      }],

      // Object detection / keyword detection
      "objectCategory": [{
        "class": "animal",
        "@id": "kg:/m/0dl567"
      }],

      // Optional: specifies the region match was found. valid: left, right, top, bottom
      "region": "left",

      // ordered array of (x,y) coords in percentage of axis.  Implicit line from last to first.
      "boundingPoly": [{
        "x": 0.1,
        "y": 0.2
      }],

      // OPTIONAL
      // GPS Coords for this object in time slice - UTM (preferred) | WGS
      "gps": [{
        "latitude": 59.123,
        "longitude": 213.123,
        "precision": 100, //in meters
        "direction": 10.1, // 0-360
        "velocity": 100.00, //in meters
        "altitude": 123.12 //in meters
      }],

      // OPTIONAL
      // This provides the structured data values for this object in the time slice
      "structuredData": {
        "<schemaGuid>": {
          "<key>": "<value>",
          // ...
          "<keyN>": "<value>",
        }
      },

      // CUSTOM DATA FOR TIME SLICE
      // Add keys here that do not conflict with above
      "vendor": {}
    }, // END OBJECT

    // OPTIONAL
    // GPS Coords for this time slice - UTM (preferred) | WGS
    "gps": [{
      "latitude": 59.123,
      "longitude": 213.123,
      "precision": 100, //in meters
      "direction": 10.1, // 0-360
      "velocity": 100.00, //in meters
      "altitude": 123.12 //in meters
    }],

    // OPTIONAL
    // This provides the structured data values for the time slice
    "structuredData": {
      "<schemaGuid>": {
        "<key>": "<value>",
        // ...
        "<keyN>": "<value>",
      }
    },

    // CUSTOM DATA FOR TIME SLICE
    // Add keys here that do not conflict with above
    "vendor": {}
  }]
};
