# Translating Rich Text Documents

[badge/API/Yes/green]
[badge/Search/No/red]
[badge/UI/No/red]

Rich text documents are one of the [five input formats](/developer/engines/cognitive/text/translation/?id=engine-input-options) that translation engines can support.
By "rich text documents" we mean textual document formats like Microsoft Word (.docx) or PDF.

> The scope of this article covers translating the contents of these documents into new documents with the same styling in the original document format.
If you need are interested in processing the contents of rich text documents but not of generating rich text outputs, consider building an engine that can process [extracted text](/developer/engines/cognitive/text/translation/extracted-text/) instead.

## Engine Manifest

Rich text translation engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `engineMode` | `"chunk"` |
| `preferredInputFormat` | The primary MIME type your engine can process. |
| `supportedInputFormats` | An array of all the MIME types your engine can process. |
| `outputFormats` | An array of all the MIME types your engine can output. Ideally, the same as `supportedInputFormats` |

Here is a minimal example `manifest.json` that could apply to a translation engine:

[](manifest.example.json ':include :type=code json')

[](../../../../_snippets/engine-manifest-pointer.md ':include')

## Engine Input

Rich text translation engines should be implemented as [segment processing](/developer/engines/processing-modes/segment-processing/) engines.
Each segment will be the entire contents of one file.

## Engine Output

The engine should create a separate output file for each desired output language.
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
        contentType: "<the MIME type of your output file>"
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
