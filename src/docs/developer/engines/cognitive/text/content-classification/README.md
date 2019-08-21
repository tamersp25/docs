# Building a Content Classification Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

Content classification engines classify text into particular categories based on what words the text contains.

## Engine Manifest

All content classification engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain","text/plain; charset=utf-8"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to a content classification engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Content classification engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting insights from the entire file in their `vtn-standard` output.

> In the future, content classification engines will also be able to accept `vtn-standard` [text extraction output](/developer/engines/cognitive/text/text-extraction/?id=engine-output) as their input, opening up processing to any file types supported by text extraction engines.

## Engine Output

Content classification engine output conforms to the `concept` validationContract and writes results into the `object` array as objects of type `concept`.
The `objectCategory` array is used to specify one or more categories that the text has been classified into.

- The text written to the `class` key are specified by the engine provider based on their own taxonomy.
- If the classification is in reference to a particular taxonomy, the `@id` key can be used to provide a URI to the category definition.
- If there is a weighting or confidence on the various classifications, it can be expressed with the `confidence` key.

> aiWARE does not mandate a master concept taxonomy that engines are required to conform to.
They use class names (and @id if appropriate) to map to external taxonomies.

### Minimal Example

The minimal example of content classification engine output using only required keys would look something like this:

[](vtn-standard-minimal.example.json ':include :type=code json')

### Real-World Example

Here is a more typical engine output example that classifies a particular sentence in a document into two categories from the [IPTC Subject Codes taxonomy](https://iptc.org/standards/subject-codes/).

[](vtn-standard-real.example.json ':include :type=code json')

> IPTC is simply chosen as one example.
Any taxonomy may be used as long as its classes can be referenced with a URI.
