# Veritone API Node

## Overview

The Veritone API Node executes an aiWare API GraphQL Query or Mutation. Requests can be made as independent actions or take inputs from messages emitted by other nodes. For more information about GraphQL, visit the [GraphQL section](https://docs.veritone.com/#/apis/using-graphql) of the docs.

## Input

Payload can optionally hold values that can be used to form the GraphQL Query using the mustache template field. Variables from the input node can be represented by double mustaches. A {{payload.MediaUrl}} tag in a template will try to find the name key in the input node msg object.

## Output

The payload is loaded with the output of the Query or Mutation. If the Query is named createJob, the results of the query will be in payload.createJob.

## Sample Queries and Mutations

Below are some examples of useful queries and mutations. For more information on all the available GraphQL schema, please visit the [Veritone API](https://api.veritone.com/v3/graphqldocs/query.doc.html) docs.

### Mutation

Create a TDO and returns its ID. The ID will be used in subsequent calls. Temporal Data Objects (TDOs) are the main container for data in Veritone's system.
```json
mutation {
    createTDO(input: {
        startDateTime: "2018-01-01T10:00:00"
        stopDateTime: "2018-01-01T11:00:00"
    }) {
        id
    }
}
```

Upload an asset. Assets are always contained in TDOs.
```json
mutation {
  createAsset(input: {
    containerId: "52359027",
    assetType: "media",
    contentType: "video/mp4",
    uri: "<file path goes here>"
  }) {
    id
  }
}
```

Create a TDO and an asset with a single call.
```json
mutation {
    createTDOWithAsset(input:{
        startDateTime:"2018-12-28T22:30:57.000Z"
        uri:"<file path goes here>"
        assetType:"media"
        contentType:"image/jpeg"
    }) {
        id
    }
}
```

Create a job. The sample below uses the payload of a previous node in mustache notation.
```json
mutation{
    createJob(input: {
        targetId: "{{payload.createTDOWithAsset.id}}",
        tasks: [{
            engineId:"3f115b93-97be-46f0-b0f2-7460db15ec34"
            payload:{
                mode: "library-run",
                libraryId: "9b5495f9-b3cb-4ef1-9ffd-113be5fed6fe",
                recordingId: "{{payload.createTDOWithAsset.id}}"
            }
        }]
    }) {
        id
    }
}
```

Add a mention to a collection
```json
mutation{x
    createCollectionMention(input: {
        folderId: "123455"
        mentionId: "123456"
    }) {
        mentionId
    }
}
```



### Query

Get a job by ID. This allows you to check for the status of a queued job and get the results of the finished tasks.
```json
query{
    job(id:"{{payload.createJob.id}}") {
        status
        tasks{
            records{
                status
                taskOutput
            }
        }
    }
}
```

Get a TDO by ID
```json
query{
    temporalDataObject(id: "38828568") {
        assets(type: "media"){
            records {
            id
            contentType
            type
            signedUri
            createdDateTime
            }
        }
    }
```




