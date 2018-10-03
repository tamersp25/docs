# Engine Standard for Translation

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-text-standard.md ':include')


[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT

```javascript
var sample = {
    // Preamble


    // Language Identification: BCP-47 https://tools.ietf.org/rfc/bcp/bcp47.txt
    'language': 'en-US',
    'summary': "", // OPTIONAL. String.  Summary of doc

    


    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

          // Language BCP-47
          'language': "en-US",

          'summary': "", // OPTIONAL. String.  Summary of time slice


        }];
}
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
