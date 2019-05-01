# Building a Sentiment Analysis Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

A sentiment analysis engine classifies text according to sentiment or emotion, which may be a score representing negative, positive, or neutral sentiment, or could include a wider breadth of tags (such as "happy" or "excited").

## Engine Manifest

All sentiment analysis engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain"]` |
| `engineMode` | `"chunk"` |

Here is a minimal example `manifest.json` that could apply to an sentiment analysis engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Sentiment analysis engines can specify `supportedInputFormats` in their [manifest](/developer/engines/standards/engine-manifest/) for mime types they can support natively (e.g. `text/plain`, `application/pdf`).
In this case, engines are given the entire file as their input and are responsible for outputting the sentiment analysis results for the entire file in their `vtn-standard` output.

> In the future, sentiment analysis engines will also be able to accept `vtn-standard` [text extraction output](/developer/engines/cognitive/text/text-extraction/?id=engine-output) as their input, opening up processing to any file types supported by text extraction engines.

## Engine Output

### Example 1: Simple Output

The simplest possible sentiment output involves reporting a single positive sentiment value for the entire document.
Such an analysis would be reported like this:

[](vtn-standard-simple-doc.example.json ':include :type=code json')

### Example 2: Richer Output

If you need to report more complex sentiment or emotions, additional fields are available.

- `sentiment` is used for a general positive/negative emotion.
It can have both positive and negative values, as well as separate confidences for each.
- `emotions` can express as many different emotions as you'd like, each with their own values and confidences.
The value of the `emotion` field can include any descriptor you'd like.

> Although this example shows it and we do support it, we do not expect most engines to output both sentiment and emotions.
Most would choose one output format or the other.

[](vtn-standard-complex-doc.example.json ':include :type=code json')

> While we don't have any current engine providers expressing emotions as emoji (like 🤯), it is technically supported as valid utf-8 characters,
and its use above does exemplify the fact that these emotion codes do not need to conform to an aiWARE-managed list and can be anything the engine developer wishes.

### Example 3: Per-Phrase Reporting

Both `sentiment` and `emotions` can be reported at a per-phrase resolution by putting them within a `text` object
and optionally referencing the page, paragraph, and/or sentence index where they occur.

[](vtn-standard-complex-phrase.example.json ':include :type=code json')

### Example 4: Polarized

A common output of standalone "sentiment analysis" engines is report a single sentiment value of "positive," "negative," or "neutral" along with a single confidence value.
In vtn-standard format, those can be expressed as such:

<!--
TODO: Explore whether it's too late to rewrite this entirely to just sentiment.value and sentime.confidence and just have value be from -1 to 1.
Or at least consolidate the confidence scores into just a `confidence` key.
Otherwise this is the only one with a differently-named confidence key
-->

#### Positive

[](vtn-standard-positive.example.json ':include :type=code json')

#### Negative

[](vtn-standard-negative.example.json ':include :type=code json')

#### Neutral

[](vtn-standard-neutral.example.json ':include :type=code json')
