<!-- TODO: Incorporate PR https://github.com/veritone/docs/pull/42 -->

# Building an Entity Extraction Engine

![](badge/API/Yes/green)
![](badge/Search/Yes/green)
![](badge/UI/Yes/green)

Entity extraction engines classify named entities, located in unstructured text, into predefined categories such as People, Organizations, and/or Locations.

## Engine Manifest

All entity extraction engines should specify the following parameters in their build manifest:

| Parameter | Value |
| --------- | ----- |
| `TODO` | `TODO` |
| `TODO` | `TODO` |

<!-- Here is a minimal example `manifest.json` that could apply to an entity extraction engine: -->

<!--TODO: Define [](manifest.example.json ':include :type=code javascript')-->

See the full documentation for [engine manifest standards](/developer/engines/standards/engine-manifest/) for more details.

## Engine Input

<!-- TODO -->

### Training and Libraries

<!-- Since all entity extraction engines identify entities, they are all required to be [trainable via libraries](/developer/libraries/engines). -->

## Engine Output

<!-- TODO -->

### Example
<!-- TODO   Here is an example of the simplest type of entity extraction output: -->

[](vtn-standard.example.json ':include :type=code json')

[Primary Source](https://github.com/veritone/core-graphql-server/blob/master/dal/taskOutputConversionUtil.js#L133)

