

VLF is a flexible JSON format that describes a transcript's lattice. It can be used to denote a single and multi path transcripts, as well as spanning words.

The output format is an object with zero-indexed keys. Each key's object represents a single utterance consisting of timing information, and a list of words. Each word is an object that contains the specific word spoken, a confidence and path information.

## Recognized Fields ##

Fields that we recognize are listed below.

#### Utterance ####

|Field|Type|Description|Example|
|--------|--------|--------|--------|
|```startTimeMs```|integer|The time in milliseconds from the beginning of the file when the utterance begins.|```1360```|
|```stopTimeMs```|integer|The time in milliseconds from the beginning of the file when the utterance ends.|```1390```|
|```durationMs```|integer|The length of the utterance in milliseconds. (stopTimeMs - startTimeMs)|```30```|
|```words```|array|An array of word objects.||
|```index```|integer|The order of the word in the transcript. This value matches the parent key.|```1```|

#### Word ####

|Field|Type|Description|Example|
|--------|--------|--------|--------|
|```word```|string|Please create a new series item for each word transcribed.|```'You'```|
|```confidence```|rounded integer|A probability score related to the recognition. Please provide a whole number confidence score from 0 to 1000. It should be rounded, not truncated. |```800```|
|```bestPathForward```|boolean|True marks this word as the best path forward. (Single-path transcripts must report true.)|```true```|
|```bestPathBackward```|boolean|True marks this word as the best path backward. (Single-path transcripts must report true.)|```true```|
|```spanningForward```|boolean|True marks this word as a forward spanning word. Spanning words are words that span multiple utterances, where the number of utterances they span is described by the spanningLength field. (Single-path transcripts must report false.)|```false```|
|```spanningBackward```|boolean|True marks this word as a backward spanning word. Spanning words are words that span multiple utterances, where the number of utterances they span is described by the spanningLength field. (Single-path transcripts must report false.)|```false```|
|```spanningLength```|integer|The number of utterances this word spans. The spanning length must be at least 1. (Single-path transcripts must report 1.)|```1```|

## Asset Upload ##

The following fields are accepted when uploading a VLF asset using the Create Asset endpoint of the Veritone API.

|Required Fields|Type|Description|Example|
|--------|--------|--------|--------|
|```Content-Type```|header string|The asset's Content Type.|```'application/json'```|
|```X-Veritone-Asset-Type```|header string|The Veritone Asset Type.|```'v-vlf'```|
|```X-Veritone-Metadata```|header string|JSON object containing asset metadata. Must contain a `source` field, in which the Engine ID is set. Optionally includes `filename` and `size`.|```'{"source":"{ENGINE_ID}"'```|
|Optional Fields|Type|Description|Example|
|```X-Veritone-MD5-Checksum```|header string|The MD5 hash of the uploaded file.|```'d41d8cd98f00b204e9800998ecf8427e'```|

## Examples ##

### Single Path: ###

VLF - Single Path

```json
{
    "0": {
        "startTimeMs": 1260,
        "stopTimeMs": 1360,
        "durationMs": 100,
        "words": [
            {
                "word": "!silence",
                "confidence": 794,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 0
    },
    "1": {
        "startTimeMs": 1360,
        "stopTimeMs": 1390,
        "durationMs": 30,
        "words": [
            {
                "word": "You",
                "confidence": 800,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 1
    },
    "2": {
        "startTimeMs": 1390,
        "stopTimeMs": 1950,
        "durationMs": 560,
        "words": [
            {
                "word": "might",
                "confidence": 903,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 2
    },
    "3": {
        "startTimeMs": 1950,
        "stopTimeMs": 2150,
        "durationMs": 200,
        "words": [
            {
                "word": "not",
                "confidence": 903,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 3
    },
    "4": {
        "startTimeMs": 2150,
        "stopTimeMs": 2520,
        "durationMs": 370,
        "words": [
            {
                "word": "remember",
                "confidence": 1000,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 4
    }
}
```

### Multi Path with Spanning Words: ###

VLF - Multi Path with Spanning Words

```json
​{
    "0": {
        "startTimeMs": 1260,
        "stopTimeMs": 1360,
        "durationMs": 100,
        "words": [
            {
                "word": "!silence",
                "confidence": 794,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "i",
                "confidence": 103,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "I",
                "confidence": 103,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 0
    },
    "1": {
        "startTimeMs": 1360,
        "stopTimeMs": 1390,
        "durationMs": 30,
        "words": [
            {
                "word": "!silence",
                "confidence": 400,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "we",
                "confidence": 102,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "We",
                "confidence": 102,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "you",
                "confidence": 100,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "You",
                "confidence": 100,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "it",
                "confidence": 98,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "It",
                "confidence": 98,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 1
    },
    "2": {
        "startTimeMs": 1390,
        "stopTimeMs": 1950,
        "durationMs": 560,
        "words": [
            {
                "word": "might",
                "confidence": 903,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "Might",
                "confidence": 67,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "minute",
                "confidence": 30,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": true,
                "spanningBackward": false,
                "spanningLength": 2
            }
        ],
        "index": 2
    },
    "3": {
        "startTimeMs": 1950,
        "stopTimeMs": 2150,
        "durationMs": 200,
        "words": [
            {
                "word": "not",
                "confidence": 903,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            },
            {
                "word": "minute",
                "confidence": 30,
                "bestPathForward": false,
                "bestPathBackward": false,
                "spanningForward": false,
                "spanningBackward": true,
                "spanningLength": 1
            }
        ],
        "index": 3
    },
    "4": {
        "startTimeMs": 2150,
        "stopTimeMs": 2520,
        "durationMs": 370,
        "words": [
            {
                "word": "remember",
                "confidence": 1000,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 4
    },
    "5": {
        "startTimeMs": 2520,
        "stopTimeMs": 2850,
        "durationMs": 330,
        "words": [
            {
                "word": "us",
                "confidence": 1000,
                "bestPathForward": true,
                "bestPathBackward": true,
                "spanningForward": false,
                "spanningBackward": false,
                "spanningLength": 1
            }
        ],
        "index": 5
    }
}
```
