# Technologies Used

## Docker

### What is Docker?

Docker provides a way to run engines securely isolated in a container, packaged with all dependencies and libraries.
Docker containers deployed on Linux can be updated on-the-fly, so that you can easily swap builds to update your engine with bug fixes or the latest version.
Today, aiWARE supports Linux docker containers.

### Docker Images and Containers on aiWARE

Engines on aiWARE are deployed as Docker images.
Each image is an executable package which includes everything needed to run your engine: the code, a runtime, libraries, environment variables and configuration files.

A container is a runtime instance of an image.
This is what the image becomes in memory when executed.
When an engine needs to process tasks, one or more containers (or instances) of that engine may be started to process that task.
When all tasks are complete, containers will be shut down to conserve resources.

aiWARE currently only supports Windows docker containers.

### Other Resources

You can find more information on Docker here:

- https://docs.docker.com/get-started/
- https://docs.docker.com/

<!--TODO: Document
## GraphQL

<describe usage in VDA>
<external resources>
-->
