---
title: Metadata Outputs
---

When constructing your engine, you&rsquo;ll want to define the fields to accept as inputs and write as outputs for task processing. Each engine category in Veritone has a unique set of supported input types and required and optional input and output fields. The following pages define Metadata Output formats currently supported by Veritone Developer.

Feel free to contact us via e-mail or [Slack channel](https://chat.veritone.com) if your engine produces outputs that cannot easily be aligned with these standard output formats, and we will work with you to assess the feasibility of altering existing standards or creating a new category of accepted outputs.

Each asset must contain the following fields at the root level:

| Fields            | Type           | Required | Description                                                                     | Example                                                      |
| ----------------- | -------------- | -------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| vtnVersion        | string         | yes      | The asset specification version number. Currently '20170929'.                   | "vtnVersion": "20170929"                                     |
| vtnSourceEngineId | string         | no       | The engine ID of the engine producing this asset.                               | "vtnSourceEngineId": "50a37c4e-ef02-42b4-8ffd-64228b7d7a2d"  |
| vtnSourceTaskId   | string         | no       | The task ID of this execution. The task ID is provided in the engine's payload. | "vtnSourceTaskId": "00b9bfc7-9067-4c14-b38e-ef7af5f26c03"    |
| vtnInputAssetIds  | array <string> | yes      | The asset IDs of the assets used by this engine to produce outputs.             | "vtnInputAssetIds": ["d7d41af8-679b-4bde-85ac-bb94345a8917"] |
| vtnCreatedEpoch   | int            | no       | The epoch time at which this asset is created.                                  | "vtnCreatedEpoch": 1506994899                                |
