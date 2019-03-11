[Cognitive engines](/developer/engines/cognitive/) are the workhorses of aiWare.
They process the data brought in by adapters and employ sophisticated algorithms and machine learning techniques to produce even more data from which you can derive actionable insights.
Examples of what a cognition engine does include natural language processing, transcription, and object detection.

You can build a pipeline of cognitive engines, to be run sequentially or in parallel, each one enhancing the target output data set.  For example, a pipeline could include the following engines:
1. Ingest video stream (Adapter)
2. Transcribe video to text (Cognitive)
3. Translate to another language (Cognitive)
4. Do sentiment analysis (Cognitive)

Each cognitive engine conforms to a particular [class](/developer/engines/cognitive/?id=classes) and [capability](/developer/engines/cognitive/?id=capabilities).
