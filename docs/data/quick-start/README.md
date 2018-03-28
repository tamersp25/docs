# Quick Start

This quick start is designed to take you through the process of registering a structured data schema. When completed, you can reference the schema when creating ingestion or processing jobs involving your structured data.

## Register a New Schema ##

Before using structured data in the Veritone platform, you need to register a schema for the data. We recommend that you do this within the Veritone App UI by following these steps:

1. Go to the Data section in the Developer App. You should see a table with a heading of My Schema. 
2. To register a new schema, click on the New button in the upper right portion of the page.
3. Fill in the required information about your schema.
4. Click on Next.
5. Copy and paste a valid Schema with valid JSON formatting. See the section below for more information about the requirements for schemas.
6. Click on Submit.
7. If your schema passed the validation, you will see a message pop up at the bottom of the page that says, "Data Schema created successfully!"
8. At this point, you can edit the information that you entered earlier about your schema if you like or just click on the x in the upper right to return to the My Schemas page where you can now see your schema is saved as Draft.
9. If you are happy with your schema, you can publish it by clicking on the vertical ellipses on the right hand side and selecting publish.
10. You will see a popup asking you to confirm that you want to publish the schema. Click "Publish" to confirm.
11. You'll be returned to the My Schema page where you'll see that your schema now has the status of Published. Once published, you can now use the schema to ingest structured data.

### Requirements for Schemas ###

Each schema should contain the following elements:

Field | Field Type | Description | Example
----- | ---------- | ----------- | -------
Required | Array | Indicates the fields that are required to be present in the structured data. If a required field is not present in the structured data, that record will not be saved. | "Required": \["id", "name"]


The schema should fully describe the fields for the structured data that you want Veritone to save. For each field, you should specify the data type. The data types that Veritone supports:

* string
* number
* boolean
* array
* object
* geoPoint - NEED MORE DETAIL
* dateTime  - NEED MORE DETAIL

## Editing a Schema ##

While a schema has draft status, you can edit the schema by selecting the Edit option to the right of every row in the My Schemas table. You can edit it as many as you need to while the schema is in Draft status.

When you've have elected to publish the schema, the status changes to Published and a version is assigned. If you then edit a Published schema, a new entry will be created with a status of Draft. If you then attempt to publish this new entry, you will be asked to indicate whether the change should be save as a minor or a major version. 

Version Type | Definition
------------ | -----------
Minor | Minor versions must be backwards compatible with the prior version and are indicated by incrementing the number to the right of the decimal for the version number. For example, 1.1 and 1.2 are minor versions of 1.0.
Major | Major versions are not backwards compatible with the prior version and are indicated by incrementing the number to the left of the decimal for the version number. For example, 1.0 and 2.0 are major versions.

It's important for Veritone to understand whether each schema edit is a major or minor version so that we can properly store and index any new structured data that conforms to the revised schema. If the schema represents a new major version, then any data ingested against that schema will be stored in a new index, and any users must elect to use that new version as it could be incompatible with any prior usage of the data. If the schema is a new minor version, then any data ingested against that schema will be stored in the same index as the prior version.

**Please note that at this time, Veritone will consider all changes to a published schema to be a major change unless the change consists only of adding new, unrequired fields to the prior version. 

