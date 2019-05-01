<!-- markdownlint-disable first-line-h1 -->

Indicates when the stream has reached its end.

Key: `stream_eof`

Value: JSON

```json
{
    "type": "stream_eof",
    "timestampUTC": int64,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "forcedEOF": boolean
}
```

| field | definition |
| ----- | ---------- |
| type | message type (constant string "stream_eof") |
| timestampUTC | UTC timestamp (milliseconds since epoch) when message created |
| taskId | taskId of the producer instance |
| tdoId | ID of the TDO the engine results/assets should be written to |
| jobId | ID of the job being processed on stream |
| forcedEOF | Set to true if the EOF was forced due to termination of a stream task.|
