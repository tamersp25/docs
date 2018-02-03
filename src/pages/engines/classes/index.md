---
title: Cognitive Engine Classes
order: 2
---

Veritone currently supports 7 engine categories. Descriptions for each class are provided below.

We continue to add more classes to meet ever evolving customer needs. If you have an engine that doesn't fit into any existing class, please get in touch with us to discuss consideration.

Use the /api/engine/category endpoint to retrieve the latest available engineCategoryName and engineCategoryId values.

For information about the expected inputs and outputs for engines in each category, click on the category name or refer to the pages for each category under

New CategoriesIf there is a class or category that doesn't fit your particular cognitive engine, please email us at [ecosystem@veritone.com](ecosystem@veritone.com), and we can work with you on supporting your category.

| Class          | Category                    | Includes                                               | Description                                                                                 |
| -------------- | --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Speech         | Transcription               | Machine, Human, Hybrid                                 | Speech to Text, with or without Natural Language Processing (NLP)                           |
|                | Speaker Separation          |                                                        | AKA Diarization                                                                             |
|                | Phonetic Search             |                                                        | Enables search based on voice input without transcription first                             |
|                | Sentiment Analysis          |                                                        | From Spoken Word not Text                                                                   |
|                | Language Recognition        |                                                        | Indicates the language being spoken                                                         |
|                | Speech Detection            |                                                        | Simply identifies the presence of spoken words                                              |
|                | Speech Conversational Bot   |                                                        | Understanding of human speech as the UI for tasks                                           |
|                | Keyword Spotting            |                                                        | Finding audio files that contain specifically identified words                              |
|                |                             |                                                        |                                                                                             |
| Text           | Translation                 | Machine, Human, Hybrid                                 | Text to text translation, with or without Natural Language Processing (NLP)                 |
|                | Text-to-Speech              |                                                        | Creates spoken words (audio speech) from text                                               |
|                | Text Keyword/Topic Analysis |                                                        | Frequency, Categorization, etc                                                              |
|                | Natural Language Generation |                                                        | Creates written prose based on structured data, e.g. sports box scores                      |
|                | Text Analytics              |                                                        | Includes Social Listening, Content Optimization, etc                                        |
|                | Text Sentiment Analysis     |                                                        | Anayzes positive/negative sentiment trending throughout a file                              |
|                | Text Language Recognition   |                                                        | Indicates the language used in text                                                         |
|                | Text Moderation             |                                                        | Identification of certain text, like offensive words ; NSFW                                 |
|                | Text Conversational Bot     |                                                        | Understanding of text inputs as the UI for tasks                                            |
|                |                             |                                                        |                                                                                             |
| Vision         | Object Recognition          | Logo, Vehicle, Food, Art, Apparel, Landmark, Weapon    | General classification hierarchy (food, vehicles, clothing, tech, etc)                      |
|                | OCR                         | License Plate, Handwriting                             | Extracts text from image / video. Includes Handwriting                                      |
|                | Barcode/QR Code Recognition |                                                        | Automatically reads machine codes and associates with goods or URLs                         |
|                | Image Attributes            |                                                        | Colors, Focus, Resolution, etc.                                                             |
|                | Scene Description           |                                                        | Returns a summary of the scene e.g. Donald Trump Speaking in front of a Crowd               |
|                | Visual Moderation           |                                                        | Returns tags of explicit, NSFW, gory or other objects                                       |
|                | Object Matching             |                                                        | Defines a specific object or pattern and searches across files for match                    |
|                | Motion Tracking             |                                                        | For instance, shop floor or merchandise movement                                            |
|                | Action Classification       | Gestures, Actions                                      | E.g. running, fighting, car driving, ball in movement, plane flying, etc.                   |
|                | Visual Anomaly Detection    |                                                        | Detects anomalies in video or images                                                        |
|                |                             |                                                        |                                                                                             |
| Biometrics     | Face Detection              |                                                        | Returns presence of a human face, often with bounding box                                   |
|                | Face Recognition            |                                                        | AKA Face Authentication Includes Facial Feature Biometrics (eg. iris, retina, nose, ear)    |
|                | Face Verification           |                                                        | Compares two input images and returns a confidence score that the faces are the same person |
|                | Face Attributes             | Demographics, Emotion, Pose, Gaze/Attention            | Age, gender, ethnicity, hair, height, weight                                                |
|                | Human Markers               |                                                        | Traits other than face and voice that are unique to any individual. Eg. fingerprint, DNA    |
|                | Voice Recognition           |                                                        | AKA Voice Biometrics, Voice Fingerprinting. Identifies person from voice                    |
|                | Voice Analysis              |                                                        | Stress, Health, Genealogy etc.                                                              |
|                | Vital Signs                 |                                                        | Body temperature/energy, heart rate, EEG, blood type, etc.                                  |
|                |                             |                                                        |                                                                                             |
| Audio          | Audio Detection             |                                                        | Detects presence of certain audio in a file, possibly categorizing (e.g. speech or music)   |
|                | Audio Fingerprinting        |                                                        | Creating a sample audio (or acoustic) reference and finding matches                         |
|                | Audio Content Recognition   |                                                        | Including music, copyrighted material, book excerpts, quotes, etc.                          |
|                | Audio Analytics             |                                                        | Extracts audio features, waveforms, etc.                                                    |
|                | Audio Generation            | Music                                                  | E.g. Music or special effects generation                                                    |
|                |                             |                                                        |                                                                                             |
| Data           | Data Anomaly Detection      |                                                        | Includes Risk/Fraud Management                                                              |
|                | Prediction/Trend Analysis   | Trading Data                                           | Uses historical pattern of data to predict future trajectory                                |
|                | Geolocation                 |                                                        | Lat/Long, Mapping                                                                           |
|                | Data Analytics              |                                                        | General analysis of data patterns, outside of other categories                              |
|                | Metadata Extraction         |                                                        | Extracts data features from files                                                           |
|                | Optimization                | Planning, Scheduling, Resource Allocation, Advertising | Encompasses all business optimization                                                       |
|                | Recommendation              | Content, Commerce, etc                                 | Recommend content or course of action based on data                                         |
|                |                             |                                                        |                                                                                             |
| Transformation | Transcoding                 |                                                        | Changes filetype and features (mono/stereo, bitrate, etc)                                   |
|                | Redaction                   | Text, Audio, Visual                                    | Censoring or removing bits of content                                                       |
|                | Normalization/Combination   | Text, Audio, Visual                                    | Merging similar documents like transcripts                                                  |
|                | Editing                     | Mashups, image cropping, thumbnails etc                | Edits the input file, may be a document, image, video, audio clip, etc.                     |
|                | Video Synopsis              |                                                        | Condensing long video into one short video of concatenated relevant clips                   |
|                | Text Alignment              |                                                        | Ingesting a paired transcript and audio or video file, and time-correlating them            |
