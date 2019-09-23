# Engine Approval Process

Once the engine is pushed to the Veritone Docker registry various checks are performed before the engine is ready for use.
During the initial upload process, the manifest.json is extracted from the Docker image.
The content of the manifest is then checked against the [manifest standards](/developer/engines/standards/engine-manifest/).
Next the layers of the Docker image are analyzed for critical security flaws.
If the engine passes both tests, it should appear in the builds section on the engine page.
It is then ready to be submitted for final human approval.

## Docker Security

As you build your Docker container image, you need to know exactly what goes into each layer.
If the source is not trusted then do not use it.
Once the trusted source is confirmed, use the latest version available.
Your number one priority is to keep the host operating system properly patched and updated.
Similarly, processes running inside your container should have the latest security updates.

## Engine Development Best Practices: Speed Up Approval

### Common Manifest Issues

If your engine does not appear in the builds table for an extended amount of time after pushing to the Veritone registry, check the manifest to make sure the `engineId` is correct.

### Common Output Issues

Issues with outputs are often caused by outputs that do not follow the Veritone [engine output standard](/developer/engines/standards/engine-output/).
If your result does not appear in CMS, first make sure the engine output is created by the task, then check to see if the output follows the Veritone standard.

### Logging

All engine logs should output to stdout.
The task log is accessible in the tasks info section of the task table in [Veritone Developer](https://developer.veritone.com) after completion.

### Testing Locally

The best way to test locally is to generate a real task from the API.
Visit the Tasks tab on the engine's page of [Veritone Developer](https://developer.veritone.com) to create a task for your engine to run.
You can run the task locally by passing the payload into your engine as an environment variable.

Alternatively, if you are using the [engine toolkit (beta)](/developer/engines/toolkit/) to build your engine there is a local testing harness available as part of toolkit SDK.
