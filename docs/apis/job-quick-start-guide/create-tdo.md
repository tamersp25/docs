# Create a TDO (Recording Container)

In Veritone, digital audio and video files are uploaded to a container
called a Temporal Data Object (TDO). The first step in the Job workflow
is to create an empty TDO by calling the *Create TDO* mutation. Once a
container is created, assets can be securely added and accessed for
cognitive job processing and playback. Successful calls return a unique
Recording ID that’s used with all subsequent Job workflow requests.
Calls that are unsuccessful will result in an error.

#### Request Payload: Create a TDO

```graphql
mutation {
-----------request fields-----------
  createTDO(input :{        => The mutation type and input variable. (required)
    startDateTime: integer  => The absolute start date and time of the TDO in [Unix/Epoch](https://www.epochconverter.com/) timestamp format.  (required)
    stopDateTime: integer   => The absolute stop time of the TDO in [Unix/Epoch](https://www.epochconverter.com/) timestamp format. (required)
    name: "string"          => A user-defined name of the TDO. (recommended)
    description: "string"   => A user-defined description of the recording. (optional)
  }){
-----------return fields-----------
    id     => The unique ID associated with the TDO. (required)
    status => The status of the request’s progress. (required)
  }
}
```

#### GraphiQL Sample Request: Create a TDO

```graphql
mutation {
  createTDO(
    input: {
      startDateTime: 1507128535
      stopDateTime: 1507128542
      name: "My New Video"
      description: "The latest video in the series"
    }
  ) {
    id
    status
  }
}
```

#### cURL Sample Request: Create a TDO

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31gcf6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { createTDO( input: { startDateTime: 1507128535, stopDateTime: 1507128542, name: \"My New Video\", description: \"The latest video in the series\" }) { id,  status } }" }'
```

#### Sample Response: Create a TDO

```json
{
  "data": {
    "createTDO": {
      "id": "44512341",
      "status": "downloaded",
    }
  }
}
```
