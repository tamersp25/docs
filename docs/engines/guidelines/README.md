# Construction Guidelines

Engines in Veritone are designed with a functional architecture that ensures easy integration to receive tasks, perform work, and return responses. The task processing pipeline follows a logical sequence of actions for your engine type:

* Cognitive engines will need to fetch the input, retrieve a media asset, process the data, output the results to an asset, and send insights back to Veritone. 
* Adapters or ingestion engines will need to ingest the raw input data and make it available for use in the platform. 
* Aggregator engines will need to fetch the output asset(s) of other engines, process the data, output the results to a different asset, and send insights back to Veritone.

This section covers everything you need to properly construct your code for task processing, including instructions for how to build engines that work on our real-time pipeline. We&rsquo;ll walk through the entire task workflow in detail and specify behaviors and API calls required for your engine to successfully operate in the Veritone platform.

## GraphQL

The Veritone API is built around the [GraphQL](http://graphql.org/learn/) paradigm and, where applicable in this documentation, we include sample requests configured in cURL and for use in our [GraphiQL interface](https://api.veritone.com/v3/graphiql). Please note that the examples in this documentation do not use client information and are not language specific. For fields that require account-specific data (such as a Recording ID), replace the value with your own. In addition, the sample requests shown are not all-inclusive &mdash; they highlight the minimum requirements and relevant information. Additional attributes for each request can be found in our [GraphQL docs](https://api.veritone.com/v3/graphqldocs/).

Veritone&rsquo;s GraphiQL interface is recommended for making test API requests, but calls can also be made using other HTTP clients. All requests must be HTTP POST to the [_https://api.veritone.com/v3/graphql_](https://api.veritone.com/v3/graphql) endpoint with *application/json* encoded bodies. In addition, requests must be authenticated [using an API Token](apis/authentication). Pass the token in your request using the _Authorization_ header with a value _Bearer \<token\>_. If you&rsquo;re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.

## Real-time Processing

Veritone now supports real-time processing, allowing data to be ingested and processed and insights to be delivered to end users within seconds. Veritone's real-time pipeline uses a [Kafka](https://kafka.apache.org/)-based messaging system to connect and control the various components within the system. Through VDA, you can upload your real-time capable adapters, cognitive engines and aggregator engines for use in real-time processing.

A key field in the manifest is used to help identify engines that are compatible with the real-time framework is engineMode. If you are uploading a build for an adapter, cognitive engine or aggregator engine, be sure to specify the correct engineMode in the accompanying manifest.

| engineMode | Adapters                                                | Cognitive Engines or Aggregators                                                       |
| ---------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| legacy     | N/A for adapters                                        | For engines that are not real-time capable                                             |
| batch      | For adapters that process data in batches (e.g., files) | For real-time engines that process data in batches (e.g., files)                       |
| chunk      | N/A for adapters                                        | For real-time engines that process data in small chunks (e.g., frames, video segments) |
| stream     | For adapters that process data in streams               | For real-time engines that process data in streams                                     |
 
