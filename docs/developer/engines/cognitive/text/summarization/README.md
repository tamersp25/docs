# Building a Summarization Engine

![](badge/API/Partial/yellow)
![](badge/Search/No/red)
![](badge/UI/No/red)

Summarization engines generate a readable summary of a given piece of text.

## Engine Manifest

All summarization engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to an summarization engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Summarization engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting the summary of the entire file in their `vtn-standard` output.

> In the future, summarization engines will also be able to accept `vtn-standard` [text extraction output](/developer/engines/cognitive/text/text-extraction/?id=engine-output) as their input, opening up processing to any file types supported by text extraction engines.

## Engine Output

### Example

The simplest example is a single summary of an entire document

[](vtn-standard-simple.example.json ':include :type=code json')

<!--TODO: Technically, summary also exists on the series array object but there doesn't seem like many use cases for that.-->
<!--TODO: Consider adding summary to the object array so it can be specified on a per-phrase basis.-->
