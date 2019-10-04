<!-- markdownlint-disable first-line-h1 -->

An engine_output fragment available for processing or to be written as output.

Key: `{taskId}`

Value: JSON

```json
{
    "type": "engine_output",
    "timestampUTC": int64,
    "outputType": string,
    "mimeType": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "startOffsetMs": int32,
    "endOffsetMs": int32,
    "content": JSON,
    "rev": int32,
    "taskPayload": JSON,
    "chunkUUID": string,
}
```

| field | definition |
| ----- | ---------- |
| type | message type (constant string "engine_output") |
| timestampUTC | UTC timestamp (milliseconds since epoch) when message created |
| outputType  | type of engine output data (ex: "transcript", "object-series", etc) |
| mimeType | the mime type of engine output data (ex: "application/json", "application/ttml", "application/xml", "object-series", etc) |
| taskId | taskId of the producer instance |
| tdoId | ID of the TDO the frame is from |
| jobId | ID of job being processed |
| startOffsetMs | offset of start of the engine output from beginning of TDO |
| endOffsetMs | offset of end of the engine output from beginning of TDO |
| content | data value (content) of the engine output from engine standard. |
| rev | A revision number that is incremented each time the engine output is updated |
| taskPayload | task payload for next engine |
| chunkUUID | UUID for this chunk, used to report status for the chunk |
