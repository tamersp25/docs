

TTML is an XML document designed to provide timings for a single path transcript. We require all engines to produce a TTML file, in addition to a VLF file. For engines that produce a multi path VLF, the TTML output should contain the best path forward.

## Recognized Fields ##

Fields that we recognize are listed below.

|Field|Type|Description|Example|
|--------|--------|--------|--------|
|```p```|element|The current paragraph. It's body contains the transcript text.|```<p></p>```|
|```begin```|string attribute|The time in HH:MM:SS.mmm from the beginning of the file when the paragraph starts.|```00:00:01.360```|
|```end```|string attribute|The time in HH:MM:SS.mmm from the beginning of the file when the paragraph ends.|```00:00:02.520```|

## Asset Upload ## (.auto-cursor-target)

The following fields are accepted when uploading a TTML asset using the Create Asset endpoint of the Veritone API.

|Required Fields|Type|Description|Example|
|--------|--------|--------|--------|
|```Content-Type```|header string|The asset's Content Type.|```'application/ttml+xml'```|
|```X-Veritone-Asset-Type```|header string|The Veritone Asset Type.|```'transcript'```|
|```X-Veritone-Metadata```|header string|JSON object containing asset metadata. Must contain a `source` field, in which the Engine ID is set. Optionally includes `filename` and `size`.|```'{"source":"{ENGINE_ID}"'```|
|Optional Fields|Type|Description|Example|
|```X-Veritone-MD5-Checksum```|header string|The MD5 hash of the uploaded file.|```'d41d8cd98f00b204e9800998ecf8427e'```|

## Example ## (.auto-cursor-target)
Example TTML

```xml
<?xml version="1.0" encoding="utf-8"?>
<tt xmlns="http://www.w3.org/ns/ttml" xmlns:tts="http://www.w3.org/ns/ttml#styling" xmlns:ttm="http://www.w3.org/ns/ttml#metadata" xml:lang="en-us">
  <body region="CaptionArea">
      <div>
          <p begin="00:00:01.360" end="00:00:02.520">You might not remember</p>
          <p begin="00:00:02.520" end="00:00:02.850">us</p>
      </div>
  </body>
</tt>
```
