# Building a Text Recognition Engine

[badge/API/Yes/green]
[badge/Search/Yes/green]
[badge/UI/Yes/green]

Text recognition engines process documents (primarily images) to recognize text in them and express that recognized text in a structured format.
**Optical character recognition (OCR)** is a technology that is often used to implement text recognition engines.

They are similar to [text extraction](/developer/engines/cognitive/text/text-extraction/)
engines in their output data structure.
But where text extraction engines are used to extract text content from *semi-structured* files, like PDFs or Microsoft Word documents,
text **recognition** engines are used to recognize text in *unstructured* files, such as images.

<!-- TODO

## Engine Manifest

All text recognition engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

Here is a minimal example `manifest.json` that could apply to a text recognition engine:

-->

<!--TODO: Define [](manifest.example.json ':include :type=code json')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

<!-- ## Engine Input -->

<!-- TODO -->

<!-- ### Training and Libraries

Text recognition engines are required to be [trainable via libraries](/developer/libraries/engines). -->

## Engine Output

Text recognition engine output can follow two forms, depending on whether the file being processed is time-based file (e.g. audio, video) or a non-time-based (e.g. image).

> The official `text` validation contract json-schema is available
[here](/schemas/vtn-standard/text/text.json ':ignore').

### Example &mdash; Time-Based

[](../../../../../../schemas/vtn-standard/text/examples/recognized-text.json ':include :type=code json')

### Example &mdash; Non-Time-Based

[](../../../../../../schemas/vtn-standard/text/examples/recognized-text-no-series.json ':include :type=code json')

## Translating Recognized Text

Some translation engines will take the outputs of text recognition engines as input to their translation engines.
To learn how those engines are built please see [Translating Recognized (OCR) Text](/developer/engines/cognitive/text/translation/recognized-text/).
