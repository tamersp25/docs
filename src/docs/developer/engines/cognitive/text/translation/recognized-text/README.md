# Translating Recognized (OCR) Text

[badge/API/Yes/green]
[badge/Search/No/red]
[badge/UI/No/red]

Recognized (OCR) text is one of the [five input formats](/developer/engines/cognitive/text/translation/?id=engine-input-options) that translation engines can support.
Recognized text is the engine output of a [text recognition (OCR)](/developer/engines/cognitive/vision/text-recognition/?id=engine-output) engine.

!> In order to use recognized text translation engines, it is necessary to chain the output of a text recognition engine into the input of the translation engine in one job.
The platform will not currently handle this routing for you.

## Engine Manifest

Recognized text translation engines should specify the following parameters in their build manifest:

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

Recognized text translation engines should be implemented as [segment processing](/developer/engines/processing-modes/segment-processing/) engines.
Each segment will be a `vtn-standard` snippet containing recognized text (conforming to the `text` validation contract).

> The input format is very similar to the input format for [extracted text translation engines](/developer/engines/cognitive/text/translation/extracted-text/?id=example-input),
so these two types are often supported together in the same engine.

### Example Input

[](vtn-standard-input.example.json ':include :type=code json')

> The `language` value may or may not be present on the input.
If it is not present, the engine may decide whether to try to guess the source language or return an error.

## Engine Output

Engine output is very similar to the engine input, conforming to the same `text` validation contract and mirroring the series array and startTimeMs/stopTimeMs values.
The only things that usually change are the `language` code and the values in the `text` keys.

### Example Output

[](vtn-standard-output.example.json ':include :type=code json')
