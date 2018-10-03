# Engine Standard for Geolocation

[comment]: <> (------------------- INPUT Section -------------------)

[input-standard](../components/input-data-standard.md ':include')


[comment]: <> (------------------- OUTPUT Section -------------------)

[output-standard](../components/output-standard.md ':include')

### Sample JSON OUTPUT

```javascript
var sample = {
    // Preamble

    // GPS Coords for this time slice - UTM (preferred) | WGS
    'gps': [{
      'latitude': 59.123,
      'longitude': 213.123,
      'precision': 100, //in meters
      'direction': 10.1, // 0-360
      'velocity': 100.00, //in meters
      'altitude': 123.12 //in meters
    }],


    // Object (Face, Object, Logo, OCR, ..)
    // This is for detecting something
    'object': [{
      // REQUIRED
      'label': 'Satya Nadella', // Tag/main label


      // OPTIONAL: GPS Coords for this object in time slice - UTM (preferred) | WGS
      'gps': [{
        'latitude': 59.123,
        'longitude': 213.123,
        'precision': 100, //in meters
        'direction': 10.1, // 0-360
        'velocity': 100.00, //in meters
        'altitude': 123.12 //in meters
      }],


    }], // END OBJECT

    // Optional
    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
          // REQUIRED
          // Time relative to the source asset and not abolute values, if not time-based source (video, audio)
          'startTimeMs': 1260,
          'stopTimeMs': 1360,

 
          // Object (Face, Object, Logo, OCR, ..)
          // This is for detecting something
          'object': {
            // REQUIRED
            'label': 'Satya Nadella', // Tag/main label

            // OPTIONAL
            // GPS Coords for this object in time slice - UTM (preferred) | WGS
            'gps': [{
              'latitude': 59.123,
              'longitude': 213.123,
              'precision': 100, //in meters
              'direction': 10.1, // 0-360
              'velocity': 100.00, //in meters
              'altitude': 123.12 //in meters
            }],

          }, // END OBJECT

          // OPTIONAL
          // GPS Coords for this time slice - UTM (preferred) | WGS
          'gps': [{
            'latitude': 59.123,
            'longitude': 213.123,
            'precision': 100, //in meters
            'direction': 10.1, // 0-360
            'velocity': 100.00, //in meters
            'altitude': 123.12 //in meters
          }],

        };
```

[comment]: <> (------------------- OPTIONAL Section -------------------)

[output-optional](../components/output-optional.md ':include')
