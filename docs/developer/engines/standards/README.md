# Standards Reference

Veritone maintains specific standard file formats that aiWARE relies on to communicate with engines.
These standards help ensure that all engines are "speaking the same language" when identifying themselves,
sending messages, and reporting the insights they uncover.

The three types of engine standards are:

- [Engine Manifest](/developer/engines/standards/engine-manifest/) (i.e. `manifest.json`): A file included in an engine build that explains how the engine behaves.
- [Engine Output](/developer/engines/standards/engine-output/) (i.e. `vtn-standard`): A specification for how an engine can report its insights as output.

<!--TODO: Add back - [Message Types](/developer/engines/standards/message-types/): The types of messages engines can read and write to/from the edge kafka queue.-->
