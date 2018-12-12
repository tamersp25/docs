# Face Recognition Quick Start
## Biometrics Overview
Identify a person uniquely using face, gait, iris, voice mimicry...
https://docs.veritone.com/#/engines/engine_standards/capability/
## Face Recognition Overview
 - Identifies one or multiple people in an image or video by associating each individual's face to their name. (TODO: rewrite this)
 - Use Cases:
	 -  Properly identify criminal suspects from surveillance footage, matched to a list of known offenders (TODO: rewrite this)
	 - Add...
	 - Media...
## Engine Profile Creation Checklist
TODO: Fill this
## Engine Build Checklist
### Step by Step Guild
TODO: Fill in step by step guid here
### Manifest:
#### Options
| Field | Format | Required | Description | Example
|--|--|--|--|--|
| engineId | string | yes | The ID of your engine. You can find your engine ID at the top of the Engines section pages in the Developer Portal. | "engineId": "f06e3ecb-cb30-3d0f-3268-c08428dc72be" |
| category | string | yes | face recognition category | "category": "faceDetection" |
| url | string | yes | The URL of the website where the user can get more information about your engine. | "url": "https://machinebox.io/" |
| preferredInputFormat | string | yes | The MIME type of the input media format that is preferred by your engine. Choose one format only. The options that Veritone currently support are listed [below](https://docs.veritone.com/#/engines/manifest?id=mimetypes) | "preferredInputFormat": "video/mp4" |
| outputFormats | array of strings | yes | List of the MIME types of the media formats that your engine will output. The options that Veritone currently supports are listed [below](https://docs.veritone.com/#/engines/manifest?id=mimetypes) | "outputFormats": ["application/json"] |
| clusterSize | string | yes | The cluster size on which your engine should run: small, medium, large, which are defined [below](https://docs.veritone.com/#/engines/manifest?id=available-cluster-sizes). | "clusterSize": "small" |
| supportedInputFormats | array of strings | no | List of the MIME types of the input media formats that face detection and face recognition engines can support. Include your preferred Input format here as well. The options that Veritone currently support are listed below | "supportedInputFormats": "video/3gpp", "video/mp4", "video/mpeg" ] |
| initialConcurrency | integer | no | The initial number of instances of your engine that can run at the same time. If omitted, we will use a value of 50 | "initialConcurrency": 20 |
| maxConcurrency | integer | no | The maximum number of instances of your engine that can run at the same time. If omitted, we will use a value of 50. | "maxConcurrency": 20 |
| externalCalls | array of strings | no | The domains of any external calls that are required by your code. This should include all calls that require internet access. | "externalCalls": ["http://s3.amazonaws.com", "http://github.com"] |
| oath | string | no | Indicate the version of OAuth that your adapter supports. Omit if your adapter doesn't support OAuth. | "oauth": "2.0" |
| isPublic | boolean | no | . | "isPublic": true |
| schedule | string | no | Indicate whether your adapter has any restrictions for supporting schedules. Allowed values are "any", "recurring", "continuous", "immediate", "on demand". If omitted, we will use "any". | "schedule": "any" |
| schemaId | integer | no | The schemaId that the engine supports. This is required for ingesting or processing structured data. | "schemaId": 123 |
| sourceId | integer | no | The source that an adapter is tied to. Omit if none applies. | "sourceId": 220 |
| libraries | array of strings | no | List any dependent libraries required by your engine. | "libraries": ["Machine Box Facebox", "tensorflow"] |
| maxFileMb | float | no | The maximum file size that your engine can process, in megabytes. Omit this field if you engine can process any size of file. | "maxFileMb": 102.24 |
| categories | ?????? | no | ?????? | "categories": null |
| engineMode | string | no | The mode for executing your engine. Allowed values are "legacy", "message", "stream". If omitted, we will use "legacy". | "engineMode": "legacy" |
| gpuSupported | string | no | List of supported GPU engines See the Supported GPU section [below](https://docs.veritone.com/#/engines/manifest?id=gpu). Examples include: "G2", "G3", "P2" | "gpuSupported": "P2" |
| inputOptions | ??? | no | ??? | "inputOptions": null |
| releaseNotes | string | no | Tell users what has changed in this version of your code base. Enter unformatted, plain text in this field only. | "releaseNotes": "This version integrates a new algorithm that is better at detecting accented speech, specifically targeting Southern US accents. In addition to the improved accuracy, the algorithm runs 20% faster now. The version also fixes some minor bugs with dictionary files and permissions." |
| customProfile | string | no | . | "customProfile": "" |
| inputEncoding | string | no | The input encoding required for your engine. Please use the labels available from running `ffmpeg -encoders`. | "inputEncoding": "pcm_s16be" |
| serverCountry | string | no | ???? | "serverCountry": "" |
| isCJISCompliant | boolean | no | ???? | "isCJISCompliant": false |
| trainableViaApi | boolean | no | Describes whether an API is available for training | "trainableViaApi": true |
| whitelistOrgIds | ???? | no | ???? | "whitelistOrgIds": ... |
| maxMediaLengthMs | integer | no | The maximum duration of the media file that your engine can process, expressed in milliseconds. Omit this field if your engine can process any length of media. | "maxMediaLengthMs": 9000000 |
| minMediaLengthMs | integer | no | The minimum duration of the media file that your engine requires for processing, expressed in milliseconds. Omit this field if your engine can process any length of media. | "minMediaLengthMs": 1000 |
| fedRampImpactLevel | . | no | . | "fedRampImpactLevel": 0 |
| sourceFileDeletion | boolean | no | . | "sourceFileDeletion": false |
| supportedLanguages | string | no | Languagues supported in ISO 639-1 Codes | "supportedLanguages": ["en", "es"] |
####  Example:

    {
      "url": "https://machinebox.io/",
      "oauth": "",
      "category": "faceRecognition",
      "engineId": "3f115b93-97be-46f0-b0f2-7460db15ec34",
      "isPublic": true,
      "schedule": "",
      "schemaId": 0,
      "sourceId": 0,
      "libraries": [
        "Machine Box Facebox"
      ],
      "maxFileMb": 0,
      "engineMode": "",
      "clusterSize": "large",
      "gpuSupported": "",
      "inputOptions": null,
      "releaseNotes": "",
      "customProfile": "",
      "externalCalls": [],
      "inputEncoding": "",
      "outputFormats": [
        "application/json"
      ],
      "serverCountry": "",
      "maxConcurrency": 50,
      "isCJISCompliant": false,
      "trainableViaApi": true,
      "whitelistOrgIds": null,
      "maxMediaLengthMs": 0,
      "minMediaLengthMs": 0,
      "fedRampImpactLevel": 0,
      "initialConcurrency": 50,
      "sourceFileDeletion": false,
      "supportedLanguages": null,
      "preferredInputFormat": "video/mp4",
      "supportedInputFormats": [
        "video/3gpp",
        "video/mp4",
        "video/mpeg",
        "video/ogg",
        "video/quicktime",
        "video/webm",
        "video/x-m4v",
        "video/x-ms-wmv",
        "video/x-msvideo",
        "image/gif",
        "image/jpeg"
      ]
    }

### Standard Output
 
## Engine Test Checklist
