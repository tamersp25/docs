[comment]: <> (------------------- OUTPUT OPTIONAL Section -------------------)

### Optional Output Fields

Any vendor specific data, or optional data elements can be placed in 'vendor' sections.  This can be used as a catch all place for elements that aren't explicitly defined in the [VERI Engine Standard](engines/engine_standards/veri_standards.md).

Please feel free to reach out to us on [Slack](https://chat.veritone.com/) for suggestions on the engine standards. 


#### Sample of Optional Output Fields

```javascript
var sample = {
    // Preamble

    ...

    // Optional: Vendor specific reference.  Used to map engine output against vendor referenced data ID
    'externalSourceId': '<string>',

    ...
    
    // OPTIONAL:
    // Object (Face, Object, Logo, OCR, ..)
    // This is for detecting something
    'object': [{

        ...

      // CUSTOM DATA FOR TIME SLICE
      // Add keys here that do not conflict with above
      'vendor': {

      }
    }], // END OBJECT

    // CUSTOM DATA FOR FILE
    // Add keys here that do not conflict with above
    'vendor': {

    },

    // Optional
    // Series describe the time series data format that maps engine outputs with correlated time slices
    'series': [{
        ...
          // OPTIONAL:
          // Object (Face, Object, Logo, OCR, ..)
          // This is for detecting something
          'object': {
           ...

            // CUSTOM DATA FOR TIME SLICE
            // Add keys here that do not conflict with above
            'vendor': {

            }
          }, // END OBJECT

       ...

          // CUSTOM DATA FOR TIME SLICE
          // Add keys here that do not conflict with above
          'vendor': {

          }
        };
```

Please refer to the full [VERI Standard](engines/engine_standards/veri_standards.md) for additional information.