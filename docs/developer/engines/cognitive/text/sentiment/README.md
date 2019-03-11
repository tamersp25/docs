# Building a Sentiment Analysis Engine

![](badge/API/Yes/green)
![](badge/Search/No/red)
![](badge/UI/No/red)

<!--TODO: Add additional sections-->

## Engine Output

The simplest possible sentiment output involves reporting a single positive sentiment value for the entire document.
Such an analysis would be reported like this:

[](vtn-standard-simple-doc.example.json ':include :type=code json')

If you need to report more complex sentiment or emotions, additional fields are available.

- `sentiment` is used for a general positive/negative emotion.
It can have both positive and negative values, as well as separate confidences for each.
- `emotions` can express as many different emotions as you'd like, each with their own values and confidences.
The value of the `emotion` field can include any descriptor you'd like.

[](vtn-standard-complex-doc.example.json ':include :type=code json')

### Per-Phrase Reporting

Both `sentiment` and `emotions` can be reported at a pre-phrase resolution by putting them within a `text` object
and optionally referencing the page, paragraph, and/or sentence index where they occur.

[](vtn-standard-complex-phrase.example.json ':include :type=code json')
