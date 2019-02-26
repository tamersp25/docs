# Text Recognition

Text recognition engines process documents (primarily images) to recognize text in them and express that recognized text in a structured format.
**Optical character recognition (OCR)** is a technology that is often used to implement text recognition engines.

They are similar to [text extraction](/engines/cognitive/text/text-extraction/)
engines in their output data structure.
But where text extraction engines are used to extract text content from *semi-structured* files like PDFs or Microsoft Word documents,
text **recognition** engines are used to recognize text in *unstructured* files like images.

## Engine Output

Text recognition engine output can follow two forms depending on whether the file being processed is time-based file (e.g. audio, video) or a non-time-based (e.g. image).

### Example - Time-Based

[](vtn-standard-series.example.json ':include :type=code json')

### Example - Non-Time-Based

[](vtn-standard-object.example.json ':include :type=code json')
