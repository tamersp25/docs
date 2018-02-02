---
title: Uploading Engine Results
---

After an engine finishes processing and produces a result, several things
have to happen in order for the engine results to be available to
client applications and other engines:

- the task status must be updated to `complete`
- the engine result must be set on the tasks `output` property
- an asset must be created containing the engine result
- task and engine source data must be set on the asset metadata

These requirements may change over time as engines move toward the
newer model, asset creation, and adhere to engine output standards.

To ease the path for engine developers, the Veritone API provides a single
mutation, `uploadEngineResult`, that will perform all necessary updates given a task ID and
result payload. Use of this mutation insulates engine developers from
changes in the requirements noted above, since Veritone engineers will
update the mutation implementation as needed.

The mutation will accept engine results via the `file` parameter in a multipart
form POST request, or using the `outputString` query parameter. The former
use case is more common, as most engines create files containing their results.
The following examples assume use of multipart form upload.
See [Request Basics](../basics) for details and sample code for multipart form post.

Here's a sample query that creates a transcript engine result.
Note that the `assetType` and `contentType` values will depend on the type of
engine.

```graphql
mutation {
    uploadEngineResult(input: {
      taskId: "<the task ID>"
      assetType: "v-transcript"
      contentType: "application/ttml"
    }) {
      id
      type
      uri
      contentType
      sourceData {
        taskId
        name
        engineId
      }
    }
  }
```

The _asset_ can contain any format:  JSON, XML, binary, etc.
However, the _task output_ metadata property must contain valid JSON.
`uploadEngineResult` makes this easier for developers to manage by
automatically transforming the engine result into JSON before setting it
on the task metadata (the asset contains unmodified engine results, exactly
as uploaded by the client). The entire result string is placed into a single
JSON value:

```json
  { "data": "<xml id=\"id\">...</xml>"}
```

To override the default key, `data`, use the `outputJsonKey` parameter.
In this example, we'll change it to `transcriptXml`.

```graphql
mutation {
    uploadEngineResult(input: {
      taskId: "<the task ID>"
      assetType: "v-transcript"
      contentType: "application/ttml"
      outputJsonKey: "transcriptXml"
    }) {
      id
    }
  }
```

The resulting value will then be:

```json
{ "transcriptXml": "<xml id=\"id\">...</xml>"}
```

And, again, the asset will contain the raw XML.

By default, the task will be marked `complete`. To override this behavior,
use the `completeTask` parameter:
```graphql
mutation {
    uploadEngineResult(input: {
      taskId: "<the task ID>"
      assetType: "v-transcript"
      contentType: "application/ttml"
      outputJsonKey: "transcriptXml"
      completeTask: false
    }) {
      id
    }
  }
```

Now say we do not want to produce a file, but rather, feed our engine results
directly from memory into the mutation.

```graphql
mutation {
    uploadEngineResult(input: {
      taskId: "<the task ID>"
      assetType: "v-transcript"
      contentType: "application/ttml"
      outputString: "<engine results in any format>"
    }) {
      id
    }
  }
```

The output is treated exactly the same way as a file upload with regard to
asset creation and task output JSON mapping.
