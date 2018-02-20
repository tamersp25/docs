

Transcription engines take in audio or video files and output a text description of the contents of those files. Such engines are also known as Automatic Speech Recognition (ASR) or Speech-to-Text (STT).  The basic output will include any speech contained in the files but additional value can be derived by describing sounds, speakers and scenarios.

Transcription Engines can either be Machine Only, Hybrid (Machine + Human Review), or Human Only.  If an engine involves some degree of Human transcription, it must output TTML (see below).

## Inputs

Input assets to transcription engines typically take the form of video or audio files. Be sure to indicate your preferred and supported input MIME types in the build .

## Outputs

Transcription engines are required to create two assets, one of  and another of . Both assets must be uploaded using the Create Asset endpoint of the Veritone API. See the  for more info.
