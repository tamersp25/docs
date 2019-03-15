# Building a Face Recognition Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

Face recognition engines can analyze human faces in media assets, and score them as to similarity with known faces.

## Engine Manifest

<!-- TODO

All face recognition engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

Here is a minimal example `manifest.json` that could apply to a face recognition engine:
-->

<!--TODO: Define [](manifest.example.json ':include :type=code json')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

<!-- TODO ## Engine Input -->

<!-- TODO -->

### Training and Libraries

Since all face recognition engines identify entities, they are all required to be [trainable via libraries](/developer/libraries/engines).

## Engine Output

Face recognition engine output should be stored as `object`s in the time-based `series` array in [vtn-standard](/developer/engines/standards/engine-output/).
Each `object` should be of type `face`, and because each recognized face always maps back to an entity in a library, each object should always include the `entityId` of that original entity in its output, along with the `libraryId` where it can be found.

### Example

Here is an example of the simplest type of face recognition output:

[](vtn-standard.example.json ':include :type=code json')

[Primary Source](https://github.com/veritone/core-graphql-server/blob/master/dal/taskOutputConversionUtil.js#L133)
