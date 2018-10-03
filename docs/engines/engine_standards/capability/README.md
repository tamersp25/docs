# Engine Classes and Capabilities

This table outlines all the capabilities defined by Veritone's Engine taxonomy.

|  Class | Capability | Definition | API Support | CMS Support |
|  ------ | ------ | ------ | ------ | ------ |
|  Speech | [Transcription](/engines/engine_standards/capability/transcription) | Speech recognition converts speech audio to text. Generally less accurate but significantly faster and more cost-effective than human transcription. | Yes | Yes |
|  Speech | Language Identification | Identifies the natural human language(s) spoken in an audio file. | Coming Soon | Coming Soon |
|  Speech | Speech Detection | Detects the presence or absence of human speechin an audio file. | Coming Soon | Coming Soon |
|  Speech | Diarization | Partitions an input audio stream into homogeneous segmenta according to speaker. | Coming Soon | Coming Soon |
|  Speech | Keyword Spotting | Finds specific words in an audio recording, without producing a transcript. | Coming Soon | Coming Soon |
|  Speech | Speaker Identification | Recognizes individual speakers based on each person's voice.  | Coming Soon | Coming Soon |
|  Speech | Vocal Emotion | Detects emotion from voice. May include factors such as pitch, tone and amplitude. | Coming Soon | Coming Soon |
|  Text | [Translation](/engines/engine_standards/capability/translation) | Translates natural language, from source (input) text to target (output) text. | Yes | Yes |
|  Text | Text-to-Speech | Generates spoken word from text. Configurations may include output voice gender and accent. | Coming Soon | Coming Soon |
|  Text | Natural Language Generation | Creates written natural language from a knowledge base, logical form, or structured data. | Coming Soon | Coming Soon |
|  Text | Entity Extraction | AKA Named-entity recognition. Classifies named entities from text into pre-defined categories such as people, organizations and locations. | Coming Soon | Coming Soon |
|  Text | Keywords and Phrases | Identifies the key terms and/or phrases which appear across one or multiple documents, based on parts of speech, salience or other mechanisms. | Coming Soon | Coming Soon |
|  Text | Summarization | Generates a synopsis, ie. condensed version, of written text. | Coming Soon | Coming Soon |
|  Text | Topics and Concepts | Discovers abstract topics and concepts which occur across one or multiple documents. Does not require topics or concepts to be explicitly mentioned in the document(s) themselves; based on assignment of tags. | Coming Soon | Coming Soon |
|  Text | Content Classification | Categorizes one or multiple documents according to a pre-defined ontology. | Coming Soon | Coming Soon |
|  Text | Language Identification | Detects one or multiple natural languages in text. | Coming Soon | Coming Soon |
|  Text | Persona | Determines author persona, which may include bias, intent or tone. | Coming Soon | Coming Soon |
|  Text | [Sentiment](/engines/engine_standards/capability/sentiment) | Classifies text according to sentiment. May include a score representing negative, neutral or positive, or include a wider breadth of tags such as 'happy' or 'excited'. | Yes | Yes |
|  Text | Syntax | Describes the structure or formal grammar components of the input text. | Coming Soon | Coming Soon |
|  Text | Semantic Similarity | Approximates the likeness of a set of terms or documents, based on the distance between terms on an ontological map. | Coming Soon | Coming Soon |
|  Text | Vector | Represents text as a mathematical vector, typically used for indexing. | Coming Soon | Coming Soon |
|  Text | Text Moderation | Tags text files which may contain offensive, undesireable or highly secure information. | Coming Soon | Coming Soon |
|  Text | PII Detection | Tags text files which may contain personally identifiable informaion (PII), such as a social security number or an address. | Coming Soon | Coming Soon |
|  Vision | [General Object Detection](/engines/engine_standards/capability/general_object_detection) | AKA Image recognition. Detects multiple objects or concepts in an image or video, eg. 'car', 'desk' or 'person'. | Yes | Yes |
|  Vision | [Color](/engines/engine_standards/capability/color) | Recognizes colors in an image or video, such as 'blue' or 'electric red'. | Yes | Yes |
|  Vision | [Logo](/engines/engine_standards/capability/logo) | Identifies brand logos in image or video, such as 'Veritone' or 'Wazee Digital'. | Yes | Yes |
|  Vision | [Vehicle](/engines/engine_standards/capability/vehicle) | Classifies vehicles in an image or video, typically according to year, make, model and/or color, eg. 'white Tesla Model X'. | Yes | Yes |
|  Vision | [Food](/engines/engine_standards/capability/food) | Determines which food item(s) appear in an image or video, eg. 'kale' or 'pizza'. | Yes | Yes |
|  Vision | Art | Recognizes works of art as they appear in an image or video, eg. 'Sunflowers' or 'Sunflowers by Vincent Van Gogh'. | Coming Soon | Coming Soon |
|  Vision | [Apparel](/engines/engine_standards/capability/apparel) | Catalogs clothing according to clothing type, eg. 'shirt', and/or brand. | Yes | Yes |
|  Vision | [Landmark](/engines/engine_standards/capability/landmark) | Identifies known physical landmarks as they appear in an image or video, eg. 'Eiffel Tower'. | Yes | Yes |
|  Vision | Weapon | Recognizes weapons to varying degrees of specificity. Examples may include 'gun' or 'AK-47'. | Coming Soon | Coming Soon |
|  Vision | Nature | Tags nature-related imagery to varying degrees of specificity. Examples may include 'tree' or 'pine tree'. | Coming Soon | Coming Soon |
|  Vision | Visual Moderation | Tags an image or video which likely contains explicit content. May include content type, such as 'gore' or 'sexual'. | Coming Soon | Coming Soon |
|  Vision | Pose | Detects various human poses in an image or video, such as 'standing' or 'reaching'. | Coming Soon | Coming Soon |
|  Vision | Text Recognition (OCR) | AKA Optical Character Recognition. Converts alphanumeric characters in a document, image or video, to text. | Coming Soon | Coming Soon |
|  Vision | License Plate (ALPR) | Produces a text string of alphanumeric characters for each license plate recognized in an image or video. | Coming Soon | Coming Soon |
|  Vision | Handwriting | Converts handwritten alphanumeric characters in a document, image or video, to text. | Coming Soon | Coming Soon |
|  Vision | Barcode/QR Code | Recognizes barcodes or QR codes in an image or video. | Coming Soon | Coming Soon |
|  Vision | Scene Description | Interprets visual scene(s) in an image or video, producing a brief text summary. | Coming Soon | Coming Soon |
|  Vision | Scene Break | Segments a video by identifying each instance of a scene change. | Coming Soon | Coming Soon |
|  Vision | Motion Detection | Detects motion in an otherwise still video scene. | Coming Soon | Coming Soon |
|  Vision | Action Classification | Recognizes actions in an image or video, eg. 'walking' or 'picking something up'. | Coming Soon | Coming Soon |
|  Vision | Visual Similarity | Assesses the likeness of an image or video to one or multiple other image(s) or video(s). | Coming Soon | Coming Soon |
|  Vision | Visual Content Generation | Produces an image or video. May be based on one or multiple keywords or other input. | Coming Soon | Coming Soon |
|  Vision | Gesture | Identifies gestures in an image or video, especially of the hands and arms. For example, 'raising hand' or 'pointing at an object'. | Coming Soon | Coming Soon |
|  Biometrics | [Face Detection](/engines/engine_standards/capability/face_detection) | Detects the presence of one or multiple faces in an image or video. | Yes | Yes |
|  Biometrics | [Face Recognition](/engines/engine_standards/capability/face_recognition) | Identifies one or multiple people in an image or video by associating each individual's face to their name. | Yes | Yes |
|  Biometrics | Face Verification (Matching) | Compares two images or videos containing a face to verify whether the face belongs to the same person. | Coming Soon | Coming Soon |
|  Biometrics | Ethnicity | Estimates ethnic background based on recognizing distinct facial features common to a particular ethnicity. | Coming Soon | Coming Soon |
|  Biometrics | Gender | Predicts the likelihood a detected person is male, female, or neutral. | Coming Soon | Coming Soon |
|  Biometrics | Age | Estimates age or age range, based on recognizing distinct facial features common to a particular age or age range. | Coming Soon | Coming Soon |
|  Biometrics | Face Emotion | Interprets emotion from facial expression, eg. frowning may imply an individual is 'sad' or 'upset'. | Coming Soon | Coming Soon |
|  Biometrics | Gait | Identifies variation in gait, or walking style. May be used to recognize individuals based on their unique gait. | Coming Soon | Coming Soon |
|  Biometrics | Iris | Recognizes or verifies a person's identity based on an image or video of their unique iris, ie. colored part of their eye. | Coming Soon | Coming Soon |
|  Biometrics | Voice Mimicry | Produces a speech or other audio file which mimics or imitates a person's voice. | Coming Soon | Coming Soon |
|  Audio | Audio Detection | Detects the presence of audio in an audio or video file. | Coming Soon | Coming Soon |
|  Audio | Audio Fingerprinting | Recognizes a specific audio segment, eg. a radio advertisement, as it appears in a longer audio file or on its own. | Coming Soon | Coming Soon |
|  Audio | Music Detection | Detects the presence of music in an audio or video file. | Coming Soon | Coming Soon |
|  Audio | Music Generation | Composes music which may be used by advertising agencies, game studios, film directors and the like. | Coming Soon | Coming Soon |
|  Data | Anomaly | Detects anomalies, or outliers, in data. | Coming Soon | Coming Soon |
|  Data | Prediction | Estimates an event that will likely happen in the future, as a consequence of one or multiple historical events. | Coming Soon | Coming Soon |
|  Data | Correlation | Associates two data products based on some commonality, such as occurence over time. For example, may associate weather data on a given date with stock prices on that date. | Coming Soon | Coming Soon |
|  Data | Classification | Categorizes data according to a defined ontology, or based on shared qualities or characteristics. | Coming Soon | Coming Soon |
|  Data | [Geolocation](/engines/engine_standards/capability/geolocation) | Identifies the geographic location of a person or object in the real world or some virtual equivalent. | Yes | Yes |
|  Data | Optimization | Increases efficiency or effectiveness of a given process or resource. | Coming Soon | Coming Soon |
|  Data | Resource Allocation | Delegates tasks or other items to various individuals or groups in an automated fashion. | Coming Soon | Coming Soon |
|  Data | Recommendation | Suggests content or some decision path based on a user profile or other accumulation of data trends. | Coming Soon | Coming Soon |
|  Data | Telematics | Makes predictions based on IoT or other similar input in the realm of telecommunications or transportation. | Coming Soon | Coming Soon |
|  Transformation | Transcoding | Converts one input file format to another. | Coming Soon | Coming Soon |
|  Transformation | Orchestration | Arranges and combines various processes in order to optimize output. | Coming Soon | Coming Soon |
|  Transformation | Text Redaction | Censors or obscures parts of text, such as personally identifiable or otherwise sensitive information. | Coming Soon | Coming Soon |
|  Transformation | Audio Redaction | Censors or obscures parts of an audio file, such as obscene language. | Coming Soon | Coming Soon |
|  Transformation | Visual Redaction | Censors or obscures parts of an image or video, such as an individual's face. | Coming Soon | Coming Soon |
|  Transformation | Video Summarization | Condenses video to a relatively shorter video segment. May be done by concatenating video segments containing some criteria, eg. of an input video recording of a parking lot, produce an output video which concatenates only the video segments containing cars; ie. remove all video segments of an empty parking lot from the original video. | Coming Soon | Coming Soon |
|  Transformation | Video Editing | Modifies video to rearrange component parts, shorten the video or produce other manipulations. | Coming Soon | Coming Soon |