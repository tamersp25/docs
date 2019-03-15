# Building a Data Correlation Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

A data correlation engine associates data items based on some common factor, such as temporal co-occurrence.
For example, it may associate weather data on a given date with stock prices on that date.

## Engine Manifest

See the full documentation for [engine manifest standards](/engines/standards/engine-manifest/) for more details.

<!-- TODO  Need ##Engine Input section -->

## Engine Output

### Example

[](vtn-standard.example.json ':include :type=code json')

[Primary Source](https://github.com/veritone/task-simple-correlator/blob/master/app.js#L178)

> Similar to other engine capabilities, the only required data is what is under `series`.
The rest is informational only.
