# Building a License Plate Recognition (ALPR) Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

An automated license plate recognition (ALPR) engine extracts text strings from images or videos of vehicle license plates.

## Engine Manifest

<!-- TODO 
All license plate recognition engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

Here is a minimal example `manifest.json` that could apply to a license plate recognition engine:
-->

<!--TODO: Define [](manifest.example.json ':include :type=code javascript')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

<!-- ## Engine Input -->

<!-- TODO -->

## Engine Output

License plate detections can be reported in engine output by specifying an `object` of `type: licensePlate`.
An object definition can exist in either the object array (for non-time-based detections)
or in an `object` key in the `series` array (for time-based detections).

### Example

Here is an example of proper engine output for objects detected within a time series:

[](vtn-standard.example.json ':include :type=code json')

<!-- TODO: Add an example for objects outside a time series -->

The official engine output json-schema is available
[here](/schemas/vtn-standard/license-plate.json ':ignore').



