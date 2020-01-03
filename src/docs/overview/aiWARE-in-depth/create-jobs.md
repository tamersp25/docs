<!-- markdownlint-disable -->

# Creating Jobs in V3F

This page talks about creating jobs for aiWARE using the existing GraphQL `createJob` mutation.
However, this is not the final solution -- ideally we want to have a `createJobV3` to explicitly instruct V3 framework the routes and IOs -- 
In addition, a number of Job DAGs are not totally supported yet -- will be noted in the section. 

See also:

 [A3-133: Supporting pure batch engine tasks without any ingestion](https://steel-ventures.atlassian.net/browse/A3-133) 

 [A3-131: Support Job DAGs where Adapters output directly to Cognitive Engines](https://steel-ventures.atlassian.net/browse/A3-131)

### Engines

| engine | id | notes |
|--------|----|-------|
| WSA (regular) | 9e611ad7-2d3b-48f6-a51b-0a1ba40feab4 | official WSA |
| WSA2 (test) | 9e611ad7-2d3b-48f6-a51b-0a1ba40fe255 | for testing WSA |
| TVR (regular) | 74dfd76b-472a-48f0-8395-c7e01dd7fd24 | official TVR |
| TVR2 (test) | 74dfd76b-472a-48f0-8395-c7e01dd7f255 | test version |

### Test URLs

| engine | link | notes |
|--------|------|-------|
| WSA | https://s3.amazonaws.com/src-veritone-tests/stage/20190505/0_40_Eric%20Knox%20BWC%20Video_40secs.mp4 | 40 sec video | public |
| WSA | https://src-veritone-tests.s3.amazonaws.com/stage/20190505/r32_00_redactTest_axon.mp4 | 32m video | public - but need to tighten up |


### Query Variables

Set Query variable `clusterId` in the Query Variables
and use that with these GraphQl mutations/queries.
For PROD, see [this](https://github.com/veritone/realtime/wiki/CLUSTER-IDS) for clusters:
 
```
{
  "jobId": "19124905_meVau2vXDi",
  "clusterId" :"rt-1cdc1d6d-a500-467a-bc46-d3c5bf3d6901"
}
```

### createJobForEdge


This is for using the WSA2, with audio chunks to SM

**JobDAG**

Supported in V3 Edge

```
WSA ----> SI Playback (to store HLS segments for playback and primary media to the TDO )
    |---> SI FFMPEG to cut into audio chunks ---> Cognitive engines
```


```
mutation createJobForEdge{
  createJob(input: {
    target: {
      startDateTime:1574311000
      stopDateTime: 1574315000
    }
    clusterId :"rt-242c1beb-653a-4299-bb33-2d8fb105d70b"
    tasks: [
       {
         # webstream adapter
         engineId: "9e611ad7-2d3b-48f6-a51b-0a1ba40fe255"
         payload: {
 #         url:"https://src-veritone-tests.s3.amazonaws.com/stage/20190505/r32_00_redactTest_axon.mp4"
  #        url:"https://src-veritone-tests.s3.amazonaws.com/stage/20190505/1_23_SampleVideoFile.mp4"
          url:"https://s3.amazonaws.com/src-veritone-tests/stage/20190505/0_40_Eric%20Knox%20BWC%20Video_40secs.mp4"
 #          url: "https://s3-us-west-2.amazonaws.com/lblackburn-test-data/bodycam_test.mp4"
         }
       },
      {
        engineId: "352556c7-de07-4d55-b33f-74b1cf237f25" # playback
      },
      {
        engineId: "8bdb0e3b-ff28-4f6e-a3ba-887bd06e6440" # chunk audio
        payload:{
          ffmpegTemplate: "audio"
          chunkOverlap: 15
          customFFMPEGProperties:{
            chunkSizeInSeconds: "30"
          }
        }
      },
      {
        # engine to run
        engineId: "c0e55cde-340b-44d7-bb42-2e0d65e98255"
      }
    ]
  }) {
    targetId
    id
  }
}

```

#### Create Job for stream engine

Supported in V3 edge

```
WSA ----> SI Playback (to store HLS segments for playback and primary media to the TDO )
    |---> SI FFMPEG to stream ---> Cognitive stream engines
```


Using Google Speech To Text stream engine as an example, this mutation shows a job feeding data into the stream engine.  Note the parent task FFMPEG's payload, it's a custom ffmpeg, `outputMode = stream` and the ffmpeg command is just purely to `mp3` for transcription.  Don't forget the `-` at the end, that's for ffmpeg to output to `stdout`

```
          outputMode: "stream"
          ffmpegTemplate: "custom"
          customFFMPEGTemplate: "ffmpeg -i pipe:0 -f mp3 -"
```

```
## stream engine
mutation createGSTTJobForEdge{
  createJob(input: {
    target: {
      startDateTime:1574311000
      stopDateTime: 1574315000
    }
    # TODO your own Cluster ID -- 
    clusterId :"rt-242c1beb-653a-4299-bb33-2d8fb105d70b"
    tasks: [
       {
         # webstream adapter
         engineId: "9e611ad7-2d3b-48f6-a51b-0a1ba40fe255"
         payload: {
  #        url:"https://src-veritone-tests.s3.amazonaws.com/stage/20190505/1_23_SampleVideoFile.mp4"
          url:"https://s3.amazonaws.com/src-veritone-tests/stage/20190505/0_40_Eric%20Knox%20BWC%20Video_40secs.mp4"
         }
       },
      {
        engineId: "352556c7-de07-4d55-b33f-74b1cf237f25" # playback
      },
      {
       ## just a straight ffmpeg copying from WSA to SI ffmpeg then to engine
       ## TODO: optimization for WSA to go straight to engine...
        engineId: "8bdb0e3b-ff28-4f6e-a3ba-887bd06e6440" # chunk audio
        payload:{
          outputMode: "stream"
          ffmpegTemplate: "custom"
          customFFMPEGTemplate: "ffmpeg -i pipe:0 -f mp3 -"
        }
      },
      {
        # engine to run - Google STT v3f
        engineId: "f99d363b-d20a-4498-b3cc-840b79ee7255"
      }
    ]
  }) {
    targetId
    id
  }
}

```

### Reprocessing TDO with different engines

See [A3-131](https://steel-ventures.atlassian.net/browse/A3-131)

#### Stream Engines

```
WSA ---> Cognitive engines (stream engines)
```
```
mutation reprocessTDOWithStreamEngine{
  createJob(input: {
    clusterId :"rt-242c1beb-653a-4299-bb33-2d8fb105d70b"
    tasks: [
       {
         # webstream adapter
         engineId: "9e611ad7-2d3b-48f6-a51b-0a1ba40fe255"
         payload: {
           url:"https://api.veritone.com/media-streamer/stream/790018125/dash.mpd"
         }
       },
      {
        # Google STT
        engineId: "f99d363b-d20a-4498-b3cc-840b79ee7255"
      }
    ]
  }) {
    targetId
    id
  }
}
```
#### Chunk Engines

Not yet see [A3-131](https://steel-ventures.atlassian.net/browse/A3-131)

```
SI FFMPEG  ---> Cognitive engines (chunk engines)
```

```
mutation reprocessTDOWithChunkEngine{
  createJob(input: {
    clusterId :"rt-242c1beb-653a-4299-bb33-2d8fb105d70b"
    tasks: [
      {
        engineId: "8bdb0e3b-ff28-4f6e-a3ba-887bd06e6440" # chunk audio
        payload:{
          url: "https://api.veritone.com/media-streamer/stream/790018125/dash.mpd"
          ffmpegTemplate: "audio"
          customFFMPEGProperties:{
            chunkSizeInSeconds: "30"
          }
        }
      },
      {
        # engine to run
        engineId: "c0e55cde-340b-44d7-bb42-2e0d65e98255"
      }
    ]
  }) {
    targetId
    id
  }
}
```

### Create job for processing non-media files

See [A3-131](https://steel-ventures.atlassian.net/browse/A3-131)

```
WSA ----> SI Asset creator (to store the asset to the TDO)
    |---> Cognitive engines
```

```
mutation createTextJobForEdge{
  createJob(input: {
    target: {
      startDateTime:1574311000
      stopDateTime: 1574315000
    }
    clusterId :"rt-242c1beb-653a-4299-bb33-2d8fb105d70b"
    tasks: [
       {
         # webstream adapter
         engineId: "9e611ad7-2d3b-48f6-a51b-0a1ba40fe255"
         payload: {
            url: "https://fran-test-rt.s3.amazonaws.com/cbc_news.txt"
         }
       },
      {
        # siV2 Asset
        engineId: "75fc943b-b5b0-4fe1-bcb6-9a7e1884257a"
       },
      {
        # engine to run
        engineId: "374fab67-7726-4df1-b087-8878f1de206b"
      }
    ]
  }) {
    targetId
    id
  }
}

```

### Reprocessing  job for processing non-media files

See [A3-131](https://steel-ventures.atlassian.net/browse/A3-131)

```
WSA ----> SI Asset creator (to store the asset to the TDO)
    |---> Cognitive engines
```

```
mutation reprocessingTextJobForEdge{
  createJob(input: {
    clusterId :"rt-242c1beb-653a-4299-bb33-2d8fb105d70b"
    tasks: [
       {
         # webstream adapter
         engineId: "9e611ad7-2d3b-48f6-a51b-0a1ba40fe255"
         payload: {
            url: "TBD to get the primary asset"
         }
       },
      {
        # engine to run
        engineId: "374fab67-7726-4df1-b087-8878f1de206b"
      }
    ]
  }) {
    targetId
    id
  }
}

```

### Create job for batch engines

Simple Job DAG:

```
batchEngine
```

```
mutation createBatchJob{
  createJob(input: {
        target: {
      startDateTime:1574311000
      stopDateTime: 1574315000
    }
    # TODO your own Cluster ID -- 
    clusterId :"YOUR CLUSTER"
    tasks: [
       {
        # your batch engine id and payload
        engineId:"cbaea878-d947-4ee1-933c-664bb704204d"
      }]}) {
    id
    tasks{
      records{
        id
        engineId
        status
      }
    }
  }
}
```

### myEdgeJobs

```
query myEdgeJobs($clusterId:ID) {
  jobs(clusterId:$clusterId){
    records{
      id
      targetId
      tasks {
        records{
          id
          engineId
          status
          taskPayload
          taskOutput
        }
      }
    }
  }
}
```