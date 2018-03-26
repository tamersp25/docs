# Data

The Veritone Developer platform now supports structured data. Together with our existing capabilities for unstructured data, the Veritone platform can now process and transform a vast swath of the world's data, extracting actionable intelligence for our users.

## Background

Structured data is data with well-defined fixed fields, which can be stored in relational databases. Structured data can take any text-based format, and Veritone is initially supporting structured data expressed as JSON. Look for other formats to be supported in the future, though.

A few examples of structured data:
* Social media streams
* News feeds
* Stock prices
* Press releases
* Personnel records
* Government statistics
* Private databases

Structured data can be used in two ways, as primary data or secondary data. When used as primary data, the structured data is the content that you would like to analyze further, using cognitive engines. Structured data can also be used as secondary data, in order to augment or enhance the value of other content. This is done by correlating the structured data to the primary content along a common value.

Note that the same dataset can be used as either primary or secondary data, depending on the use case.


## Overview

We'll provide a quick, high-level of the process for working with structured data within the Veritone platform, for both primary and secondary data. For step-by-step instructions, check out our [Quick Start Guide](/data/quick-start).

**Register Schema:** To use structured data within the Veritone platform, the first step is to register and upload a schema for your data. The schema, which should be in JSON format, gives Veritone the information needed to properly ingest, store and index your data.

**Select Adapter:** Next, you'll need to ingest the data into the platform using an adapter that can connect to your data source and output it in accordance with your schema. If there isn't an existing adapter that works, you can [build and register one](/engines/quick-start).

**Create Ingestion Job:** Now you'll create an ingestion job, using the Veritone UI or API, to pull down from your data source using the adapter. Ingestion jobs may have a schedule, and you can set the data ingestion to occur on a one-off, recurring or continuous basis. 

**Select Engine:** Once it's ingested into the platform, the next steps depend on whether you want to use the data as primary or secondary data. For primary data, you can select a compatible cognitive engine to process it, and the results will be available as assets that you can download or search for and view in the Veritone UI. For secondary data, you'll need to wait until you have created a job to process your primary content, and as part of the engine workflow selection, you can select a correlation engine that will append your primary content with the secondary structured data. In either case, if you don't see an existing engine that works for your structured data needs, you can [build and register one](/engines/quick-start).


