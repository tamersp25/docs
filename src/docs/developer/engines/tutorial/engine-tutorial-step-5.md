<!-- markdownlint-disable -->

<style>
aside  {
  border-style: solid;
  border-radius: 9px;
  border-width: 2.2px;
  border-color:#ccc;
  padding: 5px;
  background: #e6e8ef;
}

aside.small {
  display:inline;
  font-size:9pt;
  position:relative; top:-4px;
}

.topruled {
  border-top-width: 1.2px;
  border-top-style: solid;
  border-top-color: rgb(76, 76, 100);
  line-height:45%;
}
.bottomruled {
  border-bottom-width: 1.2px;
  border-bottom-style: solid;
  border-bottom-color: rgb(76, 76, 100);
  line-height:45%;
}
</style>

<h2 style="display: inline;">Step 5: Test your engine in aiWARE &nbsp;</h2>&nbsp;&nbsp;<aside class="small">
<b>ESTIMATED TIME:</b> 20 minutes </aside> &nbsp;

Now that you've onboarded an engine (and set its status to DEPLOYED), you can test the engine in a live Job, in aiWARE.

One of the easiest ways to do this is, of course, to use the GraphiQL web IDE.

## Check the Engine's Availability

Before running a Job, check to see that the engine exists and is visible via the API.

1\. Log in to [Veritone](https://developer.veritone.com).

2\. Navigate to the [GraphiQL IDE](https://api.veritone.com/v3/graphiql).

3\. In GraphiQL, create &mdash; and then execute &mdash; a query like the following, using _your_ engine's ID:

```graphql
query myEngine{
  engine(id:"386e022f-edd1-46ec-b1cc-84d203a37250"){
    name
    ownerOrganizationId
    isPublic
    manifest
    mode
    outputFormats
    supportedInputFormats
    supportedSourceTypes
  }
}
```

You should get back a familiar-looking set of fields and values. If not &mdash; if you get an error of some kind &mdash; don't try to run the engine until the error has been addressed. 

> If the error message is `"The requested object was not found"`, chances are your engine is not in a Deployed state. (Go into the engine Builds list for your engine and Deploy the engine, if need be, or Unpause it if it was paused. See [Step 4](developer/engines/tutorial/engine-tutorial-step-4) for a refresher on how to use the Builds UI.) 

## Run a Job and Inspect the Results

Of course, to run a processing job at all, you need input. So, let's start by making data available for use in your engine's jobs.

### Ingestion

In aiWARE, every job needs to operate against data that has already been _ingested_ by the system.
The ingestion process typically pulls a file from a public URL; optionally chunks the data into smaller pieces; stores the pieces on URIs known only to Veritone; and associates the pieces to an _asset_ that is then stored (by reference) in a Temporal Data Object, which is a general-purpose container object widely used throughout aiWARE.

> Text data can be associated with a TDO. (The assets of a TDO needn't be _temporal_ data types per se.)

To ingest a text file from a public URL into Veritone, you can use the following mutation (amended to use the name and URI of your desired text file):

```graphql
mutation createTDOWithAsset {
  createTDOWithAsset(
    input: {
      name:"Project Gutenberg Readme",
      startDateTime: 1533761172, 
      stopDateTime: 1533761227, 
      contentType: "text/plain", 
      assetType: "media", 
      addToIndex: false, 
      uri: "http://www.gutenberg.org/files/9109/9109.txt"
    }
  ) 
  {
    id
    status
    assets {
      records {
        id
        assetType
        contentType
        signedUri
      }
    }
  }
}
```

This should produce a response similar to:

```json
{
  "data": {
    "createTDOWithAsset": {
      "id": "681163773",
      "status": "recorded",
      "assets": {
        "records": [
          {
            "id": "681163773_1qGITr1Q65",
            "assetType": "media",
            "contentType": "text/plain",
            "signedUri": "http://www.gutenberg.org/files/9109/9109.txt"
          }
        ]
      }
    }
  }
}
```

The `id` of `"681163773"` is the itdentifier for the TDO that contains this asset. You will need that TDO ID in order to run a job against that text asset.

### Running the Job

Now we can run a Job that uses the Hello World engine. 

#### Create the Job

In [GraphiQL](https://api.veritone.com/v3/graphiql), run the following mutation, substituting your engine ID in the `engineId` field, and your TDO ID in the `targetId` field:

```graphql
mutation runHelloWorldEngineJob {
  createJob(
    input: {
      targetId: "660655852", 
      isReprocessJob:true,
      tasks: [
        {
          engineId: "386e022f-edd1-46ec-b1cc-84d203a37250"
        }
      ]
    }
  ) 
  {
    id
  }
}
```

This will queue the Job, which could (depending on the system's backlog) take several minutes to complete. Note the `jobId` that comes back.

#### Poll the Job

To determine the job's status, poll the job with this query (substituting the appropriate `jobId`):

```graphql
query jobStatus {
  job(id: "19093816_ZTGTz6WBwW") {
    status
    createdDateTime
    targetId
    tasks {
      records {
        status
        taskOutput
        createdDateTime
        modifiedDateTime
        failureReason
        id
        engine {
          id
          name
          category {
            name
          }
        }
      }
    }
  }
}
```

#### Get the Results

When the job finishes, run the following query to obtain the engine's results (but again, substitute the correct `jobId`):

```graphql
query getEngineOutput {
  engineResults(jobId:"19093816_ZTGTz6WBwW") {
    records {
      tdoId
      engineId
      startOffsetMs
      stopOffsetMs
      jsondata
      assetId
      userEdited
    }
  }
}
```

For this engine, results will typically look similar to this:

```json
{
  "data": {
    "engineResults": {
      "records": [
        {
          "tdoId": "690136808",
          "engineId": "386e022f-edd1-46ec-b1cc-84d203a37250",
          "startOffsetMs": 0,
          "stopOffsetMs": 3821000,
          "jsondata": {
            "sourceEngineId": "386e022f-edd1-46ec-b1cc-84d203a37250",
            "sourceEngineName": "hello-world",
            "taskId": "19094030_g1Bo3o7nKlMc9Xf",
            "generatedDateUTC": "0001-01-01T00:00:00Z",
            "validationContracts": [
              "keyword"
            ],
            "object": [
              {
                "label": "Wave-Particle",
                "type": "keyword"
              },
              {
                "label": "Duality",
                "type": "keyword"
              },
              {
                "label": "WPD",
                "type": "keyword"
              },
              {
                "label": "has",
                "type": "keyword"
              },
              {
                "label": "been",
                "type": "keyword"
              },
              {
                "label": "called",
                "type": "keyword"
              },
              {
                "label": "Great",
                "type": "keyword"
              },
              {
                "label": "Mystery",
                "type": "keyword"
              },
              {
                "label": "20th",
                "type": "keyword"
              },
              {
                "label": "Century",
                "type": "keyword"
              }
            ],
            "modifiedDateTime": 1569853462000
          },
          "assetId": "690136808_VvAS3li4Pu",
          "userEdited": null
        }
      ]
    }
  }
}
```
(The keyword-object array in this JSON fragment has been edited for length.)

## Further Reading

We hope you've enjoyed this tutorial. Be sure to check out some of these other greeat resources:

- See our API documentation: <https://docs.veritone.com/#/apis/>
- API examples that you can run in GraphiQL: <https://docs.veritone.com/#/apis/examples>
- Veritone's Data Model: <https://docs.veritone.com/#/apis/data-model>
- See our schema: <https://api.veritone.com/v3/graphqldocs>
- Our VTN Standard helps ensure engine interoperability: <https://docs.veritone.com/#/developer/engines/engine-output>
- Other tutorials: <https://docs.veritone.com/#/apis/tutorials> 

### Review What We Did in This Tutorial:
* [Step 0 &mdash; Set up your project](developer/engines/tutorial/)
* [Step 1 &mdash; Register your project with Veritone](developer/engines/tutorial/engine-tutorial-step-1)
* [Step 2 &mdash; Use Docker to create a build](developer/engines/tutorial/engine-tutorial-step-2)
* [Step 3 &mdash; Test your build locally](developer/engines/tutorial/engine-tutorial-step-3) using the Engine Developer Toolkit's Test Console App
* [Step 4 &mdash; Push your engine build to Veritone](developer/engines/tutorial/engine-tutorial-step-4) 
* [Step 5 &mdash; Test your engine in aiWARE](developer/engines/tutorial/engine-tutorial-step-5) and, if necessary, debug/rebuild/re-deploy
