# Building Cognitive Engines

[](_summary.md ':include')

## Classes

Cognitive engines are categorized into engine classes based on the type of data that they analyze.
Below is a table of our currently supported engine classes.

Class | Description | Inputs | Examples
--- | --- | --- | ---
Audio | Identifies audio signatures and captures patterns from sounds. | Audio data | Audio recognition, music detection
Biometrics | Analyzes the unique physical identifiers for identification and categorization. | Pictures, videos and biometric data (fingerprints, scans) | Face detection, facial recognition
Data | Extracts time-saving actionable insights from data. | All kinds of data | Recommendation, telematics
Speech | Applies artificial intelligence to human language to locate, capture, identify, and categorize spoken word. | Audio data | Transcription, language detection
Text | Applies artificial intelligence to text inputs. | Text data | Language translation, text-to-speech, content categorization
Transformation | Transforms input to produce an enhanced or modified data set.  | All kinds of data | Visual redaction, transcoding
Vision | Processes images to identify, segment, and extract details. | Pictures and videos | Object recognition, visual moderation (tagging)

## Capabilities

Within each engine class is a set of capabilities, which are based on what type of data they output.
This table presents the engine capabilities currently supported for extension through Veritone Developer.

Class | Capability | Description
--- | --- | ---
Audio | [Audio Fingerprinting](/developer/engines/cognitive/audio/audio-fingerprinting/) | Recognizes a specific audio segment, eg. a radio advertisement, as it appears in a longer audio file or on its own.
Biometrics | [Face Detection](/developer/engines/cognitive/biometrics/face-detection/) | Detects the presence of one or multiple faces in an image or video.
Biometrics | [Face Recognition](/developer/engines/cognitive/biometrics/face-recognition/) | Identifies one or multiple people in an image or video by associating each individual's face to their name.
Data | [Correlation](/developer/engines/cognitive/data/correlation/) | Associates two data products based on some commonality, such as occurence over time. For example, may associate weather data on a given date with stock prices on that date.
Data | [Geolocation](/developer/engines/cognitive/data/geolocation/) | Identifies the geographic location of a person or object in the real world or some virtual equivalent.
Speech | [Speaker Detection](/developer/engines/cognitive/speech/speaker-detection/)	| aka Speaker Separation, Diarization. Partitions an input audio stream into segments according to who is speaking when.
Speech | [Speaker Recognition](/developer/engines/cognitive/speech/speaker-recognition/)	| aka Speaker Identification. Identifies speakers in an audio file based on trained recordings of their voice.
Speech | [Transcription](/developer/engines/cognitive/speech/transcription/) | Converts speech audio to text.
Text | [Content Classification](/developer/engines/cognitive/text/content-classification/) | Categorizes one or multiple documents according to a pre-defined ontology.
Text | [Entity Extraction](/developer/engines/cognitive/text/entity-extraction/) | aka Named-entity recognition. Classifies named entities located in unstructured text into pre-defined categories such as people, organizations and locations.
Text | [Keyword Extraction](/developer/engines/cognitive/text/keyword-extraction/) | Identifies key terms and/or phrases that appear in documents, based on parts of speech, salience, or other criteria.
Text | [Language Identification](/developer/engines/cognitive/text/language-identification/) | Detects one or multiple natural languages in text.
Text | [Sentiment Analysis](/developer/engines/cognitive/text/sentiment/) | Classifies text according to sentiment. May include a score representing negative, neutral or positive, or include a wider breadth of tags such as "happy" or "excited".
Text | [Summarization](/developer/engines/cognitive/text/summarization/) | Generates a summary of written text.
Text | [Text Extraction](/developer/engines/cognitive/text/text-extraction/) | Extract textual information from documents, and expresses that extracted text in a structured format.
Text | [Translation](/developer/engines/cognitive/text/translation/) | Translates natural language from a text source.
Transformation | [Visual Redaction](/developer/engines/cognitive/transformation/visual-redaction/) | Censors or obscures parts of an image or video, such as an individual's face.
Vision | [Image Classification](/developer/engines/cognitive/vision/image-classification/) | Classifies the entire image (not objects within an image). eg. "landscape" or "basketball game".
Vision | [License Plate Recognition (ALPR)](/developer/engines/cognitive/vision/license-plate/) | Produces a text string of alphanumeric characters for each license plate recognized in an image or video.
Vision | [Logo Detection](/developer/engines/cognitive/vision/logo-detection/) | Recognizes one or more logos or branding elements in an image or video.
Vision | [Object Detection](/developer/engines/cognitive/vision/object-detection/) | Detects one or multiple objects or concepts in an image or video from a general/broad ontology, eg. "car" or "person".
Vision | [Text Recognition (OCR)](/developer/engines/cognitive/vision/text-recognition/) | aka Optical Character Recognition. Converts alphanumeric characters in a document, image or video, to text.

<!--TODO: Add back in when we have documentation
Audio | Audio Recognition | Recognizes sound segments in an audio file, eg. 'gunshot', 'ad' or 'crying baby'.
Speech | Keyword Spotting	| Finds specific words in an audio recording, without producing a transcript.
Speech | Language Identification | Identifies the natural human language(s) spoken in an audio file.
Text | Text-to-Speech | Generates spoken word from text. Configurations may include output voice gender and accent.
Transformation | Orchestration | Arranges and combines various processes in order to optimize output.
Transformation | Transcoding | Converts one input file format to another.
Vision | Color | Recognizes colors in an image or video.
Vision | Scene Break | Segments a video by identifying each instance of a scene change.
Vision | Visual Moderation | Tags an image or video which likely contains explicit content.
-->
