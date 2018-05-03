<!-- ---
title: Running library-enabled engines
--- -->

# Running library-enabled engines

When run in `library-run` mode, the payload will once again contain  `libraryId` and `libraryEngineModelId` parameters. It is the engine's task to fetch necessary information from the provided library engine model and do its job. To get the library engine model, execute a GraphQL query like the following:

```graphql
query GetLibraryEngineModel {
  libraryEngineModel(id: "4ae6d34d-8f4a-4e4e-aefa-12964cbf29c9") {
    records {
      id
      trainStatus
      dataUrl
      jsondata
    }
  }
}
```

If, in training mode, your engine saved a data file to the model record, it will be available for download via the `dataUrl` field returned. Otherwise, any necessary information should be extracted from model metadata, available under the `jsondata` field.

Once the engine has started processing the provided recording, and items provided to it in the training step have been detected, the engine must record that information to the task output (or recording asset) in a time-series format. At the very least, standard engine output for library-driven engines requires the following fields for each time-series entry:

* `start`: start time of the recognized item in the media (in milliseconds)
* `end`: stop time of the recognized item in the media (in milliseconds)
* `libraryId`: the library ID, from the task payload
* `entityId`: the unique ID of the recognized entity. Depending on the engine implementation, this may need to be mapped from a third-party identifier.
* (optional) `entityIdentifierId`: the unique ID of recognized entity identifier (for example, a specific image). This information is not always available and is therefore optional.

Your engine's output may contain other fields in addition to these, depending on the engine category.

Here are some sample results:

```json
{
    "series": [{
        "start": 182000,
        "end": 206000,
        "score": 0.08391003460207612,
        "entityId": "025d1780-0b16-4fb5-8f48-529a6ac242cf",
        "libraryId": "c035f463-2a82-4be5-b263-61f3b61e5282",
        "entityIdentifierId": "34b38cc2-e506-4cce-bf31-caabc2d033cd"
    }, {
        "start": 5000,
        "end": 9000,
        "score": 0.02032871972318339,
        "entityId": "a9c04689-793f-4796-b196-ade7df9fdd35",
        "libraryId": "c035f463-2a82-4be5-b263-61f3b61e5282",
        "entityIdentifierId": "8ff69a28-c51a-453e-a251-7bef203a5004"
    }, {
        "start": 152000,
        "end": 172000,
        "score": 0.018598615916955018,
        "entityId": "797a715f-bde3-4e7b-bc89-70abb4a5bb79",
        "libraryId": "c035f463-2a82-4be5-b263-61f3b61e5282",
        "entityIdentifierId": "4309c174-22e3-4a60-be56-a3d2fab0d6ae"
    }]
}
```
