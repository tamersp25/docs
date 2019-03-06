# Face Detection 

![](badge/API/Yes/green)
![](badge/Search/No/red)
![](badge/UI/Partial/yellow)

Face detection engines can detect human faces in media assets, and locate them (within the visual frame) in terms of a bounding polygon.
Unlike a [face recognition engine](/engines/cognitive/biometrics/face-recognition/), the face *detection* engine merely determines whether a face (*any* face) was detected. 
It does not try to identify the face or match it to other data.

## Engine Build Construction Guidelines

### Recommended Manifest Fields

All face detection engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

Here is a minimal example `manifest.json` that could apply to a face detection engine:

[](vtn-standard.example.json ':include :type=code javascript')

See the full documentation for [engine manifest standards](/engines/standards/engine-manifest/) for more details.

## Engine Input

TODO

## Engine Output

TODO

### Example
Here is an example of the simplest type of face detection output:

[](vtn-standard.example.json ':include :type=code json')

[Primary Source](https://github.com/veritone/core-graphql-server/blob/master/dal/taskOutputConversionUtil.js#L124)
