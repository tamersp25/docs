# Building an Object Detection Engine

[badge/API/Yes/green]
[badge/Search/Yes/green]
[badge/UI/Yes/green]

An object detection engine detects one or more objects in an image or video, based on a general (high level) ontology.
For example, the engine might detect objects such as `person`, `desk`, or `aircraft`.

## Engine Manifest

<!-- TODO
Here is a minimal example `manifest.json` that could apply to an object detection engine:
-->

<!--TODO: Define [](manifest.example.json ':include :type=code json')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

<!-- ## Engine Input -->

<!-- TODO: Give example of engine input -->

## Engine Output

General detected objects can be reported in engine output by specifying an `object` of `type: object`.
An object definition can exist in either the object array (for non-time-based detections)
or in an `object` key in the `series` array (for time-based detections).

> The official `object` validation contract json-schema is available
[here](/schemas/vtn-standard/object/object.json ':ignore').

### Time-Series Example

Here is an example of proper engine output for objects detected within a time series:

[](../../../../../../schemas/vtn-standard/object/examples/from-docs.json ':include :type=code json')

### Non-Time-Series Example

Here is an example of proper engine output for objects detected over the entire input media:

[](../../../../../../schemas/vtn-standard/object/examples/summary.json ':include :type=code json')
