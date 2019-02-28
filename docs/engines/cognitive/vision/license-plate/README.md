# License Plate Recognition (ALPR)

## Engine Output

License plate detections can be reported in engine output by specifying an `object` of `type: licensePlate`.
An object definition can exist in either the object array (for non-time-based detections)
or in an `object` key in the `series` array (for time-based detections).

Here is an example of proper engine output for objects detected within a time series:

[](vtn-standard.example.json ':include :type=code json')

TODO: Add an example for objects outside a time series

The official engine output json-schema is available
[here](/schemas/vtn-standard/license-plate.json ':ignore').
