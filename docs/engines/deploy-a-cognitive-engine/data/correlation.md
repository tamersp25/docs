
# Build and Deploy a Correlation Engine

A correlation engine identifies relationships between two objects by comparing fields and finding matches that occur in both datasets. Correlation is characterized by a JSON schema that defines all of the relevant fields to match against. The schema uses time-series fields as primary criteria for analysis and it can also contain custom properties to perform correlation on attributes specific to a user’s needs. Each correlation engine works with a particular schema, which is identified by the schema ID referenced the manifest file. When a correlation engine receives a task to run, it analyzes the input TDO and identifies fields that match the schema, extracts SDO data that conforms to the TDO, correlates the SDO to the TDO, and outputs the common properties as an asset. 

## Correlation Engine Components
| Name | Responsibilities |
| --------- | ------- |
| Schema | A JSON definition file that describes the required and optional fields of a SDO. The schema is used to validate against the data that comes into the system and to define what to write to the search index. |
| Ingestion Adapter | An engine that pulls data from an external data source and saves it to the search index as a SDO through Veritone API. Adapters are used with correlation engines that access SDO content stored in Veritone. |
| External Data API | Third-party API or a data source that an ingestion adapter or correlation engine can retrieve data from. Correlation engines that access data stored outside of Veritone can use external data API to pull in and correlate data. |
| Search API | API used to search the Veritone index for data that has been ingested through an ingestion adapter. This API is built into correlation engines that access SDO content stored in Veritone. |
| Create Asset API | API to output a SDO asset that contains the correlation results. |

## Glossary of Terms
TDO
SDO
Asset

## Correlation Engine Workflow

The basic correlation engine workflow follows the steps outlined below. 

![](correlation-engine-workflow.png)   

#### 1. Input

A task payload with the TDO ID is sent to the engine. 

#### 2. Fetch & Analyze TDO

The engine fetches and analyzes the TDO against the schema for matching fields. 

#### 3. Fetch SDO

Based on the matching TDO attributes, the engine uses one of the following methods to collect relevant SDO data:

* Option 1: Query Veritone’s datastore to search for matching SDO data.

* Option 2: Call external APIs to fetch matching data. 

#### 4. Correlate

SDO data is correlated with the TDO fields.

#### 5. Output

Output the correlation results as a new SDO asset on the original TDO.

## Engine Building Steps
Engine development is divided into a series of steps that are outlined below. Each of the steps is described in more detail later this document. It’s recommended to complete the steps in order, but you can stop at any time and pick up right where you left off whenever you’re ready.

1. [Define your data schema](/engines/deploy-a-cognitive-engine/data/correlation?id=_1-define-your-data-schema)

2. [Register your engine](/engines/deploy-a-cognitive-engine/data/correlation?id=_2-register-your-engine)

3. [Construct your code to process correlation tasks in Veritone](/engines/deploy-a-cognitive-engine/data/correlation?id=_3-construct-your-code-to-process-correlation-tasks)

4. [Configure your engine manifest file](/engines/deploy-a-cognitive-engine/data/correlation?id=_4-configure-your-manifest-file)

5. [Package and upload a build](/engines/deploy-a-cognitive-engine/data/correlation?id=_5-package-and-upload-a-build)

6. [Submit a build for approval](/engines/deploy-a-cognitive-engine/data/correlation?id=_6-submit-your-build-for-approval)

7. [Deploy your engine](/engines/deploy-a-cognitive-engine/data/correlation?id=_7-deploy-your-engine)

## 1. Define Your Data Schema

A correlation engine relies heavily on a schema as a way of evaluating and collecting relevant data to correlate. A schema is a JSON file that lays out all of the elements to match against and specifies whether data will be searchable or displayable in Veritione. Each correlation engine references a specific schema to detect, collect, and correlate relevant data. As part of the engine building process, you’ll create and register a schema that defines the format and content of the data to be analyzed. Once your schema is registered, you’ll plug the ID into your engine’s manifest. 

To create a schema, you’ll use a set of core required properties and then add your own custom properties to the base of information to be evaluated. After your schema is registered, all of your custom fields are automatically mapped to the index and supported by requests made through the Veritone Search API.

### Schema Fields

Your schema should fully describe the fields that you want to correlate. In addition to custom properties, your schema should include the following fields: 

| Field | Field Type | Required | Description | Example |
| ----- | ---------- | -------- | ----------- | ------- |
| $id | string | No | Defines the URI reference to the schema | "$id": "http://example.com/example.json" |
| title | string | Yes | The display name of your schema that will show in the Veritone UI. | "title": "weather conditions" |
| description | string | No | Explains what the schema is about. | "description": "Local weather conditions" |
| type | string | Yes | Indicates the format type of the schema. If omitted, defaults to "object". | "type": "object" |
| required | array | No | Indicates the fields that are required to be present in the structured data. If a required field is not present in a record, that record will not be saved. | "required": \["id", "name"] |
| properties | object | No | A JSON object containing the names and data types of the fields in the structured data set | "properties": {"startDateTime":{"type":"dateTime"},"stopDateTime":{"type":"dateTime"}}|

**Supported Data Types**

| Data Type | Example Values |
| --------- | ------- |
| number | 1, 2.0, 3431455 |
| integer | 1, 4, 34, 32134 |
| boolean | true, false |
| string | "string" |
| array | \["one", "two", "three"]
| object | {"firstName":{"type":"string"},"lastName":{"type":"string"}} |

Within the string type, two specific formats are supported:

| Format | Example |
| ------ | ------- |
| geopoint | "34.052235,-118.243683" |
| datetime | "2018-02-22T01\:00\:00.000Z" |

*Note that datetime is in UTC time and formatted per [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).*

### Sample Schema

'''json
{
    "$id": "http://example.com/example.json",
    "type": "object",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "properties": {
        "humidity": {
            "$id": "/properties/humidity",
            "type": "integer"
        },
        "pressure": {
            "$id": "/properties/pressure",
            "type": "integer"
        },
        "windSpeed": {
            "$id": "/properties/windSpeed",
            "type": "number"
        },
        "visibility": {
            "$id": "/properties/visibility",
            "type": "integer"
        },
        "windDegree": {
            "$id": "/properties/windDegree",
            "type": "number"
        },
        "datetimeEnd": {
            "$id": "/properties/datetimeEnd",
            "type": "dateTime"
        },
        "geoLocation": {
            "$id": "/properties/geoLocation",
            "type": "geoPoint"
        },
        "temperature": {
            "$id": "/properties/temperature",
            "type": "number"
        },
        "locationName": {
            "$id": "/properties/locationName",
            "type": "string",
            "title": "City Name"
        },
        "datetimeStart": {
            "$id": "/properties/datetimeStart",
            "type": "dateTime"
        },
        "temperatureMax": {
            "$id": "/properties/temperatureMax",
            "type": "number"
        },
        "temperatureMin": {
            "$id": "/properties/temperatureMin",
            "type": "number"
        }
    },
    "definitions": {}
}'''


## Create and Register Your Schema

You can create and register your schema using a [JSON Schema Generator](https://jsonschema.net/) or from within the Developer App UI by following the steps listed below.

| To create a Schema  |                                                                  |
| ------------------- | ---------------------------------------------------------------- |
| 1. Log into [Veritone Developer](https://developer.veritone.com). From the **Overview** page, select **Data** from the menu on left hand side or click on **Build a Schema** on the Data Schemas card on the right side. The _Data_ page opens. | <div style="width: 500px">![](1vdahome.png)</div> |
| 2. Click **New** in the upper right of the window. The page opens to _New Data Schema Details_. | <div style="width: 500px">![](2schema_new.png)</div> |
| 3. Enter the following basic details to describe your schema: <br><ul><li>**Data Source**: _(required)_ Enter the source of the data that you're creating the schema for.</li><li>**Schema Name**: _(required)_ Enter a name for the schema.</li><li>**Schema Description**: _(required)_ Describe what your schema covers in a sentence or two. This description will be displayed to users of your schema.</li></ul> 4. Click **Next** to continue. The Create Schema window opens.| <div style="width: 500px">![](3schema_details.png)</div> |
| 5. Write out or copy and paste a Schema with valid JSON formatting. See the section [below](###Requirements-and-Best-Practices-for-Schemas) for more information about how to create a valid schema. <br> 6. Click on **Submit**. If your schema was accepted, you will see a temporary popup message at the bottom of the page that says _Data Schema created successfully!"_ and then the Edit Configuration page appears.| <div style="width: 500px">![](5schema_bday.png)</div> |
| 7. At this point, you can edit the information that you entered earlier about your schema if you like or just click on the X in the upper right to return to the My Schemas page where you can now see your schema is saved as Draft.| <div style="width: 500px">![](7schema_submitted.png)</div> |
| 8. If you are happy with your schema, you can publish it by clicking on the vertical ellipses on the right hand side and selecting **Publish**.| <div style="width: 500px">![](8schema_overflow.png)</div> |
| 9. You will see a popup asking you to confirm that you want to publish the schema. Click **Publish** to confirm.| <div style="width: 500px">![](9schema_publishmodal.png)</div> |
| 10. You'll be returned to the My Schema page where you'll see that your schema now has the status of Published. Now you can now use the schema to ingest structured data.| <div style="width: 500px">![](10schema_publish.png)</div> |

### Schema Modification

While a schema has draft status, you can edit the schema by selecting the Edit option to the right of every row in the My Schemas table. You can edit it as many as you need to while the schema is in Draft status. When you're ready to publish the schema, the status changes to Published and a version is assigned.

If you edit a Published schema, a new entry will be created with a status of Draft. If you attempt to publish this new entry, you will be asked to indicate whether the change should be saved as a minor or a major version. 

Version Type | Definition
------------ | -----------
Minor | Minor versions must be backwards compatible with the prior version and are indicated by incrementing the number to the right of the decimal for the version number. For example, 1.1 and 1.2 are minor versions of 1.0.
Major | Major versions are not backwards compatible with the prior version and are indicated by incrementing the number to the left of the decimal for the version number. For example, 1.0 and 2.0 are major versions.

It's important for Veritone to understand whether each schema edit is a major or minor version so that we can properly store and index any new structured data that conforms to the revised schema. If the schema represents a new major version, then any data ingested against that schema will be stored in a new index, and any users must elect to use that new version as it could be incompatible with any prior usage of the data. If the schema is a new minor version, then any data ingested against that schema will be stored in the same index as the prior version.

**Please note that at this time, Veritone will consider all changes to a published schema to be a major change unless the change consists only of adding new, unrequired fields to the prior version.**

## Register Your Engine

Building an engine in Veritone begins with a few basic steps that define the general details about your technology and give scope to the services it will provide and the internal structures it will support. In this section, you&rsquo;ll learn how to create an engine in the Veritone Developer App &mdash; which serves as a container for your builds. Although an engine consists of some high-level details, it also includes important information about how your software works, including an Engine Category and Deployment Model. Once you&rsquo;ve finished creating your engine, we&rsquo;ll tour you through the different engine states to acquaint you with the workings of the engine lifecycle. Then we&rsquo;ll wrap things up by helping you find your Engine ID &mdash; a number that you&rsquo;ll want to have handy throughout the development process.

### Enter Basic Engine Details

When creating your engine, it's important to provide details that accurately and describe your engine. The information you enter is what users will see in the Veritone UI when they are selecting engines for processing.

| To create an Engine    |    |
| ---------------------- | -- |
| 1. Log into [Veritone Developer](https://developer.veritone.com). Click **Overview** in the upper left of the window and select **Engines** from the dropdown. The _Engines_ page opens. | <div style="width: 500px">![](VDA-Navigate-to-Engines.png)</div> |
| 2. Click **New Engine** in the upper right of the window. The new engine page opens to _Basic Engine Details_. | <div style="width: 500px">![](VDA-Create-Engine-1.png)</div>  |
| 3. Enter the following basic details to describe your engine: <br><ul><li>**Engine Name**: _(required)_ Enter the name of your engine as you would like it to appear to users.</li><li>**Engine Category**: _(required)_ Select the engine category from the drop-down that matches the type of service your engine will provide. (See [Engine Classes](engines/classes/) for more information.)</li><li>**Engine Description**: _(required)_ Describe what your engine does in a few sentences. This description displays to users in the engine selection table when hovering over your logo.</li><li>**Icon**: _(optional)_ Upload an icon for your engine from your local file system as a 128x128 png or jpg file. </li><li>**Logo**: _(required)_ Upload a logo image for your engine from your local file system as a 500x250 png or jpg file. The logo is used to identify your engine in the engine selection table of CMS. It's important to note that the logo is the only identifier users will see &mdash; your engine name will not display. To ensure your engine is easily identified, it's recommended to incorporate the engine name into your logo image.</li></ul> 4. Click **Next** to continue. The _Select your deployment model_ window opens. | <div style="width: 500px">![](VDA-Create-Engine-2.png)</div>     |

### Choose a Deployment Model

The deployment model indicates what type of network access your engine requires, after being installed by Veritone, which may affect whether your engine is eligible to run in private and secure servers. You must choose the deployment model that best represents your engine from the following four options:

* **Network Isolated**: The engine is fully isolated and runs solely within Veritone's infrastructure. It does not require network access.
* **External Access**: The engine performs processing within its container and does not send user data off the container. It requires internet access for tasks such as license checks and database updates.
* **External Processing**: The engine performs some or all of its processing outside of Veritone's infrastructure. User data is sent off the container to outside services for processing.
* **Human Review**: Some or all of the engine&rsquo;s processing is performed by humans outside of Veritone's infrastructure. (e.g., A human labeling service would fall into this category.)

Although the deployment model is set at the engine level, it&rsquo;s applied to a build at the time it&rsquo;s uploaded. For engines with multiple builds, the selected deployment model applies to each build and cannot be changed. If your engine can be deployed across multiple network access levels and you would like to assign it more than one deployment model, you'll want to create a separate engine container for each individual deployment model.

It&rsquo;s important to choose the deployment model best suited to the needs of your engine. When a build is uploaded, testing is performed to ensure that the build operates in accordance with the designated deployment model. If any discrepancies are detected, the build will not pass the testing. (e.g., A build with a network isolated deployment model that makes calls out to an external API will not pass.)

_Additional Notes About Deployment Models:_

* Engines that are exclusively public may have limited usage opportunities due to unsecured API.
* While many Veritone clients prefer our cloud-based software deployment, others require a network-isolated instance of the Veritone Platform due to regulation or security requirements.

| **To choose a deployment model** |     |
|--------------------------------- | --- |
| 1. Click a **deployment model option** to select it. The selected model&rsquo;s checkbox is enabled. </br> 2. Click **Submit** to save and create your engine. The new engine is created and displays under the _Engines List_ in the _Pending_ state. | <div style="width: 500px">![](VDA-Create-Engine-3.png)</div> |

### Engine States

The engine state allows you easily identify and track an engine&rsquo;s progression and regression through the workflow cycle. Veritone uses four different engine states to capture the most relevant aspects of an engine&rsquo;s lifecycle and operation.

Three engine states apply to workflow stages. They&rsquo;re automatically set by the system and transition from one to the next when certain functions are carried out. When an engine is newly created, it automatically enters the Pending state. From there, it progresses to Ready when a build is approved, and then Active when the engine is live in the Veritone Platform. The fourth state allows you to manually Disable an engine and stop it from processing new tasks. For added flexibility, each engine state offers optional actions that help you manage the engine&rsquo;s settings and operations.

The table below specifies the valid states, transitions, reasons for the transitions, and optional actions that can be performed for each.

|**Engine State**|**Description**|**Available Actions**|
|----------------|---------------|---------------------|
|**Pending**|The _Pending_ state is system-triggered and takes effect when the engine has been created but it does not have any _Approved_ builds.|Edit, Disable, Delete|
|**Ready**|The _Ready_ state is system-triggered and takes effect when an engine has at least one Approved build, but no builds that are deployed. |Edit, Disable, Delete|
|**Active**|The _Active_ state is system-triggered and takes effect when a build is deployed.|Edit, Disable, Delete|
|**Disabled**|The _Disabled_ state is user-enabled. Disabling an engine prevents it from running and processing new jobs. Any jobs that are in progress when the engine is disabled will finish processing. In addition, the _Deploy_ option will be removed _Approved_ builds . An engine can only be set to _Disable_ from the _Ready_ or _Active_ states.|Enable|

### Find Your Engine ID

When an engine is created, it&rsquo;s assigned a unique ID number. This ID will be used to identify your engine in various places throughout the development process, including uploading your build(s).

|**To locate an Engine ID**|   |
|--------------------------|---|
|Navigate to the _Engines_ page in Veritone Developer and click the desired **engine** in the list. The _Engine Details_ page opens to the _Builds_ tab.The _Engine ID_ is located under the engine name near the top of the window.|<div style="width: 500px">![](VDA-Find-Engine-ID.png)</div>|

## 3. Construct Your Code to Process Correlation Tasks

Engines in Veritone are purpose built to process tasks. When constructing your code, you’ll include elements that enable your engine to perform a logical sequence of task processing actions, including fetching the input, retrieving a media asset, processing the data, outputting the results to an asset, and sending insights back to Veritone. 

### Batch Operation

Correlation engines run in batch mode, where data is processed serially in discrete quantities. This mode works by processing the contents of a particular batch before moving on to the next. Your engine will process and complete an entire task in one invocation as described in the steps below.

1. The Docker container for your engine will be started up with the environment variables set.

2. The engine will receive a payload with information about where to retrieve the input data from the GraphQL API.

3. The engine will process the payload, update the task status, create any updated assets, and exit.

### Data Residency 

Correlation engines share a common setup to perform task processing, however, based on where the SDO data lives, you’ll choose one of two options to set up your engine to fetch SDO content. 

* **Option 1 — Data Residing Externally:** Data that lives in an external source can be ingested directly as an SDO and correlated to a TDO in real time. This option uses third-party APIs to pull in data that conforms to your schema and then automatically performs correlation upon ingestion. For organizations with different security requirements, this option offers the flexibility to store data in their own secure environment. It also works well when accessing pre-existing datasets that are too large to conveniently pull down into Vertione.

* **Option 2 — Data Residing in Veritone:** If your engine will be accessing data that’s stored in Veritone, your engine can query the search index for SDO data to correlate against the TDO. With this option, you’ll either use Veritone APIs or create an adapter to pull in data from an external source and save it to the index as a SDO. 	 	

Each step in the task flow must be built into your code. Detailed information for adding the task processing flow to your code for both of the above options is provided in the Engine Construction Guidelines sections that follow. Click the link below for the option you’ll be using to get started.

* [Engine Construction Guidelines (Option 1: Ingest data and do not store in Veritone)](/engines/deploy-a-cognitive-engine/data/correlation?id=ingest-data-and-do-not-store-in-vertione)

* [Engine Construction Guidelines (Option 2: Ingest, store, and access data from within Veritione)](/engines/deploy-a-cognitive-engine/data/correlation?id=ingest-store-and-access-data-in-vertione)

## Engine Construction Guidelines (Option 2: Ingest, Store, and Access Data in Veritione) 

This section covers everything you need to properly construct your code for correlation task processing. We’ll walk you through the entire task workflow in detail and specify behaviors and API calls required for your engine to successfully operate in the Veritone platform.

When constructing your engine code to perform task processing functions, you’ll complete the following actions.

1. Receive the Task Payload
2. Set Task Status to Running
3. Get the Recording Container/TDO
4. Process the Task
5. Generate Output and Upload New Asset
6. Reporting Task Failure


### 1. Receive the Task Payload

When an engine gets a task to run, a payload with arguments specific to the task and references to media assets is passed as a JSON file. In order for your engine to accept and execute on the task sent from Veritone, your code must support the fields specified in the payload. The task payload is accessed through the PAYLOAD_FILE environment variable.

_Best Practice Tip_: For local development, it&rsquo;s recommended to support accepting the payload file location through a command line variable.

**Task Payload Attributes**

| Field              | Type   | Description                                                                                                                                                                                  |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applicationId      | string | The application ID associated with the task.                                                                                                                                                 |
| jobId              | string | The unique ID of the job associated with the task.                                                                                                                                           |
| recordingId        | string | The unique ID of the recording container that holds assets associated with the task.                                                                                                         |
| taskId             | string | The unique ID associated with the task.                                                                                                                                                      |
| token              | string | A single-use token provided to the engine to access the recording container. All engine requests to the Veritone API must use this token.                                                    |
| veritoneApiBaseUrl | string | The base URL for making API requests in Veritone. Use the base URL to construct the GraphQL endpoint for your requests. (e.g., graphqlEndpoint = payload.veritoneApiBaseUrl + "/v3/graphql") |

*Note:* We reserve the right to add additional properties to the payload. Any additional properties in the payload are considered undocumented and unreliable.

<br>

### 2. Set the Task Status to Running

Once you have the Task Payload, call the _Update Task_ mutation and provide the Task ID and Job ID to set the task status to _running_.

#### Request Payload: Set Task Status to Running

```graphql
mutation {
-----------request fields-----------
  updateTask(
    input: {           => The mutation type and input variable. (required)
      id: "string"     => The Task ID received in the Task Payload. (required)
      status: enum     => The status of the task. Set the value to running (without quotes). (required)
      jobId: "string"  => The Job ID received in the task payload. (required)
    }
  ) {
-----------return fields-----------
    id      => The unique ID associated with the task. (required)
    status  => The current status of the task. (required)
  }
}
```

#### Sample Request: Set Task Status to Running

```graphql
mutation {
  updateTask(
    input: {
      id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
      jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
      status: running
    }
  ) {
    id
    status
  }
}
```
#### Sample Response: Set Task Status to Running

```json
{
  "data": {
    "updateTask": {
      "id":
        "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "running"
    }
  }
}
```

<br>

### 3. Get the Recording Container/TDO

When the task status is set to _running_, make a request to the _Temporal Data Object_ query with the Recording ID received in the task payload to retrieve the recording container. Your engine will later download one of the assets in the recording container and use it as the base definition file for processing the task. When structuring your query to retrieve the recording container, there are a few core fields you&rsquo;ll want to specify in the request. Additional fields may also be required based on your engine&rsquo;s class. The query fields that apply to most engines are described in the request payload shown below and in the sample requests. A list of all possible request fields can be found in the [Temporal Data Object](https://api.veritone.com/v3/graphqldocs/temporaldataobject.doc.html) schema definition of our GraphQL docs.

#### Request Payload: Get Recording Container/TDO

```graphql
query {
-----------request fields-----------
  temporalDataObject    => The query operation to retrieve a recording container object. (required)
  (id: string) {        => The Recording ID received in the Task Payload. (required)
    (type: ["string"]){ => A label that classifies an asset, such as “transcript,” “media,” or “text.” The type field can be added as a filter to return a list of assets that match the given value. If the “type" filter is used in the request, a value must be specified. (optional)                       
                          
-----------return fields-----------
    records {           => The records object parameter used to access individual asset data. (required)
      id                => The unique ID associated with an asset. (required)
      contentType       => The asset’s MIME type (e.g., audio/mp3). (required)
      type              => A label that classifies an asset. The type field is helpful in determining whether your engine is able to use an asset for processing. Common types are include “media” (audio/video), “transcript” (TTML format), and “v-vlf” (Veritone Lattice Format). (optional)
      signedUri         => The secure URI of an asset. The signed URI value is used to download an asset for processing by your engine. (required)
      createdDateTime   => The date and time (in ISO8601 format) that an asset was created. (required)
    }
  }
}
```

#### Sample Request: Get Recording Container/TDO

```graphql
query {
  temporalDataObject(id: "38828568") {
    assets(type: "media") {
      records {
        id
        contentType
        type
        signedUri
        createdDateTime
      }
    }
  }
}
```

#### Sample Response: Get Recording Container/TDO
```json
{
  "id": "57794937",
  "startDateTime": "2018-02-21T22:00:00.000Z",
  "stopDateTime": "2018-02-21T22:05:00.000Z",
  "data": {
    "status": "recorded",
    "security": {
      "global": true
    },
    "programId": "34045",
    "mediaAsset": {
      "assetId": "57794937.media"
    },
    "recordingId": "57794937",
    "stopDateTime": 1519250700,
    "applicationId": "a03abecc-b0f9-45d6-b54a-bc1bbb4d6df8",
    "mediaSourceId": "40701",
    "startDateTime": 1519250400,
    "createdDateTime": 1519251002,
    "modifiedDateTime": 1519251002
  },
  "details": {
    "veritoneProgram": {
      "programId": "34045",
      "programName": "WABC-TV - Afternoon Programming - MSu 4p630p",
      "programImage": "https://s3.amazonaws.com/prod-veritone-ugc/programs/34045/HR9TbrOWSKanXzay2ilc_wabc_icon.png",
      "programLiveImage": "https://s3.amazonaws.com/prod-veritone-ugc/programs/34045/Cmzw0I5ITKS2L3TGOYIk_wabc_icon.png",
      "primaryMediaSourceId": "40701"
    },
    "veritonePermissions": {
      "acls": [
        {
          "groupId": "196acb8d-cea6-4f96-905a-983eb3c3c138",
          "permission": "owner"
        }
      ]
    },
    "veritoneMediaSource": {
      "mediaSourceId": "40701",
      "mediaSourceName": "WABC-TV",
      "mediaSourceTypeId": "2"
    },
    "veritoneFile": {
      "size": 0,
      "filename": "WABC-TV-AfternoonProgramming-MSu4p630p_20180221_2200",
      "mimetype": "video/mp4"
    },
    "filename": "WABC-TV-AfternoonProgramming-MSu4p630p_20180221_2200"
  }
}
```

<br>

### 4. Process the Task
Find attributes in the TDO that match your schema and call external APIs to pull in relevant data. After retrieving the external data, execute your engine's core code to process the task and correlate the data.

<br>

### 5. Generate Output and Upload New Asset
When task processing is complete, your engine will write an output summary of the analysis as a JSON file and upload it to Veritone as a new asset. To generate an output file, use the data structure described in the table below and save the document with the extension .json.

#### Output Data Structure Model


#### Sample Correlation Engine Output

<br>

Once your output file is created, upload it to Veritone, create a new asset, and set the task status to complete using the *Upload Engine Result* mutation. If your engine outputted to multiple files, make individual calls to create a separate asset for each file. 

*Upload Engine Result* mutation requests are submitted as multipart form post. This type of request is structured in two parts: the form-data that specifies the file information and a query containing details about the asset to create. Specify *multipart/form-data* as the *Content-Type* header and use the *file* and *filename* parameters to send the file contents in the request. 

*Note:* GraphiQL does not currently support multipart form requests, so a different HTTP client must be used to make sample requests to the *Upload Engine Result* mutation.

#### Upload Engine Result Request Payload

```bash
-H 'content-type: => A header that specifies the content type. Enter multipart/form-data as the value. (required)
-F filename        => The name of the file to upload. The value must match the name of the saved file. (required)
-F file            => The path of the file to upload. (required)
-F 'query=mutation {
-----------request fields-----------
    uploadEngineResult(input :{ => The Upload Engine Result mutation type and input variable. (required)
      taskId: "string"          => The Task ID received in the Task Payload. (required)
      contentType: "string"     => The MIME type of the asset (e.g., audio/mp3). (required)
      completeTask: Boolean     => A Boolean that marks the task as complete when set to true. Important Note: If you’re creating multiple assets for a task, only set the value to true in the final request. Otherwise, the task status will be marked as complete and additional requests made with the Task ID will result in an error. (required)
  }){
-----------return fields-----------
    id        => The unique ID of the new asset. (required)
    type      => A label that classifies an asset. The returned value reflects the request input value. (required)
    signedUri => The secure URI of the new asset. (required)
  }
}
```

#### Sample Request: Upload Engine Result

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e33029893e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'query=mutation {
          uploadEngineResult(
            input: {
                taskId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
                contentType: "application/ttml+xml",
                assetType: "transcript",
                completeTask: true
          }) {
            id
            type
            signedUri
          }
        }' \
  -F filename=your-filename.ttml \
  -F file=@/Users/bobjones/Downloads/your-filename.ttml
```

#### Sample Response: Upload Engine Result

```json
{
  "data": {
    "createAsset": {
      "id": "f2f31230-d4f4-463e-bf3f-a6eb32bb5c80",
      "type": "transcript",
      "signedUri":
        "https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba087a582.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171122T175331Z&X-Amz-Expires=604800&X-Amz-Signature=e46a0c239c1f4bd66358313bfcb221a9c7543546135f03c8fe3a0540e77b0a3e&X-Amz-SignedHeaders=host"
    }
  }
}
```

<br>

## 6. Reporting Task Failure

If an error occurs during processing or if your engine does not support the task content type, mark the task status as _failed_ by calling the _Update Task_ mutation. The _output_ parameter should be included in your request and specify a JSON object with the _error_ field to indicate the reason for the task failure. When a task fails, no further engine processing should occur.

#### Request Payload: Set Task Status to Failed

```graphql
mutation {
-----------request fields-----------
  updateTask(input :{       => The Update Task mutation type and input variable. (required)
    id: "string"            => The Task ID received in the Task Payload. (required)
    jobId: "string"         => The Job ID received in the Task Payload. (required)
    status: enum            => The status of the task. Set the value to failed (without quotes). (required)
    output:{error: "string" => A JSON object containing the error field with a free-text value describing the reason for the task failure. (recommended)
  }){
-----------return fields-----------
    id     => The unique ID associated with the task. (required)
    status => The current status of the task. (required)
    output => The error message value entered in the output parameter of the request. (required)
  }
}
```

#### Sample Request: Set Task Status to Failed

```graphql
mutation {
  updateTask(
    input: {
      id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
      jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
      status: failed
      output: { error: "Invalid file type" }
    }
  ) {
    id
    status
    output
  }
}
```

#### Sample Response: Set Task Status to Failed

```json
{
  "data": {
    "updateTask": {
      "id": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "failed”,
      "output": {
        "error": "Invalid file type"
      }
    }
  }
}
```

<br>

## Engine Construction Guidelines (Option 2: Ingest, Store, and Access Data in Veritione) 

This section covers everything you need to properly construct your code for correlation task processing. We’ll walk you through the entire task workflow in detail and specify behaviors and API calls required for your engine to successfully operate in the Veritone platform.

When constructing your engine code to perform task processing functions, you’ll complete the following actions.

1. Ingest and Store Data in Veritone
2. Receive the Task Payload
3. Set Task Status to Running
4. Get the Recording Container/TDO
5. Process the Task
6. Generate Output and Upload New Asset
7. Reporting Task Failure

### 1. Ingest and Store Data in Veritone

Make a call to the create structured data mutation to ingest data and store it in Veritone as a SDO. Alternatively, you can [create an Adapter](https://docs.veritone.com/#/adapters/guidelines) to bring in data from an external source.

#### Request Payload: Create Structured Data**
```graphql
mutation {
  CreateStructuredData(
    input: {
      schemaId: The UUID of the schema used to validate this object.
      id: ID
      data: JSONData
      dataString: String
    }
  ) {
    ?
    ?
  }
}
```

#### Sample Request: Create Structured Data**

#### Sample Response: Create Structured Data**

<br>

### 2. Receive the Task Payload

When an engine gets a task to run, a payload with arguments specific to the task and references to media assets is passed as a JSON file. In order for your engine to accept and execute on the task sent from Veritone, your code must support the fields specified in the payload. The task payload is accessed through the PAYLOAD_FILE environment variable.

_Best Practice Tip_: For local development, it&rsquo;s recommended to support accepting the payload file location through a command line variable.

**Task Payload Attributes**

| Field              | Type   | Description                                                                                                                                                                                  |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| applicationId      | string | The application ID associated with the task.                                                                                                                                                 |
| jobId              | string | The unique ID of the job associated with the task.                                                                                                                                           |
| recordingId        | string | The unique ID of the recording container that holds assets associated with the task.                                                                                                         |
| taskId             | string | The unique ID associated with the task.                                                                                                                                                      |
| token              | string | A single-use token provided to the engine to access the recording container. All engine requests to the Veritone API must use this token.                                                    |
| veritoneApiBaseUrl | string | The base URL for making API requests in Veritone. Use the base URL to construct the GraphQL endpoint for your requests. (e.g., graphqlEndpoint = payload.veritoneApiBaseUrl + "/v3/graphql") |

*Note:* We reserve the right to add additional properties to the payload. Any additional properties in the payload are considered undocumented and unreliable.

<br>

### 3. Set the Task Status to Running

Once you have the Task Payload, call the _Update Task_ mutation and provide the Task ID and Job ID to set the task status to _running_.

#### Request Payload: Set Task Status to Running

```graphql
mutation {
-----------request fields-----------
  updateTask(
    input: {           => The mutation type and input variable. (required)
      id: "string"     => The Task ID received in the Task Payload. (required)
      status: enum     => The status of the task. Set the value to running (without quotes). (required)
      jobId: "string"  => The Job ID received in the task payload. (required)
    }
  ) {
-----------return fields-----------
    id      => The unique ID associated with the task. (required)
    status  => The current status of the task. (required)
  }
}
```

#### Sample Request: Set Task Status to Running

```graphql
mutation {
  updateTask(
    input: {
      id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
      jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
      status: running
    }
  ) {
    id
    status
  }
}
```
#### Sample Response: Set Task Status to Running

```json
{
  "data": {
    "updateTask": {
      "id":
        "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "running"
    }
  }
}
```

<br>

### 4. Get the Recording Container/TDO

When the task status is set to _running_, make a request to the _Temporal Data Object_ query with the Recording ID received in the task payload to retrieve the recording container. Your engine will later download one of the assets in the recording container and use it as the base definition file for processing the task. When structuring your query to retrieve the recording container, there are a few core fields you&rsquo;ll want to specify in the request. Additional fields may also be required based on your engine&rsquo;s class. The query fields that apply to most engines are described in the request payload shown below and in the sample requests. A list of all possible request fields can be found in the [Temporal Data Object](https://api.veritone.com/v3/graphqldocs/temporaldataobject.doc.html) schema definition of our GraphQL docs.

#### Request Payload: Get Recording Container/TDO

```graphql
query {
-----------request fields-----------
  temporalDataObject    => The query operation to retrieve a recording container object. (required)
  (id: string) {        => The Recording ID received in the Task Payload. (required)
    (type: ["string"]){ => A label that classifies an asset, such as “transcript,” “media,” or “text.” The type field can be added as a filter to return a list of assets that match the given value. If the “type" filter is used in the request, a value must be specified. (optional)                       
                          
-----------return fields-----------
    records {           => The records object parameter used to access individual asset data. (required)
      id                => The unique ID associated with an asset. (required)
      contentType       => The asset’s MIME type (e.g., audio/mp3). (required)
      type              => A label that classifies an asset. The type field is helpful in determining whether your engine is able to use an asset for processing. Common types are include “media” (audio/video), “transcript” (TTML format), and “v-vlf” (Veritone Lattice Format). (optional)
      signedUri         => The secure URI of an asset. The signed URI value is used to download an asset for processing by your engine. (required)
      createdDateTime   => The date and time (in ISO8601 format) that an asset was created. (required)
    }
  }
}
```

#### Sample Request: Get Recording Container/TDO

```graphql
query {
  temporalDataObject(id: "38828568") {
    assets(type: "media") {
      records {
        id
        contentType
        type
        signedUri
        createdDateTime
      }
    }
  }
}
```

#### Sample Response: Get Recording Container/TDO
```json
{
  "id": "57794937",
  "startDateTime": "2018-02-21T22:00:00.000Z",
  "stopDateTime": "2018-02-21T22:05:00.000Z",
  "data": {
    "status": "recorded",
    "security": {
      "global": true
    },
    "programId": "34045",
    "mediaAsset": {
      "assetId": "57794937.media"
    },
    "recordingId": "57794937",
    "stopDateTime": 1519250700,
    "applicationId": "a03abecc-b0f9-45d6-b54a-bc1bbb4d6df8",
    "mediaSourceId": "40701",
    "startDateTime": 1519250400,
    "createdDateTime": 1519251002,
    "modifiedDateTime": 1519251002
  },
  "details": {
    "veritoneProgram": {
      "programId": "34045",
      "programName": "WABC-TV - Afternoon Programming - MSu 4p630p",
      "programImage": "https://s3.amazonaws.com/prod-veritone-ugc/programs/34045/HR9TbrOWSKanXzay2ilc_wabc_icon.png",
      "programLiveImage": "https://s3.amazonaws.com/prod-veritone-ugc/programs/34045/Cmzw0I5ITKS2L3TGOYIk_wabc_icon.png",
      "primaryMediaSourceId": "40701"
    },
    "veritonePermissions": {
      "acls": [
        {
          "groupId": "196acb8d-cea6-4f96-905a-983eb3c3c138",
          "permission": "owner"
        }
      ]
    },
    "veritoneMediaSource": {
      "mediaSourceId": "40701",
      "mediaSourceName": "WABC-TV",
      "mediaSourceTypeId": "2"
    },
    "veritoneFile": {
      "size": 0,
      "filename": "WABC-TV-AfternoonProgramming-MSu4p630p_20180221_2200",
      "mimetype": "video/mp4"
    },
    "filename": "WABC-TV-AfternoonProgramming-MSu4p630p_20180221_2200"
  }
}
```

<br>

### 5. Process the Task
Find attributes in the TDO that match your schema (startDateTime, stopDateTime) and search the structured datastore for matching SDO records.

#### Sample Search Query Template
```graphql
{
  "query": "{  
    search: searchMedia(search:  {query: 
      {operator: "and", 
        conditions: [
        {operator: "term", field: "locationName",
          value: "${mediaSource.details.location}"}, 
        {operator: "range", field: "datetimeStart", 
          lte: "${recording.startDateTime}"},
        {operator: "range", field: "datetimeEnd", 
          gte: "${recording.startDateTime}"}]}, 
        limit: 1, 
        index: ["mine"], 
        type: "${schemaId}", offset: 0})
    {structuredData: jsondata}}"
}
```

#### Sample Search Query

The sample query below will search the private media index (mine) for the TDO fields matching the schema (type) that were returned in Step 4 (locationName, datetimeStart, datetimeEnd). In addition, values shown in the example search query template will be resolved as follows: 

| Template Value | Resolved Value |
| --------- | ------- |
| ${recording.startDateTime} | 2018-02-21T22:00:00.000Z |
| ${mediaSource.details.location} | Los Angeles |
| ${schemaId} | 8a8bbd66-d160-480e-b3fb-7a935ac4e8dd |

```graphql
{
  "query": "{  
    search: searchMedia(search:  {query: 
      {operator: "and", 
        conditions: [
        {operator: "term", field: "locationName",
          value: "Los Angeles"}, 
        {operator: "range", field: "datetimeStart", 
          lte: "2018-02-21T22:00:00.000Z"},
        {operator: "range", field: "datetimeEnd", 
          gte: "2018-02-21T22:00:00.000Z"}]}, 
        limit: 1, 
        index: ["mine"], 
        type: "8a8bbd66-d160-480e-b3fb-7a935ac4e8dd", offset: 0})
    {structuredData: jsondata}}"
}
```

#### Sample Search Query Response
A hit to the query will return a result similar to the following SDO. This SDO contains key/value matches to each of the fields in the request. 
```json
{
    _vtn: {
        "structuredDataId": "85db55b9-33e0-46ca-b7b0-39a6feeff5ec"
    },
    "series": [
        {
            "geoLocation": "‎34.024212,‎-118.496475",
            "temperature": 53.71,
            "pressure": 1016,
            "humidity": 58,
            "temperatureMin": 50,
            "temperatureMax": 55.4,
            "visibility": 16093,
            "windSpeed": 2.26,
            "windDegree": 222.002,
            "datetimeStart": "2018-02-22T02:00:00.000Z",
            "datetimeEnd": "2018-02-22T03:00:00.000Z",
            "locationName": "Los Angeles"
        }
    ]
}
```

<br>

After retrieving the SDO data, execute your engine's core code to process the task and correlate the data.

<br>

### 6. Generate Output and Upload New Asset
When task processing is complete, your engine will write an output summary of the analysis as a JSON file and upload it to Veritone as a new asset. To generate an output file, use the data structure described in the table below and save the document with the extension .json.

#### Output Data Structure Model


#### Sample Correlation Engine Output

<br>

Once your output file is created, upload it to Veritone, create a new asset, and set the task status to complete using the *Upload Engine Result* mutation. If your engine outputted to multiple files, make individual calls to create a separate asset for each file. 

*Upload Engine Result* mutation requests are submitted as multipart form post. This type of request is structured in two parts: the form-data that specifies the file information and a query containing details about the asset to create. Specify *multipart/form-data* as the *Content-Type* header and use the *file* and *filename* parameters to send the file contents in the request. 

*Note:* GraphiQL does not currently support multipart form requests, so a different HTTP client must be used to make sample requests to the *Upload Engine Result* mutation.

#### Upload Engine Result Request Payload

```bash
-H 'content-type: => A header that specifies the content type. Enter multipart/form-data as the value. (required)
-F filename        => The name of the file to upload. The value must match the name of the saved file. (required)
-F file            => The path of the file to upload. (required)
-F 'query=mutation {
-----------request fields-----------
    uploadEngineResult(input :{ => The Upload Engine Result mutation type and input variable. (required)
      taskId: "string"          => The Task ID received in the Task Payload. (required)
      contentType: "string"     => The MIME type of the asset (e.g., audio/mp3). (required)
      completeTask: Boolean     => A Boolean that marks the task as complete when set to true. Important Note: If you’re creating multiple assets for a task, only set the value to true in the final request. Otherwise, the task status will be marked as complete and additional requests made with the Task ID will result in an error. (required)
  }){
-----------return fields-----------
    id        => The unique ID of the new asset. (required)
    type      => A label that classifies an asset. The returned value reflects the request input value. (required)
    signedUri => The secure URI of the new asset. (required)
  }
}
```

#### Sample Request: Upload Engine Result

```bash
curl -X POST \
  https://api.veritone.com/v3/graphql \
  -H 'authorization: Bearer 31rzg6:2e33029893e64732b4c48f202234394328abcf72d50e4981b8043a19e8d9baac' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F 'query=mutation {
          uploadEngineResult(
            input: {
                taskId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
                contentType: "application/ttml+xml",
                assetType: "transcript",
                completeTask: true
          }) {
            id
            type
            signedUri
          }
        }' \
  -F filename=your-filename.ttml \
  -F file=@/Users/bobjones/Downloads/your-filename.ttml
```

#### Sample Response: Upload Engine Result

```json
{
  "data": {
    "createAsset": {
      "id": "f2f31230-d4f4-463e-bf3f-a6eb32bb5c80",
      "type": "transcript",
      "signedUri":
        "https://inspirent.s3.amazonaws.com/assets/38828568/0a632ae6-3bf6-4886-b64d-9a8ba087a582.ttml?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAI7L6G7PCOOOLA7MQ%2F20171122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20171122T175331Z&X-Amz-Expires=604800&X-Amz-Signature=e46a0c239c1f4bd66358313bfcb221a9c7543546135f03c8fe3a0540e77b0a3e&X-Amz-SignedHeaders=host"
    }
  }
}
```

<br>

## 7. Reporting Task Failure

If an error occurs during processing or if your engine does not support the task content type, mark the task status as _failed_ by calling the _Update Task_ mutation. The _output_ parameter should be included in your request and specify a JSON object with the _error_ field to indicate the reason for the task failure. When a task fails, no further engine processing should occur.

#### Request Payload: Set Task Status to Failed

```graphql
mutation {
-----------request fields-----------
  updateTask(input :{       => The Update Task mutation type and input variable. (required)
    id: "string"            => The Task ID received in the Task Payload. (required)
    jobId: "string"         => The Job ID received in the Task Payload. (required)
    status: enum            => The status of the task. Set the value to failed (without quotes). (required)
    output:{error: "string" => A JSON object containing the error field with a free-text value describing the reason for the task failure. (recommended)
  }){
-----------return fields-----------
    id     => The unique ID associated with the task. (required)
    status => The current status of the task. (required)
    output => The error message value entered in the output parameter of the request. (required)
  }
}
```

#### Sample Request: Set Task Status to Failed

```graphql
mutation {
  updateTask(
    input: {
      id: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180"
      jobId: "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49"
      status: failed
      output: { error: "Invalid file type" }
    }
  ) {
    id
    status
    output
  }
}
```

#### Sample Response: Set Task Status to Failed

```json
{
  "data": {
    "updateTask": {
      "id": "5fa1b7d7-db54-4c8e-8f1f-6cb8029e2e49-8d70f376-377c-499e-adf4-e85ab70b4180",
      "status": "failed”,
      "output": {
        "error": "Invalid file type"
      }
    }
  }
}
```

<br>

## Configure Your Engine Manifest File

Every container uploaded to Veritone for an engine must include a manifest.json file, which contains important information about your engine and build. Veritone relies on the information in the manifest to correctly operate the engine on our platform, so please be as accurate and comprehensive as you can. 
#### Format
Manifest files should be written in JSON format. We expect the manifest to be stored in your container as /var/manifest.json - this should be done in your Dockerfile.
#### Fields
The fields that should be included in your manifest file are listed in the table below. Please include all fields indicated as being required. If fields are missing, the default values may be assumed or your container may be invalidated. Fields that are not marked as being required are optional; they should be included in the manifest file if you have any values to declare but may be omitted if you don't.

| Field   | Format | Required for Cognitive Engines | Required for Adapters | Description  | Example |
| ------- | ------ | -------------------------------| --------------------- | ------------ | ------- |
| engineId              | string           | Yes      | Yes | The ID of your engine. You can find your engine ID at the top of the Engines section pages in the Developer Portal.  | "engineId": "f06e3ecb-cb30-3d0f-3268-c08428dc72be"   |
| category              | string           | Yes      | Yes | The category of the engine that you are providing. The available options for cognitive engines are listed [below](engines/manifest?id=available-categories-for-cognitive-engines). For adapters, the options are "pull" or "push".  | "category": "transcription" OR "category": "pull" |
| preferredInputFormat  | string           | Yes      | Yes | The MIME type of the input media format that is preferred by your engine. Choose one format only. The options that Veritone currently support are listed [below](engines/manifest?id=mimetypes).                         | "preferredInputFormat": "audio/wav" |
| outputFormats         | array of strings | Yes      | Yes | List of the MIME types of the media formats that your engine will output. The options that Veritone currently supports are listed [below](engines/manifest?id=mimetypes). | "outputFormats": ["application/ttml+xml", "audio/wav"] |
| clusterSize           | string           | Yes      | Yes | The cluster size on which your engine should run: small, medium, large, which are defined [below](engines/manifest?id=available-cluster-sizes).  | "clusterSize": "small" |
| supportedInputFormats | array of strings | Yes      | Yes | List of the MIME types of the input media formats that your engine can support. Include your preferred Input format here as well. The options that Veritone currently support are listed [below](engines/manifest?id=mimetypes).| "supportedInputFormats": ["audio/wav", "audio/mpeg", "audio/flac", "video/mp4", "application/json"] |
| initialConcurrency    | integer          | No       | No | The initial number of instances of your engine that can run at the same time. If omitted, we will use a value of 50. | "initialConcurrency": 50 |
| maxConcurrency        | integer          | No       | No | The maximum number of instances of your engine that can run at the same time. If omitted, we will use a value of 50. | "maxConcurrency": 50  |
| url                   | string           | No       | No |The URL of the website where the user can get more information about your engine. | "url": "[https://www.veritone.com/wp/cognitive-engines/transcription-engine/](https://www.veritone.com/wp/cognitive-engines/transcription-engine/)" |
| externalCalls         | array of strings | No       | No | The domains of any external calls that are required by your code. This should include all calls that require internet access. | "externalCalls": ["[http://s3.amazonaws.com](http://s3.amazonaws.com)", "[http://github.com](http://github.com)"] |
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
| serverCountry | string | No | No | Indicate the ISO codes of the country where the server is located if the engine makes external calls. | "serverCountry": "US"|
| releaseNotes          | string           | No       | No | Tell users what has changed in this version of your code base. Enter unformatted, plain text in this field only.  | "releaseNotes": "This version integrates a new algorithm that is better at detecting accented speech, specifically targeting Southern US accents. In addition to the improved accuracy, the algorithm runs 20% faster now. The version also fixes some minor bugs with dictionary files and permissions." |

### Sample Correlation Manifest


<br>

## 5. Package and Upload a Build

When your engine container is created, your manifest file is built, and your code is set, it's time to upload a build. A build is uploaded as a Docker image, which is a package that includes everything needed to run your software, including the code, libraries, environment variables, config files, and manifest file. Once your build is uploaded, Veritone will run it through compliance testing to ensure it's ready for prime time. Based on the results of the testing, your build will reflect a status that lets you know how to proceed.

In this section, we'll walk you through the steps to upload a build, including creating a Docker image and pushing it to Veritone's Docker registry. We'll also provide details about the compliance testing that your build will undergo and let you how you can download and review the results. Finally we&rsquo;ll dive into the different engine states and provide descriptions and optional actions that can be performed for each.

Remember that our developer support team is here to answer questions and provide assistance on our dedicated Veritone Developer [Slack channel](https://chat.veritone.com). 

1. Upload a New Build
   * Create a Docker File
   * Package Your Engine
   * Log into Veritone's Docker Registry
   * Tag Your Engine
   * Upload Your Build
2. Veritone's Build Compliance Testing
3. Download a Build Report
4. Reading a Build Report
5. Understanding the Build States


#### Upload a New Build ####

The steps to upload a build are outlined below. While sample commands are provided with the instructions, it's recommended to copy the commands directly from the Developer App UI as they will include your organization ID. 

**Before You Begin**

To help expedite the upload process, be sure to have the following on-hand prior to getting started:

- Your Veritone Developer account login 
- Access to a command line interface on your computer
- Docker installed on your computer. If you don't have Docker, [download it here](https://www.docker.com/). 

If your build instructions are minimized, click on the down arrowhead next to the Copy button to expand the text.

#### Create a Dockerfile ####

Uploading a build in Veritone begins with building a Dockerfile. A Dockerfile is a text file that contains a set of instructions to create your Docker image. These instructions should include any configuration files required by your engine, such as API URLs (Veritone's API, your API, etc), authentication tokens (a Veritone token will be provided in the task payload), etc. If you'd like to get a sense of the different engine components that should be included in your Dockerfile, take a look at our [Sample Engines](/engines/sample-engines).

**Important Notes Regarding Dockerfile Construction:**  

- Before uploading your build, you will need to install Docker using the [official Docker installation instructions](https://docs.docker.com/engine/installation/).
- The Dockerfile must include your manifest. Be sure it's copied to the correct location. (See sample Dockerfile below.)
- Use 'ENTRYPOINT' in [exec form](https://docs.docker.com/engine/reference/builder/#entrypoint) to launch your engine (not 'CMD').
- We recommend using [Alpine Linux ](https://hub.docker.com/_/alpine/)as a base image and giving your image a descriptive name. 
- To learn more about creating a Dockerfile, visit the [Dockerfile Reference page](https://docs.docker.com/engine/reference/builder/) on Docker&rsquo;s website.

Below is a Dockerfile sample for Go:

```bash
FROM golang:1.9.0-alpine
ADD . /go/src/github.com/your-org/your-engine
RUN apk update && apk add -U build-base git && \
   cd /go/src/github.com/your-org/your-engine && \
   GOPATH=/go go build -o your-engine . && \
   cp manifest.json /var/manifest.json # IMPORTANT! Manifests must be copied to this location.
ENTRYPOINT ["/go/src/github.com/your-org/your-engine/your-engine"]
```


Once your Dockerfile is created, proceed to the next steps package and upload your build.  

|Package and Upload Your Build| |
|--------| ---------- |
|<b>1. Package Your Engine</b><br> Build a Docker image from the Dockerfile, by clicking copy in the <b>Package your engine</b> section and running the Docker build command provided. The Docker build command uses the following syntax: `$ docker build -t my-engine-name.` A *Successfully built <image ID>* message displays when the image is created. <br><br><b>2. Log into Veritone's Docker Registry</b><br> Veritone's Docker registry is a central repository for storing Docker images and distributing containers. After creating your Docker image, you&rsquo;ll push it to your organization's private directory in the repository. As a Veritone developer, you can access the Docker registry using your Veritone Platform credentials. Copy and run the Docker login command provided in the *Log in to the Veritone docker registry* section to access the registry. Then enter your Veritone username and password to log in. The docker login command uses the following syntax: `$ docker login my-engine docker.veritone.com.` <br><br><b>3. Tag Your Engine</b><br> Once logged into the Docker registry, copy and run the Docker tag command provided in the <b>Tag your engine</b> section to give your image a custom tag. This tag can be anything you would like to help organize your builds. The docker tag command uses the following syntax: `$ docker tag my-engine docker.veritone.com/organizationId/my-engine-name:custom-tag.` <br><br><b>4. Upload Your Build</b><br> Copy and run the Docker push command provided in the *Upload your build via command line* section to upload your build. The Docker push command uses the following syntax: `$ docker push docker.veritone.com/organizationId/my-engine-name:custom-tag.` Once your build is successfully uploaded to the registry, it displays under the engine's *Builds* list in the *Pending* state, and compliance testing is initiated. | <div style="width: 500px">![](VDA-Upload-an-Engine-1.png)</div> |

#### Veritone's Build Compliance Testing ####

When a build is submitted to Veritone, there are a number of tests run against it to make sure it is ready for prime time on our platform. This testing includes inspecting the packaged manifest, running the engine with a payload appropriate for the engine class, and examining the output and network usage of the run. In addition, a static analysis of vulnerabilities is performed in your Docker container.

An engine is expected to complete testing within 10 minutes, or it will be considered a timeout. When testing is complete, Veritone provides a Build Report with results of the testing that can be downloaded as a JSON file. If your build did not pass testing, this report can offer insight to help determine the cause. 

During testing, the build state displays as *Fetching.* Once testing is complete, the status changes to *Available* if the build passed or *Invalid* if it failed. A build in the *Available* state is ready to be submitted to Veritone for final review and approval. 

|To download a build report: | |
|--------|--------|
|Under the engine's *Builds,* click the **vertical ellipsis** on the right of the build in the list and select **Download build report** from the drop-down list. The Build Report downloads to your computer.| <div style="width: 500px">![](VDA-Download-Build-Report.png)</div>|

#### Reading a Build Report ####

The build report presents findings from Veritone's engine build testing to give you a clearer picture of satisfied criteria and areas where the build fell short. The table below includes short descriptions of each success criteria included in the build testing.

|Field name|Description|Example value|
|--------|--------|--------|
|engineId|The engine ID that this build belongs to.|2ff9260b-6788-45de-9757-980e5dc653e3|
|build|This build's build ID.|ef9b4702-6092-4b38-a7a6-1f6f8802f8f1|
|uploadTime|Epoch time (in milliseconds) that the build was uploaded.|1504028493942|
|user|Email address belonging to user who pushed this build to Veritone's Docker registry.|you@company.com|
|image|Name of Docker image that was pushed to Veritone's Docker regsitry.|docker.veritone.com/organizationId/my-engine:custom-tag|
|inspect|Output of `docker inspect` command.|See [https://docs.docker.com/engine/reference/commandline/inspect/](https://docs.docker.com/engine/reference/commandline/inspect/)|
|vulnerabilities|Array of vulnerabilities found in the build (if any).|See sample response below.|
|vulnerabilityCounts|Counts of vulnerabilities found in the build, by level of severity.|{    "Low": 6,    "Medium": 12}|
|testLog|Array of lines the build wrote to stdout during a test run.|[    "Starting my engines...",    "Processing complete",    "Elapsed time: 200ms"]|
|success|True when a build passes all tests &ndash; build is marked `AVAILABLE.` False when a build fails any tests, contains critical vulnerabilities, or does not run properly &ndash; build is marked `INVALID.`|true|
|errors|Array of errors encountered when testing the build.|["Error running container: exit code 1"]|

If vulnerabilities are detected in your engine build, they will be included for you to review in the vulnerabilities array of the report (see example below). Engine builds will only be marked invalid if we detect vulnerabilities labeled as "Critical." Anything below this level of severity will not prevent your engine from being made available, but will still be included for your review in the build report.
If you would like to test a container for vulnerabilities on your own, check out [Clair](https://coreos.com/clair/docs/latest/)'s [getting started guide](https://github.com/coreos/clair/blob/master/Documentation/running-clair.md).

```json
{
    "vulnerabilities": [
        {
            "Name": "CVE-2013-4402",
            "NamespaceName": "ubuntu:13.04",
            "Description": "The compressed packet parser in GnuPG 1.4.x before 1.4.15 and 2.0.x before 2.0.22 allows remote attackers to cause a denial of service (infinite recursion) via a crafted OpenPGP message.",
            "Link": "http://people.ubuntu.com/~ubuntu-security/cve/CVE-2013-4402",
            "Severity": "Medium",
            "Metadata": {
                "NVD": {
                    "CVSSv2": {
                        "Score": 5,
                        "Vectors": "AV:N/AC:L/Au:N/C:N/I:N"
                    }
                }
            },
            "FixedBy": "1.4.12-7ubuntu1.2"
        }
    ]
}
```

#### Build States ####

The build state allows you easily identify and track a build&rsquo;s progression through the workflow cycle. Veritone uses six different states to capture the most relevant aspects of a build&rsquo;s lifecycle stages and general operations.

|**Build State**|**Description**|**Available Actions**|
|--------|--------|--------|
|Fetching|The *Fetching* state is system-triggered and takes effect when the build has been successfully uploaded and is undergoing compliance testing. |N/A|
|Available|The *Available* state is system-triggered and takes effect when a build successfully completes and passes the compliance testing process. A build in the *Available* state can be submitted to Veritone for approval and then be deployed into production.|Submit, Delete, Download Build Report|
|Invalid|The *Invalid* state is system-triggered and takes effect when a build fails the compliance testing process. A report can be downloaded that presents testing results.|Delete, Download Build Report|
|Approved|The *Approved* state is system-triggered and takes effect when build is verified as ready for deployment by Veritone. When a build enters the *Approved* state, the engine's state automatically transitions to *Ready*.|Deploy, Delete, Download Build Report|
|Disapproved|The *Disapproved* state is system-triggered and takes effect when build is not approved for deployment.|Delete|
|Deployed|The *Deployed* state takes effect when a user deploys an *Approved* build into production. When a build is *Deployed,* the engine's status moves to *Active*.|Pause, Delete, Download Build Report|
|Paused|The *Paused* state is user-triggered and suspends operation of the build. A build can be manually put in the *Paused* state, or a previously deployed build will enter the *Paused* state when a new build is *Deployed*. |Unpause, Delete, Download Build Report|

<br>

## 6. Submit Your Build for Approval
After your build has passed the compliance testing and is in the *Available* state, the next step is to submit it to Veritone for review by one of our team members. The review process may take up to a business day to complete. Once reviewed, the build status will change to *Approved* or *Disapproved*. If your build is *Approved*, it's eligible to participate in the Veritone ecosystem and can be [deployed](engines/quick-start/step-6-deploy-engine) at any time. If your build was *Disapproved*, it cannot be deployed to production. Please contact our [developer support team](mailto:devsupport@veritone.com) for more information.

|**To submit a build for approval**| |
|--------|------|
|1.[ Navigate to the *Engines* page](/engines/step-1-create-an-engine) in Veritone Developer and click the desired **engine** in the Engine table. The *Engine Details* page opens to the *Builds* tab.| <div style="width: 500px">![](VDA-Navigate-to-Builds.png)</div> |
|2. Scroll down to *Builds* and click the **Submit** on the right of the *Available* build in the list. The build is sent to Veritone for review and approval.| <div style="width: 500px">![](VDA-Submit-a-Build.png)</div> |

<br>

## 7. Deploy Your Engine
Congratulations! Your engine has been built, tested, and approved. Now, with the click of a single button you will make it available to users in the Veritone Platform.

|**To deploy an Approved engine**| |
|--------|--------|
|1.[ Navigate to the *Engines* page](/engines/quick-start/step-6-deploy-engine) in Veritone Developer and click the desired **engine** in the Engine table. The *Engine Details* page opens to the *Builds* tab.| <div style="width: 500px">![](VDA-Navigate-to-Builds.png)</div> |
|2. Scroll down to *Builds* and click the **Deploy** on the right of the *Approved* build in the list. A confirmation message displays and the build is deployed to production in Veritone.|<div style="width: 500px">![](VDA-Deploy-an-Engine.png)</div>|

#### View a Deployed Engine in Veritone CMS

Once your engine is deployed, it's available for task processing through Veritone CMS.

|**To view a deployed engine in Veritone CMS**| |
|--------|-----|
|1. Click the **App Picker** icon in the upper right of the window and select **CMS** from the drop-down list. Veritone CMS opens.| <div style="width: 500px">![](VDA-Find-Deployed-Engine-1.png)</div> |
|2. Click **New** in the upper left of the window and select **Media** from the drop-down. The *Select Ingestion Source* page opens.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-2.png)</div>|
|3. Click the appropriate **ingestion source tile** to upload media content. The page to add content through the selected ingestion source opens.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-3.png)</div>|
|4. Follow the instructions to upload content through the selected ingestion source. |<div style="width: 500px">![](VDA-Find-Deployed-Engine-4.png)</div>|
|5. If your ingestion content is URL-based, proceed to step 7. For non-URL file uploads, click each file to upload or click **Select All** to choose all files. 6. Click **Next** in the bottom right corner of the page. The *Media Customizing* page opens.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-5.png)</div>|
|7. Enter a *Source Name* (URL-based content only), choose to use an existing *Content Template* from the drop-down and click **Add** (optional), and enter desired *Tags* (optional). 8. Click **Next** in the bottom right corner. The *Add Workflows* page opens.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-6.png)</div>|
|9. Click **Advanced Cognitive Settings** in the upper right of the window. The *Advanced Workflow* page opens.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-7.png)</div>|
|10. Click **Create New.** The *New Cognitive Workflow* page opens.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-8.png)</div>|
|11. Click the *Available Engines* drop-down and select your engine's category from the list. The organization's available engines for the selected category display.12. Locate your engine in the list to confirm deployment and availability for task processing.|<div style="width: 500px">![](VDA-Find-Deployed-Engine-9.png)</div>|
