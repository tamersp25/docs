---
title: Testing - Generate a JSON payload (Manual)
order: 6
---

### 1. Get your API token.

Refer to:  to get an API token for your developer user.

### 2. Create a Test Job

#### Create Job Template

```bash
curl -X POST \
  https://api.veritone.com/v1/job \
  -H 'authorization: Bearer <api_token>' \
  -H 'content-type: application/json' \
  -d '{
   "metadata":"VDH - Test Job",
   "recordingId":"<recording_id>",
   "tasks":[
       {
         "engineId":"<engine_id>",
         "testTask": true
      }
   ]
}'
```

Replace the following below:

```xml
<api_token> with your API token from step 1
<recording_id> with the test recording
<engine_id> with the engine you are testing locally
```

Fill in any other tasks as needed as dependencies for your engine (depending on your engine category).

#### Task Schema

Each task within a job has certain fields:

```
- engineId: ID of engine
- testTask:
    - false (default): Veritone will run the engine for this task
    - true: Allows the developer to run the engine locally instead of Veritone
```

#### Sample Job Curl

In this example, our VDH engine is a "translate" engine and requires "transcription" engine such as "transcribe-voicebase" to run before.

```bash
curl -X POST \
  https://api.veritone.com/v1/job \
  -H 'authorization: Bearer <YOUR TOKEN>' \
  -H 'content-type: application/json' \
  -d '{
   "metadata":"VDH - Test Job",
   "recordingId":"1111",
   "tasks":[
      {
         "engineId":"transcode-ffmpeg",
         "taskPayload":{
            "setAsPrimary":true
         }
      },
      {
         "engineId":"transcribe-voicebase",
         "taskPayload":{
            "language":"en-US",
            "priority":"normal"
         }
      },
      {
         "engineId":"b29e06f0-1cd9-4cae-83e5-9542439959fb",
         "testTask": true
      }
   ]
}'
```

### 3. Run the Curl

A new task should be created and show up with a status of  "queued" on the engine tasks page of developer for your engine.


![](payload-manual.png)

Copy the payload from the test task on the engine task page to your local test payload (eg. test/payload.json).

Run your local engine.
