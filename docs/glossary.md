# Glossary of Terms

This section includes definitions of common words and phrases that you will enocunter in the **Engines** section.


#### Adapter
> A docker container that ingest data from an external source and provides the extract, transform, load (ETL) logic to import that data into aiWARE.
Data may be in the form of a file or stream.

#### Aggregator
> A docker container that collects related data to organize it.
**Aggregator Engines** process the output from one or more engines.

#### aiWARE
> The brand name of Veritone's AI operation system (or platform).

#### API
> Veritone's primary Application Program Interface (API) is a GraphQL REST interface.
Basically, an API specifies how software components should interact.

#### Build
> An uploaded docker container containing the code for a particular version of an [engine](#engine).

#### Capabilities
> Abilities of AI with analogs to human senses and cognition: speech, text, vision, biometrics, audio, data, transformation, etc.

#### Classification
> The act of determining to what group a certain observation belongs.
For example, determining if an image is of an object, animal or person.

#### Cognition
> The mental act or process by which knowledge is acquired, including perception, intuition, and reasoning.
**Cognitive Engines** process data in a way that mimics the functioning of the human brain to extract value or insight from unstructured data.

#### Data Science
> A study which deals with identification, representation and extraction of meaningful information from data sources to be used for business purposes.

#### Dataset
> A collection of high-quality, organized and labeled data used to train machine learning engines.

#### Detection
> Distinct from [Recognition](#recognition) *which*, detection determines *where* an object is in unstructured data.
For example, finding the faces in an image.

#### Docker
> A computer program that performs operating-system-level virtualization, also known as "containerization".
See [docker.com](https://www.docker.com/).

#### Engine
> A processing algorithm that performs some transformation on data.
Veritone has three types of engines: Aggregator, Cognition and Ingestion.

#### Engine Training
> The technique of giving an engine a [dataset](#dataset) that will "teach" the engine to (ideally) produce better results.

#### Engine Processing Mode
> The way in which an engine can consume data: [segment](#message-mode) or [stream](#stream-mode).

#### Entity
> Represents an aggregation of assets (Entity Identifiers) for a defined concept, such as a person, company, organization, advertising campaign, type of object, etc.

#### GraphQL
> A query language for APIs and a runtime for fulfilling those queries with your existing data.

#### Ingestion
> Refers to bringing external data into the Veritone platform where it can be processed.
[Adapters](#adapter) are docker containers that ingest data into aiWARE.
Data may be in the form of a file or stream.

#### Job
> A list of [Tasks](#task) to run against a piece of data.

#### Manifest
> A JSON-formatted text file that describes the aspects of an engine [build](#build).

#### Natural Language Processing
> A branch of AI that understands, interprets and manipulates human language.

#### OCR
> Optical Character Recognition is the ability of a program to identify characters and words in unstructured data.

#### Orchestration
> The automated arrangement, coordination, and management of computer systems, middleware, and services.
Here, this would predominantly reference the coordination of engines.

#### Predictive Modeling
> Exploits patterns found in historical and transactional data to identify risks and opportunities in future data.

#### Real-Time Processing
> Basically, processing data and returning results without significant delay.

#### Recognition
> Distinct from [Detection](#detection) *where*, recognition identifies *which* object is in the unstructured data.
For example, whose face is in the image.

#### Segment Engine Mode
> An engine processing mode that accepts a discrete chunk of data (i.e. file, video frame, audio segment).

#### Sentiment Analysis
> Determines the attitude, contextual polarity or emotional reaction of a speaker or writer with respect to some topic, document, interaction or event. 

#### Stream Mode
> An engine processing mode that accepts a time-based series of data.

#### Structured Data
> Refers to data that resides in a recognizable structure (relational databases and spreadsheets). AI attempts to mine meaning in unstuctured data and produce structured data.

#### Task
> A request for a single engine to be run against a piece of data.
A task also includes all the parameters, libraries, and other configuration needed to run the cognition properly.

#### Training Model
> Data generated during an engine's training step.
The model is (in some cases) provided to an engine when the engine is run.
A model can optionally contain an asset representing the model data.
For example, a face recognition engine trained on a library of people might generate a model with an asset containing all the maps of face hashes to entity IDs.
When a picture of a face is passed to the engine - along with the library of people specified in the task's payload - 
the training model (and its associated asset) would be used by the engine to return the correct entity ID. 

#### Unstructured Data
> Any data that does not have a parsable structure.
It is unorganized and raw and can be non-textual or textual.
Video, images, and audio recordings, text documents, and PDFs are all examples of unstructured data.
