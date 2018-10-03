##### Series.objects

|  **Field** | **Description** |
|  ------ | ------ |
|  startTimeMs | Start time |
|  stopTimeMs | End time |
|  label | Name or tag label |

```javascript
  // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not absolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          // Object (Face, Object, Logo, OCR, ..)
          // This is for detecting something
          'object': {
            // REQUIRED
            'label': 'Satya Nadella', // Tag/main label
    }]
```
