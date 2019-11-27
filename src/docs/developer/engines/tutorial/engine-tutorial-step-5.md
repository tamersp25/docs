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

<div style="width: 35%"><iframe src="https://player.vimeo.com/video/375527833?color=ff9933&title=0&byline=0&portrait=0" style="border:0;top:0;left:0;width:75%;height:75%;" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

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

To test the engine, run a GraphQL mutation that looks like this:

```graphql
mutation createJob{
  createJob(input: {
    target:{
      startDateTime:1548432520,
      stopDateTime:1548436341,
      name:"Gettysburg Address"
    },
    tasks: [{
         engineId:"9e611ad7-2d3b-48f6-a51b-0a1ba40feab4",
         payload:{
             url: "http://se.cs.depaul.edu/Java/Chapter04/Lincoln.txt"
         }
    },{
      engineId: "386e022f-edd1-46ec-b1cc-84d203a37250"
    }
    ]
  }) {
    id
    targetId
  }
}
```

The job has two tasks. One task is associated with an engine ID of `"9e611ad7-2d3b-48f6-a51b-0a1ba40feab4"` (which is the Webstream adapter, responsible for ingesting the file at `"http://se.cs.depaul.edu/Java/Chapter04/Lincoln.txt"`).
The second engine ID, `"386e022f-edd1-46ec-b1cc-84d203a37250"`, is our engine's ID. (Be sure to replace this value with your own engine ID.)

The mutation should produce a response similar to:

```json
{
  "data": {
    "createJob": {
      "id": "19104215_i6Vz2XQtCR",
      "targetId": "710414094"
    }
  }
}
```

The `id` of `"19104215_i6Vz2XQtCR"` is the Job ID. The `targetId` is the ID of the TDO (Temporal Data Object) associated with this job.

#### Poll the Job

To determine the job's status, poll the job with this query (substituting the appropriate `jobId`):

```graphql
query jobStatus {
  job(id: "19104215_i6Vz2XQtCR") {
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

When the job finishes (with a `status` of `complete`), run the following query to obtain the engine's results (but again, substitute the correct `jobId`):

```graphql
query getEngineOutput {
  engineResults(jobId:"19104215_i6Vz2XQtCR") {
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
   "taskId": "19104215_i6Vz2XQtCR9tzRz",
   "generatedDateUTC": "0001-01-01T00:00:00Z",
   "validationContracts": [
      "keyword"
   ],
   "object": [
      {
         "label": "the",
         "type": "keyword"
      },
      {
         "label": "Gettysburg",
         "type": "keyword"
      },
      {
         "label": "Address",
         "type": "keyword"
      },
      {
         "label": "Fourscore",
         "type": "keyword"
      },
      {
         "label": "and",
         "type": "keyword"
      },
      {
         "label": "seven",
         "type": "keyword"
      },
      {
         "label": "years",
         "type": "keyword"
      }, 
      {
         "label": "ago",
         "type": "keyword"
      }
   ]
}
```
(The keyword-object array in this JSON fragment has been edited for length.)

## Further Reading

We hope you've enjoyed this tutorial. Be sure to check out some of these other greeat resources:

- Learn how to [customize engine output](developer/engines/tutorial/customizing-engine-output)
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
