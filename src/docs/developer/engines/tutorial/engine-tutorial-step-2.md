<!-- markdownlint-disable -->

<style>
aside  {
  border-style: solid;
  border-radius: 9px;
  border-width: 2.2px;
  border-color:#ccc;
  padding: 5px;
  background: #e6e8ef;
}

aside.small {
  display:inline;
  font-size:9pt;
  position:relative; top:-4px;
}

.topruled {
  border-top-width: 1.2px;
  border-top-style: solid;
  border-top-color: rgb(76, 76, 100);
  line-height:45%;
}
.bottomruled {
  border-bottom-width: 1.2px;
  border-bottom-style: solid;
  border-bottom-color: rgb(76, 76, 100);
  line-height:45%;
}
</style>

<h2 style="display: inline;">Step 2: Use Docker to create a build &nbsp;</h2>&nbsp;&nbsp;<aside class="small">
<b>ESTIMATED TIME:</b> 10 minutes </aside> &nbsp;

In this step, we'll create a Dockerfile, and use Docker to create a deployable engine _build_.

?> This step assumes that you have already installed Docker on your MacOS or Linux development machine. (Docker for Windows is not yet supported.)

## Why Docker?

Veritone engines are Docker containers that run in the aiWARE platform.
Conceptually, you can think of a Docker image as a self-contained, runnable black box that has a single well-defined entry point.

?> Terminology note: A Docker _container_ is a running instance of a Docker _image_. 

Implementing engines as Docker images brings many benefits, including:

* **Easy deployment**: Everything is in one self-contained physical file (called an _image_, or a _build_) that contains its own configuration info.
* **Process isolation**: A Dockerized app runs in its own sandbox, fully insulated from other runtimes.
* **Scalability**: Veritone can dynamically spin up as many or as few instances of your engine as conditions warrant.
* **Network friendliness**: Dockerized apps can communicate with the world (or with each other) via many network topologies.
* **CI/CD-friendliness**: Docker is command-line-driven and offers a good fit with build-automation technology.
* And lots more.

> If you're new to Docker, you might want to spend some time with the [Docker docs](https://docs.docker.com/get-started/).

## Be Sure Your Project Is Structured Correctly

Take a moment to be sure your project files are in the correct places, so that Docker can find them.
As mentioned in [the first page of this tutorial](developer/engines/tutorial/), the project files should look like:

<pre>/hello-world
    |&mdash; /dist
        |&mdash; engine
    |&mdash; Dockerfile
    |&mdash; index.js
    |&mdash; keyword-extraction.js
    |&mdash; manifest.json
    |&mdash; package.json
    |&mdash; /var
</pre>

?> One reason this is important is tha your Dockerfile instructions will tell Docker how to copy your `manifest.json` file into the build. Without this manifest, your engine will not deploy correctly later on.

## Create Your Dockerfile

A [Dockerfile](https://docs.docker.com/engine/reference/builder/) is just a text file that explains to Docker how to build an image. You can think of a it as a recipe made up of one-line commands (although if you want, commands _can_ span more than one line).

The syntax for Dockerfiles is actually pretty self-explanatory. If you read a Dockerfile, it's usually clear what's going on.

Here's the Dockerfile for our Hello World project:

```dockerfile 
FROM mhart/alpine-node:8
COPY . /app
COPY manifest.json /var/

COPY ./dist/engine /app/engine

WORKDIR /app
RUN npm install -i

RUN apk update \
        && apk upgrade \
        && apk --no-cache add ca-certificates

ENV VERITONE_WEBHOOK_READY="http://0.0.0.0:8080/readyz"
ENV VERITONE_WEBHOOK_PROCESS="http://0.0.0.0:8080/process"
ENTRYPOINT [ "/app/engine", "node", "index.js" ]
```

### Line by Line:

Your Dockerfile should contain exactly one FROM command, at the very top. The purpose of this command is to specify the _base image_ from which your custom Docker image will be built.

?> In the Docker world, every Docker image must be built off a parent (base) image.

Our Dockerfile says to base our image off `mhart/alpine-node:8`, which is a minimal Node.js image, on [Alpine Linux](https://alpinelinux.org/), available via [https://hub.docker.com/r/mhart/alpine-node](https://hub.docker.com/r/mhart/alpine-node).

 `COPY . /app` means to copy (recursively) everything in the current context &mdash; that is, the current directory &mdash; to a folder called `/app`.

 `COPY manifest.json /var/` means to copy our manifest file to the `/var/` folder.
 
 `RUN npm install -i` means to run the Node package manager, npm, using the `install` command. By default, `npm install` will install all modules listed as dependencies in `package.json`, if such a file exists.
 
 `COPY ./dist/engine /app/engine` means what you think it does: Copy our `engine` file from `/dist` to `/app/engine`.
 
 `WORKDIR /app` means to make `/app` our working directory.
 
 `RUN apk update \
      && apk upgrade \
      && apk --no-cache add ca-certificates` &mdash; This updates Alpine Linux to include the latest CA-certs so that TLS works properly.
  
 > If you fail to update your image's certificates, your engine may report X.509-related ("untrusted site") errors at runtime when you attempt to access signed URIs.
          
`ENV VERITONE_WEBHOOK_READY="http://0.0.0.0:8080/readyz"` &mdash; Sets the environment variable that tells the `engine` driver which route to contact with the readiness probe.

`ENV VERITONE_WEBHOOK_PROCESS="http://0.0.0.0:8080/process"` &mdash; Env variable to identify the "process" route.

### Entry Point

The final line of our Dockerfile, `ENTRYPOINT [ "/app/engine", "node", "index.js" ]`, tells Docker where to find the entry point of our container.
On startup, we want our container to execute the `engine` binary, which is the Toolkit driver.
The driver will (in turn) pick up extra command-line arguments that tell it how to fire up our engine. (Namely: Run `node` with an argument of `index.js`.)

## Building the Engine

To build your engine, run the following command in a terminal (e.g., a bash shell):

```bash
docker build -t hello-world .
```

> Do not omit the trailing period in this command.

The Docker daemon should swing into action,  building your image.  In the console, you'll see something similar to this:

```pre
Sending build context to Docker daemon  18.16MB
Step 1/10 : FROM mhart/alpine-node:8
 ---> b9df20fda4ef
Step 2/10 : COPY . /app
 ---> 8e9498d2fede
Step 3/10 : COPY manifest.json /var/
 ---> 3a2d603d9fb8
Step 4/10 : COPY ./dist/engine /app/engine
 ---> 53c0b02010e2
Step 5/10 : WORKDIR /app
 ---> Running in 8ae399220a7f
Removing intermediate container 8ae399220a7f
 ---> 51a7a86835c8
Step 6/10 : RUN npm install -i
 ---> Running in 41cd3c6522d5
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN hello-world@1.0.0 No description
npm WARN hello-world@1.0.0 No repository field.

added 71 packages from 47 contributors and audited 164 packages in 2.724s
found 0 vulnerabilities

Removing intermediate container 41cd3c6522d5
 ---> 003d48c3ce60
Step 7/10 : RUN apk update         && apk upgrade         && apk --no-cache add ca-certificates
 ---> Running in 96ff2c8839a5
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/community/x86_64/APKINDEX.tar.gz
v3.6.5-44-gda55e27396 [http://dl-cdn.alpinelinux.org/alpine/v3.6/main]
v3.6.5-34-gf0ba0b43d5 [http://dl-cdn.alpinelinux.org/alpine/v3.6/community]
OK: 8442 distinct packages available
OK: 5 MiB in 15 packages
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/main/x86_64/APKINDEX.tar.gz
fetch http://dl-cdn.alpinelinux.org/alpine/v3.6/community/x86_64/APKINDEX.tar.gz
(1/1) Installing ca-certificates (20161130-r3)
Executing busybox-1.26.2-r11.trigger
Executing ca-certificates-20161130-r3.trigger
OK: 6 MiB in 16 packages
Removing intermediate container 96ff2c8839a5
 ---> a51b8d2070b6
Step 8/10 : ENV VERITONE_WEBHOOK_READY="http://0.0.0.0:8080/readyz"
 ---> Running in 9d3979283eb1
Removing intermediate container 9d3979283eb1
 ---> b3ade3dffab5
Step 9/10 : ENV VERITONE_WEBHOOK_PROCESS="http://0.0.0.0:8080/process"
 ---> Running in 3c01dfd014f3
Removing intermediate container 3c01dfd014f3
 ---> 389b21b9b7d3
Step 10/10 : ENTRYPOINT [ "/app/engine", "node", "index.js" ]
 ---> Running in d60071122938
Removing intermediate container d60071122938
 ---> a59635e1673d
Successfully built a59635e1673d
Successfully tagged hello-world:latest
```

The console messages, as you can see, are reasonably verbose (and, for the most part, self-explanatory). If your build encounters errors, you'll be told exactly which Dockerfile command failed, and why.

In this case, our build went smoothly. Which means we're ready to test the engine!

## Recap and Cheat Sheet

In this lesson, we learned how to: 
* Create Docker build instructions in a simple text file called a _Dockerfile_.
* Base a build off a preexisting parent build or _base image_ using the `FROM` keyword.
* Use `COPY` to make Docker copy files.
* Use `RUN` to make Docker execute shell instructions during the build process.
* Use `RUN` commands to update an image's CA certificates so that container-based SSL works at runtime.
* Use `ENV` to specify container-specific environment variables.
* Use `ENTRYPOINT` to specify the runtime entry point of our Docker container.
* Use the `docker build` command to create an engine's _build_ (the deployable image).

**NEXT:**
[Test your build locally ⇨](developer/engines/tutorial/engine-tutorial-step-3)
          
 
 