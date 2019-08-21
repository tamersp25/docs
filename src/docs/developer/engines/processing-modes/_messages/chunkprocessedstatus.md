<!-- markdownlint-disable first-line-h1 -->

Status of the chunk processed, to be sent after processing the chunk.

Key: `chunkprocessedstatus`

Value: JSON

```json
{
    "chunkUUID": uuid,
    "timestampUTC": int64,
    "status": "Success" | "Error",
    "errorMsg": string,
    "infoMsg": string
}
```

| field | definition |
| ----- | ---------- |
| chunkUUID | The UUID from the chunk_message of the chunk just processed |
| timestampUTC | UTC timestamp (milliseconds since epoch) of when the message was created |
| status | The status of the chunk. Possible values are </br> * Success: the chunk was processed successfully. </br> * Error: the chunk was not completed. |
| errorMsg | If error, the error message. |
| infoMsg | Add any additional information about the status. |
