---
title: Recording
---

#### Get a recording (or "asset container") with most fields included

```javascript
assetContainer(id: "21098441") {
  id
  createdDateTime
  cloneData {
    originalId
    cloneBlobs
    assetIdMap {
      newAssetId
      oldAssetId
    }
  }
  programData {
    programLiveImage
  }
  recordingData {
    status
    applicationId
    startDateTime
    stopDateTime
  }
  fileData {
    fileName
    mimeType
    size
  }
}
```
