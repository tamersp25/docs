Heartbeat message.

Key: `{engineInstanceId}`

Value: JSON

```json
{
    "type": "engine_heartbeat",
    "timestampUTC": int64,
    "engineId": string,
    "engineInstanceId": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "count": int64,
    "status": string,
    "upTime": int64,
    "bytesRead": int64,
    "bytesWritten": int64,
    "messagesWritten": int64,
    "errorMsg": string
}
```

| field | definition |
| ----- | ---------- |
| type	| message type (constant string "engine_heartbeat") |
| timestampUTC	| UTC timestamp (milliseconds since epoch) when message created |
| engineId	| engineId of producer of heartbeat |
| engineInstanceId	| instanceId to distinguish multiple instances of same engine (can be AMI + containerId) |
| taskId	| taskId engine is working on |
| tdoId	| tdoId engine is working on |
| count	| the heartbeat count, starting at 1 and incrementing on each heartbeat |
| status | Signal for whether an engine terminates unexpectedly or expectedly.  It helps with cleaning up after engine terminates and also to gather better metrics on system health. </br>Possible values: </br>"RUNNING" - engine is running and will send further heartbeats </br>"DONE" - engine will terminate successfully and this is last heartbeat message </br> "FAILED" - engine will terminate due to failure and this is last heartbeat message |
| upTime	| continuous time (in milliseconds) engine instance has been running. |
| bytesRead	| cumulative number of bytes read (for engines that read streams) |
| bytesWritten	| cumulative number of bytes written (for engines that write streams) |
| messagesWritten	| cumulative number of messages published (for engines that write chunks) |
| errorMsg	| an optional error message if the heartbeat indicates a failure status |
