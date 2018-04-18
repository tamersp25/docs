# Construction Guidelines

Engines in Veritone are designed with a functional architecture that ensures easy integration to receive tasks, perform work, and return responses. The task processing pipeline follows a logical sequence of actions for your engine type:

* Cognitive engines will need to fetch the input, retrieve a media asset, process the data, output the results to an asset, and send insights back to Veritone. 
* Adapters or ingestion engines will need to ingest the raw input data and make it available for use in the platform. 
* Aggregator engines will fetch the output asset of other engines, perform work, output the results to a different asset, and send insights back to Veritone.

This section covers everything you need to properly construct your code for task processing. We&rsquo;ll walk through the entire task workflow in detail and specify behaviors and API calls required for your engine to successfully operate in the Veritone platform.

The Veritone API is built around the [GraphQL](http://graphql.org/learn/) paradigm and, where applicable in this documentation, we include sample requests configured in cURL and for use in our [GraphiQL interface](https://api.veritone.com/v3/graphiql). Please note that the examples in this documentation do not use client information and are not language specific. For fields that require account-specific data (such as a Recording ID), replace the value with your own. In addition, the sample requests shown are not all-inclusive &mdash; they highlight the minimum requirements and relevant information. Additional attributes for each request can be found in our [GraphQL docs](https://api.veritone.com/v3/graphqldocs/).

Veritone&rsquo;s GraphiQL interface is recommended for making test API requests, but calls can also be made using other HTTP clients. All requests must be HTTP POST to the [_https://api.veritone.com/v3/graphql_](https://api.veritone.com/v3/graphql) endpoint with *application/json* encoded bodies. In addition, requests must be authenticated [using an API Token](apis/authentication). Pass the token in your request using the _Authorization_ header with a value _Bearer \<token\>_. If you&rsquo;re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.
