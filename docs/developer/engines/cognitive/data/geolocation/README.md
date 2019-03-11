# Building a Geolocation Engine

A geolocation engine identifies the location (lat/long) of a person or object within a geographic domain.

<!-- TODO  Manifest, Engine Input -->

## Engine Output

Geolocation data conforms to the `geolocation` validation contract and is identified by the `gps` key.
It can be added to multiple parts of an engine's output.

<1-- 
TODO: Show examples of reporting geolocation at the doc, object, series, and series-object levels.
Look at this for inspiration: https://github.com/veritone/docs/pull/59/files#diff-ba4cda0a29f49605adac1e478ca37e8dR5
-->

Here is an example of tagging a particular object within a time series with a `gps` location:

[](vtn-standard-series-object.example.json ':include :type=code json')

### Schema

The official engine output json-schema is available
[here](/schemas/vtn-standard/geolocation.json ':ignore').
