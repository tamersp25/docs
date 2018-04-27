# Engine Manifest

## Overview

Every container uploaded to Veritone for an engine should include a manifest.json file, which contains important information about your engine and build. Veritone relies on the information in the manifest to correctly operate the engine on our platform, so please be as accurate and comprehensive as you can. Omitting the manifest.json file or neglecting to use the proper engineId will result in your build not being registered with the system. If you have pushed an engine to our Docker registry and it is not showing up, check that your manifest is properly formatted and stored in the correct location (/var/manifest.json).

## Format

Manifest files should be written in JSON format. We expect the manifest to be stored in your container as /var/manifest.json - this should be done in your Dockerfile ([example](https://github.com/veritone/vda-sample-engine-py/blob/master/Dockerfile#L6)).

## Fields

The fields that should be included in manifest.json are listed in the table below. Please include all fields indicated as being required. If fields are missing, we may invalidate your container or in some cases, assume the default values. Fields that are not marked as being required are optional; they should be included in the manifest file if you have any values to declare but may be omitted if you don't.

| Field   | Format | Required for Cognitive Engines | Required for Adapters | Description  | Example |
| ------- | ------ | -------------------------------| --------------------- | ------------ | ------- |
| engineId              | string           | Yes      | Yes | The ID of your engine. You can find your engine ID at the top of the Engines section pages in the Developer Portal.  | "engineId": "f06e3ecb-cb30-3d0f-3268-c08428dc72be"   |
| category              | string           | Yes      | Yes | The category of the engine that you are providing. The available options for cognitive engines are listed [below](engines/manifest?id=available-categories-for-cognitive-engines). For adapters, the options are "pull" or "push".  | "category": "transcription" OR "category": "pull" |
| preferredInputFormat  | string           | Yes      | Yes | The MIME type of the input media format that is preferred by your engine. Choose one format only. The options that Veritone currently support are listed [below](engines/manifest?id=mimetypes).                         | "preferredInputFormat": "audio/wav" |
| outputFormats         | array of strings | Yes      | Yes | List of the MIME types of the media formats that your engine will output. The options that Veritone currently supports are listed [below](engines/manifest?id=mimetypes). | "outputFormats": ["application/ttml+xml", "audio/wav"] |
| clusterSize           | string           | Yes      | Yes | The cluster size on which your engine should run: small, medium, large, which are defined [below](engines/manifest?id=available-cluster-sizes).  | "clusterSize": "small" |
| initialConcurrency    | integer          | No       | No | The initial number of instances of your engine that can run at the same time. If omitted, we will use a value of 50. | "initialConcurrency": 50 |
| maxConcurrency        | integer          | No       | No | The maximum number of instances of your engine that can run at the same time. If omitted, we will use a value of 50. | "maxConcurrency": 50  |
| url                   | string           | No       | No |The URL of the website where the user can get more information about your engine. | "url": "[https://www.veritone.com/wp/cognitive-engines/transcription-engine/](https://www.veritone.com/wp/cognitive-engines/transcription-engine/)" |
| externalCalls         | array of strings | No       | No | The domains of any external calls that are required by your code. This should include all calls that require internet access. | "externalCalls": ["[http://s3.amazonaws.com](http://s3.amazonaws.com)", "[http://github.com](http://github.com)"] |
| supportedInputFormats | array of strings | No       | No | List of the MIME types of the input media formats that your engine can support. Include your preferred Input format here as well. The options that Veritone currently support are listed [below](engines/manifest?id=mimetypes).| "supportedInputFormats": ["audio/wav", "audio/mpeg", "audio/flac", "video/mp4", "application/json"] |
| libraries             | string           | No       | No | List any dependent libraries required by your engine.            | "libraries": ["tensorflow", "apache mahout"] |
| maxFileMb             | float            | No       | No | The maximum file size that your engine can process, in megabytes. Omit this field if you engine can process any size of file. | "maxFileMb": 1200.0  |
| minMediaLengthMs      | integer          | No       | No | The minimum duration of the media file that your engine requires for processing, expressed in milliseconds. Omit this field if your engine can process any length of media. | "minMediaLengthMs": 1000  |
| maxMediaLengthMs      | integer          | No       | No | The maximum duration of the media file that your engine can process, expressed in milliseconds. Omit this field if your engine can process any length of media.  | "maxMediaLengthMs": 900000 |       
| trainableViaApi       | boolean          | No       | No | Describes whether an API is available for training | "trainableViaApi": true |
| supportedLanguages    | string           | No       | No | Languagues supported in ISO 639-1 Codes,  | "supportedLanguages": [ "en" , "ko" ]  |
| gpuSupported          | string           | No       | No | List of supported GPU engines See the Supported GPU section [below](engines/manifest?id=gpu). Examples include: "G2", "G3", "P2"  | "gpuSupported" : "P2"  |
| minMemoryRequired     | number           | No       | No | Minimum amount of RAM needed to run in MB.   | "minMemoryRequired": 1024     |
| engineMode | string | No | No | The mode for executing your engine. Allowed values are "legacy", "batch", "chunk", "stream". If omitted, we will use "legacy".| "engineMode": "legacy" |
| inputEncoding | string | No | No | The input encoding required for your engine. Please use the labels available from running `ffmpeg -encoders`. | "inputEncoding": "pcm_s16be" |
| supportedSourceTypes | array of integers           | No       | No | The sourceType that an adapter is tied to. Omit if none applies.  | "supportedSourceTypes": \[5]  |
| sourceId          | integer           | No       | No | The source that an adapter is tied to. Omit if none applies.  | "source": 210  |
| schemaId            | integer           | No       | No | The schemaId that the engine supports. This is required for ingesting or processing structured data.  | "schemaId": 231  |
| schedule | string | No | No | Indicate whether your adapter has any restrictions for supporting schedules. Allowed values are "any", "recurring", "continuous", "immediate", "on demand". If omitted, we will use "any".| "schedule": "any" |
| oauth | string | No | No | Indicate the version of OAuth that your adapter supports. Omit if your adapter doesn't support OAuth.| "oauth": "2.0"|
| releaseNotes          | string           | No       | No | Tell users what has changed in this version of your code base. Enter unformatted, plain text in this field only.  | "releaseNotes": "This version integrates a new algorithm that is better at detecting accented speech, specifically targeting Southern US accents. In addition to the improved accuracy, the algorithm runs 20% faster now. The version also fixes some minor bugs with dictionary files and permissions." |

## Available categories for cognitive engines

* transcode
* transcription
* sentiment
* fingerprint
* facial detection
* object detection
* translate
* geolocation
* conductor
* station playout
* text recognition
* logo recognition
* thumbnail
* correlation
* reduction

## Available categories for adapters

* pull
* push

## Available categories for aggregators

* intracategory
* intercategory

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
