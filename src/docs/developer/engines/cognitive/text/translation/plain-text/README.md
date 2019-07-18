# Translating Plain Text Documents

[badge/API/Yes/green]
[badge/Search/No/red]
[badge/UI/No/red]

Plain text documents are one of the [five input formats](/developer/engines/cognitive/text/translation/?id=engine-input-options) that translation engines can support.

## Engine Manifest

Plain text translation engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `engineMode` | `"chunk"` |
| `preferredInputFormat` | `"text/plain; charset=utf-8"` |
| `supportedInputFormats` | `["text/plain", "text/plain; charset=utf-8"]` |
| `outputFormats` | `["text/plain", "text/plain; charset=utf-8"]` |

Here is a minimal example `manifest.json` that could apply to a translation engine:

[](manifest.example.json ':include :type=code json')

[](../../../../_snippets/engine-manifest-pointer.md ':include')

## Engine Input

Plain text translation engines should be implemented as [segment processing](/developer/engines/processing-modes/segment-processing/) engines.
Each segment will be the entire contents of one plain text file.

## Engine Output

The engine should create a separate plain text file for each desired output language.
Once the files are generated, the engine should do the following to properly register the result with aiWARE:

1. Call the [`getSignedWritableUrls` query](/apis/reference/query/?id=getsignedwritableurls) to retrieve pre-authorized URL destinations to which the files can be posted.

    ```graphql
    query {
      getSignedWritableUrls(number: 2) {
        url  # The URL to PUT to
        unsignedUrl  # The URL to submit with createAsset
      }
    }
    ```

1. For each file, upload the file to one of the URLs with an HTTP `PUT` request.
Each file must have a distinct URL.
PUTing to the same URL twice will overwrite the contents of the first PUT request.

1. For each file, call the [`createAsset` mutation](/apis/reference/mutation/?id=createasset) and obtain an asset ID for each.

    ```graphql
    mutation {
      createAsset(input: {
        containerId: "<The TDO ID of this task>"
        type: "media"
        contentType: "text/plain"
        uri: "<the unsignedUrl from the getSignedWritableUrls call>"
        details: {
          language: "en-US"
        }
      }) {
        id
      }
    }
    ```

  ?> You can include multiple mutations in one request if you [alias them](https://graphql.org/learn/queries/#aliases)

  ?> Steps 2 and 3 can be combined by simply calling the `createAsset` mutation using `multipart/form-data` to submit the contents of the text file along with creating the asset, rather than referencing the contents by `uri`.

1. Return your `vtn-standard` response in the following format:

[](../_snippets/vtn-standard-doc-translation.example.json ':include :type=code json')

[](../_snippets/advanced-combined-doc-translation.md ':include')

[](../_snippets/vtn-standard-with-extracted-text.example.json ':include :type=code json')
