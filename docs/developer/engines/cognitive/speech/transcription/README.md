# Building a Transcription Engine

[badge/API/Yes/green]
[badge/Search/Yes/green]
[badge/UI/Yes/green]

Transcription engines &mdash; often known as "speech-to-text" or natural language processing (NLP) &mdash; take recorded speech audio and output the words that were said.
Depending on the engine's capabilities, the output could be a simple sequence of words or a "lattice of confidence" expressing multiple options for how the words were spoken.

## Engine Manifest

Manifest fields of unique importance for transcription engines include:

- `preferredInputFormat`: The MIME type of files that work best with your engine
- `supportedInputFormats`: All MIME types that your engine can take as input
- `engineMode`: Most audio engines choose to run in `stream` mode so that they can process data in real-time

Here is a minimal example `manifest.json` that could apply to a transcription engine:

[](manifest.example.json ':include :type=code json')

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

Audio-processing engines can be [stream processing](/developer/engines/processing-modes/stream-processing/) engines, or (if processing will be stateless) they can be [segment processing](/developer/engines/processing-modes/segment-processing/).
A transcription engine is typically _stateful_, hence will operate in _stream processing_ mode.

[](../../_snippets/audio-engine-mime-type.md ':include')

## Engine Output

Transcribed words can be reported in engine output by using the `words` array within the `series` array.

### Simple Example

Here is an example of the simplest type of transcript output:

[](vtn-standard-simple.example.json ':include :type=code json')

### Adding Confidence Scores

In addition to the basic array of phrases, the `confidence` key can be used to indicate how confident the engine is in a given result (0-100%).

[](vtn-standard-confidence.example.json ':include :type=code json')

### Adding Transcription Lattices

A "transcription lattice" is the concept of expressing multiple possibilities of words that were spoken, with various confidences assigned to each.
If an engine is able to output this type of nuanced information, the benefit is that aiWARE will index all possibilities so that the user will be able to search against all possibilities at once.

<!--TODO: It'd be great to include a visual diagram of how this works-->

To output a lattice of confidence, you can write multiple entries to the `words` array and add the following keys to each entry:

| Key | Explanation |
| --- | ----------- |
| `confidence` | How confident the engine is in this result as a percentage (0-100) |
| `bestPath` | The best (most likely or most confident) path through the lattice can be constructed by only including the words where `bestPath` is `true`. Usually, this is the word in the `words` array with the highest confidence. |
| `utteranceLength` | In some cases, one utterance might span multiple word slots.  For example, if two possibilities for a phrase were "throne" or "their own", the first "throne" entry would have an utteranceLength of 2 while the "their" and "own" entries would have utterance lengths of 1. See the example below. |

When reporting lattices, the following rules must be followed:

- For every `words` array with multiple entries, a `confidence` value must be included on each entry.
- For every `words` array with multiple entries, **one and only one** of the entries must contain the `bestPath` key with a value of `true`
- For every `words` array with multiple entries, `utteranceLength` keys must be added to each entry.

[](vtn-standard-lattice.example.json ':include :type=code json')

<!--TODO: Link to official json-schema (when ready)-->

## Translating Transcripts

Some translation engines will take the outputs of transcription engines as input to their translation engines.
To learn how those engines are built please see [Translating Transcripts](/developer/engines/cognitive/text/translation/transcript/).
