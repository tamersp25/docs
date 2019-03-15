# Create a Job with Cognitive Processing Tasks

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
