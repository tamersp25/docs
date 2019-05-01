# Building a Language Identification Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

Language identification engines analyze text to deduce the most likely language being used in the text.

## Engine Manifest

All language identification engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to an language identification engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Language identification engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting the language analysis results for the entire file in their `vtn-standard` output.

> In the future, language identification engines will also be able to accept `vtn-standard` [text extraction output](/developer/engines/cognitive/text/text-extraction/?id=engine-output) as their input, opening up processing to any file types supported by text extraction engines.

## Engine Output

Languages are specified according to the `language` validation contract by specifying the `language` key on the entire document.

[](../_snippets/language_code_spec.md ':include')

### Example

This example shows categorizing an entire document according to one language.

[](vtn-standard.example.json ':include :type=code json')

<!--TODO: Consider adding support for phrase-based language identification by allowing object.language the same way we have series.words.language-->
