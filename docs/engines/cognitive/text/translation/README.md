# Building a Translation Engine

![](badge/API/Yes/green)
![](badge/Search/No/red)
![](badge/UI/Partial/yellow)

Translation engines take the content of a file and translate it to another language, ideally outputting it in the same format as the input.

## Engine Manifest

All translation engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to an audio fingerprinting engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/engines/standards/engine-manifest/) for more details.

## Engine Input

Translation engines can specify `supportedInputFormats` in their [manifest](/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting the entire translated contents in their `vtn-standard` output.

> In the future, translation engines will also be able to accept `vtn-standard` [text extraction output](/engines/cognitive/text/text-extraction/?id=engine-output) as their input, opening up processing to any file types supported by text extraction engines.

## Engine Output

Translation engine output is very similar to [text extraction engine output](/engines/cognitive/text/text-extraction/?id=engine-output).

### Sentence-Based Output

For plain text files that contain full sentences, the input document should be broken up by sentences and output in chunks based on the sentence index (starting with 1).

[](vtn-standard-sentence.example.json ':include :type=code json')

### Line-Based Output

If the input document does not have sentences and the most appropriate way to break up the file for translation is line-by-line, then the output may be indexed by `paragraph` representing the lines.

[](vtn-standard-line.example.json ':include :type=code json')

### Full-Text Output

If there are no logical breaks in the translated text, the engine could output the entire contents to a single `text` block.
The downside to this is that when users search for results within the translated contents of a document, they may not be able to easily locate where in the document the result is found.

[](vtn-standard-block.example.json ':include :type=code json')
