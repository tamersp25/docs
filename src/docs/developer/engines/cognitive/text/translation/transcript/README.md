# Translating Transcripts

[badge/API/Yes/green]
[badge/Search/No/red]
[badge/UI/No/red]

Transcripts are one of the [five input formats](/developer/engines/cognitive/text/translation/?id=engine-input-options) that translation engines can support.
Transcripts are the engine output of a [transcription (speech-to-text)](/developer/engines/cognitive/speech/transcription/?id=engine-output) engine.

!> In order to use transcript translation engines, it is necessary to chain the output of a transcription engine into the input of the translation engine in one job.
The platform will not currently handle this routing for you.

## Engine Manifest

Transcript translation engines should specify the following parameters in their build manifest:

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

Transcript translation engines should be implemented as [segment processing](/developer/engines/processing-modes/segment-processing/) engines.
Each segment will be a `vtn-standard` snippet containing recognized text (conforming to the `transcript` validation contract).

### Example Input

[](vtn-standard-input.example.json ':include :type=code json')

> The `language` value may or may not be present on the input.
If it is not present, the engine may decide whether to try to guess the source language or return an error.

## Engine Output

Engine output is very similar to the engine input, conforming to the same `transcript` validation contract and mirroring the series array and startTimeMs/stopTimeMs values.

However, transcript translation is a little more complicated than other translation types because transcripts have word-by-word timing, but single-word translations are not nearly as accurate as phrase or sentence translations.
Therefore, in order to properly group the translated words and still maintain the time-based `series` structure, the `series` array has to be modified slightly.

### The Per-Phrase Translation Algorithm

First combine the input transcript up into sections based on where there are either `"."` words or breaks in the timing (i.e. the `startTimeMs` of one word is more than 1 second later than the stopTimeMs of the previous word).

| Time | Content |
| ---- | ------- |
| 0-1201 | "this is a sentence." |
| 2500-3200 | "now another" |

Then for each section...

1. Make a note of the minimum `startTimeMs` and maximum `stopTimeMs` of all words in the section.
1. Submit the section for translation as one phrase.
1. Break the resulting translation back up into words based on spaces or characters (depending on what constitutes a word in that language).
1. Reconstruct the series array by having one series object per word (similar to how the input had one object per word) but set the `startTimeMs` and `stopTimeMs` for each word equal to the minimum start and maximum stop times of the entire section (so they look like they overlap).

Here is some (Python-ish) pseudo-code that implements this algorithm:

```python
destination_language = "es"
result_series = []
last_word_stop_time = 0
current_phrase = ""
min_start_time = None
max_stop_time = None

function translate_and_append(start, stop, phrase):
  translated_phrase = your_translator(phrase, destination_language)
  translated_words = break_into_words(translated_phrase)  # Might be different per language
  for word in translated_words:
    result_series.append({
      "startTimeMs": start,
      "stopTimeMs": stop,
      "language": destination_language,
      "words": [{"word": word}]
    })
  # Reset temporary data
  current_phrase = ""
  min_start_time = None
  max_stop_time = None

for object in input.series:
  # Silences in the transcript longer than 1 second
  if object.startTimeMs - last_word_stop_time < 1000:
    translate_and_append(min_start_time, max_stop_time, current_phrase)

  else:
    current_phrase += object.words[0].word
    if min_start_time is None or object.startTimeMs < min_start_time:
      min_start_time = object.startTimeMs
    if max_stop_time is None or object.stopTimeMs > max_stop_time:
      max_stop_time = object.stopTimeMs

    # Explicit period in the transcript
    if object.words[0].word == ".":
      translate_and_append(min_start_time, max_stop_time, current_phrase)

# Clear out any remaining phrase buffer
if current_phrase != "":
  translate_and_append(min_start_time, max_stop_time, current_phrase)
  
return {
  "schemaId": "https://docs.veritone.com/schemas/vtn-standard/master.json",
  "validationContracts": ["transcript"],
  "series": result_series
}
```

> For simplicity, the pseudo-code above assumes that there is only one word in each object (i.e. `object.words.length == 1`).
For transcripts with complex lattices (not common), `object.words.length` might be greater than 1.
In those cases, you will want to select the words where `object.words[n].bestPath` is `true`.
There will only be one of these in each `words` array.

### Example Output

[](vtn-standard-output.example.json ':include :type=code json')
