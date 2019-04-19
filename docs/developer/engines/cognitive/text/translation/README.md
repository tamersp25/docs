# Building a Translation Engine

![](badge/API/Yes/green)
![](badge/Search/No/red)
![](badge/UI/Partial/yellow)

Translation engines take the content of a file and translate it to another language, ideally outputting it in the same format as the input.

## Engine Manifest

All translation engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `engineMode` | `"chunk"` |
| `preferredInputFormat` | Depends on which input types the engine supports.  See below. |
| `supportedInputFormats` | Depends on which input types the engine supports.  See below. |
| `outputFormats` | `["application/json"]` |

Here is a minimal example `manifest.json` that could apply to a translation engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input and Output

Translation engines are unique in that they can translate many different input types.
The input formats the engine will receive are dependent on the `supportInputFormats` key in the engine manifest.
The output format should always be in [vtn-standard](/developer/engines/standards/engine-output/) format, but the structure of the contents (the "validation contract") will be dependent on the structure of the input document.

There are two main types of input formats an engine may support:

- [Plain Text Documents](#processing-plain-text-documents)
- [vtn-standard Documents](#processing-vtn-standard-documents)

[](../_snippets/language_code_spec.md ':include')

### Processing Plain Text Documents

If an engine includes `"text/plain","text/plain; charset=utf-8"` in its `supportedInputFormats`, it will receive entire text files.
In this case, the engine would be responsible for translating the contents of the entire text file and outputting the entire translated contents in their `vtn-standard` output.

> Engines can also technically specify other text-based formats like `application/pdf` in their `supportedInputFormats`, but we recommend adding support for `vtn-standard` input conforming to the `text` validation contract instead of trying to support multiple document formats as this will allow other engines to be responsible for normalizing the file format while the translation engine has to worry only about translation.

#### Engine Output Examples

Translation engine output for processing plain text files is very similar to [text extraction engine output](/developer/engines/cognitive/text/text-extraction/?id=engine-output).

##### Sentence-Based Output

<!--TODO: Show examples of the corresponding plain text input-->

For plain text files that contain full sentences, the input document should be broken up by sentences and output in chunks based on the sentence index (starting with 1).

[](vtn-standard-plain-text-sentence.example.json ':include :type=code json')

##### Line-Based Output

If the input document does not have sentences and the most appropriate way to break up the file for translation is line-by-line, then the output may be indexed by `paragraph` representing the lines.

[](vtn-standard-plain-text-line.example.json ':include :type=code json')

##### Full-Text Output

If there are no logical breaks in the translated text, the engine could output the entire contents to a single `text` block.
The downside to this is that when users search for results within the translated contents of a document, they may not be able to easily locate where in the document the result is found.

[](vtn-standard-plain-text-block.example.json ':include :type=code json')

### Processing vtn-standard Documents

If an engine includes `"application/json"` in its `supportedInputFormats`, it will be able to receive vtn-standard output from other engines.
These vtn-standard documents would include structured insights from other engines (e.g. text extraction, transcription, etc.) for either the entire file or a portion of the file.

In this case, the engine should first check the `validationContracts` key on the JSON document to determine if it is a supported validationContract that the engine can understand.
Translation engines that process vtn-standard should target one or more of the following validationContracts:

| Engine Category | Validation Contract | vtn-standard Data Location |
| --------------- | ------------------- | -------------------------- |
| [Text Extraction](/developer/engines/cognitive/text/text-extraction/) | `text` | `object[type=text].text` |
| [Text Recognition (OCR)](developer/engines/cognitive/vision/text-recognition/) | `text` | `series.object[type=text].text` |
| [Transcription](/developer/engines/cognitive/speech/transcription/) | `transcript` | `series.words.word` |

<!--TODO: We could also add in some other categories/contracts like summary, object, and really anything that writes to the label field-->

If the vtn-standard document does **not** conform to one of the supported validation contracts, the engine should send back an empty output.
If the vtn-standard document **does** conform to one of the supported validation contracts, the engine would then translate the relevant text and construct an output message in the same structure as the input message, but with the translated text replacing the old text and a language code appended.

!> At this time running translation engines on vtn-standard outputs is only supported by creating jobs that explicitly send output from one engine to the translation engine.
In addition, mime-type filtering will not occur in this mode so the chaining of engines needs to be 

<!--TODO: Link to docs on how to do that^ (to be written by API team)-->

Translation engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting the entire translated contents in their `vtn-standard` output.

#### Engine Output Examples

When translating vtn-standard documents, engine output should look very similar to the engine input received.

##### Text Extraction Translation

[Text Extraction](developer/engines/cognitive/text/text-extraction/) engines normalize the contents of a variety of document file formats into a vtn-standard document conforming to the `text` validation contract.
The output of a translated text extraction document should look very similar to the input, but with different text, a different language code, and a new confidence score (if applicable).

###### Input

[](vtn-standard-text-extraction.input.example.json ':include :type=code json')

> The input may not specify a language code.
In this case the engine can decide whether to support such a condition (and guess the language) or return an empty output.

###### Output

Notice the following:
- The `text` values have been changed to the translated text.
- The `language` tag has been adjusted from `en` to `es`.
- The `confidence` values now reflect the confidence of the translation, not the original text extraction.
- All other data has remained, including the `validationContracts`, the object `type` code, and `sentence` (and `paragraph` and `page` if present) indices.

[](vtn-standard-text-extraction.output.example.json ':include :type=code json')

##### Text Recognition (OCR) Translation

[Text Recognition (OCR)](/developer/engines/cognitive/vision/text-recognition/) engines detect characters and words in images and video.
The output of these engines is similar in spirit to [text extraction](developer/engines/cognitive/text/text-extraction/) engines, even conforming to the same `text` validation contract.
But because the input media is images and videos, the output is referenced to start/stop times and bounding polygons, not page, paragraph, and sentence numbers.
Therefore the output is stored in the `series` array of the `vtn-standard` specification.

###### Input

[](vtn-standard-text-recognition.input.example.json ':include :type=code json')

> The input may not specify a language code.
In this case the engine can decide whether to support such a condition (and guess the language) or return an empty output.

###### Output

Notice the following:
- The `text` values have been changed to the translated text.
- The `language` tag has been adjusted from `en` to `es`.
- The `confidence` values now reflect the confidence of the translation, not the original text extraction.
- All other data has remained, including the `validationContracts`, the object `type` code, and `startTimeMs` and `stopTimeMs` values.

[](vtn-standard-text-recognition.output.example.json ':include :type=code json')

##### Transcription Translation

[Transcription](/developer/engines/cognitive/speech/transcription/) engines convert spoken word audio to text.
The output of these engines is similar to [text recognition (OCR)](/developer/engines/cognitive/vision/text-recognition/) engines in that the data is time-based and so is stored in the `series` array of the `vtn-standard` specification.
But because it is a transcript, the individual words are embedded in the `words` sub-array so they can specify per-word timing.

###### Input

[](vtn-standard-transcription.input.example.json ':include :type=code json')

> The input may not specify a language code.
In this case the engine can decide whether to support such a condition (and guess the language) or return an empty output.

###### Output

<!--TODO:
While this is fine guidance for right now, when we enable search for this category, this format will not work for populating the search index with proper terms.
It will index the entire sentence as a term, which won't allow usres to search for portions of the sentence.
I have an open question as to whether we can actually do a separate word for each translated word but have each have the startTimeMs = beginning of sentence and stopTimeMs = end of sentence
so they'd all be overlapping terms for the entire length of the sentence.  If indexing uses a stable sort, then we can rely on word order and all should be ok.
-->

Because grammar structures differ between languages, Veritone's recommendation is to group the input transcript into sentences and translate each sentence individually, reporting a transcript series that only goes down to sentence-level granularity.
This tends to strike a good balance between providing translation engines enough context to generate a good translation and keeping enough granular timing for typical transcribe-translate use cases like multi-lingual closed captioning. 

[](vtn-standard-transcription.output-per-sentence.example.json ':include :type=code json')

###### Not Recommended: Per-Word Output

!> Notice how the per-word translation "esto es uno frase." is a worse translation than the sentence-based translation "esta es una frase." because translating one word at a time lacks the proper context.

[](vtn-standard-transcription.output-per-word.example.json ':include :type=code json')

<!--TODO: Do a better example of terrible translation that ends up with bad spanish grammar because it was done one word at a time.-->
