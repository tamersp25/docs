# Translating Extracted Text

[badge/API/Yes/green]
[badge/Search/No/red]
[badge/UI/Partial/yellow]

Extracted text is one of the [five input formats](/developer/engines/cognitive/text/translation/?id=engine-input-options) that translation engines can support.
Extracted text is the engine output of a [text extraction](/developer/engines/cognitive/text/text-extraction/?id=engine-output) engine.
When a translation engine supports this input type, it allows aiWARE to parse and normalize the contents of various document formats (e.g. .doc, .docx, .pdf, .xls, etc.) into one consolidated format.
In that way the translation engine developer only has to worry about supporting one input format: `vtn-standard` (according to the `text` validation contract).

!> In order to use extracted text translation engines, it is necessary to chain the output of a text extraction engine into the input of the translation engine in one job.
The platform will not currently handle this routing for you.

## Engine Manifest

Extracted text translation engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `engineMode` | `"chunk"` |
| `preferredInputFormat` | `"application/json"` |
| `supportedInputFormats` | `["application/json"]` |
| `outputFormats` | `["application/json"]` |

Here is a minimal example `manifest.json` that could apply to a translation engine:

[](manifest.example.json ':include :type=code json')

[](../../../../_snippets/engine-manifest-pointer.md ':include')

## Engine Input

Extracted text translation engines should be implemented as [segment processing](/developer/engines/processing-modes/segment-processing/) engines.
Each segment will be a `vtn-standard` snippet containing extracted text (conforming to the `text` validation contract).

> The input format is very similar to the input format for [recognized text translation engines](/developer/engines/cognitive/text/translation/recognized-text/?id=example-input),
so these two types are often supported together in the same engine.

### Example Input

[](vtn-standard-input.example.json ':include :type=code json')

> The `language` value may or may not be present on the input.
If it is not present, the engine may decide whether to try to guess the source language or return an error.

## Engine Output

Engine output is very similar to the engine input, conforming to the same `text` validation contract and mirroring the object array and page/paragraph/sentence indices.
The only things that usually change are the `language` code and the values in the `text` keys.

> The official `text` validation contract json-schema is available
[here](/schemas/vtn-standard/text/text.json ':ignore').

### Example Output

[](../../../../../../../schemas/vtn-standard/text/examples/extracted-text.with-language.json ':include :type=code json')

> The `page`, `paragraph`, `sentence` values are optional for the input.
Whatever is given in the input for those values (if any) should be returned on the output as well.
