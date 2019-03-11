# Building a Text Extraction Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

Text extraction engines process documents to extract the textual information from them and express that extracted text in a structured format.

They are similar to [text recognition](/developer/engines/cognitive/vision/text-recognition/)
engines in their output data structure.
But where text recognition engines are used to recognize text in *unstructured* files like images,
text **extraction** engines are used to extract text content from *semi-structured* files like PDFs or Microsoft Word documents.

## Engine Output

Most text extraction engine output should be stored in the non-time-based `object` array in [vtn-standard](/developer/engines/standards/engine-output/).
Each string of text is represented as an object of type `text`.

### Ordering Indexes

Each object may include any or all of the page/paragraph/sentence indexes:
- `page`: represents a physical page in a page-aware document type like PDF or docx.
- `paragraph`: represents a section of content like a literary paragraph or a line number in less literary document formats.
- `sentence`: represents an individual expression of thought like a literary sentence or a grouped string of text

Each of the page/paragraph/sentence indexes must start at 1.

If `page` is provided, the indexes for `paragraph` and `sentence` must be reset to 1 each time the `page` index is incremented.
If `paragraph` is provided, the index for `sentence` must be reset to 1 each time the `paragraph` index is incremented.

All indexes are optional but it is highly recommended to include at least one so that order is explicitly preserved.

### Additional Information

The output can also include a language code and confidence scores if desired.

### Example
 
[](vtn-standard.example.json ':include :type=code javascript')
