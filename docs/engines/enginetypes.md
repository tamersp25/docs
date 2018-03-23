<!-- ---
title: Engine Types
--- -->

#### Overview

The Veritone Developer Application now supports two types of engines: cognition and ingestion. The basic process for registering each engine type is the same, but there are some differences in how each of these engine types function.

##### Cognition

Cognitive engines process data, often using sophisticated algorithms and machine learning techniques, to derive cognitive insights from the data or to transform it for use by another cognitive engine or application. Within the Veritone platform, cognitive engines are assigned into various [classes and categories](/engines/classes).

Cognitive engines can work in real-time or batch mode on the Veritone platform. Real-time engines should be packaged as microservices so that they can be bought up quickly to process data in the form of a stream segment or chunk (e.g., an image or a frame from a stream).

Cognitive engines are the workhorses of the Veritone platform. If you have a new cognitive engine, you can register it under the Engines section of the Veritone Developer App. Just be sure to select the engine type of _Cognition_.

##### Ingestion

Ingestion engines are also known as adapters, and we'll often use the term adapter to refer to ingestion engines. Adapters are engines that bring data into the Veritone platform. The data can be in the form of a real-time stream or a bounded file and can be comprised of either structured or unstructured data.

Veritone provides several adapters in our platform which are available to all users, including adapters to ingest content from Amazon Web Services S3, YouTube, Google Drive, Box, Dropbox, RSS, and FTP and a File Upload adapter which allows you to select a file from your personal computer. Once the data is ingested within the Veritone platform, they can then be processed by cognitive engines to derive insights for end users.

If you need to ingest data from a source that isn't currently available in Veritone or if you require certain functionality during ingestion that isn't supported now, you can build your own custom adapter and register it under the Engines section of the Veritone Developer Application. Just be sure to select the engine type of _Ingestion_.
