# Implementing Engine Polling

In normal [segment processing](/developer/engines/processing-modes/segment-processing/), engines are expected to respond with their results within seconds.
But often times, processing can take longer.

For [external processing](/developer/engines/deployment-model/?id=external-processing) engines built with the [engine toolkit](/developer/engines/toolkit/),
aiWARE offers a method of scheduling polling tasks to continuously check on the status of long-running operations on external services.

To run as a polling engine, when the engine first receives a message, it should take care of uploading the content to the third-party service and instigating processing.
In most cases, the third-party service returns some ID or other mechanism to track progress of the processing "job."

## Scheduling a Polling Task

Instead of returning the usual engine output message in `vtn-standard` format, an engine that wants to track the long-running task will return a message of the following format:

```json
{
  "type": "schedule_poll_task",
  "timestampUTC": 1556044929525,
  "nextPollTimeUTC": 1556045109525,
  "taskId": "<the task's ID>",
  "taskPayload": {
    "workId": "<some external tracking ID>",
    "isPollTask": true,
    "origTaskId": "<the task's ID>",
    "origTdoId": "<the TDO's ID>",
    "origJobId": "<the job's ID>",
    "origCallTimeUTC": 1556044929525,
    "engineConfig": {}
  }
}
```

The purpose of the four keys are explained here:

| Key | Explanation |
| --- | ----------- |
| `type` | Must equal `"schedule_poll_task"` to indicate this response should schedule polling. |
| `timestampUTC` | The current time in UTC epoch milliseconds |
| `nextPollTimeUTC` | The time you would like to schedule the polling task to kick off in UTC epoch milliseconds.  This should usually be at least a minute in the future. |
| `taskPayload` | Any information the future run of the engine will need to poll for status (e.g. `workId` above, referencing the external service's ID) and return results (e.g. `origTaskId` above). The structure of this object can be anything the engine developer wants it to be. It will be handed to the scheduled polling task in entirety. The specific contents of taskPayload above are just examples. |

?> The next scheduled polling task will receive a new task ID, but results should still be posted to the original task ID.
Therefore it is necessary to pass the original task ID in the taskPayload so that the next run of the engine will know which task to report results against.

## Executing a Scheduled Task

When the time specified in `nextPollTimeUTC` passes, a new task will be created and a new segment submitted to the engine.
When the engine receives this task, it should inspect the payload to determine if it is a polled task.
If so, instead of submitting an external job as before, the engine should check the third-party service for status based on the data passed in `taskPayload`.
If the job is complete, the engine should return the result as a normal `vtn-standard` response but referencing the original task ID.
If the job is not complete, the engine should return another polling message in the same structure as the previous one.
