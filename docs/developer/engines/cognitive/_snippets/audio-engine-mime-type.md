<!-- markdownlint-disable first-line-h1 -->

?> All engines that process audio will receive audio data with MIME type `"audio/wav"` (.mp3 and .mp4 are _not_ natively supported).
If your engine needs a format other than `audio/wav`, you will need to transcode incoming `wav` data to the appropriate target format using something like [ffmpeg](https://ffmpeg.org/).
