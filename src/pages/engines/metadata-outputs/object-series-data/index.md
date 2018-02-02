---
title: Object Detection Input/Output
---

Object detection engines find instances of real-world objects such as people, animals, and buildings in videos. Object detection algorithms not only recognize and classify every object in an image, they determine the location by drawing a bounding box around it. The basic object detection engine output features an array of objects with data attributes associated with individual observations of detected items within a specified time increment. 
 
The following tables provide the supported input and output models for object detection engines. The Input Structure specifies the data being passed to the engine to perform the request. All expected data fields in the file returned from the engine are described in the Output Structure.

## Input Data Structure ##

Input assets to object detection engines typically take the form of video files. To ensure your engine can accept and process tasks, be sure your engine’s supported file formats (specified in the build manifest) align with those used by Veritone. A preprocessing step of extracting the frames from the input video is required before object detection processing can begin. 
The object detection engine input requirements are described in the table below.

|Data Structure|Type|Description|Example|
|--------|--------|--------|--------|
|Task Payload|object|The payload (provided by Veritone) with data that describes the task to be completed by the engine. See the sample Task Payload in the Engine Construction Guidelines for more information.|``````|
|Content-Type|string|The format (MIME type) of the input file.|```"contentType": "video/mp4"```|
|Input Asset URI|string|The signed URI of the input asset to be transcribed. This property must use a URI located on Veritone’s S3 as the value.|```"signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/ 909b4ac0-3218-4026-812d-afca91ba0d14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=26447f611793e8a7e6b510b174d7ffd0b94a84fda9cbf59a79a8e936f17dc009&X-Amz-SignedHeaders=host"```|

### Output Data Structure ###

When task processing is complete, your engine will write an output summary of the analysis as a JSON file and send it to Veritone to create a new asset. The output structure consists of an array of time-series objects with data attributes for each object found in the input file. Each result in the series includes a label for the detected object, the starting and ending times that the object was identified in the input file, and a confidence score. 
To generate an output file, use the data structure described in the table below and save the document with the extension .json. Once your output file is created, call the UploadEngineResult GraphQL mutation to upload the results. (See the Engine Construction Guidelines for full request details.)

|Field|Type|Required|Description|Example|
|--------|--------|--------|--------|
|series|array|required|The root object field of the results array. Please create a new series item for each object detected.|series: [|
|found|string|required|A label that identifies the object detected.|found: "minivan"|
|start|integer|required|The time in milliseconds from the beginning of the input file that the object was first identified.|start: 4000|
|end|integer|required|The time in milliseconds from the beginning of the input file that the object was last identified.|end: 15000|
|salience|float|optional|The estimated probability that the detected object is correctly identified. Scores range from 0-100, with a higher score indicating greater correlation.|salience: 88.5096206665039|

## Sample Object Detection Output Data Structure ##

```json
{
  "series": [
    {
      "found": "outdoor",
      "start": 0,
      "end": 109050,
      "confidence": 825
    },
    {
      "found": "minivan",
      "start": 3375,
      "end": 5875,
      "confidence": 763
    },
    {
      "found": "Chevrolet",
      "start": 3375,
      "end": 4375,
      "confidence": 664
    },
    {
      "found": "armrest",
      "start": 11625,
      "end": 100125,
      "confidence": 800
    }
  ]
}
```

## Upload Engine Results ##

Once the output file is created, make a request to the UploadEngineResult mutation to upload the file and create a new asset. The table below outlines the fields accepted in the request payload. For complete request details, refer to the Engine Construction Guidelines. 

|Field|Type|Required|Description|Example|
|--------|--------|--------|--------|
|content-type|header string|required|A header that specifies the content type of the request. Enter multipart/form-data as the value.|content-type: multipart/form-data|
|file|form|required|The path of the file to upload.|file=@/Users/bobjones/Downloads/your-filename.json|
|filename|header string|required|The name of the file to upload. The value must match the name of the saved file.|filename=your-filename.json|
|taskId|string|required|The Task ID received in the Task Payload.|taskId: "e0d2ff71-503f-4ace-a214-3bb941425fd6-b4e26652-eba4-4740-91f8-1c59b18811ef"|
|contentType|string|required|The MIME type of the file to upload. Specify “application/json” as the value.|contentType: "application/json"|
|assetType|string|required|The type of asset to create. Specify “object” as the value.|assetType: "object"|
|completeTask|string|required|A Boolean that marks the task as complete. Set the value to true.|completeTask: true|

| **Field**                      | **Description**                                                                                  | **Example**                                                                         |
|--------------------------------|--------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **content-type** header string | A header that specifies the content type of the request. Enter multipart/form-data as the value. | content-type: multipart/form-data                                                   |
|           **file** form string | The path of the file to upload.                                                                  | file=@/Users/bobjones/Downloads/your-filename.json                                  |
|       **filename** form string | The name of the file to upload. The value must match the name of the saved file.                 | filename=your-filename.json                                                         |
|         **taskId** body string | The Task ID received in the Task Payload.                                                        | taskId: "e0d2ff71-503f-4ace-a214-3bb941425fd6-b4e26652-eba4-4740-91f8-1c59b18811ef" |
|    **contentType** body string | The MIME type of the file to upload. Specify “application/json” as the value.                    | contentType: "application/json"                                                     |
|      **assetType** body string | The type of asset to create. Specify “object” as the value.                                      | assetType: "object"                                                                 |
|  **completeTask** body Boolean | A Boolean that marks the task as complete. Set the value to *true*.                              | completeTask: true                                                                  |


<table>
  <tr>
    <th width="25%">Data Structure</th>
    <th width="75%">Description</th>
  </tr>
  <tr>
   <td align="right"><b>Task Payload</b><br>object
</td>
    <td>The payload (provided by Veritone) with data that describes the task to be completed by the engine. See the sample Task Payload in the Engine Construction Guidelines for more information.
</td>
  </tr>
  <tr>
    <td align="right"><b>Content-Type</b><br>string
</td>
    <td>The format (MIME type) of the input file. 

<code>`"contentType": "video/mp4"`</code></td>
  </tr>
  <tr>
    <td align="right"><b>Input Asset URI</b><br>string
</td>
    <td>The signed URI of the input asset to be transcribed. This property must use a URI located on Veritone’s S3 as the value. 
     
<code>`"signedUri": "https://inspirent.s3.amazonaws.com/assets/39528568/ 909b4ac0-3218-4026-812d-afca91ba0d14.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171116%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171116T180716Z&X-Amz-Expires=604800&X-Amz-Signature=26447f611793e8a7e6b510b174d7ffd0b94a84fda9cbf59a79a8e936f17dc009&X-Amz-SignedHeaders=host"`</code></td>
  </tr>
</table>
