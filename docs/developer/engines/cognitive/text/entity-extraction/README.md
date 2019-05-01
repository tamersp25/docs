# Building an Entity Extraction Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

Entity extraction engines classify named entities, located in unstructured text, into predefined categories such as People, Organizations, and/or Locations.

## Engine Manifest

All entity extraction engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to an entity extraction engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Entity extraction engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting the entire list of extracted entities in their `vtn-standard` output.

> In the future, entity extraction engines will also be able to accept `vtn-standard` [text extraction output](/developer/engines/cognitive/text/text-extraction/?id=engine-output) as their input, opening up processing to any file types supported by text extraction engines.

### Training and Libraries

If entity extraction engines are made [trainable with libraries](/developer/libraries/engines) then they can map their output back to entities in the libraries they were trained on by including an `entityId` in their engine output.

## Engine Output

### Simple Example

This is an example output that only specifies a `label` for the identified entity.

[](vtn-standard-minimal.example.json ':include :type=code json')

### Real-World Example

This is a more involved example that includes a label, confidence, a mapping to a category classification taxonomy, sentiment readings, and page/paragraph/sentence referencing (all optional)

[](vtn-standard-real.example.json ':include :type=code json')

### Library Entity Example

This is an example output that maps an extracted entity back to an aiWARE library entity.

[](vtn-standard-library-entity.example.json ':include :type=code json')
