# Building a Face Detection Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

Face detection engines can detect human faces in media assets, and locate them (within the visual frame) in terms of a bounding polygon.
Unlike a [face recognition engine](/developer/engines/cognitive/biometrics/face-recognition/), a face *detection* engine merely determines whether a face (*any* face) was detected. 
It does not try to identify the face or match it to other data.

## Engine Manifest

All face detection engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

Here is a minimal example `manifest.json` that could apply to a face detection engine:

<!--TODO: Define [](manifest.example.json ':include :type=code javascript')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

TODO

## Engine Output

TODO

### Example
Here is an example of the simplest type of face detection output:

[](vtn-standard.example.json ':include :type=code json')
