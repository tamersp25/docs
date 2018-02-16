---
title: Retrieve Job Output
order: 5
---

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
            },
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
