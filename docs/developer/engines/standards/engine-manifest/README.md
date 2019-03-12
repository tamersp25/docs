# Engine Manifest

An engine manifest file is submitted with each new build of an engine on the Docker runtime.

Please see the individual [engine capability pages](/developer/engines/cognitive/?id=capabilities) for specific examples of engine manifests. 

?> The `manifest.json` needs to be located at `/var/manifest.json` in the Docker container in order for aiWARE to see it when the image is pushed. 

<!--TODO: Add official details here (from Seyi)-->
<!--TODO: Consider supportedInputFormat = vtn-standard-->
<!--TODO: Document mimetypes.
There's potentially some importance around `text/plain` vs `text/plan;charset=utf-8`
 - The supported types should be available in config
-->
