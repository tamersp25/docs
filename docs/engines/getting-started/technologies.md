Technologies Used

# Docker

<describe usage in VDA>

## What is Docker?
Docker provides a way to run engines securely isolated in a container, packaged with all dependencies and libraries. Docker containers deployed on Linux can be updated on-the-fly, so that you can easily swap builds to update your engine with bug fixes or the latest version. Today, Veritone supports Linux dockers.

## Docker Images and Containers on aiWARE
Engines on aiWARE are deployed as Docker images. Each image is an executable package which includes everything needed to run your engine -- ie. the code, a runtime, libraries, environment variables and configuration files.

A container is a runtime instance of an image. This is what the image becomes in memory when executed. Each time an engine processes a task, a container (or instance) of that engine (ie. Docker image) is created. Once the task is complete, the container which processed it goes away. So, containers are spun up and down as tasks are processed by each engine.

<external resources>

You can find more info on Docker here:
<br> https://docs.docker.com/get-started/
<br> https://docs.docker.com/

GraphQL
<describe usage in VDA>
<external resources>
