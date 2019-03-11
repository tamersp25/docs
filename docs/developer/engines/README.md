# Building Engines

**Engines** are the main unit of cognitive computing in aiWARE.
Engines are discreet units of code that process data using various algorithms or machine learning techniques.
Within aiWARE's engine processing architecture, engines are primarily implemented as Docker containers.

Developers can extend aiWARE's capabilities and add their own logic by writing their own custom engines and pushing them to Veritone Developer as Docker containers.

> Notes on Docker container support:
> - aiWARE is able to leverage engines that require GPU computing by specifying the required architecture in the `gpuSupported` field of the [engine manifest](/developer/engines/standards/engine-manifest/).
> - Windows Docker containers are not supported by aiWARE at this time.

<!--TODO: Add other legacy pages in with deprecated flag and no place in the TOC-->

## Engine Types {docsify-ignore}
There are three main types of engines in aiWare: adapters (a.k.a ingestion engines), cognitive engines, and aggregator engines.

### Adapters (a.k.a. Ingestion Engines)
[Adapters](/developer/adapters/), also known as ingestion engines, bring data from other sources into aiWare.
The data can either be a real-time stream or a bounded file, and can be structured or unstructured.
Once the data is in aiWare, it can be processed by cognitive engines to derive insights for your end users.

> In the GraphQL API, adapters are identified as engines where `EngineType=Ingestion`

The are two types of adapters: `pull` and `push`.

#### Pull Adapter
A **pull adapter** retrieves data from a source, typically a URI, and brings it into aiWare.
An example of a pull adapter is an RSS feed scraper that checks for updates to the RSS feed each hour.
Most adapters are pull adapters.

#### Push Adapter
A **push adapter** is an engine that listens for data sent to it from an external source and brings it into aiWare.
An example of a push adapter a WebRTC server that records from a WebRTC connection in real-time.

Veritone provides several pull adapters that are available to all users, including some to pull content from Amazon S3, YouTube, Google Drive, Box, Dropbox, RSS and FTP.
There is also a File Upload adapter that allows you to select a file from your personal computer.

> For information on building adapters, see the [Building Adapters](/developer/adapters/) guide.  

### Cognitive Engines

[](cognitive/_summary.md ':include')

#### Classes
[Engine classes](/developer/engines/cognitive/?id=classes) refer to the class of information the cognitive engine analyzes.
They include speech, text, vision, biometrics, audio, data, and transformation.

#### Capabilities
[Engine capabilities](/developer/engines/cognitive/?id=capabilities) refer to what type of information the cognitive engine outputs.
Each engine class has multiple capabilities.
For example, some capabilities under the vision class include object detection, text recognition, and license plate recognition. 

> For a full list of engine classes and capabilities currently supported by aiWARE, see the guide to [Building a Cognitive Engine](/developer/engines/cognitive/).

### Aggregator Engines
**Aggregator engines** consolidate the outputs from all the cognitive engines run within a job and create a new output data set for use in aiWare.
While the inputs to cognitive engines come from a single source (usually the ingested data from an adapter or the output from another cognition engine) the inputs to aggregator engines come from multiple sources.
An aggregator can either be intracategory (processing results from a single cognition capability) or intercategory (working across two or more capabilities).

Below is a sample pipeline that includes an intracategory aggregator engine at the end.

1. Ingest audio stream (Adapter)
2. Transcribe audio using a cloud engine provider A (Cognitive)
3. Transcribe audio using a cloud engine provider B (Cognitive)
4. Transcribe audio using a cloud engine provider C (Cognitive)
5. Select the best result from all 3 transcripts (Aggregator)

> Aggregator engines are currently not available to deploy through Veritone Developer.
If you feel you have a use case for an aggregator engine please [contact us](mailto:ecosystem@veritone.com) to discuss.

<!--TODO: Visual Guide to onboarding UI workflow-->
<!--A visual walkthrough of the onboarding process up to approval, use the existing UI until the new mocs are ready-->
