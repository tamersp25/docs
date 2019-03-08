# Building a Logo Detection Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

Logo detection engines are designed to detect one or more logos or branding elements in an image or video. 

<!-- TODO
## Engine Manifest

All face recognition engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

Here is a minimal example `manifest.json` that could apply to a face recognition engine:
-->

<!--TODO: Define [](manifest.example.json ':include :type=code javascript')-->

<!-- ## Engine Input -->

<!-- TODO -->

## Engine Output

Logos can be reported in engine output by specifying an `object` of `type: logo`.
An object definition can exist in either the object array (for non-time-based detections)
or in an `object` key in the `series` array (for time-based detections).

### Example
Here is an example of proper engine output for objects detected within a time series:

[](vtn-standard.example.json ':include :type=code json')

<!-- TODO: Add an example for objects outside a time series -->

The official engine output json-schema is available
[here](/schemas/vtn-standard/logo.json ':ignore').

