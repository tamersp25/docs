# Adapters
Adapters (also referred to as ingestion engines) are used to bring data into the Veritone platform. They act as a gateway between an external source and Veritone to collect and process data, regardless of where it comes from. With adapters, data can be consumed in the form of a real-time stream or a bounded file and it can be comprised of either structured or unstructured data. Once data is ingested, it can be processed by cognitive engines to provide users with additional insights. 

Veritone provides built-in adapters out of the box for several popular data sources such as Amazon Web Services S3, YouTube, Google Drive, Box, Dropbox, and RSS feeds. Depending on your needs, your integration may require use of a custom adapter. Fortunately, Veritone Developer makes it easy to create custom adapters to collect data from external resources that are not already supported to meet your individual requirements. 

Before you begin development, it’s important to understand how all of the pieces and processes work together. You can continue reading to get a general overview of how adapters work in Veritone, or if you're ready to get started right away, head over to our [Quickstart](https://docs.veritone.com/#/adapters/quickstart/) for step-by-step instructions to getting your integration up and running as quickly as possible.

Remember that our developer support team is here to answer questions and provide assistance. Reach out to us on our [Slack channel](https://chat.veritone.com/) any time you need help.

### Adapter Types

Adapters fall into two categories, which are defined by the way data is served up from the source. The protocol follows a client-server approach for communication between the data source and the adapter. Based on the nature of the interaction, an adapter will operate in either a push or a pull manner. 

**Pull Adapters**

Pull adapters are the most common type of adapter implementation. With this adapter type, data is pulled from a server by a client-initiated request, and a separate request is made each time data is to be retrieved.

**Push Adapters**

With push adapters, the data source serves as the client and drives the transfer operation by notifying the adapter (server) whenever new data is available. After the initial request, data continues to be pushed from the source to the adapter without any subsequent requests.

### The "Adapter" and “Build” Approach

Throughout Veritone Developer, the term *adapter* is used to reference the external-facing, user-friendly representation of your software. The actual code and processing algorithms are contained in a *build*. A single adapter can contain multiple builds, but only one build can deployed in production at a time. The adapter and build approach allows you to update, test, and refine your code while offering the latest version of your adapter to the marketplace. Once a new build is approved, it can be deployed to production and replace the existing one.

### Deployment Models

Adapters can be deployed in different ways to satisfy a broad set of security and compliance requirements. Veritone supports two deployment models that describe how and where your adapter will be made available to users: 

* **Network Isolated:** The adapter is fully isolated and runs solely within Veritone's infrastructure. It does not require network access.

* **External Access:** The adapter performs within its container and does not send user data off the container. It requires internet access for tasks such as license checks and database updates.

Both options give you the flexibility to choose exactly how you'd like to implement your solution. Selecting the best model depends on your business needs — the environment should promote availability and connectivity while providing maximum security, performance, and scalability.

### Manifest

The manifest is a JSON-formatted text file that describes the aspects of your adapter and build. It provides a full list of resources required for deployment, including settings that specify the data source to connect to and any login details required for accessing the source. Each build must specify a unique manifest in the Dockerfile in order to be deployed. Any time a build is modified, a new manifest must be created.

### Schemas

Adapters use a schema to define the structure of data that is retrieved from an external source. When creating an adapter, you’ll configure and apply a custom schema to your adapter service that describes how to properly ingest, store, and index data.

### APIs

Veritone's suite of APIs allow you to build the core strengths of the Veritone Platform into your technology. Our collection of GraphQL APIs support the entire task processing processing lifecycle — including payload retrieval, task statusing, returning output, and indexing results.

### Input/Output Models

When constructing your adapter, specific data fields must be used to define the inputs to and outputs from your service. Each adapter type has supported data types and required fields, and there are advanced options you can set to control other aspects of how data is delivered to its defined output.

### Task Processing Flow

An adapter in the Veritone platform follows a logical set of steps to process a task. This includes receiving a payload from Veritone with the task details and environment variables, retrieving the raw input data, transforming the data (if necessary), and providing it as an asset to Veritone where it can be processed by cognitive engines.

Each step in the task flow must be built into your code. You'll find detailed information and step-by-step instructions on adding the task processing flow to your code in the [Construction Guidelines](/adapters/quickstart/step-2) section of the Quickstart.

### Compliance Testing

Each build that's uploaded to Veritone is required to undergo compliance testing to ensure it works securely and meets the needs of our customers. Part of this testing includes a vulnerability scan of the Docker image to detect security issues and potential vulnerabilities. A build must pass the compliance testing before it can be deployed to production in Veritone. If security issues are found, a report that details the results of the testing is provided to give insight as to why the build did not pass.

### Adapter States

Veritone Developer uses *Adapter States* to capture the most relevant aspects of an adapter's lifecycle and operations and to help you easily identify and track your adapter's progression through the development workflow. 

There are four available states for adapters, three of which apply to workflow stages. Workflow-related states are automatically set by the system and transition from one to the next when certain functions are carried out. Upon registration, an adapter enters the *Pending* state. From there, it progresses to *Ready* when a build is approved, and it becomes *Active* when it's live in the Veritone platform. The final non-workflow state allows you to manually *Disable* an adapter and stop it from processing new tasks. 

The table below provides additional information about each of the adapter States, including details about transitions and optional actions that can be performed.

| **Adapter State** | **Description**                                                                                                                                                                                                                                            | **Available Actions**                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Pending**     | The _Pending_ state is system-triggered and takes effect when the adapter has been created but it does not have any _Approved_ builds.                                                                                                                                                                                                          | Edit, Disable, Delete |
| **Ready**       | The _Ready_ state is system-triggered and takes effect when an adapter has at least one approved build, but no builds that are deployed.                                                                                                                                                                                                        | Edit, Disable, Delete |
| **Active**      | The _Active_ state is system-triggered and takes effect when a build is deployed.                                                                                                                                                                                                                                                              | Edit, Disable, Delete |
| **Disabled**    | The _Disabled_ state is user-enabled. Disabling an adapter prevents it from running and processing new tasks. Any tasks that are in progress when the adapter is disabled will finish processing. In addition, when a build is *Disabled,* the _Deploy_ option will be removed from any _Approved_ builds. An adapter can only be set to _Disabled_ from the _Ready_ or _Active_ states. | Enable |

#### Build States

The build state allows you easily identify and track a build's progression through the workflow cycle. Veritone uses seven different states to capture the most relevant aspects of a build's lifecycle stages and general operations.

| **Build State** | **Description**                                                                                                                                                                                                                                            | **Available Actions**                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Fetching        | The _Fetching_ state is system-triggered and takes effect when the build has been successfully uploaded and is undergoing compliance testing.                                                                                                              | N/A                                    |
| Available       | The _Available_ state is system-triggered and takes effect when a build successfully completes and passes the compliance testing process. A build in the _Available_ state can be deployed to production. | Submit, Delete, Download Build Report  |
| Invalid         | The _Invalid_ state is system-triggered and takes effect when a build fails the compliance testing process. A report can be downloaded that presents testing results.                                                                                      | Delete, Download Build Report          |
| Deploying        | The _Deploying_ state is user-triggered upon clicking **Deploy**. It displays while the system is in the process of deploying the adapter.                              | N/A  |
| Disapproved     | The _Disapproved_ state is system-triggered and takes effect when build is not approved for deployment.                                                                                                                                                    | Delete                                 |
| Deployed        | The _Deployed_ state is system-triggered and takes effect when a adapter is _Deployed_. This status automatically sets adapter's state as _Active_.                                                                                        | Pause, Delete, Download Build Report   |
| Paused          | The _Paused_ state is user-triggered and suspends operation of the build. A build can be manually put in the _Paused_ state, or a previously deployed build will enter the _Paused_ state when a new build is _Deployed._                                  | Unpause, Delete, Download Build Report |

### Adapter Development Process

When developing your adapter, you'll work locally, package and upload your build as a Docker image, then deploy your approved container to production.

1. [Register your adapter](https://docs.veritone.com/#/adapters/quickstart/step-1) by specifying basic information about your adapter, including the name, type, description, logo, and deployment model.

2. Add APIs and [configure your code](https://docs.veritone.com/#/adapters/quickstart/step-2) to support Veritone's task processing flow and your adapter’s specific input/output fields.

3. [Create your manifest file](https://docs.veritone.com/#/adapters/quickstart/step-3) with details about your adapter and how it will run.

4. [Build a Dockerfile](https://docs.veritone.com/#/adapters/quickstart/step-4) that packages your code, dependencies, and manifest, and use it to create a Docker image. Then push your Docker image to Veritone's Docker Registry and initiate the compliance testing process.

5. [Submit your build for approval](https://docs.veritone.com/#/adapters/quickstart/step-5) by a member of our team.

6. [Deploy your approved ](https://docs.veritone.com/#/adapters/quickstart/step-6)adapter to production in the Veritone Platform.


Our [Quickstart](https://docs.veritone.com/#/adapters/quickstart/) is designed to take you through the development workflow as quickly as possible. By the end, you'll have created and deployed a custom adapter in the Veritone Platform.

### Help and Resources

Our documentation and resources are designed to help get your adapter up and running as quickly as possible, but if you have any questions, please don't hesitate to reach out to our developer support team for help.
