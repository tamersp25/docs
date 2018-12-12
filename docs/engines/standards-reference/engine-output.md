### Engine Outputs - VTN Standard

# Overview

Standard engine output json that Veritone APIs and UI understand.

### Full Specification

[](veri-standard.scheam.json ':include :type=code javascript')

### Extending The Standard
You can extend the standard with your custom data:

##### By adding custom fields and values to the 'vendor'  object property.

 The values must be valid JSON data types. 
 *Note:* these fields and values will be stored in the asset but will not be indexed or available for search at Veritone system.
 * At the asset level:
    ```json
    {
      "sourceEngineName": "engine_a", 
      "vendor": {
        "myCustomKey1": "custom string value",
        "piNumber": 3.14
      }
    }
    ```
 
 * At the asset *'object'* property, on the object item:
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

 * At the time slice / series item level:
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
    
 * At the time slice / series item object level:
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
    

###### By Leveraging Structured Data.
Describe a schema(s) for you data. Then data that conforms to that schema(s) could be stored under the 'structuredData' property, keyed by your schema(s) id(s)
*Note:* these data will be indexed and available for search at Veritone system through structured data search. 
 * At the asset *'object'* property, on the object item:
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

 * At the time slice / series item level:
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
    
 * At the time slice / series item object level:
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
