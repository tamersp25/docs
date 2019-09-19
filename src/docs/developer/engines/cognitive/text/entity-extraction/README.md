# Building an Entity Extraction Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

Entity extraction, sometimes referred to as 'named entity extraction' is an aspect of Natural Language Processing (NLP) that refers to labeling words, phrases or even concepts in text.
Entity extraction engines classify named entities, located in unstructured text, into predefined categories such as People, Organizations, and/or Locations.
They can also denote `time` or `date`, which can be quite useful when pre-processing large chunks of text.

## Use Cases

When building a search engine, I may wish to index people, places, and things so that my customers can find content based on those categories.
For example, I might have an article that talks about the City of `London`.
For my users, they would like to find articles about the place when searching for `London`, but I'd have articles about people named `London` ranked lower.

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

> The official `entity` validation contract json-schema is available
[here](/schemas/vtn-standard/entity/entity.json ':ignore').

### Simple Example

This is an example output that only specifies a `label` for the identified entity.

[](../../../../../../schemas/vtn-standard/entity/examples/simple.json ':include :type=code json')

### Real-World Example

This is a more involved example that includes a label, confidence, a mapping to a category classification taxonomy, sentiment readings, and page/paragraph/sentence referencing (all optional)

[](../../../../../../schemas/vtn-standard/entity/examples/real-world.json ':include :type=code json')

### Library Entity Example

This is an example output that maps an extracted entity back to an aiWARE library entity.

[](../../../../../../schemas/vtn-standard/entity/examples/library-entity.json ':include :type=code json')
