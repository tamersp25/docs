<!-- ---
title: Uploading Large Files
--- -->
# Uploading Large Files

In order to safeguard the performance and integrity of the system, the
Veritone API imposes size limits on API requests and file uploads.
These limits apply to both the `application/json` and `multipart/form-data`
request protocols.

## Maximum GraphQL Query Size

The entire GraphQL query for a given HTTP request must fit within the
query size limit. The limit is currently 10 MB, which greatly exceeds the size required to make any reasonable query. Note that this limit applies only
to the GraphQL query size, _not_ file upload, which has a separate limit
discussed below.

An HTTP request that exceeds the maximum allowed query size will
return a `413` HTTP status code with a payload resembling the following:
```json
{
  "errors":[
    {
      "data":{
        "limitInBytes":1000000,
        "requestSize":"1200011",
        "errorId":"752b9354-8fbd-4071-9a2b-522add55b944"
      },
      "name":"invalid_input",
      "message":"The request payload was larger than the limit allowed by this server. The maximum JSON request size is 10000000 bytes (10 mb)."
    }
  ]
}
```

If you encounter this error message, examine your GraphQL query.

A manually constructed query is unlikely to be this large; most likely,
the query was machine-generated through a loop or some input and
attempts to retrieve or edit many objects in batch.
If this is the case, modify your code to use batches of bounded size,
with one batch per query, so that the total GraphQL query size stays
within the limit.

Another possibility is that the query includes a mutation that accepts
arbitrary JSON in some input field. Some examples include `updateTask`,
`createStructuredData`, etc. In this case, the base GraphQL query may
be small; it's the JSON input value that is large.

In this situation, the input payload size must simply be reduced.
Mutations and data types that take arbitrary JSON as input are not
intended or designed to consume large objects. The input should be
split into multiple objects, or, if applicable, uploaded as an _asset_
(see below).

## Maximum File Upload Size

Several mutations in the Veritone API, such as `createAsset`,
`createEntityIdentifier`, and `uploadEngineResult` accept file upload.
These files are not parsed by the API server; they are simply streamed
into storage. Thus, much larger sizes can be consumed.

However, there is still a limit, as the API service is optimized for
handling GraphQL queries and not for ingesting very large files.

If you attempt to upload or attach file that exceeds the allowed size,
currently 100 MB, you will receive an HTTP 413 response with a payload
like the following:

```json
{
  "errors":[
    {
      "code":"LIMIT_FILE_SIZE",
      "field":"file",
      "storageErrors":[],
      "data":{
        "limitInBytes":104857600,
        "requestSize":"2295200106",
        "errorId":"ab3efd8f-c0de-4c84-b299-1d7698b4a9b8"
      },
      "name":"invalid_input",
      "message":"The file upload was larger than the limit allowed by this server. The maximum file upload size is 104857600 bytes (100 mb)."
    }
  ]
}
```

If you receive this error, first verify that the file is expected to be
so large. If so, consider whether your application would benefit from splitting
it into smaller chunks. 100 mb is a reasonable size for some artifacts, such as
long multimedia recordings. However, processing and analysis by cognitive
engines is more efficient and reliable with smaller sizes; consider splitting
the data into multiple objects.

If you do need to work with files of such size, then use pre-signed
storage URLs as described below.

## Uploading Large Files with pre-signed URLs

Mutations that accept file upload typically stream the file to storage,
compute a URL for the storage location, and store that URL as metadata
on the object.

For example, here is a call to `createAsset` that, accompanied with a
file upload using `multipart/form-data`, stores the file and returns the URL:

```graphql
mutation {
  createAsset(input: {
    containerId: 400005063
    assetType: "media"
    contentType: "video/mp4"
  }) {
    id
    uri
    signedUri
  }
}
```

The response includes both raw (permanent) and signed URLs:
```json
{
  "data":{
    "createAsset":{
      "id":"e97680db-0882-4333-81a7-b069d2b6be47",
      "uri":"https://inspirent.s3.amazonaws.com/assets/670005063/b8ad4c2d-6539-4627-8095-9843901d494d.mp4",
      "signedUri":"https://inspirent.s3.amazonaws.com/assets/400005063/a8ad3b2d-6539-4627-8095-9843901d494d.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20180507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180507T222856Z&X-Amz-Expires=3600&X-Amz-Signature=55ca05b8edbefe1bb0ece70c0b40562f69b5be147c88e8c8c19e25dc73dc741d&X-Amz-SignedHeaders=host"
    }
  }
}
```

`createAsset` can _also_ take a URL instead of the actual file.
You can create assets of nearly any size by streaming directly to the storage
location and then passing the resulting URL to the mutation.
You can, if desired, use your own storage for this purpose. However, the
Veritone platform makes it easy by giving direct access to the storage
it uses internally.

To use this capability, use a special query to get platform-generated,
cryptographically signed URLs that allow direct upload and download.
Below is an example.

```graphql
query {
  getSignedWritableUrl {
    key
    bucket
    url
    getUrl
    unsignedUrl
    expiresInSeconds
  }
}
```

A sample response:

```json
{
  "data": {
    "getSignedWritableUrl": {
      "key": "3e1bc99b-9c5e-4280-87a7-3ac70dd39482",
      "bucket": "prod-api.veritone.com",
      "url": "https://s3.amazonaws.com/prod-api.veritone.com/3e1bc99b-9c5e-4280-87a7-3ac70dd39482?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSGMPJHUC4ZLIYMQ%2F20180507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180507T223634Z&X-Amz-Expires=10800&X-Amz-Signature=1eed5e973843e397510def0325437571d350b3ad90320a4f8dc9f4d9b503f798&X-Amz-SignedHeaders=host",
      "getUrl": "https://s3.amazonaws.com/prod-api.veritone.com/3e1bc99b-9c5e-4280-87a7-3ac70dd39482?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSGMPJHUC4ZLIYMQ%2F20180507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180507T223634Z&X-Amz-Expires=10800&X-Amz-Signature=25b1753f8c46a204c2a5f1e9c4bb23fdb98cf1d2c0a4d02936ac2978417b8ab1&X-Amz-SignedHeaders=host",
      "unsignedUrl": "https://s3.amazonaws.com/prod-api.veritone.com/3e1bc99b-9c5e-4280-87a7-3ac70dd39482",
      "expiresInSeconds": 10800
    }
  }
}
```

The response contains the following key fields:
* `url`:  this is the signed, _writable_ URL. The URL accepts HTTP PUT (only).
* `getUrl`:  this is a signed URL that can be used with HTTP GET to retrieve
 the contents of the file _after_ is has been written to the PUT URL.
* `unsignedUrl`:  this is the raw, unsigned URL to the object. It can only
 be used with appropriate storage credentials _or_ if it has been signed
 be a service that has those credentials.

In a typical workflow you will use `getSignedWritableUrl` to get the
URLs, then PUT to the `url` value:

```bash$ curl -v -X PUT "https://s3.amazonaws.com/prod-api.veritone.com/3e1bc99b-9c5e-4280-87a7-3ac70dd39482?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSGMPJHUC4ZLIYMQ%2F20180507%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20180507T223634Z&X-Amz-Expires=10800&X-Amz-Signature=1eed5e973043e397510def0325437571d350b3ad90320a4f8dc9f4d9b503f798&X-Amz-SignedHeaders=host" -d @test.mp4
```

If you receive a 403 error back, verify that you are doing an HTTP PUT (not GET
or POST) and that the URL has not expired. The `expiresInSeconds` field
indicates how long, in seconds, before the URL expires. Also verify that
any client-side HTTP library you are using does not add headers or modify
the URL in any way, as doing so may cause the service to reject the request.

If you are persisting the URL on any object within the Veritone platform,
such as an `Asset`,
you usually want to use the `unsignedUrl` value. This way the server will
automatically provide a signed GET URL when the object is retrieved later
by any authorized client.

In some cases you might _want_ the URL to expire so that clients do not have
unlimited access. In this case, use the `getUrl` value.
