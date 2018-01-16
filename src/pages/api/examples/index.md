---
title: GraphQL API Examples
---


This section contains some samples of queries and mutations in use.

Some reminders:

* The data that you get back on any query or mutation depends on the fields you specify in the query body.
* Most operations will work with any valid authentication token. However, certain queries and mutations require a specific type (user/session token, or API token). If you get an authorization error, consult the documentation and ensure that you are using the correct token type.
* Mutations require authorization to perform the specific operation in the target organization. For example, to create an engine, you must have the developer role within your organization.

## Create an Asset
The `createAsset` mutation accepts file uploads. To use this mutation and upload a file, use multipart form POST containing two parameters:  `query`, with the query, and `file`, containing the file itself.

Below is a bare-bones example using Javascript under NodeJS.

```
global.fetch = require('node-fetch');;
const request = require('superagent');
let size = data.length;
let tdoId = "<ID of a target temporal data object>";
let query = `mutation {
  createAsset(input: {
     containerId: "${tdoId}"
     contentType: "video/mp4"
     jsondata: {
       size: "1004550"
       source: "localNews"
       fileName: "localNews.mp4"
     }
     assetType: "media"
   }) {
     id
     uri
   }
}
 `;

let headers = {
  Authorization: 'Bearer ' + <your token>
};
request
  .post('https://api.veritone.com/v3/graphql')
  .set(headers)
  .field('query', query)
  .field('filename', fileName)
  .attach('file', Buffer.from(data, 'utf8'), fileName)
  .end(function gotResponse(err, response) {
    if (!err) {
      let responseData = JSON.parse(response.text);
      console.log("new asset created with id "+ responseData.data.createAsset.id);
    }
  });
```

## Create a job
To launch a job and implicitly create necessary tasks, use the `createJob` mutation. In the following example we'll request two translation engines on TDO/recording ID `41009374`.

Note that the task payloads can be specified as either GraphQL JSON-like data or a raw string containing escaped JSON.

```
mutation {
  createJob(input: {
    retries: 1
    targetId: "41009374"
    tasks: [
      {
        taskType: "b00fc05e-3502-e8da-4871-7182dc1aa9f2"
        payload: {
          target: "it"
        }
      }, {
        engineId: "388d951e-c90c-f001-9d6b-8bb70b9e6267"
        payloadString: "{\"target\":\"German:de\"}"
      }
    ]
  }) {
    id
    targetId
    tasks {
      records {
        id
        isClone
        targetId
        engineId
        order
        payload
        output
        status
      }
    }
  }
  ```
The mutation returns the following. Our two tasks are in `queued` state, since the job was just launched.

```
{
  "data": {
    "createJob": {
      "id": "7163967b-5489-491b-bde0-c998b2600fb6",
      "targetId": "41009374",
      "tasks": {
        "records": [
          {
            "id": "7163967b-5489-491b-bde0-c998b2600fb6-6942f3b3-10cd-4c69-8be8-cbb9c685f90f",
            "isClone": false,
            "targetId": "41009374",
            "engineId": "b00fc05e-3502-e8da-4871-7182dc1aa9f2",
            "order": 1,
            "payload": {
              "target": "German:de"
            },
            "output": null,
            "status": "queued"
          },

          {
            "id": "7163967b-5489-491b-bde0-c998b2600fb6-ff7aef6b-4760-47fa-a544-6ba18bf368de",
            "isClone": false,
            "targetId": "41009374",
            "engineId": "388d951e-c90c-f001-9d6b-8bb70b9e6267",
            "order": 0,
            "payload": {
              "target": "it"
            },
            "output": null,
            "status": "queued"
          }
        ]
      }
    }
  }
```
## Update a task
An engine implementation will typically update its task with a `complete` status and, optionally, a payload containing the engine results (Veritone recommends creating an asset containing the results – see the `createAsset` example above).

Given the task and job ID, and a freeform payload, the task can be updated with the following mutation:

```
mutation {
  updateTask(input: {
    id:"7163967b-5489-491b-bde0-c998b2600fb6-6942f3b3-10cd-4c69-8be8-cbb9c685f90f"
    jobId:"7163967b-5489-491b-bde0-c998b2600fb6"
    status:complete
    output: {
      foo: "bar"
    }
  }) {
    output
    payload
    status
    id
  }
}
```
Returns the following:

```
{
  "data": {
    "updateTask": {
      "output": {
        "foo": "bar"
      },
      "payload": {
        "target": "German:de"
      },
      "status": "complete",
      "id": "7163967b-5489-491b-bde0-c998b2600fb6-6942f3b3-10cd-4c69-8be8-cbb9c685f90f"
    }
  }
}
```

Some clients might have trouble generating the output value in the GraphQL query format. The mutation also supports the `outputString` parameter that can be used to send a string containing JSON.

```
mutation {
  updateTask(input: {
    id:"7163967b-5489-491b-bde0-c998b2600fb6-6942f3b3-10cd-4c69-8be8-cbb9c685f90f"
    jobId:"7163967b-5489-491b-bde0-c998b2600fb6"
    status:complete
    outputString: "{ \"foo\": \"bar\" }"
  }) {
    output
    payload
    status
    id
  }
}
```

The HTTP payload would look something like this:

```{
 "query": "mutation { updateTask(input: {id:\"<taskId>\"jobId:\"<jobId>\"status:complete output: { foo: \"bar\"}}) { output payload status id}}"
}
```
The query returns the same result as the first version. Most Veritone client UIs will handle the task output correctly only if it is stored as proper JSON. The mutation will accept any string, but for the task output to be stored as JSON `outputString` must be parseable. Be careful that any quotes in the JSON are escaped properly. The escape method depends on the client code language. In Javascript, for example, the following works:

```
 const query = `
mutation {
 updateTask(input: {
   id:"${taskId}"
   jobId:"${jobId}"
   outputString:"{\\"foo\\":\\"bar\\"}"
 }) {
   output
   payload
   status
   id
 }
}`;
```
