# Working with Structured Data

The Veritone Developer platform supports structured data.
Together with other capabilities for unstructured data, the Veritone platform can process and transform a vast swath of the world's data, to extract actionable intelligence for our users.

## Background

Structured data is data with well-defined fixed fields, which usually can be stored in relational databases and is readily indexed for searching. Structured data can take any text-based format, and Veritone is initially supporting structured data expressed as JSON. Look for other formats to be supported in the future, though.

A few examples of structured data:
* Social media streams
* Weather info
* News feeds
* Stock prices
* Personnel records
* Website analytics
* Sensor data

Structured data can be used in two ways, as primary data or secondary data. When used as primary data, the structured data is the content that you would like to analyze further, using cognitive engines. Structured data can also be used as secondary data, in order to augment or enhance the value of other content. This is done by correlating the structured data to the primary content along a common value in both datasets.

Note that the same dataset can be used as either primary or secondary data, depending on the use case.

## Overview

We'll provide a quick, high-level overview of the requirements for working with structured data within the Veritone platform, for both primary and secondary data.

**Register a Schema:** To use structured data within the Veritone platform, the first step is to register and upload a schema for your data. The schema, which should be in JSON format, gives Veritone the information needed to properly ingest, store and index your data. For step-by-step instruction on how to register a schema, check out the [Quick Start Guide](/developer/data/quick-start/).

**Select Adapter:** Next, you'll need to ingest the data into the platform using an adapter that can connect to your data source and generate the output in accordance with your schema. If there isn't an existing adapter that meets your needs, you can [build and register one](/developer/engines/quick-start/).

**Select Cognitive Engine:** To process the data, you'll need to have a compatible engine. In the case of primary data, the engine can transform the structured data and extract cognitive insights. In the case of secondary data, the engine should be able to correlate the structured data to your primary content. In either case, if there isn't an existing engine that meets your needs, you can [build and register one](/developer/engines/quick-start/).

**Create Job:** The type of job you create will depend on your use case. For primary data, you'll create an ingestion and processing job, using the Veritone UI or API, to pull the structured data down from your data source using the adapter, creating a Structured Data Object, and then processing it using a cognitive engine. For secondary data, you'll create an ingestion job and a Structured Data Object so that your secondary structured data is available for use within the platform through a correlation engine. When a job is created for processing content that includes the correlation engine, the structured data will be appended to the results for the content.
