# Job Quickstart Guide

### Getting Started

Veritone Job API allows you to integrate cognitive functionality — such as object detection, language translation, and voice transcription — into your application with just a few lines of code. The Job API is a set of calls that takes you through the entire cognitive job workflow, from file ingestion to data analysis and retrieving the results of completed tasks.

Veritone API is built around the GraphQL paradigm to provide a more efficient way to deliver data with greater flexibility than a traditional REST approach. GraphQL is a[ query language](http://graphql.org/learn/queries/) that operates over a single endpoint using conventional HTTP requests and returning JSON responses. The structure not only lets you call multiple nested resources in a single query, it also allows you to define requests so that only requested data is sent back.

This quickstart guide provides resources, detailed documentation, and sample requests and responses to help get your integration up and running to perform the following actions:

* [Create a TDO/recording container](/apis/job-quick-start-guide/create-tdo)

* [Upload a recording asset](/apis/job-quick-start-guide/upload-asset)

* [Create a job with specific tasks](c/apis/job-quick-start-guide/reate-job)

* [Check the status of a job](/apis/job-quick-start-guide/check-job-status)

* [Retrieve job results](/apis/job-quick-start-guide/retrieve-job-output)

* [Delete a TDO/recording container](/apis/job-quick-start-guide/delete-tdo)

 

We designed this quickstart to be user-friendly and example-filled, but if you have any questions, please don’t hesitate to reach out to our [Developer Support Team](mailto:devsupport@veritone.com) for help.

 

### **Base URL**

Veritone API uses a single endpoint for making ad-hoc requests and to integrate API into third-party applications. All requests must be HTTP POST to [https://api.veritone.com/v3/graphql](https://api.veritone.com/v3/graphql) with *application/json* encoded bodies.



### **Making Sample Requests**

To make it easier to explore, write, and test the API, we set up [GraphiQL](https://api.veritone.com/v3/graphiql) — an interactive playground that gives you a code editor with autocomplete, validation, and syntax error highlighting features. Use the GraphiQL interface to construct and execute queries, experiment with different schema modifications, and browse documentation. In addition, GraphiQL bakes authorization right into the schema and automatically passes the *Authentication* header with a valid token when you’re logged into the Veritone system.

Veritone’s GraphiQL interface is the recommended method for ad hoc API requests, but calls can be made using any HTTP client. All requests must be HTTP POST to the https://api.veritone.com/v3/graphql endpoint with the *query* parameter and *application/json* encoded bodies. In addition, requests must be authenticated using an API Token. Pass the token in your request using the *Authorization* header with a value *Bearer \<token\>*. If you’re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.

The sample requests provided in this documentation are structured for use in our [GraphiQL interface](https://api.veritone.com/v3/graphiql), but we’ve also included the basic cURL structure for your reference below. Please note that the examples shown do not use client information and are not language specific. For fields that require account-specific data (such as a Container ID), replace the value with your own. In addition, the sample requests shown are not all-inclusive — they highlight the minimum requirements and relevant information. Additional attributes for each request can be found in our [GraphQL docs](https://api.veritone.com/v3/graphqldocs/).

 
#### Basic cURL Structure for Requests

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31gcf6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { createTDO( input: { startDateTime: 1507128535, stopDateTime: 1507128542, name: \"My New Video\", description: \"The latest video in the series\" }) { id,  status } }" }'
```



### **Authentication**

Veritone Job API uses bearer token authentication for requests. To authenticate your calls, provide a valid API Token in the *Authentication* header of the request with the value *Bearer \<token\>*. Requests made without this header or with an invalid token will return an error code.

An API Token can be generated in the Veritone Admin App by your Organization Administrator. If your organization does not use the Admin App, please contact your Veritone Account Manager for assistance. 

 

**To generate an API Token:**


1. Log into the Veritone Platform and select **Admin** from the *App Picker* drop-down. The *Admin App* opens.

2. Click the **API Keys** tile. The *API Key* page opens.

![Get API Token](/apis/Get-API-Token-1.png)

3. Click **New API** Key. The *New API Key* window opens.

![Get API Token](/apis/Get-API-Token-2.png)

4. Enter a token name and select the permissions needed for the token to perform the required API tasks. Click **Generate Token** to save. The *Token Generated *window opens.

5. Copy your token and click **Close** when finished. 

*Note*: Once the *Token Generated* window closes, the token code will no longer display. 
