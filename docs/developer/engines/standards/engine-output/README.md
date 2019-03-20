# Engine Output Standard - vtn-standard

## Overview

`vtn-standard` is a file format that engines can use to output their findings for a particular piece of data.
The aiWARE platform and user interfaces know how to interpret the data written to this format.

When engines report their findings, they either write assets or broadcast messages in vtn-standard format.
When apps query information from the engineResults GraphQL query, it responds in vtn-standard format.

For specifications and examples for individual engine capabilities, please see the documentation for [Building Cognitive Engines](/developer/engines/cognitive/).

## Full Specification

<!--TODO: Review
The official specification is expressed in json-schema format and is [available here](https://github.com/veritone/docs/tree/master/docs/engines/standards/vtn-standard.schema.json)
-->

An annotated example of the full specification is shown below demonstrating most of the capabilities:

[](vtn-standard.example.js ':include :type=code javascript')

## Extending The Standard

<!--TODO: Move to a separate page (so we can link from the Developer UI)-->
You can extend the standard with your custom data in multiple ways depending on your needs.

### By adding to the vendor section

The simplest way to add custom data to a vtn-standard file is to include it in one of the `vendor` sections.
The data written in the vendor section will be visible in the generated asset and available through the aiWARE API.
But this data will *not* be visible in any aiWARE applications and will not be available through the search API.
The values must be valid JSON data types but have no other constraints.

The four places you can add data to `vendor` sections are:

 * At the asset level (applies to the whole file):
    ```json
    {
      "sourceEngineName": "engine_a",
      "vendor": {
        "myCustomKey1": "custom string value",
        "piNumber": 3.14
      }
    }
    ```

 * At the `object` level (applies to a particular object in the whole file):
    ```json
    {
      "sourceEngineName": "engine_b",
      "object": [
        {
          "type": "object",
          "vendor": {
            "myCustomKey1": "custom string value",
            "piNumber": 3.14
          }
        }
      ]
    }
    ```

 * At the time slice (`series`) item level (applies to a particular slice of time):
    ```json
    {
      "sourceEngineName": "engine_c",
      "series": [
        {
          "startTimeMs": 10,
          "stopTimeMs": 1060,
          "vendor": {
            "myCustomKey1": "custom string value",
            "piNumber": 3.14
          }
        }
      ]
    }
    ```

 * At the time slice (`series`) item `object` level (applies to a particular object in a particular slice of time):
    ```json
    {
      "sourceEngineName": "engine_d",
      "series": [
        {
          "startTimeMs": 0,
          "stopTimeMs": 1000,
          "object": {
            "type": "object",
            "vendor": {
              "myCustomKey1": "custom string value",
              "piNumber": 3.14
            }
          }
        }
      ]
    }
    ```


### By leveraging structured data

If you would like your data to be displayed in a table in the user interface and indexed for searching against via the search API,
you can add your data to the vtn-standard file in one of the `structuredData` sections.
To do this, you first need to [register a schema through Veritone Developer](/developer/data/quick-start/) that expresses the structure of your data.
Then you can reference the schema ID in the `structuredData` section and include your custom data under it.

 * At the `object` level (applies to a particular object in the whole file):
    ```json
    {
      "sourceEngineName": "engine_e",
      "object": [
        {
          "type": "object",
          "structuredData": {
            "a0d65cfd-320b-4557-42ff-4e0c6fe9a152": {
              "scale": "Fahrenheit",
              "degrees": "80"
		    },
            "ba735caa-fa9b-a4b2-bb72-2e4dc5a23ff5": {
              "25_30": "1000",
              "31_35": "1200",
              "36_40": "200"
            }
          }
        }
      ]
    }
    ```

 * At the time slice (`series`) item level (applies to a particular slice of time):
    ```json
    {
      "sourceEngineName": "engine_f",
      "series": [
        {
          "startTimeMs": 10,
          "stopTimeMs": 1060,
          "structuredData": {
            "a0d65cfd-320b-4557-42ff-4e0c6fe9a152": {
              "scale": "Fahrenheit",
              "degrees": "80"
            },
            "ba735caa-fa9b-a4b2-bb72-2e4dc5a23ff5": {
              "25_30": "1000",
              "31_35": "1200",
              "36_40": "200"
            }
          }
        }
      ]
    }
    ```

 * At the time slice (`series`) item `object` level (applies to a particular object in a particular slice of time):
    ```json
    {
      "sourceEngineName": "engine_g",
      "series": [
        {
          "startTimeMs": 0,
          "stopTimeMs": 1000,
          "object": {
            "type": "object",
            "structuredData": {
              "a0d65cfd-320b-4557-42ff-4e0c6fe9a152": {
                "scale": "Fahrenheit",
                "degrees": "80"
              },
              "ba735caa-fa9b-a4b2-bb72-2e4dc5a23ff5": {
                "25_30": "1000",
                "31_35": "1200",
                "36_40": "200"
              }
            }
          }
        }
      ]
    }
    ```

### By extending the specification itself

If you would like your data to be displayed in the aiWARE UI as its own new capability, please [contact us](mailto:ecosystem@veritone.com)
to discuss how the specification should be extended and what types of user interfaces should be created.
