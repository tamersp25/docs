# Transcription Input/Output

Transcription engines transform recorded speech into actionable assets by capturing and documenting what’s being said in audio and video files. Engines with transcription capabilities are also known as Automatic Speech Recognition (ASR) or Speech-to-Text (STT). The basic transcription engine output features an array of time-based objects with data attributes in a segmented, time-stamped format. 

This section provides input and output data model specifications for transcription engines. The Input Structure includes data being passed to the engine from Veritone to perform task execution. All data fields expected in the transcription files returned by the engine are described in the Output Structure.  

## Input Data Structure

Input assets to transcription engines typically take the form of video or audio files. To ensure your engine can accept and process tasks, be sure your engine’s supported file formats (specified in the build [manifest](https://veritone-developer.atlassian.net/wiki/spaces/DOC/pages/18874416/Engine+Manifests)) align with those used by Veritone.

The transcription engine input requirements are described in the table below.

<table>
  <tr>
    <td width="20%"><h3 class="text-left">Data Structure</h3></td>
    <td width="80%"><h3 class="text-left">Description</h3></td>
  </tr>
  <tr>
   <td align="right" valign="top"><b>Task Payload</b><br>object
</td>
    <td>The payload (provided by Veritone) with data that describes the task to be completed by the engine. See the sample Task Payload in the Engine Construction Guidelines for more information.
</td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>Content-Type</b><br>string
</td>
    <td>The format (MIME type) of the input file. 

<code>"contentType": "video/mp4"</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>Input Asset URI</b><br>string
</td>
    <td>The signed URI of the input asset to be transcribed. This property must use a URI located on Veritone’s S3 as the value. 
     
<code>"signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/909b4ac0-3218-4026-812d-afca91ba0d14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=26447f611793e8a7e6b510b174d7ffd0b94a84fda9cbf59a79a8e936f17dc009&X-Amz-SignedHeaders=host"</code></td>
  </tr>
</table>


## Output Data Structure

When task processing is complete, your engine will write an output summary of the analysis as a JSON file and upload it to Veritone to create a new asset. To provide the most meaningful, search-optimized insights, transcription engines are required to create two assets for each task. The first uses a VLF file to produce word-level, time-stamped, n-best lists. The second is based on a TTML file to generate a human-readable format. 

Once your output files are created, upload them to Veritone using the *Upload Engine Result* mutation. See the Engine Construction Guidelines for details.

**Timed Text Markup Language/TTML**

[TTML (Timed Text Markup Language)](https://www.w3.org/TR/ttaf1-dfxp/) is a widely supported XML format that consists of a collection of nested, time-based, text elements. A TTML file includes the root element "\<tt>\" that contains document-level metadata followed by the "\<body>\" and a "\<div>\" element that contains the timing cues. The actual times (begin, end) and associated text are set inside opening and closing paragraph tags (\<p>\, \</p>\). Blank lines and white space are ignored, and multiple lines are defined by \<br/>\ tags.

To generate a TTML file, use the data structure described in the table below and save the document with the extension .ttml. When uploading the file to Veritone, specify "application/ttml+xml" as the content type for the asset.

<table>
  <tr>
    <td width="18%"><h3 class="text-left">Field</h3></td>
    <td width="57%"><h3 class="text-left">Description</h3></td>
    <td width="25%"><h3 class="text-left">Example</h3></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>p</b><br>element<br>required</td>
    <td>The current paragraph that contains the transcript text.</td>
    <td><code>&lt;p&gt;&lt;/p&gt;</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>begin</b><br>string attribute<br>required</td>
    <td>The starting time of the paragraph in HH:MM:SS.mmm from the beginning of the file.</td>
    <td><code>begin="00:00:01.360"</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>end</b><br>string attribute<br>required</td>
    <td>The ending time of the paragraph in HH:MM:SS.mmm from the beginning of the file.</td>
    <td><code>end="00:00:02.520"</code></td>
  </tr>
</table>


**Sample TTML Data Structure**

```xml
<?xml version="1.0" encoding="utf-8"?>
<tt xml:lang="en-us" xmlns="http://www.w3.org/ns/ttml" xmlns:tts="http://www.w3.org/ns/ttml#styling" xmlns:ttm="http://www.w3.org/ns/ttml#metadata">
    <body region="CaptionArea">
        <div>
            <p begin="00:00:00.280" end="00:00:05.500">Oh I see the whole bear I just want to take a moment to say</p>
            <p begin="00:00:05.509" end="00:00:10.990">the same as the others</p>
            <p begin="00:00:10.990" end="00:00:16.299">. And it's my honor to be here tonight presenting the award</p>
        </div>
    </body>
</tt>
```


**Veritone Lattice Format/VLF**

VLF (Veritone Lattice Format) is a search-optimized JSON format that describes a transcript's lattice in an indexed list of n-best, word-level, timestamped results. It can be used to denote single and multi path transcripts, as well as spanning words.

The output format is an object with zero-indexed keys. Each key's object represents a single utterance consisting of timing information and a *words* object that contains a specific spoken word, a confidence score, and path information.

To generate a VLF file from your engine’s raw output, use the data structure described in the table below and save the document with the extension .vlf. When uploading the file to Veritone, specify "application/json" as the content type for the asset.

<table>
  <tr>
    <td width="18%"><h3 class="text-left">Field</h3></td>
    <td width="57%"><h3 class="text-left">Description</h3></td>
    <td width="25%"><h3 class="text-left">Example</h3></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>parent key</b><br>integer<br>required</td>
    <td>The zero-indexed key of each utterance in the lattice. </td>
    <td><code>0: {</code></td>
  </tr>
  <tr valign="top">
     <td align="right"><b>startTimeMs</b><br>integer<br>required</td>
    <td>The time in milliseconds from the beginning of the file when the utterance begins.</td>
    <td><code>startTimeMs: 1260</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>stopTimeMs</b><br>integer<br>required</td>
    <td>The time in milliseconds from the beginning of the file when the utterance ends.</td>
    <td><code>stopTimeMs: 1360</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>durationMs</b><br>integer<br>required</td>
    <td>The length of the utterance in milliseconds. (stopTimeMs - startTimeMs)</td>
    <td><code>durationMs: 100</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>words</b><br>array of objects<br>required</td>
    <td>An array of objects containing data attributes associated with detected words. Create a separate object for each word and interval of silence. See the Words table below for more information.</td>
    <td><code>words: [
            {</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>index</b><br>integer<br>required</td>
    <td>The indexed order in which the word appears in the transcript. This value matches the parent key.</td>
    <td><code>index: 0</code></td>
  </tr>
</table>


#### **Words**

<table>
  <tr>
    <td width="18%"><h3 class="text-left">Field</h3></td>
    <td width="57%"><h3 class="text-left">Description</h3></td>
    <td width="25%"><h3 class="text-left">Example</h3></td>
  </tr>
  <tr>
    <td align="right"><b>words</b><br>array<br>required</td>
    <td>The root object field of the results array.</td>
    <td><code>words: [</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>word</b><br>string<br>required</td>
    <td>The detected keyword (or silence) associated with the specified time increment. </td>
    <td><code>word: "You"
word: "!silence"</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>confidence</b><br>rounded integer<br>required</td>
    <td>The estimated probability that the detected object is correctly identified. Confidence scores are rounded (not truncated) whole numbers and range from 0-1000, with a higher score indicating greater correlation.</td>
    <td><code>confidence: 800</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>bestPathForward</b><br>Boolean<br>required</td>
    <td>True marks this word as the best path forward. (Single-path transcripts must report true.)</td>
    <td><code>bestPathForward: true</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>bestPathBackward</b><br>Boolean<br>required</td>
    <td>True marks this word as the best path backward. (Single-path transcripts must report true.)</td>
    <td><code>bestPathBackward: true</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>spanningForward</b><br>Boolean<br>required</td>
    <td>True marks this word as a forward spanning word. Spanning words are words that span multiple utterances, where the number of utterances they span is described by the spanningLength field. (Single-path transcripts must report false.)</td>
    <td><code>spanningForward: false</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>spanningBackward</b><br>Boolean<br>required</td>
    <td>True marks this word as a backward spanning word. Spanning words are words that span multiple utterances, where the number of utterances they span is described by the spanningLength field. (Single-path transcripts must report false.)</td>
    <td><code>spanningBackward: false</code></td>
  </tr>
  <tr valign="top">
    <td align="right"><b>spanningLength</b><br>integer<br>required</td>
    <td>The number of utterances this word spans. The spanning length must be at least 1. (Single-path transcripts must report 1.)</td>
    <td><code>spanningLength: 1</code></td>
  </tr>
</table>


## **Sample Single-Path VLF Data Structure**

```json
{
    0: {
        startTimeMs: 1260,
        stopTimeMs: 1360,
        durationMs: 100,
        words: [
            {
                word: "!silence",
                confidence: 794,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 0
    },
    1: {
        startTimeMs: 1360,
        stopTimeMs: 1390,
        durationMs: 30,
        words: [
            {
                word: "You",
                confidence: 800,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 1
    },
    2: {
        startTimeMs: 1390,
        stopTimeMs: 1950,
        durationMs: 560,
        words: [
            {
                word: "might",
                confidence: 903,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 2
    },
    3: {
        startTimeMs: 1950,
        stopTimeMs: 2150,
        durationMs: 200,
        words: [
            {
                word: "not",
                confidence: 903,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 3
    },
    4: {
        startTimeMs: 2150,
        stopTimeMs: 2520,
        durationMs: 370,
        words: [
            {
                word: "remember",
                confidence: 1000,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 4
    }
}
```

## **Sample Multi-Path VLF with Spanning Words Data Structure** 

```json
{
    0: {
        startTimeMs: 1260,
        stopTimeMs: 1360,
        durationMs: 100,
        words: [
            {
                word: "!silence",
                confidence: 794,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "i",
                confidence: 103,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "I",
                confidence: 103,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 0
    },
    1: {
        startTimeMs: 1360,
        stopTimeMs: 1390,
        durationMs: 30,
        words: [
            {
                word: "!silence",
                confidence: 400,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "we",
                confidence: 102,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "We",
                confidence: 102,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "you",
                confidence: 100,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "You",
                confidence: 100,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "it",
                confidence: 98,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "It",
                confidence: 98,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 1
    },
    2: {
        startTimeMs: 1390,
        stopTimeMs: 1950,
        durationMs: 560,
        words: [
            {
                word: "might",
                confidence: 903,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "Might",
                confidence: 67,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "minute",
                confidence: 30,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: true,
                spanningBackward: false,
                spanningLength: 2
            }
        ],
        index: 2
    },
    3: {
        startTimeMs: 1950,
        stopTimeMs: 2150,
        durationMs: 200,
        words: [
            {
                word: "not",
                confidence: 903,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            },
            {
                word: "minute",
                confidence: 30,
                bestPathForward: false,
                bestPathBackward: false,
                spanningForward: false,
                spanningBackward: true,
                spanningLength: 1
            }
        ],
        index: 3
    },
    4: {
        startTimeMs: 2150,
        stopTimeMs: 2520,
        durationMs: 370,
        words: [
            {
                word: "remember",
                confidence: 1000,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index: 4
    },
    5: {
        startTimeMs: 2520,
        stopTimeMs: 2850,
        durationMs: 330,
        words: [
            {
                word: "us",
                confidence: 1000,
                bestPathForward: true,
                bestPathBackward: true,
                spanningForward: false,
                spanningBackward: false,
                spanningLength: 1
            }
        ],
        index": 5
    }
}
```

## Upload Engine Result

Once the TTML and VLF files are created, make separate requests to the *Upload Engine Result* mutation to upload the files and create new assets. The table below describes the required fields for creating an asset. For complete request details, refer to the Engine Construction Guidelines.

<table>
  <tr>
    <td width="18%"><h3 class="text-left">Field</h3></td>
    <td width="57%"><h3 class="text-left">Description</h3></td>
    <td width="25%"><h3 class="text-left">Example</h3></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>content-type</b><br>header<br>string</td>
    <td>A header that specifies the content type. Enter multipart/form-data as the value.</td>
    <td><code>content-type: multipart/form-data</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>file</b><br>form<br>string</td>
    <td>The path of the file to upload.</td>
    <td><code>file=@/Users/bobjones/Downloads/your-filename.ttml'</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>filename</b><br>form<br>string</td>
    <td>The name of the file to upload. The value must match the name of the saved file.</td>
    <td><code>filename=your-filename.ttml</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>taskId</b><br>body<br>string</td>
    <td>The Task ID received in the Task Payload.</td>
    <td><code>taskId: "e0d2ff71-503f-4ace-a214-3bb941425fd6-b4e26652-eba4-4740-91f8-1c59b18811ef"</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>contentType</b><br>body<br>string</td>
    <td>The MIME type of the file to upload. Specify "application/ttml-xml" as the value for the TTML file and “application/json” for the VLF asset request.</td>
    <td><code>contentType: "application/ttml+xml"</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>assetType</b><br>body<br>string</td>
    <td>The type of asset to create. Specify “transcript” as the value for the TTML file and “v-vlf” for the VLF asset request.</td>
    <td><code>assetType: "transcript"</code></td>
  </tr>
  <tr>
    <td align="right" valign="top"><b>completeTask</b><br>body<br>Boolean</td>
    <td>A Boolean that marks the task as complete. Set the value to true for the last asset upload.</td>
    <td><code>completeTask: true</code></td>
  </tr>
</table>
