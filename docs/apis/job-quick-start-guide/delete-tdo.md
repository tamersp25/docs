# Delete a TDO and/or Its Content

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
