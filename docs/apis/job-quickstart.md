# Job Quickstart Guide

### Getting Started

Veritone Job API allows you to integrate cognitive functionality — such as object detection, language translation, and voice transcription — into your application with just a few lines of code. The Job API is a set of calls that takes you through the entire cognitive job workflow, from file ingestion to data analysis and retrieving the results of completed tasks.

Veritone API is built around the GraphQL paradigm to provide a more efficient way to deliver data with greater flexibility than a traditional REST approach. GraphQL is a[ query language](http://graphql.org/learn/queries/) that operates over a single endpoint using conventional HTTP requests and returning JSON responses. The structure not only lets you call multiple nested resources in a single query, it also allows you to define requests so that only requested data is sent back.

This quickstart guide provides resources, detailed documentation, and sample requests and responses to help get your integration up and running to perform the following actions:

* Create a TDO (recording container) with an asset

* Create a job with specific tasks

* Check the status of a job

* Retrieve job results

* Delete a TDO/recording container

 

We designed this quickstart to be user-friendly and example-filled, but if you have any questions, please don’t hesitate to reach out to our [Developer Support Team](mailto:devsupport@veritone.com) for help.

 

### **Base URL**

Veritone API uses a single endpoint for making ad-hoc requests and to integrate API into third-party applications. All requests must be HTTP POST to [https://api.veritone.com/v3/graphql](https://api.veritone.com/v3/graphql) with *application/json* encoded bodies.



### **Making Sample Requests**

To make it easier to explore, write, and test the API, we set up [GraphiQL](https://api.veritone.com/v3/graphiql) — an interactive playground that gives you a code editor with autocomplete, validation, and syntax error highlighting features. Use the GraphiQL interface to construct and execute queries, experiment with different schema modifications, and browse documentation. In addition, GraphiQL bakes authorization right into the schema and automatically passes the *Authentication* header with a valid token when you’re logged into the Veritone system.

Veritone’s GraphiQL interface is the recommended method for ad hoc API requests, but calls can be made using any HTTP client. All requests must be HTTP POST to the https://api.veritone.com/v3/graphql endpoint with the *query* parameter and *application/json* encoded bodies. In addition, requests must be authenticated using an API Token. Pass the token in your request using the *Authorization* header with a value *Bearer \<token\>*. If you’re using a raw HTTP client, the query body contents must be sent in a string with all quotes escaped.

The sample requests provided in this documentation are structured for use in our [GraphiQL interface](https://api.veritone.com/v3/graphiql), but we’ve also included the basic cURL structure for your reference below. Please note that the examples shown do not use client information and are not language specific. For fields that require account-specific data (such as a Container ID), replace the value with your own. In addition, the sample requests shown are not all-inclusive — they highlight the minimum requirements and relevant information. Additional attributes for each request can be found in our [GraphQL docs](https://api.veritone.com/v3/graphqldocs/).

 
#### Basic cURL Structure for Requests

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31gcf6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: application/json' \
  -d '{"query": "mutation { createTDO( input: { startDateTime: 1507128535, stopDateTime: 1507128542, name: \"My New Video\", description: \"The latest video in the series\" }) { id,  status } }" }'
```



### **Authentication**

Veritone Job API uses bearer token authentication for requests. To authenticate your calls, provide a valid API Token in the *Authentication* header of the request with the value *Bearer \<token\>*. Requests made without this header or with an invalid token will return an error code.

An API Token can be generated in the Veritone Admin App by your Organization Administrator. If your organization does not use the Admin App, please contact your Veritone Account Manager for assistance. 

 

**To generate an API Token:**


1. Log into the Veritone Platform and select **Admin** from the *App Picker* drop-down. The *Admin App* opens.

2. Click the **API Keys** tile. The *API Key* page opens.

![Get API Token](Get-API-Token-1.png)

3. Click **New API** Key. The *New API Key* window opens.

![Get API Token](Get-API-Token-2.png)

4. Enter a token name and select the permissions needed for the token to perform the required API tasks. Click **Generate Token** to save. The *Token Generated *window opens.

5. Copy your token and click **Close** when finished. 

*Note*: Once the *Token Generated* window closes, the token code will no longer display. 


## Create a TDO (Recording Container) with an Asset

In Veritone, audio and video files are uploaded to a container called a Temporal Data Object (TDO). The first step in the Job workflow is to create a TDO and upload an asset (video or audio file) to it by calling the *Create TDO With Asset* mutation. Successful calls return a unique TDO ID and Asset ID that are used to create cognitive processing jobs and tasks. Calls that are unsuccessful will result in an error.

There are two available options for setting up your request, which are described below.

### Option 1 
----------

Send the asset’s file contents as part of the request. This option uses the *multipart/form-data* header and requires use of the *file* and *filename* parameters. Requests using this option are structured in two parts: the form field data that specifies the file information and a query containing details about the asset. Currently, GraphiQL does not support multipart/form requests, so a different HTTP client must be used for making sample calls.
 

#### Option 1 Request Payload: Create a TDO with an Asset
```graphql
 -H content-type:  => A header that specifies the content type. Enter "multipart/form-data" as the value.(required)
 -F filename       => The name of the file to upload. The value must match the name of the saved file. (required)      
 -F file           => The path of the file to upload. (required)                                                          
 -F query=mutation {
-----------request fields-----------
  createTDOWithAsset(input:{  => The mutation type and input variable. (required)
    startDateTime: integer    => The absolute start date and time of the TDO in [Unix/Epoch (https://www.epochconverter.com/) timestamp format. (required)
    stopDateTime: integer     => The absolute stop time of the TDO in [Unix/Epoch](https://www.epochconverter.com/) timestamp format. (required)
    contentType: "string"     => The MIME type of the asset (e.g., audio/mp3). (required)
    assetType: "string"       => A label that classifies an asset, such as “transcript,” “media,” or “text.” (required)
  }){
-----------return fields-----------
    id              => The unique ID associated with the TDO. (required)
    status          => The status of the request’s progress. (required)
    assets{         => The Assets object parameter to access the TDO's assets. (required)
      records {     => The Records object parameter with data specific to individual assets. (required))
        id          => The unique ID of the new asset, provided by the server. (required)
        type        => A label that classifies the asset. The returned value reflects the value specified in the request. (required)
        contentType => The MIME type of the asset (e.g., audio/mp3). (required)
        signedUri   => The secure URI of the asset. (required)
      }
    }    
  }
}
```

#### Option 1 Sample Request: Create a TDO with an Asset
```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31gcf6:2e76022093e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'filename=AM Daily.mp4' \
  -F 'file=@/Users/bobjones/Downloads/AM Daily.mp4' \
  -F 'query=mutation {
  createTDOWithAsset(
    input: {
      startDateTime: 1507128535
      stopDateTime: 1507128542
      contentType: "video/mp4"
      assetType: "media"
    } ) {
    id
    status
    assets{
      records {
        id
        type
        signedUri
        contentType
      }
    }    
  }
}'
```

#### Option 1 Sample Response: Create a TDO with an Asset
```json
{
  "data": {
    "createTDOWithAsset": {
      "id": "44512341",
      "status": "recorded",
      "assets": {
        "records": [
          {
            "id": "7acfab47-f648-4cfc-9042-74b4cafb1605",
            "type": "media",
            "signedUri": "https://www.youtube.com/watch?v=xsK9WsL0fVc",
            "contentType": "video/mp4"
          }
        ]
      }
    }
  }
}
```

### Option 2 
----------

Pass the file's raw URI from an external host location that’s accessible to Veritone in the request.

#### Option 2 Request Payload: Create a TDO with an Asset
```graphql
mutation {
-----------request fields-----------
  createTDOWithAsset(input:{ => The mutation type and input variable. (required)
    startDateTime: integer   => The absolute start date and time of the TDO in Unix/Epoch timestamp format.  (required)
    stopDateTime: integer    => The absolute stop time of the TDO in in Unix/Epoch timestamp format. (required)
    contentType: "string"    => The MIME type of the asset (e.g., audio/mp3). (required)
    assetType: "string"      => A label that classifies an asset, such as “transcript,” “media,” or “text.” (required)
    uri: "string"            => The path to the asset data. (required)
  }){
-----------return fields-----------
    id              => The unique ID associated with the TDO. (required)
    status          => The status of the request’s progress. (required)
    assets{         => The Assets object parameter to access the TDO's assets. (required)
      records {     => The Records object parameter with data specific to individual assets. (required))
        id          => The unique ID of the new asset, provided by the server. (required)
        type        => A label that classifies the asset. The returned value reflects the value specified in the request. (required)
        contentType => The MIME type of the asset (e.g., audio/mp3). (required)
        signedUri   => The secure URI of the asset. (required)
      }
    }    
  }
}
```

#### Option 2 Sample Request: Create a TDO with an Asset
```graphql
mutation {
  createTDOWithAsset(
    input:{
      startDateTime: 1507128535
      stopDateTime: 1507128542
      contentType: "video/mp4"
      assetType: "media"
      uri: "https://www.youtube.com/watch?v=xsK9WsL0fVc"
    }
  ) {
    id
    status
    assets{
      records {
        id
        type
        signedUri
        contentType
      }
    }
  }
}
```

#### Option 2 Sample Response: Create a TDO with an Asset
```json
{
  "data": {
    "createTDOWithAsset": {
      "id": "44512341",
      "status": "recorded",
      "assets": {
        "records": [
          {
            "id": "7acfab47-f648-4cfc-9042-74b4cafb1605",
            "type": "media",
            "signedUri": "https://www.youtube.com/watch?v=xsK9WsL0fVc",
            "contentType": "video/mp4"
          }
        ]
      }
    }
  }
}
```
## Create a Job with Cognitive Processing Tasks

Uploaded assets can be processed to detect objects, transcribe the file’s audio into text, and translate between languages. A call to the *Create Job* mutation creates a new job with a list of cognitive processing tasks based on the engine IDs specified in the request body. Additional task payload parameters that indicate how the service is to be performed are required for certain engines. Each job request must set transcoding as the primary task to convert the file to a supported format for processing. The *insert into index* parameter is also required to ensure output data is indexed and made searchable in Veritone.

*Important Note about Translation:*

Because translation engines use text to translate one language to another, a file must first be processed for transcription before it can be translated. Transcription can occur separately or in the same job with translation.

#### Request Payload: Create a Job
```graphql
mutation{
-------request fields-----------
  createJob(input: {   => The Create Job mutation type and input variable. (required)
    targetId: "string" => The TDO/Container ID targeted for the job. (required)
    tasks: [{ object   => The tasks object parameter with data specific to the job’s tasks. (required)
      engineId: "string"    => The ID of the engine that will process the task. See the Task Engines table for possible values. (required)
        payload: {          => An object with required data to upload with an engine task. See the Engine Task Payloads table later in this section for options. (required by some engines)
           target: "string" => The task payload option and value. (required by payload)    
        },
      {  
      engineId: "fc004413-89f0-132a-60b2-b94522fb7e66" => The task engine ID that transcodes the file into a supported format for processing. Video files are transcoded to MP4 and audio files to MP3. Use the exact value shown. (required)                                             
        payload: {           => The payload object for transcoding. (required)
          setAsPrimary: true => A Boolean set to true to ensure the file is transcoded prior to running any other task in the job. (required)
        },
      {
      engineId: "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8" => A task engine ID that indexes output data and makes it searchable in Veritone. Use the exact value shown. This engine does not require a payload. (required)     
      }
  }){
-------return fields------------
    id            => The unique ID of the job, provided by the server. (required)
    targetId      => The TDO/Container ID targeted for the job. (required)
    status        => The status of the job as a whole. Possible Values are “accepted” (the job is valid and has been accepted for processing), “running” (the job is running), “failed” (at least one task failed and job execution was terminated), and “complete” (all tasks in the job finished normally). (required)
    tasks {       => The tasks object parameter with data specific to the job’s tasks. (required)
      records {   => The records object parameter with data specific to individual tasks. (required)
        id        => The unique ID of a task, provided by the server. (required)
        engineId  => The unique ID associated with the engine specified to process the task. (required)
        order     => The sequential order for processing the job tasks, starting at 0. (required)
        payload   => The data uploaded with an engine task. (required)
        status    => The status of the task. Possible values are “pending” (the task was received but hasn’t been queued), “queued” (the task has been accepted for processing), “running” (the task is running), “failed” (the task failed and execution was  terminated), and “complete” (the task finished normally). (required)
      }
    }
  }
}
```

#### Task Engines
<table>
  <tr>
    <td><b>Engine Category</b></td>
    <td><b>Engine ID</b></td>
    <td><b>Engine Name</b></td>
    <td><b>Description</b></td>
    <td><b>Payload Available</b></td>
  </tr>
  <tr>
    <td>transcode</td>
    <td>fc004413-89f0-132a-60b2-b94522fb7e66</td>
    <td>Cerebral</td>
    <td>Popular and flexible transcoding engine, able to inexpensively create and store audio, video and other files to alternative formats.</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>762bf9a0-fc08-7fbb-4ba0-21a3cee6edaf</td>
    <td>Plexus</td>
    <td>Popular transcription engine that offers English and Spanish languages.</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>7b25f4b4-35f2-887c-d383-721dbfd3c7ee</td>
    <td>Corona</td>
    <td>Basic transcription engine from a company focused on Natural Language Understanding.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>82243ae4-0341-b958-196e-9daba9174c44</td>
    <td>Callosum</td>
    <td>Specialized transcription engine for financial vernacular.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>818aa3da-0123-33a4-8c5b-2bc3e569c52a</td>
    <td>Basal</td>
    <td>Mid-tier transcription engine from a major software company.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>cdf1097a-d6c3-bdcf-accb-59e811cc5ef0</td>
    <td>Neuron</td>
    <td>A long-standing engine tuned specifically for short form content.</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>dbdc137d-8437-40d7-bf74-4e3d739e154c</td>
    <td>Dendrite</td>
    <td>One of our most popular and accurate transcription engines, with extensive language options. (Non-network isolated)</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>2b06ec74-2e70-5f1a-f834-2bd7d6fdfdf2</td>
    <td>Supernova-English (USA)</td>
    <td>Network isolated version of one of our most popular and accurate transcription engines, with extensive language options. (Network isolated – runs in the Veritone cloud)</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>4b1baf05-3f2f-3092-cb01-c4ad293e77e6</td>
    <td>Broca</td>
    <td>Basic transcription engine converting speech to text.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>f44aa80e-4650-c55c-58e7-49c965019790</td>
    <td>Temporal</td>
    <td>One of our most popular transcription engines, offering several foreign language options and supporting Keyword weighting.</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>f0acacba-2c33-86c1-0deb-c479906f17c5</td>
    <td>Synapse</td>
    <td>Well-known transcription engine from a leading software company.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>9f0a2f4e-9e29-7a50-faa5-4e151925f4b2</td>
    <td>Fornix</td>
    <td>Accurate human transcription with several options for required turnaround time.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>translation</td>
    <td>b00fc05e-3502-e8da-4871-7182dc1aa9f2</td>
    <td>Pia</td>
    <td>Best-in-class multi-language translation engine, supporting over 100 languages.</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>translation</td>
    <td>388d951e-c90c-f001-9d6b-8bb70b9e6267</td>
    <td>Jupiter</td>
    <td>Machine translation engine from a leading technology provider.</td>
    <td>yes</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>070148f0-3fd0-1bdc-b412-1e79b8aa36a2</td>
    <td>Pons</td>
    <td>General object recognition engine which uses deep-learning technology to identify objects located in images and video.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>ecff85ed-6cac-1fc4-5847-470a7e4ddab0</td>
    <td>Amygdala</td>
    <td>Detects explicit and suggestive visual content in images or videos, and tags such content with one of 7 labels.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>ceba5f43-bc27-71b1-1b73-aca4f8eff56b</td>
    <td>Macula</td>
    <td>Offers a robust general object model as well as narrow models such as food and fashion.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>ecec4314-c0eb-0812-1cea-0014fffd0ad6</td>
    <td>Limbus</td>
    <td>Premium object recognition engine, boasting high accuracy rates and long-form descriptions of scene components, people and items.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>619d7252-d473-b42c-96c6-5675b5e56afd</td>
    <td>Iris</td>
    <td>Robust general object recognition engine with above-average accuracy, from a leading A.I. software company.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>8e0a73f3-d21c-028f-f721-e44269b428eb</td>
    <td>Optic</td>
    <td>Detects popular natural and man-made structures within an image, to help identify the original location of the source media.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>43435e5c-bb05-1091-76ec-4226d9732e92</td>
    <td>Cranium</td>
    <td>A leading general object recognition engine that processes at competitive speeds.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>cf5b2565-8ec0-1463-8b11-6d8498be2f12</td>
    <td>Myelin</td>
    <td>Reasonably accurate general object recognition engine from a major A.I. software company, with a focus on color analysis.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>d03c5d0a-c745-621f-527c-faba02c00c68</td>
    <td>Nissi</td>
    <td>Basic object recognition engine based on an established machine learning framework, used to detect the presence of a person or object.</td>
    <td>no</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>f5d91496-fd4a-8a61-2398-87fc50ee6693</td>
    <td>Thalamus</td>
    <td>Extracts license plate details from an image, with ability to define geographic coverage by state or country.</td>
    <td>yes</td>
  </tr>
</table>

#### Engine Task Payloads
<table>
  <tr>
    <td width="15%"><b>Task Type</b></td>
    <td width="15%"><b>Engine Name</b></td>
    <td width="35%"><b>Options and Possible Values</b></td>
    <td width="35%"><b>Example with Engine ID</b></td>
  </tr>
  <tr>
    <td>transcode</td>
    <td>Cerebral</td>
    <td>set as primary: true (required)</td>
    <td>tasks: [
{engineId:"fc004413-89f0-132a-60b2-b94522fb7e66", payload: {setAsPrimary: true}}
]</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>Plexus</td>
    <td><b>language</b><br>
"en" (English) Default<br>
"es" (Spanish)</td>
    <td><b>Without language option:</b><br>
tasks: [
{engineId:"762bf9a0-fc08-7fbb-4ba0-21a3cee6edaf"}
]<br><br>
 
<b>With language option:</b><br>
tasks: [
{engineId:"762bf9a0-fc08-7fbb-4ba0-21a3cee6edaf", payload:{language: "en"}}
]</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>Neuron	</td>
    <td><b>language</b><br>
"en-US" (English) Default<br>
"en-AU" (English - Australia)</td>
    <td><b>Without language option:</b><br>
tasks: [
{engineId:"cdf1097a-d6c3-bdcf-accb-59e811cc5ef0"}
]<br><br>
 
<b>With language option:</b><br>
tasks: [
{engineId:"cdf1097a-d6c3-bdcf-accb-59e811cc5ef0", payload:{language: "en-US"}}]</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>Dendrite	</td>
    <td><b>language</b><br>
"en-US" (English - US) Default<br>
"en-AU" (English - AU)<br>
"en-GB" (English - GB)<br>
"ca" (Catalan)<br>
"cs" (Czech)<br>
"de" (German)<br>
"el" (Greek)<br>
"es" (Spanish)<br>
"fi" (Finnish)<br>
"fr" (French)<br>
"hu" (Hungarian)<br>
"it" (Italian)<br>
"ja" (Japanese)<br>
"nl" (Dutch)<br>
"pl" (Polish)<br>
"pt" (Portuguese)<br>
"ro" (Romanian)<br>
"ru" (Russian)<br>
"sv" (Swedish)</td>
    <td><b>Without language option:</b><br>
tasks: [
{engineId:"dbdc137d-8437-40d7-bf74-4e3d739e154c "}
]<br><br>
 
<b>With language option:</b><br>
tasks: [
{engineId:"dbdc137d-8437-40d7-bf74-4e3d739e154c", payload:{language: "en-US"}}]</td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>Supernova-English (USA)</td>
    <td><b>diarize</b><br>
true (enable diarization)<br>
false (no diarization)</td>
    <td><b>Without diarization option:</b><br>
tasks: [
{engineId:"2b06ec74-2e70-5f1a-f834-2bd7d6fdfdf2"}
]<br><br>
 
<b>With diarization option:</b><br>
tasks: [
{engineId:"2b06ec74-2e70-5f1a-f834-2bd7d6fdfdf2", payload:{diarize: true}}
]
 </td>
  </tr>
  <tr>
    <td>transcription</td>
    <td>Temporal	</td>
    <td><b>language</b><br>
"en-US" (English US) Default<br>
"en-UK" (English UK)<br>
"en-AU" (English Australian)<br>
"pt-BR" (Portuguese, Brazil)<br>
"es-LA" (Spanish, Latin America)<br>
"es-ES" (Spanish, Spain)<br>
"de-DE" (German)<br>
"fr-FR" (French)<br>
"it-IT" (Italian)<br>
"nl-NL" (Dutch)<br><br>
 
<b>priority</b><br>
Processing time preference for the task.<br><br>
 
"low" (average turnaround 8 hours) Default<br>
"normal" (average turnaround 15 minutes)<br>
"high" (average turnaround 5 minutes)<br><br>
 
<b>terms</b><br>
Comma separated list of user-entered words or phrases.</td>
    <td><b>Without an option:</b><br>
tasks: [
{engineId:" f44aa80e-4650-c55c-58e7-49c965019790", payload:{language:"en-US", priority: "normal"}}
]<br><br>
 
<b>With an option (all 3 options shown below):</b><br>
tasks: [
{engineId:" f44aa80e-4650-c55c-58e7-49c965019790", payload:{terms: "Bailout, Bondover, Bond", language: "en-UK", priority: "low"}}
]</td>
  </tr>
  <tr>
    <td>object detection</td>
    <td>Thalamus
 </td>
    <td><b>region (required)</b><br>
"US-CA" (West)<br>
"US-IL" (Midwest)<br>
"US-NY" (Northeast)<br>
"US-VA" (South)<br>
"US-FL" (Southeast)<br>
"US-TX" (Southwest)</td>
    <td>tasks: [
{engineId:"f5d91496-fd4a-8a61-2398-87fc50ee6693", payload:{"region": "west"}}
]</td>
  </tr>
  <tr>
    <td>translation</td>
    <td>Pia</td>
    <td><b>target language</b><br>
"English:en" (English) Default<br>
"Afrikaans:af" (Afrikaans)<br>
"Albanian:sq" (Albanian)<br>
"Amharic:am" (Amharic)<br>
"Arabic:ar" (Arabic)<br>
"Armenian:hy" (Armenian)<br>
"Azerbaijani:az" (Azerbaijani)<br>
"Basque:eu" (Basque)<br>
"Belarusian:be" (Belarusian)<br>
"Bengali:bn" (Bengali)<br>
"Bosnian:bs" (Bosnian)<br>
"Bulgarian:bg" (Bulgarian)<br>
"Burmese:my" (Burmese)<br>
"Catalan:ca" (Catalan)<br>
"Cebuano:ceb" (Cebuano)<br>
"Chichewa:ny" (Chichewa)<br>
"Chinese Simplified:zh-CN" (Chinese Simplified)<br>
"Chinese Traditional:zh-TW" (Chinese Traditional)<br>
"Corsican:co" (Corsican)<br>
"Croatian:hr" (Croatian)<br>
"Czech:cs" (Czech)<br>
"Danish:da" (Danish)<br>
"Dutch:nl" (Dutch)<br>
"Esperanto:eo" (Esperanto)<br>
"Estonian:et" (Estonian)<br>
"Filipino:tl" (Filipino)<br>
"Finnish:fi" (Finnish)<br>
"French:fr" (French)<br>
"Frisian:fy" (Frisian)<br>
"Galician:gl" (Galician)<br>
"Georgian:ka" (Georgian)<br>
"German:de" (German)<br>
"Greek:el" (Greek)<br>
"Gujarati:gu" (Gujarati)<br>
"Haitian Creole:ht" (Haitian Creole)<br>
"Hausa:ha" (Hausa)<br>
"Hawaiian:haw" (Hawaiian)<br>
"Hebrew:iw" (Hebrew)<br>
"Hindi:hi" (Hindi)<br>
"Homong:hmn" (Homong)<br>
"Hungarian:hu" (Hungarian)<br>
"Icelandic:is" (Icelandic)<br>
"Indonesian:id" (Indonesian)<br>
"Irish:ga" (Irish)<br>
"Italian:it" (Italian)<br>
"Japanese:ja" (Japanese)<br>
"Javanese:jw" (Javanese)<br>
"Kannada:kn" (Kannada)<br>
"Kazakh:kk" (Kazakh)<br>
"Khmer:km" (Khmer)<br>
"Korean:ko" (Korean)<br>
"Kurdish:ku" (Kurdish)<br>
"Kyrgyz:ky" (Kyrgyz)<br>
"Lao:lo" (Lao)<br>
"Latin:la" (Latin)<br>
"Latvian:lv" (Latvian)<br>
"Lithuanian:lt" (Lithuanian)<br>
"Luxembourgish:lb" (Luxembourgish)<br>
"Macedonian:mk" (Macedonian)<br>
"Malagasy:mg" (Malagasy)<br>
"Malay:ms" (Malay)<br>
"Malayalam:ml" (Malayalam)<br>
"Maltese:mt" (Maltese)<br>
"Maori:mi" (Maori)<br>
"Marathi:mr" (Marathi)<br>
"Mongolian:mn" (Mongolian)<br>
"Nepali:ne" (Nepali)<br>
"Norwegian:no" (Norwegian)<br>
"Pashto:ps" (Pashto)<br>
"Persian:fa" (Persian)<br>
"Polish:pl" (Polish)<br>
"Portuguese:pt" (Portuguese)<br>
"Romanian:ro" (Romanian)<br>
"Russian:ru" (Russian)<br>
"Samoan:sm” (Samoan)<br>
"Scots Gaelic:gd" (Scots Gaelic)<br>
"Serbian:sr" (Serbian)<br>
"Sesotho:st" (Sesotho)<br>
"Shona:sn" (Shona)<br>
"Sindhi:sd" (Sindhi)<br>
"Sinhala:si" (Sinhala)<br>
"Slovak:sk" (Slovak)<br>
"Slovenian:sl" (Slovenian)<br>
"Somali:so" (Somali)<br>
"Spanish:es" (Spanish)<br>
"Sundanese:su" (Sundanese)<br>
"Swahili:sw" (Swahili)<br>
"Swedish:sv" (Swedish)<br>
"Tajik:tg" (Tajik)<br>
"Tamil:ta" (Tamil)<br>
"Telugu:te" (Telugu)<br>
"Thai:th" (Thai)<br>
"Turkish:tr" (Turkish)<br>
"Ukrainian:uk" (Ukrainian)<br>
"Urdu:ur" (Urdu)<br>
"Uzbek:uz" (Uzbek)<br>
"Vietnamese:vi" (Vietnamese)<br>
"Welsh:cy" (Welsh)<br>
"Xhosa:xh" (Xhosa)<br>
"Yiddish:yi" (Yiddish)<br>
"Yoruba:yo" (Yoruba)<br>
"Zulu:zu" (Zulu)</td>
    <td>tasks: [
{engineId:"b00fc05e-3502-e8da-4871-7182dc1aa9f2", payload:{target: "Filipino:tl "}}]</td>
  </tr>
  <tr>
    <td>translation</td>
    <td>Jupiter</td>
    <td><b>target language</b><br>
"en" (English) Default<br>
"af" (Afrikaans)<br>
"ar" (Arabic)<br>
"bs-Latn" (Bosnian - Latin)<br>
"bg" (Bulgarian)<br>
"ca" (Catalan)<br>
"zh-CHS" (Chinese Simplified)<br>
"zh-CHT" (Chinese Traditional)<br>
"hr" (Croatian)<br>
"cs" (Czech)<br>
"da" (Danish)<br>
"nl" (Dutch)<br>
"et" (Estonian)<br>
"fi" (Finnish)<br>
"fr" (French)<br>
"de" (German)<br>
"el" (Greek)<br>
"ht" (Haitian Creole)<br>
"he" (Hebrew)<br>
"hi" (Hindi)<br>
"mww" (Hmong Daw)<br>
"hu" (Hungarian)<br>
"id" (Indonesian)<br>
"it" (Italian)<br>
"ja" (Japanese)<br>
"sw" (Kiswahili)<br>
"tlh" (Klingon)<br>
"tlh-Qaak" (Klingon - plqaD)<br>
"ko" (Korean)<br>
"lv" (Latvian)<br>
"lt" (Lithuanian)<br>
"ms" (Malay)<br>
"mt" (Maltese)<br>
"no" (Norwegian)<br>
"fa" (Persian)<br>
"pl" (Polish)<br>
"pt" (Portuguese)<br>
"otq" (Querétaro Otomi)<br>
"ro" (Romanian)<br>
"ru" (Russian)<br>
"sr-Cyrl" (Serbian - Cyrillic)<br>
"sr-Latn" (Serbian - Latin)<br>
"sk" (Slovak)<br>
"sl" (Slovenian)<br>
"es" (Spanish)<br>
"sv" (Swedish)<br>
"th" (Thai)<br>
"tr" (Turkish)<br>
"uk" (Ukrainian)<br>
"ur" (Urdu)<br>
"vi" (Vietnamese)<br>
"cy" (Welsh)<br>
"yua" (Yucatec Maya)</td>
    <td>tasks: [
{engineId:"388d951e-c90c-f001-9d6b-8bb70b9e6267", payload:{target: "it"}}
]</td>
  </tr>
</table>

#### Sample Request: Create a Job
The example below shows a request for a job with four tasks: transcoding (first engine ID), transcription (second engine ID), translation of the transcript into Spanish (third engine ID), and insert-into-index (fourth engine ID).
```graphql
mutation {
  createJob(input: {
    targetId: "44512341"
    tasks: [
      {
        engineId: "fc004413-89f0-132a-60b2-b94522fb7e66"
        payload: {
          setAsPrimary: true
        },
      },
      {
        engineId: "762bf9a0-fc08-7fbb-4ba0-21a3cee6edaf"
      },
      {
        engineId: "b00fc05e-3502-e8da-4871-7182dc1aa9f2"
        payload: {
          target: "Spanish:es" 
        },
      },
      {
        engineId: "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8"
      }
    ]
  }) {
    id
    targetId
    tasks {
      records {
        id
        engineId
        order
        payload
        status
      }
    }
  }
}
```
#### Sample Response: Create a Job 
```json
{
  "data": {
    "createJob": {
      "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad",
      "targetId": "44512341",
      "tasks": {
        "records": [
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-caaa51ab-e4b4-49e3-b6d9-3291fa4b9836",
            "engineId": "fc004413-89f0-132a-60b2-b94522fb7e66",
            "order": 0,
            "payload": {
              "setAsPrimary": true
            },
            "status": "queued"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-fcd5c69b-0f8e-46f0-9aa0-2718529836ad",
            "engineId": "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8",
            "order": 3,
            "payload": {},
            "status": "pending"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-563e8f85-f733-45b7-8eb7-3ff68aed498a",
            "engineId": "b00fc05e-3502-e8da-4871-7182dc1aa9f2",
            "order": 2,
            "payload": {
              "target": "Spanish:es"
            },
            "status": "pending"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-a4c4767a-f7a4-4244-8481-a036a286e3a3",
            "engineId": "762bf9a0-fc08-7fbb-4ba0-21a3cee6edaf",
            "order": 1,
            "payload": {},
            "status": "pending"
          }
        ]
      }
    }
  }
}
```

## Check a Job Status

To check the status of the job and its tasks, make a call to the Job query and provide the Job ID returned by the *Create Job* request. Successful calls return a Job object with a status and a list of tasks with requested details. Unsuccessful calls will result in an error.

#### Request Payload: Check a Job Status
```graphql
query{
-------request fields-----------
  job                => The Job object query type. (required)
    (id: "string") { => The Job ID returned by the Create Job request. (required)
-------return fields------------
    id            => The unique ID of the job, provided by the server. (required)
    status        => The status of the job as a whole. Possible Values are “accepted” (the job is valid and has been accepted for processing), “running” (the job is running), “failed” (at least one task failed and job execution was terminated), and “complete” (all tasks in the job finished normally). (required)
    tasks {       => The tasks object parameter with data specific to the job’s tasks. (required)
      records {   => The records object parameter with data specific to individual tasks. (required)
        id        => The unique ID of a task, provided by the server. (required)
        status    => The status of the task. Possible values are “pending” (the task was received but hasn’t been queued), “queued” (the task has been accepted for processing), “running” (the task is running), “failed” (the task failed and execution was terminated), and “complete” (the task finished normally). (required)
      }
    }
  }
}
```

#### Sample Request: Check a Job Status
```graphql
query{
  job(id: "2791851b-0d02-4aaf-97e0-cd77a2e771ad") {
    id
    status
    tasks {
      records {
        id
        status
        engineId
      }
    }
  }
}
```

#### Sample Response: Check a Job Status
```json
{
  "data": {
    "job": {
      "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad",
      "status": "running",
      "tasks": {
        "records": [
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-caaa51ab-e4b4-49e3-b6d9-3291fa4b9836",
            "status": "complete",
            "engineId": "fc004413-89f0-132a-60b2-b94522fb7e66"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-fcd5c69b-0f8e-46f0-9aa0-2718529836ad",
            "status": "queued",
            "engineId": "f0acacba-2c33-86c1-0deb-c479906f17c5"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-563e8f85-f733-45b7-8eb7-3ff68aed498a ",
            "status": "queued",
            "engineId": "b00fc05e-3502-e8da-4871-7182dc1aa9f2"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-a4c4767a-f7a4-4244-8481-a036a286e3a3",
            "status": "pending",
            "engineId": "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8"
          }
        ]
      }
    }
  }
}
```


## Retrieve Job Outputs

Once a job has completed processing, calls can be made to retrieve a transcript, a translation, or object detection task output. 

### Retrieve a Transcript
To retrieve a transcript, make a request to the *Job* query with the Job ID. Transcripts are returned in time-correlated text fragments that include beginning and ending times. A successful request returns the specified transcript and other requested details. Otherwise, an error is returned.

#### Request Payload: Retrieve a Transcript
```graphql
query{
-------request fields-----------
  job                       => The Job object query type. (required)
    (id: "string") {        => The Job ID returned by the Create Job request. (required)
      assets(               => The assets object parameter with data specific to the job’s assets. (required)
      assetType: "string"){ => A label that classifies an asset. Use the value “transcript”. (required)
-------return fields------------
       records {       => The records object parameter with data specific to individual assets. (required)
         id:           => The unique ID of an asset, provided by the server. (required)
         uri:          => The path to the asset data. (required)
         contentType:  => The MIME type of the asset (e.g., audio/mp3). (required)
         transform(transformFunction: "string") => Converts an asset with XML format to JSON. Use the value “XML2JSON”. (required)
       }
      }
    }
    tasks {      => The tasks object parameter with data specific to the job’s tasks. (required)
      records {  => The records object parameter with data specific to individual assets. (required)
        id       => The unique ID of a task, provided by the server. (required)
        output   => The output produced by the task (e.g., transcript). (required)
        status   => The status of the task. Possible values are “pending” (the task was received but hasn’t been queued), “queued” (the task has been accepted for processing), “running” (the task is running), “failed” (the task failed and execution was terminated), and “complete” (the task finished normally). (required)
        engineId => The ID of the engine that processed the task. (optional)
      }
    }
  }
}
```

#### Sample Request: Retrieve a Transcript
```graphql
query:{
  job(id: "2791851b-0d02-4aaf-97e0-cd77a2e771ad") {
    target {
      id
      assets(assetType: "transcript") {
      records {
        id 
        uri
        contentType
        transform(transformFunction: XML2JSON)
       }
      }
    }
    tasks {
      records {
        id
        output
        status
        engineId
      }
    }
  }
}
```

#### Sample Response: Retrieve a Transcript
```json
{
  "data": {
    "job": {
      "target": {
        "id": "44512341",
        "assets": {
          "records": [
            {
              "id": "64d40793-119a-4847-980c-f4960e94aa26",
              "uri": "https://inspirent.s3.amazonaws.com/assets/39528568/ca40bd53-542f-4f47-8227-9052d71aa03f.ttml",
              "contentType": "application/ttml+xml",
              "transform": null
            },
            {
              "id": "005fa076-ae22-4572-83c9-cc60fc6e14bf",
              "uri": "https://inspirent.s3.amazonaws.com/assets/44512341/abcdc58e-bb95-4ab6-ab3f-2c76c2cea6ff.ttml",
              "transform": "{\"tt\":{\"$\":{\"xml:lang\":\"en-us\",\"xmlns\":\"http://www.w3.org/ns/ttml\",\"xmlns:tts\":\"http://www.w3.org/ns/ttml#styling\",\"xmlns:ttm\":\"http://www.w3.org/ns/ttml#metadata\"},\"head\":[{ \"metadata\":[{\"ttm:title\":[\"Media.wvx.aib \"],\"ttm:copyright\":[\"Copyright (c) 2013 Microsoft Corporation.  All rights reserved.\"]}],\"styling\":[{\"style\":[{\"$\":{\"xml:id\":\"Style1\",\"tts:fontFamily\":\"proportional SansSerif\",\"tts:fontSize\":\"0.8c\",\"tts:textAlign\":\"center\",\"tts:color\":\"white\"}}]}],\"layout\":[{\" region\":[{\"$\":{\"style\":\"Style1 \",\"xml:id\":\"CaptionArea\",\"tts:origin\":\"0c12.6c\",\"tts:extent\":\ "32c2.4c\",\"tts:backgroundColor\":\"rgba(0,0,0,160)\",\"tts:displayAlign\":\"center\",\"tts:padding\":\"0.3c0.5c\ "}}]}],\"recognizability\":[\"0.813\"]}] ,\"body\":[{\"$\":{\"region\":\"CaptionArea\"},\"div\":[{\"p\":[{\"_\ ":\"asdf\",\"$\":{\"begin\":\ "00:00:00.250\", \"end\":\"00:00:03.270\"}},{\"_\":\"of people descending  on the hermosa beach to begin a unique\",\"$\":{\"begin\":\"00:00:03.270\",\"end\":\"00:00:08.020\"}},{\"_\":\"...man competition exit includes running public drinkingbeer\",\" $\":{\"begin\":\"00:00:08.020\",\ "end\":\"00:00:12.680 \"}}, {\"_\":\"when they birch in the middle of the action good-morning moi.\",\"$\":{\"begin\":\"00:00:12.680\", \"end\":\"00:00:15.900\"}},{\"_\":\"I want to...like this that I was in the middle of the\",\"$\":{\"begin\": \"00:00:18.380 \",\"end\":\ "00:00:21.270\"}},{\"_\":\"mosh spent a lot of people who are drinking...\",\"$\":{ \"begin\":\"00:00:21.270\",\"end\":\"00:00:25.670\"}},{\"_\":\"You know, no,...come on, my friend\",\"$\":{\" begin\":\"00:00:25.670\",\"end\":\"00:00:29.060\"}},{\"_\":\"...it...get ugly...the...the invariant... let's just recap you\",\"$\":{\"begin\":\"00:00:29.060\",\"end\ ":\"00:00:35.220\"}}, {\"_\":\"...a mile on the beach yet paddled a mile in the ocean and now what do you do "begin\":\"00:00:40.and\",\"$\":{\"begin\":\"00:00:35.220 \",\"end\":\"00:00:40.270\"}},{\"_\":\"...they're.\",\"$\":{\ 270\",\"end\":\" 00:00:41.640\"}},{\"_\":\"Going to be... building you have as.\",\"$\":{\"begin\":\"00:00 :41.640\",\"end\":\"00: 00:48.050 \"}},{\"_\":\"Was line-of-business or six back on the moon...been training for the for...money by...\" ,\"$\":{\"begin\":\"00:00:51.890\" ,\"end\":\"00:01:02.470\"} },{\"_\":\"Is a locker room celebration\",\"$\":{\"begin\":\"00:01:04.720\",\"end\": \"00:01:06.150 \"}},{\"_\":\"...gentleman time to bring your out okay?\",\"$\":{\"begin\":\"00:01:06.150\",\"end\" :\"00:01:09.910\"}},{\"_\":\"I guess we saw everything...that live shot twice yet we\",\"$\":{\"begin\":\"00:01:09 .910\",\"end\":\" 00:01:14.280\"}},{\"_\":\"...one when I...back all right and...when you get out of there\",\"$\ ":{\"begin\":\ "00:01:14.280\",\"end\":\"00:01:19.570\"}},{\"_\":\"...bless you before you get a camera and something other than beer all right?\",\"$\":{\"begin\":\"00:01:19.570\",\"end\": \"00:01:25.710\"}}]}]}]}}"
          }
        ]
      }
    }
  }
}
```

#### Response Attributes: Retrieve a Transcript
<table>
  <tr>
    <td><b>Name</b></td>
    <td><b>Type</b></td>
    <td><b>Description</b></td>
  </tr>
  <tr>
    <td>startTime</td>
    <td>string</td>
    <td>The starting time of the text fragment (in timestamp format: HH:mm:ss.S) from the beginning of the media file.</td>
  </tr>
  <tr>
    <td>stopTime</td>
    <td>string</td>
    <td>The ending time of the text fragment (in timestamp format: HH:mm:ss.S) from the beginning of the media file.</td>
  </tr>
  <tr>
    <td>start</td>
    <td>float</td>
    <td>The number of seconds (in floating point format) from the beginning of the media file that the text fragment begins.</td>
  </tr>
  <tr>
    <td>end</td>
    <td>float</td>
    <td>The number of seconds (in floating point format) from the beginning of the media file that the text fragment ends.</td>
  </tr>
  <tr>
    <td>text</td>
    <td>string</td>
    <td>Text for the indicated start/stop times.</td>
  </tr>
</table>
<br>

### Retrieve Object Detection Results
To retrieve object detection results, make a request to the *Job* query with the Job ID. A successful request returns a JSON object with an array of the detected objects and details. Otherwise, an error is returned.

#### Request Payload: Retrieve Object Detection Results
```graphql
query{
-------request fields-----------
  job                       => The Job object query type. (required)
    (id: "string") {        => The Job ID returned by the Create Job request. (required)
      assets(               => The assets object parameter with data specific to the job’s assets. (required)
      assetType: "string"){ => A label that classifies an asset. Use the value “object”. (required)
-------return fields------------
       records {      => The records object parameter with data specific to individual assets. (required)
         id:          => The unique ID of an asset, provided by the server. (required)
         uri:         => The path to the asset data. (required)
         contentType: => The MIME type of the asset (e.g., audio/mp3). (required)
      tasks {         => The tasks object parameter with data specific to the job’s tasks. (required)
        records {     => The records object parameter with data specific to individual assets. (required)
          id          => The unique ID of a task, provided by the server. (required)
          output      => The output produced by the task (e.g., transcript). (required)
          status      => The status of the task. Possible values are “pending” (the task was received but hasn’t been queued), “queued” (the  task has been accepted for processing), “running” (the task is running), “failed” (the task failed and execution was terminated), and “complete” (the task finished normally). (required)
          engineId    => The ID of the engine that processed the task. (optional)
      }
    }
  }
}
```
#### Sample Request: Retrieve Object Detection Results
```graphql
query{
  job(id: "2791851b-0d02-4aaf-97e0-cd77a2e771ad") {
    target {
      id
      assets(assetType: "object") {
      records {
        id 
        uri
        contentType
       }
      }
    }
    tasks {
      records {
        id
        output
        status
        engineId
      }
    }
  }
}
```

#### Sample Response: Retrieve Object Detection Results
```json
{
  "data": {
    "job": {
      "target": {
        "id": "44512341",
        "assets": {
          "records": []
        }
      },
      "tasks": {
        "records": [
          {
            "id": "2791941b-0d33-4aaf-97e0-cd77a2e771ad-fcd5c69b-0f8e-46f0-9aa0-2718529836ad",
            "output": {
              "series": [
                {
                  "end": 2000,
                  "found": "Cricket",
                  "start": 0,
                  "salience": 88.5096206665039
                },
                {
                  "end": 10000,
                  "found": "Sport",
                  "start": 0,
                  "salience": 88.5096206665039
                },
                {
                  "end": 10000,
                  "found": "American Football",
                  "start": 0,
                  "salience": 58.762550354003906
                },
                {
                  "end": 10000,
                  "found": "Football",
                  "start": 0,
                  "salience": 58.762550354003906
                },
                {
                  "end": 11000,
                  "found": "Team",
                  "start": 0,
                  "salience": 53.086971282958984
                },
                {
                  "end": 8000,
                  "found": "Team Sport",
                  "start": 0,
                  "salience": 53.086971282958984
                },
                {
                  "end": 10000,
                  "found": "Arena",
                  "start": 4000,
                  "salience": 57.37635040283203
                },
                {
                  "end": 15000,
                  "found": "Field",
                  "start": 4000,
                  "salience": 57.37635040283203
                }
           ]
      }
    }
  }
}
```

#### Response Attributes: Retrieve Object Detection Results
<table>
  <tr>
    <td><b>Name</b></td>
    <td><b>Type</b></td>
    <td><b>Description</b></td>
  </tr>
  <tr>
    <td>series</td>
    <td>array</td>
    <td>An array of objects with data that describe a detected object.</td>
  </tr>
  <tr>
    <td>end</td>
    <td>integer</td>
    <td>The time that the object was last identified (in milliseconds) from the beginning of the media file.</td>
  </tr>
  <tr>
    <td>found</td>
    <td>string</td>
    <td>The name of the identified object.</td>
  </tr>
  <tr>
    <td>start</td>
    <td>integer</td>
    <td>The time that the object was first identified (in milliseconds) from the beginning of the media file.</td>
  </tr>
  <tr>
    <td>salience	</td>
    <td>integer</td>
    <td>The estimated probability that the detected object is correctly identified.</td>
  </tr>
</table>
<br>

### Retrieve a Translation
To retrieve a translation, make a request to the *Job* query with the Job ID and specify *text* as the *Asset Type* value. Translations are returned as part of the task output. 

#### Request Payload: Retrieve a Translation
```graphql
query{
-------request fields-----------
  job                       => The Job object query type. (required)
    (id: "string") {        => The Job ID returned by the Create Job request. (required)
      assets(               => The assets object parameter with data specific to the job’s assets. (required)
      assetType: "string"){ => A label that classifies an asset. Use the value “text”. (required)
-------return fields------------
       records {      => The records object parameter with data specific to individual assets. (required)
         id:          => The unique ID of an asset, provided by the server. (required)
         uri:         => The path to the asset data. (required)
         contentType: => The MIME type of the asset (e.g., audio/mp3). (required)
      tasks {         => The tasks object parameter with data specific to the job’s tasks. (required)
        records {     => The records object parameter with data specific to individual assets. (required)
          id          => The unique ID of a task, provided by the server. (required)
          output      => The output produced by the task (e.g., transcript). (required)
          status      => The status of the task. Possible values are “pending” (the task was received but hasn’t been queued), “queued” (the task has been accepted for processing), “running” (the task is running), “failed” (the task failed and execution was terminated), and “complete” (the task finished normally). (required)
          engineId    => The ID of the engine that processed the task. (optional)
      }
    }
  }
}
```

#### Sample Request: Retrieve a Translation
```graphql
query{
  job(id: "2791851b-0d02-4aaf-97e0-cd77a2e771ad") {
    target {
      id
      assets(assetType: "text") {
      records {
        id 
        uri
        contentType
       }
      }
    }
    tasks {
      records {
        id
        output
        status
        engineId
      }
    }
  }
}
```
#### Sample Response: Retrieve a Translation
```json
{
  "data": {
    "job": {
      "target": {
        "id": "44512341",
        "assets": {
          "records": [
            {
              "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad",
              "uri": "https://inspirent.s3.amazonaws.com/assets/44512341/50669e82-4a10-43e6-99f0-314699aa32c2.txt",
              "contentType": "text/plain"
            }
          ]
        }
      },
      "tasks": {
        "records": [
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-00adce52-6999-46ac-a63f-33109b6e2edc",
            "output": {},
            "status": "complete",
            "engineId": "915bb300-bfa8-4ce6-8498-50d43705a144"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-1a15d675-ce3d-44f7-a026-dac508b3bf43",
            "output": {
              "response": "inserted"
            },
            "status": "complete",
            "engineId": "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-beca03a4-32f8-42b7-8607-6370884c4538",
            "output": {
              "response": "inserted"
            },
            "status": "complete",
            "engineId": "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-59d01645-0e8b-4fd1-838c-8597089e4af6",
            "output": {},
            "status": "complete",
            "engineId": "e3c78b0e-5ec9-3d24-67f2-ff2ee10afe10"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-8997b3a5-15dc-45f4-8647-8b01a5bf78f7",
            "output": {
              "Spanish": "Bien su sierra aquí vivo casi media hora hace cientos de personas desciende en su mayoría una playa para comenzar un concurso hombre de hierro único sí incluye correr remando y bebiendo cerveza cuando un pájaro tirado en medio de la mañana buena acción. Una vez tuve un sueño como el que me encontraba en medio de la multitud mucha gente estaban bebiendo cerveza cómo son No no no no vamos sobre ti eres mi amigo tuve vamos a obtener. Esto la iglesia ha de la resistencia ahora sólo Recapitulemos chicos corrió una milla en la playa que había remado una milla en el océano y ahora qué hacer para usar pero vas a espera que creo que eres. Creo que esto es. Estaba tratando de terminar para el paquete de 6. Guapura como usted ha estado entrenando para esto durante algún tiempo hasta los 25 años. Y es una celebración de vestuario que sabe usted es un caballero para llevarla cabo OK supongo que todo lo que tiro directo vimos en sí donde empiezas a saber lo que quiero y adónde va cuando usted sale de allí. Antes de que se había descompuesto algo que no sea cerveza. Muy bien."
            },
            "status": "complete",
            "engineId": "388d951e-c90c-f001-9d6b-8bb70b9e6267"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-1eef0201-4512-4b24-ad9f-20f99db985b2",
            "output": {
              "status": "finished",
              "mediaId": "b41b81f9-bc95-4e3e-98ab-06713a9f07ce",
              "metadata": {}
            },
            "status": "complete",
            "engineId": "f44aa80e-4650-c55c-58e7-49c965019790"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-d09a0885-8326-4333-899e-8e02309240bb",
            "output": {
              "assetId": "5bef94a1-d287-415a-afab-9280c8ba0a81",
              "recordingId": "44626362"
            },
            "status": "complete",
            "engineId": "adf1bbd2-c4b3-328e-5213-84c5b400ba32"
          }
        ]
      }
    }
  }
}
```
<br>

## Delete a TDO and/or Its Content

The Veritone GraphQL API allows you to delete content to free up storage space or comply with certain policies. Fine-grained control gives you options to delete an entire TDO and its assets or just specific types of data from the container.

### Delete a TDO and All Assets
A TDO can be removed from an organization’s files by making a request to the *Delete TDO* mutation. Successful calls delete the TDO and all metadata about its assets.  

#### Request Payload: Delete a TDO
```graphql
mutation{
-------request fields-----------
  deleteTDO {      => The Delete TDO mutation type. (required)
    (id: "string") => The unique ID of the TDO/Container to delete. (required)
-------return fields------------
         id:       => The ID of the deleted TDO/Container. (required)
         message:   => A message confirming deletion of the TDO. (required)
      }
    }
 ```

 #### Sample Request: Delete a TDO
 ```graphql
 mutation{
  deleteTDO(id: "44512341") 
     {
      id
      message
      }
    }
```
#### Sample Response: Delete a TDO
```json
{
  "data": {
    "deleteTDO": {
      "id": "44512341",
      "message": "TemporalDataObject 44512341 was deleted."
    }
  }
}
```

### Delete TDO Content
To delete TDO content but retain the TDO/container, make a request to the *Cleanup TDO* mutation. This mutation uses the *options* parameter with any combination of the values defined below to specify the data to be deleted. Requests that do not specify *options* use the *storage* and *search index* values by default. 

* **storage:** Deletes the TDOs assets from storage, including those used to store engine results. Asset metadata will remain until the TDO/container is deleted.
* **searchIndex:** Deletes all search index data. The TDO and its assets will no longer be accessible through search.
* **engineResults:** Deletes engine results stored on related task objects. Engine results stored as assets will remain unless removed using the *storage* option.

#### Request Payload: Delete TDO Content
```graphql
mutation{
-------request fields-----------
  cleanupTDO {            => The Cleanup TDO mutation type. (required)
    (id: "string",        => The unique ID of the TDO/Container of the content to delete. (required)
    options: [enum, enum] => The type of data to be deleted. (optional)
    )}
-------return fields------------
         id      => The ID of the TDO/Container associated with the deleted content. (required)
         message => A message confirming deletion of the TDO content. (required)
      }
    }
 ```

 #### Sample Request: Delete TDO Content
```graphql
mutation{
  cleanupTDO(id: "44512341", options: [storage, engineResults]) {
      id
      message
      }
    }
```

 #### Sample Response: Delete TDO Content
 ```json
 {
  "data": {
    "cleanupTDO": {
      "id": "44512341",
      "message": "Data deleted from 44512341:  storage,engineResults"
    }
  }
}
```
