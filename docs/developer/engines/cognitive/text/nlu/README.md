# Building a Natural Language Understanding (NLU) Engine

[badge/API/Partial/yellow]
[badge/Search/No/red]
[badge/UI/No/red]

Natural language understanding (NLU) engines analyze text from spoken or written sources - often referred to as "utterances" - and determine the speaker's intent.

## Common Pairings

- Because they depend on textual input, NLU engines are often paired with [transcription] engines to turn speech into text in situations where text is not being directly analyzed.
- Because they only determine the speaker's intent (but do not carry it out), NLU engines are often paired with [workflow] engines or other types of "smart agents" that map those intents to actions and/or responses to the speaker.
- Because they are often used in chat-bots or other "smart assistants," they are often paired with [text-to-speech] engines to be able to "speak" their responses back to the user.

## Engine Manifest

Segment engine so application/json (expect transcript or text validationContracts) in.  application/json (expect some new validationContract) out.

## Training

All NLU engines require training data to establish their utterance-to-intent mappings.

!> At this time, aiWARE does not have library types that support training NLU models.
So all models should be trained offline and provide their intent names as `label`s in the engine output (rather than `entityId`s).

## Engine Input

NLU engines should be implemented as [segment processing](/developer/engines/processing-modes/segment-processing/) engines.
Each segment will be a `vtn-standard` snippet containing text (conforming to the `transcript` or `text` validation contracts).

<!--TODO: Talk about the different handling between text and transcript validation contracts.  Most users will just want to simplify the lattice through the bestPath into a text string.-->

## Engine Output

[](vtn-standard.example.json ':include :type=code json')

> The text content and page, paragraph, and sentence indices are simply echoed based on the input data.

<!--TODO: Give examples of inputs and outputs for both transcripts and text-->
