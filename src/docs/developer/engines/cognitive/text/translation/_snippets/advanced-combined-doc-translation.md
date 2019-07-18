<!-- markdownlint-disable first-line-h1 first-heading-h1 -->

### Advanced: Including Index-able Text in the Engine Output

!> Indexing and UI support will be added over time for translated documents.
Following this guidance will ensure that your engine output will be supported in the future, but support for these features may not be available in all cases today.

By outputting document files (per the above specifications), users are able to get a translated copy of their original file, but it will not be indexed in aiWARE for searching or UI display.
If you would like your file to be indexed in aiWARE, you may optionally also include engine output according to the [text extraction](/developer/engines/cognitive/text/text-extraction/) specifications.
A combined document file and extracted text output would look something like this:

> Notice that the output conforms to both the `media-translated` and `text` validation contracts and includes both the `media` array (for file references) and the `object` array (for extracted text).
