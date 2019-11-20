# Engine Certification and Approval Process

Once your engine is pushed to the Veritone Docker registry, various checks need to be performed on _our_ end before the engine can be considered ready for use.

![Approval process](EngineApproval.svg)

Your engine will be checked in terms of:

* Manifest validation
* Security vulnerabilities
* Network-awareness
* Build soundness (output validation)

You will be notified (within 72 hours) as to the status of your engine. If the engine is Approved, you can Deploy it immediately. If it is not Approved, you'll be told the status of the engine, and you can take appropriate steps to address any problems.

## Certification Process

The relationship between engine states, VDA build status, and the onboarding process is depicted in the diagram below.

![Certification workflow](EngineOnboarding.svg)

### Engine Status

The possible statuses of an engine are:

```pre
approved
available
deleted
deploying
deployed
deployFailed
disapproved
fetching
invalid
paused
pending
uploaded
```

### Manifest validation

During the initial upload process, the `manifest.json` file is extracted from the Docker image.
The content of the manifest is then checked against the [manifest standards](/developer/engines/standards/engine-manifest/).

### Docker Security

Next, the layers of the Docker image are analyzed for critical security flaws.

As you build your Docker container image, remember that you need to know exactly what goes into each layer.
If the source (base image) is not trusted, do not use it.
Once the trusted source is confirmed, use the latest version available.
Your number one priority is to keep the host operating system properly patched and updated.
Similarly, processes running inside your container should have the latest security updates.

### Network awareness

When you registered your engine with Veritone, you were required to specify whether you engine should be considered network-isolated, or network-aware. (See [Engine Deployment Models](developer/engines/deployment-model/?id=engine-deployment-models) for more information on the choices available.)
If you specified that your engine is _network-isolated_, and yet it makes calls to an external IP address using a wire protocol, this could result in your engine being marked `disapproved`.

### Build test

The build test looks to see if your engine produces output that conforms to the [vtn-standard](developer/engines/standards/engine-output/).

## Engine Development Best Practices: How to Speed Up Approval

### Common Manifest Issues

If your engine does not appear in the builds table for an extended amount of time after pushing to the Veritone registry, check the manifest to make sure the `engineId` is correct.
Also, be sure the JSON is valid JSON (not malformed as a result of a typo).

### Common Output Issues

Issues with outputs are often caused by outputs that do not follow the Veritone [engine output standard](/developer/engines/standards/engine-output/).
If your result does not appear in CMS, first make sure the engine output is created by the task, then check to see if the output follows the Veritone standard.

### Logging

All engine logs should output to stdout.
The task log is accessible in the tasks info section of the task table in [Veritone Developer](https://developer.veritone.com) after completion.

### Testing Locally

The best way to test locally is to generate a real task from the API.
You can do this with GraphQL queries in the [GraphiQL sandbox](https://api.veritone.com/v3/graphiql). Or you can visit the Tasks tab on the engine's page of [Veritone Developer](https://developer.veritone.com) to create a task for your engine to run.
You can run the task locally by passing the payload into your engine as an environment variable.

Alternatively, if you are using the [Veritone Engine Developer's Toolkit](/developer/engines/toolkit/) to build your engine there is a local testing harness available as part of toolkit SDK.
