### Getting Started

Veritone Search API includes rich, full-text search features to query against an organization’s public and private media indexes. The search function is highly customizable includes core functions that support parsing, aggregation, and auto-completion. Searches are performed using a variety of supported query types, expressed in JSON. Most search operations make use of optional query configurations that allow you to control the search behavior and narrow results by defining aspects of the content and values.

Veritone API is built around the GraphQL paradigm to provide a more efficient way to deliver data with greater flexibility than a traditional REST approach. GraphQL is a query language that operates over a single endpoint using conventional HTTP requests and returning JSON responses. The structure not only lets you call multiple nested resources in a single query, it also allows you to define requests so that the query you send matches the data you receive.

To make effective use of the Search API, you’ll need to know a few things about how data is stored in Veritone, the various options for structuring queries, and requirements for performing successful requests. This quickstart guide provides everything you need to help get your integration up and running as quickly as possible. We designed this quickstart to be user-friendly and example-filled, but if you have any questions, please don’t hesitate to reach out to our [Developer Support Team](mailto:devsupport@veritone.com) for help.

### **Base URL**

Veritone API uses a single endpoint for making ad-hoc requests and to integrate API into third-party applications. All requests must be HTTP POST to [https://api.veritone.com/v3/graphql](https://api.veritone.com/v3/graphql) with *application/json* encoded bodies.

### **Making Sample Requests**

To make it easier to explore, write, and test the API, we set up [GraphiQL](https://api.veritone.com/v3/graphiql) — an interactive playground that gives you a code editor with autocomplete, validation, and syntax error highlighting features. Use the GraphiQL interface to construct and execute queries, experiment with different schema modifications, and browse documentation. In addition, GraphiQL bakes authorization right into the schema and automatically passes the *Authentication* header with a valid token when you’re logged into the Veritone system.

Veritone’s GraphiQL interface is the recommended method for ad hoc API requests, but calls can be made using any HTTP client. All requests must be HTTP POST to the https://api.veritone.com/v3/graphql endpoint with the *query* parameter and *application/json* encoded bodies. In addition, requests must be authenticated using an API Token. Pass the token in your request using the *Authorization* header with a value *Bearer \<token\>*. If you’re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.

### **Authentication**

Veritone Job API uses bearer token authentication for requests. To authenticate your calls, provide a valid API Token in the *Authentication* header of the request with the value *Bearer \<token\>*. Requests made without this header or with an invalid token will return an error code.

An API Token can be generated in the Veritone Admin App by your Organization Administrator. If your organization does not use the Admin App, please contact your Veritone Account Manager for assistance.

**To generate an API Token:**
1. Log into the Veritone Platform and select **Admin** from the *App Picker* drop-down. The *Admin App* opens.
2. Click the **API Keys** tile. The *API Key* page opens.

    ![Get API Token](Get-API-Token-1.png)

3. Click **New API** Key. The *New API Key* window opens.

    ![Get API Token](Get-API-Token-2.png)
4. Enter a token name and select the permissions needed for the token to perform the required API tasks. Click **Generate Token** to save. The *Token Generated *window opens.
5. Copy your token and click **Close** when finished.

*Note*: Once the *Token Generated* window closes, the token code will no longer display.

### Relevance

Search operations return results in order of relevance — the result that’s most relevant to the search query is the first item in the result set, and the least relevant is last. Relevance scoring is based on three primary factors:

- **Term Frequency:** How often does the term appear in the field? The more often, the more relevant. A field containing five instances of the same term is more likely to be relevant than a field containing just one mention.
- **Inverse Index Frequency:** How often does each term appear in the index? The more often, the less relevant. Terms that appear in many records have a lower weight than more-uncommon terms.
- **Field Length:** How long is the field? The longer it is, the less likely it is that words in the field will be relevant. A term appearing in a field with a short title carries more weight than the same term appearing in a long content field.
