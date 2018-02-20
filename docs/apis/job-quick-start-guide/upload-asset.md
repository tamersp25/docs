# Upload an Asset

Once an empty TDO has been created, call the *Create Asset* mutation to add and store a digital media asset (video or audio file) to it for processing. Requests must include the Container ID returned in the [Create a TDO](create-tdo/) response, as well as an asset type and content type. There are two available options for setting up your *Create Asset* request, which are described below.

### Option 1
----------

Send the file contents as part of the request. This option uses the *multipart/form-data header* and requires use of the *file* and *filename* parameters. Requests using this option are structured in two parts: the form field data that specifies the file information and a query containing details about the asset. Currently, GraphiQL does not support multipart/form requests, so a different HTTP client must be used for making sample calls.

#### Option 1 Request Payload: Upload an Asset
```graphql
 -H content-type:  => A header that specifies the content type. Enter "multipart/form-data" as the value.(required)
 -F filename       => The name of the file to upload. The value must match the name of the saved file. (required)      
 -F file           => The path of the file to upload. (required)                                                           
 -F query=mutation {
-----------request fields-----------
  createAsset(input :{    => The Create Asset mutation type and input variable. (required)
    containerId: "string" => The TDO/Container ID returned in the Create TDO response.  (required)
    contentType: integer  => The MIME type of the asset (e.g., audio/mp3). (required)
    type: "string"        => A label that classifies an asset, such as “transcript,” “media,” or “text.” (required)
    name: "string"        => A user-entered name for the asset. (optional)
  }){
-----------return fields-----------
    id          => The unique ID of the new asset, provided by the server. (required)
    type        => A label that classifies the asset. The returned value reflects the input value specified in the request. (required)
    contentType => The MIME type of the asset (e.g., audio/mp3). (required)
    containerId => The unique TDO/Container ID that holds the asset. (required)
    signedUri   => The secure URI of the asset. (required)
  }
}
```

#### Option 1 Sample Request: Upload an Asset
```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31gcf6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'filename=AM Daily.ttml' \
  -F 'file=@/Users/bobjones/Downloads/AM Daily.mp4' \
  -d '{"query": "mutation { createAsset( input: { containerId: \"44512341\", contentType: \"video/mp4\", type: \"media\" }) { id, type, contentType, containerId, signedUri } }" }'
```

#### Option 1 Sample Response: Upload an Asset 
```json
{
  "data": {
    "createAsset": {
      "id": "b6d70304-2b23-4fcc-aa9e-db038b3201fc",
      "type": "media",
      "contentType": "video/mp4",
      "containerId": "44512341",
      "signedUri": "https://inspirent.s3.amazonaws.com/assets/44512341/eaf6795e-9e9a-435b-9878-cde23c261d38.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171220T154510Z&X-Amz-Expires=604800&X-Amz-Signature=de6c2d0b08b8c572e9b217736e94471ed00bfebd2a7690e54ecfcff5dc9a5c7e&X-Amz-SignedHeaders=host"
    }
  }
}
```

### Option 2 
----------

Pass the file's raw URI from an external host location that’s accessible to Veritone in the request.

#### Option 2 Request Payload: Upload an Asset
```graphql
mutation {
-----------request fields-----------
  createAsset(input :{    => The Create Asset mutation type and input variable. (required)
    containerId: "string" => The TDO/Container ID returned in the Create TDO response.  (required)
    contentType: integer  => The MIME type of the asset (e.g., audio/mp3). (required)
    type: "string"        => A label that classifies an asset, such as “transcript,” “media,” or “text.” (required)
    uri: "string"         => The path to the asset data. (required)
  }){
-----------return fields-----------
    id          => The unique ID of the new asset, provided by the server. (required)
    type        => A label that classifies the asset. The returned value reflects the input value specified in the request. (required)
    contentType => The MIME type of the asset (e.g., audio/mp3). (required)
    containerId => The unique TDO/Container ID that holds the asset. (required)
    signedUri   => The secure URI of the asset. (required)
  }
}
```

#### Option 2 GraphiQL Sample Request: Upload an Asset
```graphql
mutation {
  createAsset(
    input: {
      containerId: "44512341",
      contentType: "video/mp4",
      type: "media",
      uri: "https://www.youtube.com/watch?v=xsK9WsL0fVc"
    }
  ) {
    id
    type
    contentType
    containerId
    signedUri        
  }
}
```

#### Option 2 cURL Sample Request: Upload an Asset
```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31gcf6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { createAsset( input: { containerId: \"44512341\", contentType: \"video/mp4\", type: \"media\", uri:\" https://www.youtube.com/watch?v=xsK9WsL0fVc\" }) { id, type, contentType, containerId, signedUri } }" }'
```

#### Option 2 Sample Response: Upload an Asset 
```json
{
  "data": {
    "createAsset": {
      "id": "b6d70304-2b23-4fcc-aa9e-db038b3201fc",
      "type": "media",
      "contentType": "video/mp4",
      "containerId": "44512341",
      "signedUri": "https://inspirent.s3.amazonaws.com/assets/44512341/eaf6795e-9e9a-435b-9878-cde23c261d38.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171220%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171220T154510Z&X-Amz-Expires=604800&X-Amz-Signature=de6c2d0b08b8c572e9b217736e94471ed00bfebd2a7690e54ecfcff5dc9a5c7e&X-Amz-SignedHeaders=host"
    }
  }
}
```
