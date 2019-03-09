An image or audio/video/text fragment available for processing.

Key: `{taskId}`

Value: JSON

```json
{
    "type": "media_chunk",
    "timestampUTC": int64,
    "mimeType": string,
    "taskId": string,
    "tdoId": string,
    "jobId": string,
    "chunkIndex": int32,
    "startOffsetMs": int32,
    "endOffsetMs": int32,
    "width": int32,
    "height": int32,
    "cacheURI": string,
    "content": string,
    "taskPayload": JSON,
    "chunkUUID": string,
}
```

| field | definition | required |
| ----- | ---------- | -------- |
| type	| message type (constant string "media_chunk") | yes |
| timestampUTC| UTC timestamp (milliseconds since epoch) when message created | no |
| mimeType |MIME type of content (ex: "image/jpeg", "audio/wav", "video/mp4", "application/json", "application/octet-stream", "text/plain", "text/html") | yes |
| taskId | taskId of the producer instance | yes |
| tdoId	| ID of the TDO the media_chunk is from | yes |
| jobId	| ID of job being processed | yes |
| chunkIndex | index of this chunk in the entire TDO | no |
| startOffsetMs	| offset of start of media chunk from beginning of TDO. For frames, this will be calculated using (index * 1000) / fps | no |
| endOffsetMs	| offset of end of media chunk from beginning of TDO. For frames, this will be calculated using ((index+1) * 1000) / fps | no |
| width	| width of the media in pixels (only applicable to images and video) | no |
| height	| height of the media in pixels (only applicable to images and video) | no |
| cacheURI | location of the media_chunk in cache (either cacheURI or content is populated but not both) | no |
| content	| data value of media_chunk. Note: only text chunks would fit and goes here; audio/video would be cached and cacheURI populated. | no |
| taskPayload	| task payload for engine | no |
| chunkUUID	| UUID for this chunk, used to report status for the chunk  | no |
