# Text Extraction

Text extraction engines process documents to extract the textual information from them and express that extracted text in a structured format.

They are similar to [text recognition](/engines/cognitive/vision/text-recognition/)
engines in their output data structure.
But where text recognition engines are used to recognize text in *unstructured* files like images,
text **extraction** engines are used to extract text content from *semi-structured* files like PDFs or Microsoft Word documents.

## Engine Output

Most text extraction engine output should be stored in the non-time-based `object` array in vtn-standard.
Each string of text is represented as an object of type `text`.
Each object may include any or all of the page/paragraph/sentence indexes.
They are all optional but it is highly recommended to include at least one so that order is explicitly preserved.
It can also include a language code and confidence if desired.

### Example

[](vtn-standard.example.json ':include :type=code javascript')
