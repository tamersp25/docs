# Glossary of Terms

This section includes definitions of common words and phrases that you will encounter when learning about aiWARE.


#### Adapter
> A [docker](#docker) container that ingests data from an external source and provides the extract, transform, load (ETL) logic to import that data into aiWARE.
Data may be in the form of a file or [stream](#stream-engine-mode).
More information can be found in the [adapters](developer/adapters/) section of this site.

#### Aggregator Engine
> A [docker](#docker) container that collects related data to organize it.
**Aggregator Engines** process the output from one or more other engines.

#### aiWARE
> The brand name of Veritone's AI operation system (or platform).

#### API
> An API specifies how software components can be interacted with programmatically.
Veritone's primary application programming interface (API) is a [GraphQL](#graphql) interface.
It is located at https://api.veritone.com/v3/graphql and can be accessed just like other HTTP APIs (e.g. REST) with POST requests.
More information can be found in the [APIs](apis/) section of this site.

#### Application
> In aiWARE, a bundle of software that can be installed into an organization and provisioned to users.
An application usually has a URL, may call aiWARE's [API](#api), may process ingest data using [adapters](#adapter) or process data using [engines](#engine), 
and may define particular data structures through [schemas](#schema).
More information can be found in the [applications](developer/applications/) section of this site.

#### Build
> An uploaded [docker](#docker) container containing the code for a particular version of an [engine](#engine).

#### Capabilities
> Abilities of AI with analogs to human senses and cognition (e.g. natural language processing, object detection, face recognition).

#### Classification
> In data science, the act of determining to what group a certain observation belongs.
For example, determining if an image is of an object, animal or person.

#### Cognition
> The mental act or process by which knowledge is acquired, including perception, intuition, and reasoning.
**Cognitive Engines** process data in a way that mimics the functioning of the human brain to extract value or insight from unstructured data.

#### Data Science
> A study which deals with identification, representation and extraction of meaningful information from data sources to be used for business purposes.

#### Dataset
> In data science, a collection of data used to [train an engine](#training).

#### Detection
> The process of determining *where* an object is in unstructured data.
For example, finding the faces in an image.
This is distinct from [recognition](#recognition) which determines which thing is in the unstructured data. 

#### Docker
> A computer program that performs operating-system-level virtualization, also known as "containerization".
See [docker.com](https://www.docker.com/).

#### Engine
> An algorithm that takes some data in and outputs some insights or calculations regarding that data.
Veritone has three main types of engines: [cognition](#cognition), [aggregator](#aggregator-engine), and [ingestion](#ingestion).
More information can be found in the [engines](/developer/engines/) section of this site.

#### Engine Processing Mode
> The way in which an engine consumes data: either by [segment](#segment-engine-mode) or by [stream](#stream-engine-mode).

#### Entity
> A record of a defined concept, such as a person, company, organization, advertising campaign, type of object, etc. in a [library](#library).
Each entity is given an ID, which can be referenced by engines and other parts of aiWARE.
Each entity can have one or more identifiers (i.e. picture of a face, audio clip) that can be used to train engines to find that entity.

#### GraphQL
> A query language for APIs and a runtime for fulfilling those queries with your existing data.
See [graphql.org](https://graphql.org/) for more information.

#### Ingestion
> Refers to bringing external data into aiWARE where it can be processed.
[Adapters](#adapter) are docker containers that ingest data into aiWARE.
Data may be in the form of a file or [stream](#stream-engine-mode).

#### Job
> A list of [tasks](#task) to run against a piece of data.

#### Library
> A collection of named [entities](#entity), along with files that act as identifiers for those entities.
Libraries allow engines to tag their results with entity IDs that point to a specific person, place, thing, etc. rather than just using textual descriptions.
To make an engine aware of a library, it must be [trained](#training) against that library.
More information can be found in the [libraries](developer/libraries/) section of this site.

#### Manifest
> A JSON-formatted text file that describes the characteristics of an engine [build](#build).

#### Natural Language Processing
> A branch of AI that understands, interprets and manipulates human language.

#### Optical Character Recognition (OCR)
> The ability of a program to identify characters and words in unstructured data.

#### Orchestration
> The automated arrangement, coordination, and management of computer systems, middleware, and services.
In aiWARE, this predominantly refers to the coordination of multiple engines to accomplish a common task.

#### Predictive Modeling
> Exploiting patterns found in historical and transactional data to identify risks and opportunities in future data.

#### Real-Time Processing
> Processing data and returning results without significant delay.

#### Recognition
> The process of determining *which* object is in some unstructured data.
For example, whose face is in the image?
This is distinct from [detection](#detection) which determines where an object is.

#### Schema
> A definition of the structure a piece of structured data must conform to.
In aiWARE, schemas can be registered in Veritone Developer and are written using [json-schema](https://json-schema.org/).
See the [data](developer/data/) section of this documentation for more information.

#### Segment Engine Mode
> An engine processing mode that accepts a discrete "chunk" of data (i.e. file, video frame, audio segment).

#### Sentiment Analysis
> Determines the attitude, contextual polarity or emotional reaction of a speaker or writer with respect to some topic, document, interaction or event. 

#### Stream Engine Mode
> An engine processing mode that accepts the raw byte stream of incoming data.
Because it accepts the full byte stream, it can save some state and output results based on past behavior.

#### Structured Data
> Refers to data that resides in a recognizable structure (e.g. relational databases and spreadsheets).
In aiWARE, structured data often conforms to a known [schema](#schema).
AI attempts to mine meaning in unstructured data and produce structured data results.

#### Task
> A request for a single [engine](#engine) to be run against a piece of data.
A task also includes all the parameters, [libraries](#library), and other configuration needed to run the cognition properly.

#### Training
> The technique of giving an engine a [dataset](#dataset) or [library](#library) that will "teach" the engine to produce better or more specific results.

#### Training Model
> Data generated during an engine's training step.
The model is (in some cases) provided to an engine when the engine is run.
A model can optionally contain a file representing the model data.
For example, a face recognition engine trained on a [library](#library) of people [entities](#entity) might generate a model as a file containing all the maps of face hashes to entity IDs.
When a picture of a face is passed to the engine - along with the library of people specified in the task's payload - 
the training model (and its associated asset) would be used by the engine to return the correct entity ID. 

#### Unstructured Data
> Any data that does not have a parsable structure.
It is unorganized and raw and can be non-textual or textual.
Video, images, and audio recordings, text documents, and PDFs are all examples of unstructured data.
