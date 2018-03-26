<!-- ---
title: Engine Standards
--- -->

#### Overview

This document outlines the new proposed standard for Veritone&rsquo;s cognitive engine inputs and outputs.  This document will serve as a guide for how our engine inputs and outputs will be normalized for processing.  

Veritone has architected its platform to be flexible and extensible to accommodate development partners across many different categories of cognition.  

Due to the wide variety in cognitive engine capabilities, inputs/outputs, and parameter settings potentially available from ecosystem partners, we have created a modular framework that seeks to normalize and standardize engine outputs. 

Conformance to Veritone&rsquo;s normalized Component standards is ideal, and makes onboarding to our aiWARE platform relatively simple.  However, we recognize that many developers utilize different nomenclature, definitions, and parameters for commonly used outputs.  

For example, there are many different ways to define a Bounding Box (4 coordinates, 2 coordinates, coordinates with height and width, % of image size, etc), so we have chosen what we believe to be the best and/or most universal definition as our &ldquo;standard&rdquo;.  In cases where nomenclature or definitions do not match our standards, we will normalize to those standards by making translations internally within our platform.

Our Cognitive Engines framework relies on three key elements - Components, Contracts, and Manifests (described below). 

At a high level, contracts define how engines are supposed to work.  Contracts outline the expected inputs and outputs, and list the capabilities of a given engine.  

Contracts are composed of a series of components.  These components are the elemental building blocks that define our data formats.

Manifests are implementations of the the engine contracts.  The manifest will be the primary means of defining engines and their characteristics.

All of these key elements combine to allow us to coordinate, normalize, and orchestrate engines as we build out a framework for chained cognition.

A Contract defines what constitutes an engine in a given category, defined by both expected inputs and outputs.  Each Category will have certain mandatory Components and optional yet defined Components.

#### Cognitive Engine Classes

We recognize six major &ldquo;Classes&rdquo; of Cognition based on primary input types:

- Speech
- Text
- Visual
- Data
- Audio
- Biometrics

Within each Class, there are currently dozens of &ldquo;Categories&rdquo; each representing models that are designed to perform similar tasks, such as Text Sentiment analysis or Face Recognition.  Industry nomenclature applicable to such categorization varies (e.g. detection vs. classification vs. recognition) so we have normalized our categorization and terminology as well.  Veritone currently supports a number of Categories and will continue to add more over time.

#### Components

The basic building blocks of engine outputs are defined as Components.  Some components such as &ldquo;Confidence&rdquo; are fairly universal, while others are specific to the domain such as &ldquo;Veritone Lattice Format&rdquo; or VLF.  Most engine output will consist of several Components.

#### Contracts

A Contract defines what constitutes an engine in a given category, defined by both expected inputs and outputs.  Each Category will have certain mandatory Components and optional yet defined Components.

Contracts provide a signature/definition of the input and output payloads to and from different engines. Any changes in payload structure requires a corresponding redefinition of these asdf;lkj

Contracts. The contracts are registered in a central location called the registry. Veritone applications interpret input and output payloads to and from engines exclusively through the payload contracts defined in the registry. Any changes to payloads, in addition to new ones, are achieved by changing or defining a new Contract in the registry. Thus, the registry provides a means for the Veritone applications to seamlessly handle changes to existing payloads, in addition to new ones.

#### Manifest

The manifest is a JSON-formatted text file that describes the aspects of your engine and build. It provides a full list of resources required for deployment, including the engine&rsquo;s unique ID and category, data types and sources, and runtime environment variables. Each build must specify a unique manifest in the Dockerfile in order to be deployed. Any time a build is modified, a new manifest must be created.

The Manifest that must accompany each engine build provides a means of communicating the particulars of the individual acceptable inputs and outputs of the engine build along with other  engine elements or requirements.

#### Message Envelope

As a part of the standardization of the engine outputs, metadata around the components will conform to a standard to ensure that we capture the necessary information around engine contracts, versions, and sources.

To track schema related information, if applicable, the message header outlines schema information with the @id and @type fields from [JSON-LD](https://json-ld.org/).

##### JSON-LD

Generally speaking, the data model described by a [JSON-LD document](https://json-ld.org/spec/latest/json-ld/#dfn-json-ld-documents) is a labeled, directed [graph](https://json-ld.org/spec/latest/json-ld/#dfn-graph). The graph contains [nodes](https://json-ld.org/spec/latest/json-ld/#dfn-nodes), which are connected by [edges](https://json-ld.org/spec/latest/json-ld/#dfn-edges). A [node](https://json-ld.org/spec/latest/json-ld/#dfn-nodes) is typically data such as a [string](https://json-ld.org/spec/latest/json-ld/#dfn-strings), [number](https://json-ld.org/spec/latest/json-ld/#dfn-numbers), [typed values](https://json-ld.org/spec/latest/json-ld/#dfn-typed-values)(like dates and times) or an [IRI](https://json-ld.org/spec/latest/json-ld/#dfn-iris). There is also a special class of [node](https://json-ld.org/spec/latest/json-ld/#dfn-nodes) called a [blank node](https://json-ld.org/spec/latest/json-ld/#dfn-blank-nodes), which is typically used to express data that does not have a global identifier like an [IRI](https://json-ld.org/spec/latest/json-ld/#dfn-iris). [Blank nodes](https://json-ld.org/spec/latest/json-ld/#dfn-blank-nodes) are identified using a [blank node identifier](https://json-ld.org/spec/latest/json-ld/#dfn-blank-node-identifiers). This simple data model is incredibly flexible and powerful, capable of modeling almost any kind of data. For a deeper explanation of the data model, see section [5. Data Model](https://json-ld.org/spec/latest/json-ld/#data-model).

Developers who are familiar with Linked Data technologies will recognize the data model as the RDF Data Model. To dive deeper into how JSON-LD and RDF are related, see section [7. Relationship to RDF](https://json-ld.org/spec/latest/json-ld/#relationship-to-rdf).

###### Metadata fields

**Field**

**Type**

**Required**

**Description**

vtnVersion

String

Yes

Version number of the JSON data structured based on creation date.

vtnSourceId

GUID

Optional

GUID of the engine ID that generated the output

vtnSource

String

Optional

Name of the engine

vtnInputTpoID

String

Optional

Input Param for the engine

These will be set by Core Recording Server if not specified

vtnInputAssetId

String

Optional

Input Param for the engine

These will be set by Core Recording Server if not specified

generatedDate

date

Optional

Set by Core Recording Server if not included

externalSource

String

Optional

External Source Id

engineCategoryName

String

Optional

These are the fields that should be set.  If not set, then they should be set by Core Recording Server

tags

String

Optional

Descriptor tags associated with this output

series

JSON Structure

Yes

Time series data structure that contains additional components.

See component/metadata-time-series for more information.

##### JSON Sample

    
    var sample = {
    
     // Preamble
    
     // VERSION SHOULD NOT CHANGE -- REQUIRED FIELD
    
    
    
    "@id": "[https://vertone.schema.com/nodereference/v1.0/vertioneNodeReference.json](https://vertone.schema.com/nodereference/v1.0/vertioneNodeReference.json)",
     "@type": "[https://vertone.schema.com/contract/v1.0/contractType.json](https://vertone.schema.com/contract/v1.0/contractType.json)",
    
    
     "vtn_version": "20170929",
    
    
    
     // Optional; Denotes the engine that created it
    
     // Provided by Core Recording Server
    
     "vtn_source_id": "<GUID>",
    
     "vtn_source": "engine_x",
    
    
    
     // Optional; Input Param for the engine
    
     // These will be set by Core Recording Server if not specified
    
     "vtn_input_tpo_id": "<GUID/ID>",
    
     "vtn_input_asset_id": "<GUID/ID>",
    
    
    
     // Optional; Set by Core Recording Server if not included
    
     "generated_date": "2017-09-29",
    
    
    
     // Optional; External Source Id
    
     "external_source": "<String>",
    
    
    
     // Optional; These are the fields that should be set.  If not set, then they should be set by Core Recording Server
    
     "engine_category_names": [
    
       "OCR", "Face", // ...
    
     ],
    
    
    
     // OPTIONAL:
    
     // Tags associated with this output
    
     "tags": [
    
       "foo", "foo2"
    
     ],
    
    
    
     // REQUIRED; Can be an empty list
    
     "series": [{
    
       // Optional if not time-based source (video, audio)
    
       "start_time_ms": 1260,
    
       "stop_time_ms": 1360,
    
    
    
       // OPTIONAL:
    
       // Tags associated with this time slice
    
       "tags": [
    
         "foo", "foo2"
    
       ],
    
    
    
       // OPTIONAL:
    
       // Transcript found; JSON Lattice
    
       // If simple path, include only one word or phrase here. (1 object)
    
       // If lattice, include many words/phrases (objects)
    
       "words": [{
    
         "word": "!silence",
    
    
    
         // Optional 0-100.00
    
         "confidence": 79.4,
    
    
    
         // TTML -> Path
    
         // If Lattice is provided
    
         "best_path_forward": true,
    
         "best_path_backward": true,
    
         "spanning_forward": false,
    
         "spanning_backward": false,
    
         "spanning_length": 1
    
       }],
    
    
    
       // OPTIONAL:
    
       // Sentiment -1.00 (Negative) - 1.00 (Postive)
    
       // For this time slice, provides a scale of how negative to positive it is
    
       "sentiment": 0.12,
    
    
    
       // OPTIONAL:
    
       // Object (Face, Object, Logo, OCR, ..)
    
       // This is for detecting something
    
       "object": [{
    
         // REQUIRED
    
         "label": "Satya Nadella", // Tag/main label
    
         // Type: Object, Face, Library Entity, License Plate
    
         "type": "library_entity",
    
    
    
         // Optional
    
         "confidence": 99.99234 //0-100.00
    
         "match_id": "MSFT:SATYA:001", // External Match Id
    
         "input_id": "external_id", // Input Id if applicable
    
    
    
         // REQUIRED FOR OCR
    
         "text": "The quick brown fox jumped over the brown fence", // Required for OCR
    
    
    
         // Entity
    
         "entity_id": "<GUID>",
    
         "library_id": "<GUID>",
    
    
    
         // Gender Optional
    
         "gender": {
    
           "gender": "male", // male, female
    
           "confidence": 99.45
    
         },
    
    
    
         // Optional
    
         // Location information
    
         "region": "left", // Optional, specifies the region match was found
    
         "box_percent": { // Specifies the coordinates as (left,top)->(left+width,top+height)
    
           "left": 0.597,
    
           "top": 0.162,
    
           "width": 0.248,
    
           "height": 0.248,
    
    
    
           // Optional; Input image HxW
    
           "imageWidth": 1024,
    
           "imageHeight": 768
    
         },
    
    
    
         // Is this object Adult?
    
         "isAdultContent": false,
    
         "adultScore": 0.0934349000453949,
    
    
    
         // Is this object Racy?
    
         "isRacyContent": false,
    
         "racyScore": 0.068613491952419281,
    
    
    
         // OPTIONAL
    
         // This provides the structured data values for this object in the time slice
    
         "structured_data": {
    
           "<schema_id_or_name>": {
    
             "key": "value" // This repeats for all the keys in the schema
    
           }
    
         },
    
    
    
         // CUSTOM DATA FOR TIME SLICE
    
         // Add keys here that do not conflict with above
    
       }], // END OBJECT
    
    
    
       // OPTIONAL
    
       // GPS Coords for this time slice
    
       "gps": [{
    
         "latitude": 59.123,
    
         "latitude": 213.123,
    
         "precision_ft": 100,
    
         "direction": 10.1, // 0-360
    
         "velocity_fts": 100.00,
    
         "altitude_ft": 123.12
    
       }],
    
    
    
       // OPTIONAL
    
       // This provides the structured data values for this time slice
    
       "structured_data": {
    
         "<schema_id_or_name>": {
    
           "key": "value" // This repeats for all the keys in the schema
    
         }
    
       }
    
     }], // end series
    
    
    
     // OPTIONAL
    
     // GPS Coords for this input
    
     "gps": [{
    
       "latitude": 59.123,
    
       "latitude": 213.123,
    
       "precision_ft": 100,
    
       "direction": 10.1, // 0-360
    
       "velocity_fts": 100.00,
    
       "altitude_ft": 123.12
    
     }],
    
    
    
     // OPTIONAL
    
     // This provides the structured data values for the entire document
    
     "structured_data": {
    
       "<schema_id_or_name>": {
    
         "key": "value" // This repeats for all the keys in the schema
    
       }
    
     }
    
    
    
     // CUSTOM DATA FOR TIME SLICE
    
     // Add keys here that do not conflict with above
    
    };
    
    
    var sample = {
    
     // Preamble
    
     // VERSION SHOULD NOT CHANGE -- REQUIRED FIELD
    
     "vtn_version": "20170929",
    
    
    
     // Optional; Denotes the engine that created it
    
     // Provided by Core Recording Server
    
     "vtn_source_id": "<GUID>",
    
     "vtn_source": "engine_x",
    
    
    
     // Optional; Input Param for the engine
    
     // These will be set by Core Recording Server if not specified
    
     "vtn_input_tpo_id": "<GUID/ID>",
    
     "vtn_input_asset_id": "<GUID/ID>",
    
    
    
     // Optional; Set by Core Recording Server if not included
    
     "generated_date": "2017-09-29",
    
    
    
     // Optional; External Source Id
    
     "external_source": "<String>",
    
    
    
     // Optional; These are the fields that should be set.  If not set, then they should be set by Core Recording Server
    
     "engine_category_names": [
    
       "OCR", "Face", // ...
    
     ],
    
    
    
     // OPTIONAL:
    
     // Tags associated with this output
    
     "tags": [
    
       "foo", "foo2"
    
     ],
    
    
    
     // REQUIRED; Can be an empty list
    
     "series": [{
    
       // Optional if not time-based source (video, audio)
    
       "start_time_ms": 1260,
    
       "stop_time_ms": 1360,
    
    
    
       // OPTIONAL:
    
       // Tags associated with this time slice
    
       "tags": [
    
         "foo", "foo2"
    
       ],
    
    
    
       // OPTIONAL:
    
       // Transcript found; JSON Lattice
    
       // If simple path, include only one word or phrase here. (1 object)
    
       // If lattice, include many words/phrases (objects)
    
       "words": [{
    
         "word": "!silence",
    
    
    
         // Optional 0-100.00
    
         "confidence": 79.4,
    
    
    
         // TTML -> Path
    
         // If Lattice is provided
    
         "best_path_forward": true,
    
         "best_path_backward": true,
    
         "spanning_forward": false,
    
         "spanning_backward": false,
    
         "spanning_length": 1
    
       }],
    
    
    
       // OPTIONAL:
    
       // Sentiment -1.00 (Negative) - 1.00 (Postive)
    
       // For this time slice, provides a scale of how negative to positive it is
    
       "sentiment": 0.12,
    
    
    
       // OPTIONAL:
    
       // Object (Face, Object, Logo, OCR, ..)
    
       // This is for detecting something
    
       "object": [{
    
         // REQUIRED
    
         "label": "Satya Nadella", // Tag/main label
    
         // Type: Object, Face, Library Entity, License Plate
    
         "type": "library_entity",
    
    
    
         // Optional
    
         "confidence": 99.99234 //0-100.00
    
           "match_id": "MSFT:SATYA:001", // External Match Id
    
         "input_id": "external_id", // Input Id if applicable
    
    
    
         // REQUIRED FOR OCR
    
         "text": "The quick brown fox jumped over the brown fence", // Required for OCR
    
    
    
         // Entity
    
         "entity_id": "<GUID>",
    
         "library_id": "<GUID>",
    
    
    
         // Gender Optional
    
         "gender": {
    
           "gender": "male", // male, female
    
           "confidence": 99.45
    
         },
    
    
    
         // Optional
    
         // Location information
    
         "region": "left", // Optional, specifies the region match was found
    
         "box_percent": { // Specifies the coordinates as (left,top)->(left+width,top+height)
    
           "left": 0.597,
    
           "top": 0.162,
    
           "width": 0.248,
    
           "height": 0.248,
    
    
    
           // Optional; Input image HxW
    
           "imageWidth": 1024,
    
           "imageHeight": 768
    
         },
    
    
    
         // Is this object Adult?
    
         "isAdultContent": false,
    
         "adultScore": 0.0934349000453949,
    
    
    
         // Is this object Racy?
    
         "isRacyContent": false,
    
         "racyScore": 0.068613491952419281,
    
    
    
         // OPTIONAL
    
         // This provides the structured data values for this object in the time slice
    
         "structured_data": {
    
           "<schema_id_or_name>": {
    
             "key": "value" // This repeats for all the keys in the schema
    
           }
    
         },
    
    
    
         // CUSTOM DATA FOR TIME SLICE
    
         // Add keys here that do not conflict with above
    
       }], // END OBJECT
    
    
    
       // OPTIONAL
    
       // GPS Coords for this time slice
    
       "gps": [{
    
         "latitude": 59.123,
    
         "latitude": 213.123,
    
         "precision_ft": 100,
    
         "direction": 10.1, // 0-360
    
         "velocity_fts": 100.00,
    
         "altitude_ft": 123.12
    
       }],
    
    
    
       // OPTIONAL
    
       // This provides the structured data values for this time slice
    
       "structured_data": {
    
         "<schema_id_or_name>": {
    
           "key": "value" // This repeats for all the keys in the schema
    
         }
    
       }
    
     }], // end series
    
    
    
     // OPTIONAL
    
     // GPS Coords for this input
    
     "gps": [{
    
       "latitude": 59.123,
    
       "latitude": 213.123,
    
       "precision_ft": 100,
    
       "direction": 10.1, // 0-360
    
       "velocity_fts": 100.00,
    
       "altitude_ft": 123.12
    
     }],
    
    
    
     // OPTIONAL
    
     // This provides the structured data values for the entire document
    
     "structured_data": {
    
       "<schema_id_or_name>": {
    
         "key": "value" // This repeats for all the keys in the schema
    
       }
    
     }
    
    
    
     // CUSTOM DATA FOR TIME SLICE
    
     // Add keys here that do not conflict with above
    
    };
    
    

#### Contracts

##### Overview 

A contract is a defined interface for expected data inputs and outputs.  

Note: Engines output an array of time series objects.. So this implies time series needs to be defined as a contract

#### Transcription Contract

##### Input Data Structures

This input data structure outlines the expected and optional data structures to be passed in to transcription AI engines.  Required input data structures are data fields that are expected in message inputs. Optional data structures are defined in the corresponding standards body.

Engines may take in one or multiple input payloads.

 

**Data Structure**

**Type**

**Required**

**Description**

**Specification**

Input payload

Array of Objects

Yes

1. Input contract type (MIME type or a component type)
2. Array of payload object structures describing the content type, asset type, payload component, payload component,  identifier, etc. 

[{component/metadata-payload, payload_object1},

{component/metadata-payload,  payload_object2}]

 

##### Output Data Structures

Required data structures are data fields that are expected in every transcription output.  This is what is returned from the engine.

Optional data structures are JSON data components that describe additional feature elements around transcription.  These data component structures are be interchangeable as defined by the component data format. 

Engines may output one or multiple output payloads.

Fields may include, but not limited to:

 

**Data Structure**

**Type**

**Required**

**Description**

**Example or Specification**

Contract type

string

Yes

Type of output contract

contract/transcription

Text

Array of Objects

Yes

An JSON array of text unit objects.

component/metadata-text

Confidence

Object

Optional

Confidence range of the text defined from 0 - 1.0.

component/metadata-confidence

Veritone Lattice Format (VLF)

Object

Optional

Veritone&rsquo;s lattice format which captures a lattice of words, order, confidence, and time stamps.

component/transcription-veritone-lattice-format

Keyword detection

Object

Optional

Keyword detection looks for significant words that have relevant meaning.

component/metadata-keyword

Topic Modeling

Object

Optional

Topic modelling can be described as a method for finding a group of words (i.e topic) from a collection of documents that best represents the information in the collection. It can also be thought of as a form of text mining &ndash; a way to obtain recurring patterns of words in textual material.

component/metadata-topic

 

 

 

 

 

#### General Object Recognition Contract

##### Input Data Structures

This input data structure outlines the expected and optional data structures to be passed in to object recognition AI engines.  Required input data structures are data fields that are expected in message inputs. Optional data structures are defined in the corresponding standards body.

Engines may take in one or multiple input payloads.

 

**Data Structure**

**Type**

**Required**

**Description**

**Specification**

Input payload

Array of Objects

Yes

1. Input contract type (MIME type or a component type)
2. Array of payload object structures describing the content type, asset type, payload component, payload component,  identifier, etc. 

[{component/metadata-payload, payload_object1},

{component/metadata-payload,  payload_object2}]

 
#### Output Data Structures

Required data structures are data fields that are expected in every transcription output.  This is what is returned from the engine.

Optional data structures are JSON data components that describe additional feature elements around object recognition.  These data component structures are be interchangeable as defined by the component data format. 

Engines may output one or multiple output payloads.

Fields may include, but not limited to:

 

**Data Structure**

**Type**

**Required**

**Description**

**Example or Specification**

Contract type

string

Yes

Type of output contract

contract/object

ObjectInfo

Array of Objects

Yes

An array of object recognition objects providing information about its location, tags, colors etc. 

component/metadata-detected-object

 

 

#### Face Detection Contract

##### Input Data Structures

This input data structure outlines the expected and optional data structures to be passed in to face detection AI engines.  Required input data structures are data fields that are expected in message inputs. Optional data structures are defined in the corresponding standards body.

Engines may take in one or multiple input payloads.

 

**Data Structure**

**Type**

**Required**

**Description**

**Specification**

Input payload

Array of Objects

Yes

1. Input contract type (MIME type or a component type)
2. Array of payload object structures describing the content type, asset type, payload component, payload component,  identifier, etc. 

[{component/metadata-payload, payload_object1},

{component/metadata-payload,  payload_object2}]

 

#### Output Data Structures

Required data structures are data fields that are expected in every face detection output.  This is what is returned from the engine.

Optional data structures are JSON data components that describe additional feature elements around transcription.  These data component structures are be interchangeable as defined by the component data format. 

Engines may output one or multiple output payloads.

Fields may include, but not limited to:

 

**Data Structure**

**Type**

**Required**

**Description**

**Example or Specification**

Contract type

string

Yes

Type of output contract

contract/face-detection

FaceDetectionInfo

Array of Objects

Yes

An array of face-det objects providing information about its location, tags, attributes, associated human face etc. 

component/metadata-face-detection

#### Face Recognition Contract

##### Input Data Structures

This input data structure outlines the expected and optional data structures to be passed in to face recognition AI engines.  Required input data structures are data fields that are expected in message inputs. Optional data structures are defined in the corresponding standards body.

Engines may take in one or multiple input payloads.

 

**Data Structure**

**Type**

**Required**

**Description**

**Specification**

Input payload

Array of Objects

Yes

1. Input contract type (MIME type or a component type)
2. Array of payload object structures describing the content type, asset type, payload component, payload component,  identifier, etc. 

[{component/metadata-payload, payload_object1},

{component/metadata-payload,  payload_object2}]

 

#### Output Data Structures

Required data structures are data fields that are expected in every face recognition output.  This is what is returned from the engine.

Optional data structures are JSON data components that describe additional feature elements around face recognition.  These data component structures are be interchangeable as defined by the component data format. 

Engines may output one or multiple output payloads.

Fields may include, but not limited to:

 

**Data Structure**

**Type**

**Required**

**Description**

**Example or Specification**

Contract type

string

Yes

Type of output contract

contract/face-recognition

FaceRecogInfo

Array of Objects

Required

An array of face recognition objects identifying Unique ID of the face, in addition to providing information about its location, tags, id, attributes, associated human face etc. 

component/vision-face-recognition

 

#### Machine Translation Contract

##### Input Data Structures

This input data structure outlines the expected and optional data structures to be passed in to machine translation AI engines.  Required input data structures are data fields that are expected in message inputs. Optional data structures are defined in the corresponding standards body.

Engines may take in one or multiple input payloads.

 

**Data Structure**

**Type**

**Required**

**Description**

**Specification**

Input payload

Array of Objects

Yes

1. Input contract type (MIME type or a component type)
2. Array of payload object structures describing the content type, asset type, payload component, payload component,  identifier, etc. 

[{component/metadata-payload, payload_object1},

{component/metadata-payload,  payload_object2}]

 

#### Output Data Structures

Required data structures are data fields that are expected in every machine translation output.  This is what is returned from the engine.

Optional data structures are JSON data components that describe additional feature elements around machine translation.  These data component structures are be interchangeable as defined by the component data format. 

Engines may output one or multiple output payloads.

Fields may include, but not limited to:

 

**Data Structure**

**Type**

**Required**

**Description**

**Example or Specification**

Contract type

string

Yes

Type of output contract

contract/translation

text

Array of Objects

Yes

A JSON array of text unit objects.

component/metadata-text

confidence

Object

Optional

Confidence range of the text defined from 0 - 1.0.

component/metadata-confidence

 

 

 

 

 

 

 

Components

# component/metadata-payload

A payload object describes the content type, asset type, payload component, payload component,  identifier, etc. 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

Time-Series

Array of Objects

Yes

Array of intervals of interest corresponding to the input payload that needs to be processed

component/metadata-time-series 

Input contentType

string

Yes

MIME type describing the body type of the message format as described in [[RFC2045](https://tools.ietf.org/html/rfc2045)]

 

For transcription engines, it should be either:

- application/video
- application/audio

&ldquo;input_content_type&rdquo; : &ldquo;application/video&rdquo;

Input assetType

string

Yes

Asset type describing the payload format 

video

Payload component

Object

Yes

Component type containing the input payload for processing.

Accepts objects defined in [VTN101]

 

uri

uri

Yes

URI location of the asset

[https://test.s3.amazonaws.com/assets/23333504/f91103b0-d39c-4bb5-b248-9a6ad6c27bfe.json](https://test.s3.amazonaws.com/assets/23333504/f91103b0-d39c-4bb5-b248-9a6ad6c27bfe.json)

supportedInputFormats

Array of Strings

Optional

MIME type describing the body type of the message format as described in [[RFC2045](https://tools.ietf.org/html/rfc2045)]

"supportedInputFormats": ["audio/wav", "audio/mpeg", "audio/flac", "video/mp4", "application/json"]

MD5-Checksum

String

Optional

The MD5 hash of the uploaded file as described in [[RFC1321](https://www.ietf.org/rfc/rfc1321.txt)]

'd41d8cd98f00b204e9800998ecf8427e'

 

##  

#  

# component/metadata-interval

The interval is a universal component that provides relevant start and end times of the corresponding instance.

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

startTimeMs

number

Yes

The time in milliseconds from the beginning of the file when the instance occurs.

1360

stopTimeMs

number

Yes

The time in milliseconds from the beginning of the file when the instance ends.

1390

##  

# component/metadata-time-series

The time series is a universal component that enables time correlation of output across various classes and categories of engines.

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

interval

Objects

Yes

An interval of time object  corresponding to the payload 

&ldquo;Intervals&rdquo; :

 {

&ldquo;startTimeMs&rdquo;: 1360

&ldquo;stopTimeMs&rdquo;: 1390

}

Payload series

Array of Objects

Yes

1. Contract descriptor of payload objects
2. Data structure of component type that defines the object type that is tracked against the time series

[{

&ldquo;ContractType&rdquo;: &ldquo;contract/boundingBox&rdquo;,

"bpoly":[

  { "x": 932,

    "y": 313

  },

  {

    "x": 1028,

    "y": 313

  },

  {

    "x": 1028,

    "y": 425

  },

 {

   "x": 932,

    "y": 313

  }

]

## Sample Data Structure

//Defined here with a bounding box
{

     &ldquo;Interval&rdquo;: {

           "startTimeMs": 1360,
           "stopTimeMs": 1390

        },
    "objectSeries 2 1": { 
"bpoly": [

                                   { 

                                     "x": 932,

                                     "y": 313

                                   },

                                  {

                                      "x": 1028,

                                        "y": 313

                                  },

                                 {

                                     "x": 1028,

                                     "y": 425

                               },

                              {

                                    "x": 932,

                                    "y": 313

                             },
   ]
     }

 

# component/metadata-text-unit

The text unit provides information on the type of text output (for eg. phrase, word, phonemes etc.), the text content/description, the associated confidence of prediction, the time interval corresponding to the text the speaker id the transcription output and the associated confidence for the prediction. Confidence is a score indicating the degree to which an engine believes its word prediction is correct.  A higher number indicates a greater likelihood that the corresponding text unit is correct. 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

type

String

Yes

Type of text output (for eg. phrase, word, phonemes etc.)

&ldquo;word&rdquo;

description

String

Yes

Description of the text 

&ldquo;Hello&rdquo;

confidence

Number

No

Confidence associated with the text description. Range is between  0-100, to a maximum of 5 decimal places

92.87257

Speaker id

String

No

Name or identity of the speaker

&ldquo;caller&rdquo;

 

## Sample Data Structure

{
   &ldquo;Type&rdquo;: &ldquo;word&rdquo;,

   &ldquo;Description&rdquo;: &ldquo;Hello&rdquo;,          

   "Confidence": 92.87257

}

 

#  

# component/metadata-text

Words provides an array of text-unit objects that hold the output text of the corresponding engine.

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

type

Array of Objects

Yes

An array of text-unit objects

component/metadata-text-unit

 

# component/metadata-candidate-text

Alternate words provides an array of text-unit objects that hold the list of candidate words, that were considered for the output text.

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

type

Array of Objects

Yes

An array of text-unit objects

See sample data structure below

component/metadata-text-unit

 

## Sample Data Structure

{

    &ldquo;Type&rdquo;: &ldquo;word&rdquo;, 

     &ldquo;Description&rdquo;: &ldquo;Hello&rdquo;,          

     "Confidence": 79.88

},

{

    &ldquo;Type&rdquo;: &ldquo;word&rdquo;, 

    &ldquo;Description&rdquo;: &ldquo;Hell&rdquo;,          

    "Confidence": 10.06

},

{

    &ldquo;Type&rdquo;: &ldquo;word&rdquo;,

    &ldquo;Description&rdquo;: &ldquo;yellow&rdquo;,          

    "Confidence": 5.03}

}

{

    &ldquo;Type&rdquo;: &ldquo;word&rdquo;,

    &ldquo;Description&rdquo;: &ldquo;lowered&rdquo;,          

    "Confidence": 5.03}

}

{

       &ldquo;Type&rdquo;: &ldquo;word&rdquo;,

   &ldquo;Description&rdquo;: &ldquo;World&rdquo;,          

   "Confidence": 100

}

 

 

 

# component/metadata-detected-object

The object provides information on an object&rsquo;s location, tags, colors etc. and the associated confidence for the prediction. Confidence is a score indicating the degree to which an engine believes its object prediction is correct.  A higher number indicates a greater likelihood that the corresponding text unit is correct. 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

Object ID

String

Yes

Identifier for the object in the image

&ldquo;Dog1&rdquo;

confidence

Number

No

Confidence range defined from 0 - 1.0.

component/metadata-confidence

boundingpoly

Array of Objects

Yes

An array of co-ordinate objects that denotes a closed bounding polygon around a specific region of a digital image corresponding to the object under consideration. 

component/metadata-bounding_poly

tags

Object

No

Descriptor tags of object.  May include the ID of recognized object

component/vision-​tags

color

Object

No

Color fields will provide information about dominant and accent colors, either with text descriptors, hex codes, or rgb values.

 

component/vision-color

 

## Sample Data Structure

{
   &ldquo;Object ID&rdquo;: &ldquo;Dog1&rdquo;,      

   "Confidence": 92.87257,

   &ldquo;Interval&rdquo;:{

               &ldquo;startTimeMs&rdquo; : 1360,

               &ldquo;stopTimeMs&rdquo;: 1390

              }  

   &ldquo;boundingPoly": 

            [
              {
                "x": 932,
                "y": 313
              },
              {
                "x": 1028,
                "y": 313
              },
              {
                "x": 1028,
                "y": 425
              },
              {
                "x": 932,
                "y": 425
              },

              {
                "x": 932,
                "y": 313
               
              }

          ]

}

 

# component/metadata-face-detection

The face detection object provides information on a face&rsquo;s providing information about its location, tags, attributes, associated human face etc. along with the associated confidence for the prediction. Confidence is a score indicating the degree to which an engine believes its object prediction is correct.  A higher number indicates a greater likelihood that the corresponding text unit is correct. 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

confidence

Number

Optional

Confidence range defined from 0 - 1.0.

component/metadata-confidence

boundingpoly

Array of Objects

Yes

An array of coordinate objects that denotes a closed bounding polygon around a specific region of a digital image corresponding to the face under consideration.

 

component/metadata-bounding_poly

tags

Object

Optional

Descriptor tags of face.  May include the ID of recognized face

component/vision-​tags

Recognized face

Object

Optional

Face Recognition is the association of a detected human face (usually indicated by a bounding box) with a known &ldquo;entity".

component/vision-face-recognition

Face attributes

Object

Optional

Face Attributes relate to detected (anonymous) human face, potentially including age, gender, ethnicity, emotion, wearing glasses, wearing headwear, etc.

component/vision-face-attributes

Face landmarks

Object

Optional

Face Landmarks relate to detected (anonymous) human face, indicating the coordinates of defined &ldquo;landmark&rdquo; points such as the location of eyes, nose, and ears. 

component/vision-face-landmarks

 

## Sample Data Structure

{
         

   "Confidence": 92.87257,

   &ldquo;boundingPoly": 

             [
              {
                "x": 932,
                "y": 313
              },
              {
                "x": 1028,
                "y": 313
              },
              {
                "x": 1028,
                "y": 425
              },
              {
                "x": 932,
                "y": 425
              },

              {
                "x": 932,
                "y": 313
               
              }

           ] 

}

 

# component/metadata-confidence

The confidence value is a score indicating the degree to which an engine believes its output is a correct assertion.  A higher number indicates a greater likelihood that the output is correct. 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

confidence

Number

Yes

Confidence range defined as defined by a decimal value  from 0-100, to a maximum of 5 decimal places

92.87257

 

## Sample Data Structure

{
   "Confidence": 92.87257
}

# component/metadata-coordinates

A structure with x,y coordinate fields denoting specific points in an image.

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

x

Number

Yes

X-coordinate of the point

   "x": 932 

y

Number

Yes

y-coordinate of the point

    &ldquo;y&rdquo;: 313

#  

# component/metadata-bounding_poly

A bounding poly provides the coordinates of a multi-faceted border around a specific region of a digital image.  The bounding poly is defined by an array of x,y coordinates denoting vertices.  

 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

bpoly

Array of Objects

Yes

Array of coordinate objects with  X and Y percentage coordinates defining the outer edges  of a bounding poly.

Note: The last co-ordinate object in the array should be same as the first coordinate object in the array to confirm boundedness

See Sample Data Structure below

component/metadata-coordinates

 

## Sample Data Structure

"boundingPoly": {

            [
              {
                "x": 9.32,
                "y": 31.3
              },
              {
                "x": 10.28,
                "y": 3.13
              },
              {
                "x": 10.28,
                "y": 42.5
              },
              {
                "x": 93.2,
                "y": 4.25
              },

              {
                "x": 9.32,
                "y": 31.3
              }
            ]
          }

##  

# component/metadata-keyword

Keyword or phrase spotting enables the creation of custom groups of specific terms that will be automatically tagged when present. 

 

## Data Structure

**Keywords**

**Field Name**

**Type**

**Required**

**Description**

**Example**

keyword

String

Yes

Keyword relevance is computed by matching detected keywords and key phrases to an extensive taxonomy of potential keywords. The relevance algorithm generally produces higher scores for more frequent, closely matching, and distinctive keywords, while producing lower scores for very common keywords found in the recording.

&ldquo;subscription&rdquo;

relevance

Number

Yes

Topic relevance is computed by grouping discovered keywords into topics of interest applying a similar relevance algorithm to the aggregate.

Ranges from 0 - 1.0

0.17

mentions

Object

Yes

Mentions captures the spoken utterances.  Formatted in a JSON array oftext unit objects

See Mentions

 

 

## Sample Data Structure

&ldquo;Keyword&rdquo; : {  
   "keyword":"subscription",
   "relevance":0.17,
   "Mentions":

         [        
            {  
               "Type":&rdquo;word&rdquo;,

               "startTimeMs":34480,
               "stopTimeMs":35545,
               "Description":"subscription"
            },
            {  
               "Type":&rdquo;word&rdquo;,

               "startTimeMs":57340,
               "stopTimeMs":59034,
               "description":"membership"
            }
         ]      
}

 

 

# components/transcription-veritone-lattice-format

The Veritone Lattice Format (VLF) is a flexible JSON format that describes the lattice of confidence scores for a transcription. It can be used to denote a single or multi-path transcripts, as well as spanning words.

The output format is an object with zero-indexed keys. Each key's object represents a single utterance consisting of timing information, and a list of words. Each Word is an object that contains the specific word spoken, a Confidence and Path information.

 

## Data Structure

**Utterance**

**Field Name**

**Type**

**Description**

**Example**

startTimeMs

integer

The time in milliseconds from the beginning of the file when the utterance begins.

1360

stopTimeMs

integer

The time in milliseconds from the beginning of the file when the utterance ends.

1390

durationMs

integer

The length of the utterance in milliseconds. (stopTimeMs - startTimeMs)

30

words

array

An array of word objects.

 

index

integer

The order of the word in the transcript. This value matches the parent key.

1

 

**Word**

**Field Name**

**Type**

**Description**

**Example**

word

string

Please create a new series item for each word transcribed.

'You'

confidence

component

/metadata-confidence

See CONFIDENCE

93.23492.873

bestPathForward

boolean

True marks this word as the best path forward. (Single-path transcripts must report true.)

true

bestPathBackward

boolean

True marks this word as the best path backward. (Single-path transcripts must report true.)

true

spanningForward

boolean

True marks this word as a forward spanning word. Spanning words are words that span multiple utterances, where the number of utterances they span is described by the spanningLength field. (Single-path transcripts must report false.)

false

spanningBackward

boolean

True marks this word as a backward spanning word. Spanning words are words that span multiple utterances, where the number of utterances they span is described by the spanningLength field. (Single-path transcripts must report false.)

false

spanningLength

integer

The number of utterances this word spans. The spanning length must be at least 1. (Single-path transcripts must report 1.)

1

 

A sample representation of a VLF transcript may look like:

## ​Sample JSON Component

&ldquo;vlf&rdquo; : {
    "0": {
        "startTimeMs": 1260,
        "stopTimeMs": 1360,
        "durationMs": 100,
        "words": [
            {
                "word": "!silence",
                "confidence": 794,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "i",
                "confidence": 103,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "I",
                "confidence": 103,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 0
    },
    "1": {
        "startTimeMs": 1360,
        "stopTimeMs": 1390,
        "durationMs": 30,
        "words": [
            {
                "word": "!silence",
                "confidence": 400,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "we",
                "confidence": 102,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "We",
                "confidence": 102,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "you",
                "confidence": 100,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "You",
                "confidence": 100,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "it",
                "confidence": 98,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "It",
                "confidence": 98,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 1
    },
    "2": {
        "startTimeMs": 1390,
        "stopTimeMs": 1950,
        "durationMs": 560,
        "words": [
            {
                "word": "might",
                "confidence": 903,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "Might",
                "confidence": 67,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "minute",
                "confidence": 30,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": true,
                "spanningBackward": false,
                "spanningLength": 2
            }
        ],
        "index": 2
    },
    "3": {
        "startTimeMs": 1950,
        "stopTimeMs": 2150,
        "durationMs": 200,
        "words": [
            {
                "word": "not",
                "confidence": 903,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "minute",
                "confidence": 30,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": true,
                "spanningLength": 1
            }
        ],
        "index": 3
    },
    "4": {
        "startTimeMs": 2150,
        "stopTimeMs": 2520,
        "durationMs": 370,
        "words": [
            {
                "word": "remember",
                "confidence": 1000,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 4
    },
    "5": {
        "startTimeMs": 2520,
        "stopTimeMs": 2850,
        "durationMs": 330,
        "words": [
            {
                "word": "us",
                "confidence": 1000,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 5
    }
}

 

 

# component/​metadata-topics

Topics are reported by grouping a set of keywords that relate to each other.

 

## Data Structure

**Topics**

**Field Name**

**Type**

**Required**

**Description**

**Example**

topicName

String

Yes

Topics are reported by grouping a set of keywords that relate to each other.

"Solar energy"

subTopics

Array of Strings

Yes

Subtopics are an array of associated subtopics

[&ldquo;panels&rdquo;, &ldquo;electricity&rdquo;]

relevance

Number

Yes

Topic relevance is computed by grouping discovered keywords into topics of interest applying a similar relevance algorithm to the aggregate.

Ranges from 0 - 1

0.17

keywords

Object

Yes

Keywords are an array of associated relevant keyword objects.  

Keywords may contain relevance/confidence, mentions that contain information on the speaker, and timestamps.

"solar power"

component/transcription-keyword

 

## Sample Data Structure

&ldquo;topics&rdquo;: {  
   "topicName":"Solar energy",
   "subTopics":[  

   ],
   "relevance":0.004,
   "keywords":[  
      {  
         "keyword":"solar power",
         "relevance":0.17,
         "mentions":[  
                  {  

                     "Type": &ldquo;word&rdquo;   
                     "startTimeMs":34480,
                     "stopTimeMs":35545,
                     "Description":"solar power"
                  },
                  {  

                     "Type": &ldquo;word&rdquo;
                     "startTimeMs":57340,
                     "stopTimeMs":59034,
                     "Description":"solar energy"
                  },
                  {  

                      "Type": &ldquo;word&rdquo;
                      "startTimeMs":40010,
                      "stopTimeMs":42100,
                      "Description":"solar power"
                  }
              ]
      },
      {  
         "keyword":"solar water heating",
         "relevance":0.17,
         "mentions":[  
                  {  

                     "Type": &ldquo;word&rdquo;
                     "startTimeMs":134480,
                     "stopTimeMs":135545,
                     "Description":"solar water heater"
                  },
                  {  

                     "Type": &ldquo;word&rdquo;   
                     "startTimeMs":157340,
                     "stopTimeMs":159034,
                     "Description":"solar thermal collector"
                  }
               ]
       }

     ]

}

#  

# component/vision-​tags

Tags are a basic component that can be utilized by many types of general and specialized object recognition engines, including those focused on Vehicles, Landmarks, Apparel, Food, etc.

Tags can also be used to identify content as potentially offensive, adult content, or with &ldquo;suitable for&rdquo; ratings based on a classification hierarchy.

The Scene object is a text descriptor of an image overall, as opposed to individual elements of the image.  Also sometimes referred to as a &ldquo;caption&rdquo;.  May also be accompanied by time series data to depict changes in scenes.

Tags can be also be associated with a unique machine-generated ID and/or an application ID.  They are usually accompanied by a Confidence score.

 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

name

string

Yes

Description of object

&ldquo;Convertible&rdquo;

confidence

object

No

Confidence of the detected tag

component/metadata-confidence

 

## Sample Data Structure

"tags": [
    {
      "name": "sports_car", 
      "confidence": 0.56022
    },
    {
      "name": "grille",
      "confidence": 0.21198
    },
    {
      "name": "banana",
      "confidence": 0.13552
    },
    {
      "name": "female nudity",
      "confidence": 0.06006
    },
    {
      "scene": "woman eating in a convertible car",
      "confidence": 0.06006
    },

  ],

# component/vision-color

Color fields will provide information about dominant and accent colors, either with text descriptors, hex codes, or rgb values.

 

## Data Structure

**Concepts**

**Field Name**

**Type**

**Required**

**Description**

**Example**

dominantColor

String

Yes

Text description of dominant colors in an image

&ldquo;Brown&rdquo;

accentColor

String

Yes

Text description of secondary colors in an image

&ldquo;Black&rdquo;

dominantHex

String

Yes

Hex code of dominant colors in an image

&ldquo;873B59&rdquo;

accentHex

String

Yes

Hex code of secondary colors in an image

&ldquo;B6587D&rdquo;

 

rgbColor

Number

Yes

Value from 0-255 for red, green, blue

42

pixelFraction

Number

Yes

% of total pixel count associated with a color

&ldquo;0.15197733&rdquo;

isBW

Boolean

Yes

Denotes whether an image is black & white

&ldquo;false&rdquo;

 

## Sample Data Structure

"color": {
    "dominantColor": "Brown",
    "accentHex": "873B59",
    "isBW": false,
    "rgbColor": {
                "red": 69,
                "green": 42,
                "blue": 27
              },

     "pixelFraction": 0.14140345
  }

 

# component/vision-ocr

OCR (Optical Character Recognition) returns a string of alphanumeric characters identified in a video frame or image.

License plate engines primarily use OCR to return numbers and characters in a format specific to plates of a certain state, country or region.

 

## Data Structure

**Concepts**

**Field Name**

**Type**

**Required**

**Description**

**Example**

ocrText

String

Yes

A string of alphanumeric characters 

HelloWorld

licPlate

String

Yes

A string of alphanumeric characters indicative of a license plate number

627WWI

licPlateRegion

String

Yes

State or Country

&ldquo;WA&rdquo;

 

## Sample Data Structure

&ldquo;ocr&rdquo; = { 

    &ldquo;ocrText&rdquo;: &ldquo;Hello World&rdquo;,

    "confidence": 94.06169,

}

&ldquo;Ocr&rdquo; = {
      "licPlate": "627WWI",
      "confidence": 94.06169,

      "licPlateRegion": "wa"
      "confidence": 83.98728,
      },
      

# component/vision-face-recognition

Face Recognition is the association of a detected human face (usually indicated by a bounding box) with a known &ldquo;entity&rdquo;, e.g. a public person in a general or &ldquo;celebrity&rdquo; model or a reference person in a private face library.

 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

id

Object

Yes

An object identifying Unique ID of the face

 

component/vision-face-recognition-id

FaceDetInfo

Object

No

A face-detection object providing information about its location, tags, id, attributes, associated human face etc. 

 

component/face-detection

 

# component/vision-face-recognition-id

Face Recognition is the association of a detected human face (usually indicated by a bounding box) with a known &ldquo;entity&rdquo;, e.g. a public person in a general or &ldquo;celebrity&rdquo; model or a reference person in a private face library.

 

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

id

String

Yes

Unique ID of JSON object

&ldquo;3Ir0du6&rdquo;

name

String

Yes

Identity of face recognized

&ldquo;Jeff Bezos&rdquo;

refURL

String

Yes

Associated reference URL for a given &ldquo;name&rdquo;

&ldquo;[www.imdb.com/name/nm1757263](http://www.imdb.com/name/nm1757263)&rdquo;

 

## Sample Data Structure

        "id": "3Ir0du6",
        "Name": "Jeff Bezos",
        "refUrl": ["[www.imdb.com/name/nm1757263](http://www.imdb.com/name/nm1757263)"]

# component/vision-face-attributes

Face Attributes relate to detected (anonymous) human face, potentially including age, gender, ethnicity, emotion, wearing glasses, wearing headwear, etc.

Additional optional attributes include the pose of the face as denoted by pitch, roll, and yaw - measured in degrees.

 

## Data Structure

 

**Field Name**

**Type**

**Required**

**Description**

**Example**

gender

String

Yes

Male, Female, Neutral

&ldquo;male&rdquo;

age

Number

No

Estimated age or range

&ldquo;24&rdquo;

emotion

String

No

Emotional state of face

&ldquo;happiness&rdquo;

emotionsAll

Array of numbers

No

Array of possible emotions with a score for each

&ldquo;0.9998&rdquo;

ethnicity

String

No

Emotional state of face

&ldquo;Asian&rdquo;

ethnicityAll

Array of Numbers

No

Array of possible ethnicities with a score for each

&ldquo;0.6654&rdquo;

pitch

Number

No

Orientation of face up/down

&ldquo;5.9531&rdquo;

roll

Number

No

Orientation of face tilt left or right

&ldquo;19.2621&rdquo;

yaw

Number

No

Orientation of face turn left or right

&ldquo;6.7148&rdquo;

 

## Sample Data Structure

 "faceAttributes": {
        "pose": {
          "pitch": 5.9531,
          "roll": 19.2621,
          "yaw": 6.7148
        },
        "gender": "male",
        "Confidence": 0.9858,
        "age": 24,
        "Confidence": 0.8013,
        "emotion": "happiness",
        "Confidence": 0.9998,
        "emotionsAll": {
          "neutral": 0.0001,
          "sadness": 0,
          "disgust": 0,
          "anger": 0,
          "surprise": 0,
          "fear": 0,
          "happiness": 0.9998
        },
        "ethnicity": "Asian",
        "Confidence": 0.92345,
        "ethnicityAll": {
          "Asian": 0.92345,
          "Black": 0,
          "Hispanic": 0.6654,
          "White": 0,
        }

# component/vision-face-landmarks

Face Landmarks relate to detected (anonymous) human face, indicating the coordinates of defined &ldquo;landmark&rdquo; points such as the location of eyes, nose, and ears. 

 

## Data Structure

**Concepts**

**Field Name**

**Type**

**Required**

**Description**

**Example**

type

String

Yes

Defined Face Landmark

&ldquo;eyeLeft&rdquo;

co-ordinate

Object

Yes

The X coordinate of the landmark center

{

&ldquo;X&rdquo;:0.2837241,

&ldquo;Y&rdquo;:0.363710

}

component/metadata-coordinates

 

## Sample Data Structure

"Landmarks": [

            {
                "Type": "eyeLeft",
                &ldquo;Co-ordinate&rdquo;:{

                    "X": 0.2837241291999817,
                    "Y": 0.3637104034423828

                } 
            }, {
                "Type": "eyeRight",

                 &ldquo;Co-ordinate&rdquo;:{

                    "X": 0.4091649055480957,
                    "Y": 0.37378931045532227

                 }  
            }, {
                "Type": "nose",
                &ldquo;Co-ordinate&rdquo;:{

                    "X": 0.35267341136932373,
                    "Y": 0.49657556414604187

                 } 
            }, {
                "Type": "mouthLeft",

                &ldquo;Co-ordinate&rdquo;:{

                    "X": 0.2786353826522827,
                    "Y": 0.5455248355865479

                 } 

            }, {
                "Type": "mouthRight",

                &ldquo;Co-ordinate&rdquo;:{

                    "X": 0.39566439390182495,
                    "Y": 0.5597742199897766

                 }  

            }

         ]

# component/vision-gestures

Gestures are an object type indicating the position of human hands meant to denote or communicate a concept.  

The value of each field is a floating-point number with 3 decimal places between [0,100]. The sum of these values are 100.

 

## Data Structure

**Concepts**

**Field Name**

**Type**

**Required**

**Description**

**Example**

handGesture

object

Yes

Human hand gestures

- unknown

- heart_a
- heart_b
- heart_c
- heart_d
- ok
- hand_open
- thumb_up
- thumb_down
- rock
- namaste
- palm_up
- fist
- index_finger_up
- double_finger_up
- victory
- big_v
- phonecall
- beg
- thanks

 

&ldquo;rock&rdquo;

 

## Sample Data Structure

"handGesture": {
"unknown": 0.000
"heart_a": 99.000
"heart_b": 1.000
"heart_c": 0.000
"heart_d": 0.000
"ok": 0.000
"hand_open": 0.000
"thumb_up": 0.000
"thumb_down": 0.000
"rock": 0.000
"namaste": 0.000
"palm_up": 0.000
"fist": 0.000
"index_finger_up": 0.000
"double_finger_up": 0.000
"victory": 0.000
"big_v": 0.000
"phonecall": 0.000
"beg": 0.000
"thanks": 0.000
}

 

# component/translation-text

Text translation will transform written words from one language into another language.  

 

## Data Structure

**Concepts**

**Field Name**

**Type**

**Required**

**Description**

**Example**

translatedText

string

Yes

Translated Text

&ldquo;Hallo Welt&rdquo;

detectedSourceLanguage

string

Yes

Code for the detected starting language

&ldquo;en&rdquo;

 

## Sample Data Structure

"translations": [

      {

        "translatedText": "Hallo Welt",

        "detectedSourceLanguage": "en"

      },

 

# Processs

Interoperability of cognitive engines

Interoperability provides as input to an engine, other engine(s) outputs within the Veritone processing workflow, in a process we call &ldquo;chained cognition.&rdquo; This chained cognition serves the basis for improving the accuracy, coverage and scope of the overall cognition process. ** **The chaining is achieved by extending the output contracts of each of the engines with a field capable of storing an array of &lsquo;link&rsquo; objects, collectively referred to as the Relationships component. A link object as part of a given engine&rsquo;s output payload stores the output payload ids of other engines related to it.

Additionally, the Relationships field is made optional and selectively made available to the different engine vendors. 

**Data Structure**

**Type**

**Required**

**Description**

**Example or Specification**

Contract type

string

Yes

Type of output contract

contract/transcription

ObjectInfo

Array of Objects

Yes

An array of object recognition objects providing information about its location, tags, colors etc. 

component/metadata-detected-object

Relationships

Array of Objects

Yes

An array of link objects providing information of related engine payloads using their ids and types

component/metadata-link

 

# component/metadata-link

A link objects provides information of related engine output payloads by storing their ids and types

## Data Structure

**Field Name**

**Type**

**Required**

**Description**

**Example**

LinkType

string

Yes

Type of link

Eg. Input for input payload, sibling for related engine output payloads

ID

uri

Yes

Uri of the output payload structure

[https://s3.amazon.com/uuid/a24905u20395h23990](https://s3.amazon.com/uuid/a24905u20395h23990)

ToType

string

Yes

The data type associated with the output payload structure

contract/transcription

## Example:

### Objective:

To detect speaker ids and speaker turns in a video recording.

### Scenario:

A video clip shows an interviewer interviewing two people with a handheld microphone. 

**Event Index**

**Start Time**

**End Time**

**Event Description**

1

1360

1390

Person1 speaks. Microphone1 held closer to Person1&rsquo;s face

2

1390

1600

Person2 speaks. Microphone1 moved closer to Person2&rsquo;s face

 

### Approach:

Use a combination of transcription engine&rsquo;s speaker diarization,object detection engine&rsquo;s object position detection and face detection engine&rsquo;s face position detection the speaker turns/speaker id estimation accuracy is improved. 

### Transcription Output Payload:

```json
{  
   "Type":"contract/transcription",
   "id":"[https://s3.amazon.com/uuid/a24905u20395h23jr](https://s3.amazon.com/uuid/a24905u20395h23jr)",
      "Relationships":[  
      { 

          "LinkType":&rdquo;input&rdquo;,
          "ToType":"contract/transcription-input",
          "id":"[https://s3.amazon.com/uuid/a24905u20395h22352](https://s3.amazon.com/uuid/a24905u20395h22352)"
      },

      {  
         "LinkType":&rdquo;sibling&rdquo;,

         "ToType":"contract/face-det",
         "id":"[https://s3.amazon.com/uuid/a249052342395h22657](https://s3.amazon.com/uuid/a249052342395h22657)"

         

            },
      {  

         "LinkType":&rdquo;sibling&rdquo;,
         "Type":"contract/object-det",
         "id":"[https://s3.amazon.com/uuid/a24905u20395h23990](https://s3.amazon.com/uuid/a24905u20395h23990)"
      }
   ],
   "text":[  
      {  

         "Interval":{  
            "startTimeMs":1360,
            "stopTimeMs":1390
         },
         "Type":"phrase",
         "Description":"Yes this is the way it should be",
         "Confidence":92.87257,
         "Speaker ID":"1"
      },
      { 

         "Interval":{  
            "startTimeMs":1390,
            "stopTimeMs":1600
         },  
         "Type":"phrase",
         "Description":"I completely agree. Everything adds up",
         "Confidence":90.12345,
         "Speaker ID":"2"
      }
   ]
}
```

### Object Detection Output Payload:

```json
{ 

       "Type": "contract/object-det",
       "id"        : "[https://s3.amazon.com/uuid/a24905u20395h23990](https://s3.amazon.com/uuid/a24905u20395h23990)",
       &ldquo;Relationships&rdquo;: [ 

                   {

                    "LinkType": &rdquo;input&rdquo;,  

                    "ToType": "contract/object-det-input",

                    "id"  : "[https://s3.amazon.com/uuid/a24905u2gje353867](https://s3.amazon.com/uuid/a24905u2gje353867)"

                   },

                   {

                     "LinkType":&rdquo;sibling&rdquo;,  

                     "ToType": "contract/transcript",
                     "id" : "[https://s3.amazon.com/uuid/a24905u20395h23jr](https://s3.amazon.com/uuid/a24905u20395h23jr)"

                   },
                   {

                     "LinkType":&rdquo;sibling&rdquo;,   

                     "ToType": "contract/face-det",
                     "id" :"[https://s3.amazon.com/uuid/a249052342395h22657](https://s3.amazon.com/uuid/a249052342395h22657)"

                   }
                ]

   "ObjectInfo": [

                  {
                      "Object ID": "Mic1",      
                      "Confidence": 92.87257,
                      "Interval":{

                                   "startTimeMs" : 1360,
                                   "stopTimeMs": 1390
                                 },  
   "boundingPoly": {

             [
               {
                 "x": 932,
                 "y": 313
               },
               {
                 "x": 935,
                 "y": 313
               },
               {
                 "x": 935,
                 "y": 315
               },
               {
                 "x": 932,
                 "y": 315
               },
               {
                 "x": 932,
                 "y": 313  
               }

             ]
       },
       {
            "Object ID": "Mic1",      
            "Confidence": 92.87257,
            "Interval":{

                    "startTimeMs" : 1390
                    "stopTimeMs": 1600
                  },  
            "boundingPoly": {

                  [
                      {
                         "x": 1932,
                         "y": 313
                      },
                      {
                         "x": 1935,
                         "y": 313
                      },
                      {
                         "x": 1935,
                         "y": 315
                      },
                      {
                         "x": 1932,
                         "y": 315
                      },
                      {
                         "x": 1932,
                         "y": 313
                      }

                 ]
          } 
     ]
}
```

### Face Detection Output Payload:
```json
{
     "Type": "contract/face-det-det",
     "id":   "[https://s3.amazon.com/uuid/a249052342395h22657](https://s3.amazon.com/uuid/a249052342395h22657)",

     &ldquo;Relationships&rdquo;: [

               {

                "LinkType": &rdquo;input&rdquo;,   

                "ToType": "contract/face-det-input",

                "id"  : "[https://s3.amazon.com/uuid/a24905234r4783654375](https://s3.amazon.com/uuid/a24905234r4783654375)"

              },  

               {

                  "LinkType": &rdquo;sibling&rdquo;,

                  "ToType": "contract/transcript",
                  "id" : "[https://s3.amazon.com/uuid/a24905u20395h23jr](https://s3.amazon.com/uuid/a24905u20395h23jr)"

               },
               {

                  "LinkType": &rdquo;sibling&rdquo;,

                  "ToType": "contract/object-det",
                  "id" : "[https://s3.amazon.com/uuid/a24905u20395h23990](https://s3.amazon.com/uuid/a24905u20395h23990)"

               }
             ]

       &ldquo;FaceDetInfo&rdquo;: [

            {
            "Confidence": 92.87257,
            "Interval":{

                         "startTimeMs" : 1360,
                         "stopTimeMs": 1600
                       },  

            "boundingPoly": {

                      [
                         {
                           "x": 1000,
                           "y": 313
                         },
                         {
                           "x": 1028,
                           "y": 313
                         },
                         {
                           "x": 1028,
                           "y": 425
                         },
                         {
                           "x": 1000,
                           "y": 425
                         },
                         {
                           "x": 1000,
                           "y": 313
                         }

                      ]
             },
             
             {
                    "Confidence": 92.87257,
        "Interval":{

                    "startTimeMs" : 1360,
                    "stopTimeMs": 1600
                  }  
   "boundingPoly": {

                 [
                   {
                     "x": 2000,
                     "y": 313
                   },
                   {
                     "x": 1028,
                     "y": 313
                   },
                   {
                     "x": 1028,
                     "y": 425
                   },
                   {
                     "x": 2000,
                     "y": 425
                   },
                   {
                     "x": 2000,
                     "y": 313
                   }

                 ]
           }

        ]
}
```
