# Adapter Manifest

## Overview

Every container uploaded to Veritone for an adapter should include a manifest.json file, which contains important information about your adapter and build. Veritone relies on the information in the manifest to correctly operate the adapter on our platform, so please be as accurate and comprehensive as you can. Omitting the manifest.json file or neglecting to use the proper engineId will result in your build not being registered with the system. If you have pushed an adapter to our Docker registry and it is not showing up, check that your manifest is properly formatted and stored in the correct location (/var/manifest.json).

## Format

Manifest files should be written in JSON format. We expect the manifest to be stored in your container as /var/manifest.json - this should be done in your Dockerfile ([example](https://github.com/veritone/vda-sample-engine-py/blob/master/Dockerfile#L6)).

## Fields

The fields that should be included in manifest.json are listed in the table below. Please include all fields indicated as being required. If fields are missing, we may invalidate your container or in some cases, assume the default values. Fields that are not marked as being required are optional; they should be included in the manifest file if you have any values to declare but may be omitted if you don't.

| Field   | Format | Required | Description  | Example |
| ------- | ------ | -------- | ------------ | ------- |
| engineId              | string           | Yes | The ID of your adapter. To [find your adapter ID](/adapters/quick-start/step-1?id=find-your-adapter-id), open the adapter in Veritone Developer. The ID is located under the adapter name at the top of the window.  | "engineId": "f06e3ecb-cb30-3d0f-3268-c08428dc72be"   |
| category              | string           | Yes | The category of the adapter. Possible values: "pull", "push"  | "category": "pull" |
| preferredInputFormat  | string           | Yes | Your adapter's preferred MIME type for input files. Enter only one option. The MIME type options supported by Veritone are listed [below](adapters/manifest?id=mimetypes).                         | "preferredInputFormat": "audio/wav" |
| outputFormats         | array of strings | Yes | A comma-separated list of MIME types your adapter will output. The MIME type options supported by Veritone are listed [below](adapters/manifest?id=mimetypes). | "outputFormats": ["application/ttml+xml", "audio/wav"] |
| clusterSize           | string           | Yes | The cluster size on which your adapter should run. Possible values: "small", "medium", "large" (See definitions [below](engines/manifest?id=available-cluster-sizes).)  | "clusterSize": "small" |
| initialConcurrency    | integer          | No | The initial number of instances of your adapter that can simultaneously run. If omitted, a value of 50 will be applied. | "initialConcurrency": 50 |
| maxConcurrency        | integer          | No | The maximum number of instances of your adapter that can simultaneously run. If omitted,a value of 50 will be applied. | "maxConcurrency": 50  |
| url                   | string           | No |The website URL where users can get more information about your adapter. | "url": "[https://www.veritone.com/wp/cognitive-engines/transcription-engine/](https://www.veritone.com/wp/cognitive-engines/transcription-engine/)" |
| externalCalls         | array of strings | No | The domains of any external calls that are required by your code. This should include all calls that require Internet access. | "externalCalls": ["[http://s3.amazonaws.com](http://s3.amazonaws.com)", "[http://github.com](http://github.com)"] |
| supportedInputFormats | array of strings | No | A comma-separated list of input file MIME types that your adapter supports. (Include your adapter's Preferred Input Format option here as well.) The MIME type options supported by Veritone are listed [below](engines/manifest?id=mimetypes).| "supportedInputFormats": ["audio/wav", "audio/mpeg", "audio/flac", "video/mp4", "application/json"] |
| libraries             | string           | No | List any dependent libraries required by your adapter.            | "libraries": ["tensorflow", "apache mahout"] |
| maxFileMb             | float            | No | The maximum file size (in megabytes) that your adapter can process. Omit this field if your adapter can process a file of any length. | "maxFileMb": 1200.0  |
| minMediaLengthMs      | integer          | No | The minimum input file length (in milliseconds) required by your adapter. Omit this field if your adapter can input a file of any length. | "minMediaLengthMs": 1000  |
| maxMediaLengthMs      | integer          | No | The maximum file length (in milliseconds) that your adapter supports. Omit this field if your adapter can process a file of any length.  | "maxMediaLengthMs": 900000 |       
| trainableViaApi       | boolean          | No | Describes whether an API is available for training. | "trainableViaApi": true |
| supportedLanguages    | string           | No | A comma-separated list of the languages your adapter supports, expressed as [ISO 639-1 Codes](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).  | "supportedLanguages": [ "en" , "ko" ]  |
| gpuSupported          | string           | No | A comma-separated list of supported GPU engines. The GPU options supported by Veritone are listed [below](engines/manifest?id=gpu). | "gpuSupported" : "P2", "G2", "G3"  |
| minMemoryRequired     | number           | No | The minimum amount of RAM (in MB) required for your adapter to run.   | "minMemoryRequired": 1024     |
| engineMode | string | Yes | The mode for executing your adapter. Possible values: "batch" and "stream" | "engineMode": "stream" |
| inputEncoding | string | No | The input encoding required for your engine. Please use the labels available from running `ffmpeg -encoders`. | "inputEncoding": "pcm_s16be" |
| supportedSourceTypes | array of integers           | No | The sourceType that an adapter is tied to. Omit if none applies.  | "supportedSourceTypes": \[5]  |
| sourceId          | integer           | No | The source that an adapter is tied to. Omit if none applies.  | "source": 210  |
| schemaId            | integer           | Yes (For batch mode adapters) | The schemaId that the adapter supports. This is required for "batch" adapters that ingest or process structured data.  | "schemaId": 231  |
| schedule | string | No | The schedule type(s) your adapter supports for ingestion. Possible values: "any", "recurring", "continuous", "immediate", "on demand". If omitted, a value of "any" will be applied.| "schedule": "any" |
| oauth | string | No | Indicate the version of OAuth that your adapter supports. Omit if your adapter doesn't support OAuth.| "oauth": "2.0"|
| releaseNotes          | string           | No | Tell users what has changed in this version of your code base. Enter unformatted, plain text in this field only.  | "releaseNotes": "This version integrates a new algorithm that is better at detecting accented speech, specifically targeting Southern US accents. In addition to the improved accuracy, the algorithm runs 20% faster now. The version also fixes some minor bugs with dictionary files and permissions." |


## Available cluster sizes

|     | Small | Medium | Large |
| --- | ----- | ------ | ----- |
| RAM | 512MB | 2GB    | 6GB   |


## GPU

| GPU                           | Supported    | Code |
| ----------------------------- | ------------ | ---- |
| NVIDIA GRID K520 GPUs         | Yes          | G2   |
| NVIDIA Tesla M60 GPUs         | Yes          | G3   |
| NVIDIA Tesla K80 GPUs         | Yes          | P2   |
| NVIDIA Tesla V100 GPUs        | Coming soon! | P3   |
| Xilinx UltraScale+ VU9P FPGAs | Coming soon! | F1   |
| NVIDIA Tesla M2050 GPUs       | Coming soon! | CG1  |

## MimeTypes
_Contact us if your engine supports a MIME type that is not currently listed._

* application/json
* application/vtn-engineout+json
* application/pdf
* application/smil+xml
* application/ttml+xml
* application/x-flv
* application/xmlaudio/aac
* audio/flac
* audio/midi
* audio/mp4
* audio/mpeg
* audio/wav
* audio/webmimage/gif
* image/jpeg
* image/tifftext/csv
* text/html
* text/plainvideo/3gpp
* video/mp4
* video/mpeg
* video/ogg
* video/quicktime
* video/webm
* video/x-m4v
* video/x-ms-wmv
* video/x-msvideo
 

## Example

Putting it all together, an example of a manifest.json submission is provided below for a transcription cognitive engine.

```json
{
  "engineId": "f06e3ecb-cb30-3d0f-3268-c08428dc72be",
  "category": "transcription",
  "url": "https://www.veritone.com/wp/cognitive-engines/transcription-engine/",
  "externalCalls": ["http://s3.amazonaws.com", "http://github.com"],
  "preferredInputFormat": "audio/wav",
  "supportedInputFormats": [
    "audio/wav",
    "audio/mpeg",
    "audio/flac",
    "video/mp4",
    "application/json"
  ],
  "outputFormats": ["application/ttml+xml", "audio/wav"],
  "initialConcurrency": 50,
  "maxConcurrency": 50,
  "clusterSize": "small",
  "maxFileMb": 1200.0,
  "minMediaLengthMs": 1000,
  "maxMediaLengthMs": 900000,
  "releaseNotes":
    "This version integrates a new algorithm that is better at detecting accented speech, specifically targeting Southern US accents. In addition to the improved accuracy, the algorithm runs 20% faster now. The version also fixes some minor bugs with dictionary files and permissions."
}
```
