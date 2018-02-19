

Object Recognition engines take videos or still images in as inputs, and output objects found, start and end times when each object appears in the media file and its confidence score. These objects may include people, places and things. Note that we have separate  for Logo Recognition and OCR, which are often considered part of the Object Recognition family.

Please note that we classify Face-related engines under Biometrics.

## Inputs

Input assets to object recognition engines typically take the form of video files. Be sure to indicate your preferred and supported input format MIME types in the build .

## Outputs

Object Recognition engines produce . This series data must be provided two ways: as an uploaded asset using the Create Asset endpoint of the Veritone API, and the engine's Task Output. See the  for more info.
