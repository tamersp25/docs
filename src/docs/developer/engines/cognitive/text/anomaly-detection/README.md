# Building an Anomaly Detection Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

Anomaly Detection engines assign a confidence value to specific entries in time-series objects with the goal of predicting which events are anomalous

## Engine Manifest

All anomaly detection engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/csv"` |
| `supportedInputFormats` | `["text/csv", "text/plain","text/plain; charset=utf-8"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to an anomaly detection engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Anomaly Detection engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `text/csv`).
In this case, engines are given the entire file as their input and are responsible for outputting insights from the entire file in their `vtn-standard` output.

## Engine Output

Anomaly Detection engine output conforms to the `anomaly` validationContract and writes results into the `object` array as objects of type `anomaly`.
The `objectCategory` array is used to specify one or more `anomaly` objects as well as their respective confidence value. Alternativly, a `series` array may be used in place of the `object` array in order to represent time-based `anomaly` objects.

- The text written to the `class` key are specified by the engine provider based on their own taxonomy.
- The text written to the `@id` key are specified by the engine provider based on their own taxonomy. It is highly encouraged that the engine provider ensure the `@id` field be unique.
- The weighting or confidence on the various anomalies, it can be expressed with the `confidence` key.

aiWARE does not mandate a master anomaly taxonomy that engines are required to conform to.
They use class names (and @id if appropriate) to map to external taxonomies.

> The official `anomaly` validation contract json-schema is available
[here](/schemas/vtn-standard/anomaly/anomaly.json ':ignore').

### Minimal Example

The minimal example of anomaly detection engine output using only required keys would look something like this:

[](../../../../../../schemas/vtn-standard/anomaly/examples/object-simple.json ':include :type=code json')

### Real-World Example

Here is a more typical engine output example that classifies a anomalies in a time-based form:

[](../../../../../../schemas/vtn-standard/anomaly/examples/real-world.json ':include :type=code json')
