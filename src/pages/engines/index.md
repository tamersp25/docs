---
title: Engines
---

As a Veritone ecosystem partner, you have the unique opportunity to build a custom machine learning solution that runs on the Veritone Platform. With our flexible architecture and rich set of APIs, it takes only a few steps to connect your engine and make it available as a cognitive processing service to Veritone customers. And because the Veritone ecosystem is a container-based environment, you have the flexibility to code in any language, deploy on demand, and run your engine in its own secure, reliable environment.

Before you begin development, it&rsquo;s important to understand how all of the pieces and processes work together. The following sections provide a general overview of the pieces and processes involved in the engine lifecycle. Click on a section header to dive into more detail. If you're ready to get started right away, our [Quick-Start](./quick-start/) provides step-by-step instructions for getting your integration up and running as quickly as possible.

Remember that our developer support team is here to answer questions and provide assistance. Reach out to us on our [Slack channel](https://chat.veritone.com/) any time you need help.

## The Engine Pieces

#### The "Engine" and "Build" Approach

Within the Veritone Developer application, the word _engine_ is used to reference the external-facing, user-friendly representation of your software. The actual code and processing algorithms are contained in a _build_. A single engine can contain multiple builds, but only one build can deployed in production at a time. The engine and build approach allows you to update, test, and refine your code while offering the latest version of your engine to the marketplace. Once a new build is approved, it can be deployed to production and replace the existing one.

#### [Cognitive Engine Classes](classes/)

Veritone provides all of the processing power you need to support your machine learning tasks. With a portfolio of more than 50 cognitive engine categories across seven classes, our platform is designed to handle a variety of machine learning frameworks and algorithms. Simply choose the category that's best suited to your needs and follow the provided data structure for rapid development.

#### [Deployment Models](quick-start/step-1-create-an-engine#L169/)

Veritone supports four deployment models that describe how and where your software will be made available to users: Network Isolated, External Access, External Processing, and Human Review. Each of the four options give you the flexibility to choose exactly how you'd like to implement your solution. Selecting the best model for your organization depends on your business needs &mdash; the environment should ideally provide maximum security, performance, and scalability.

#### [Manifest](manifest/)

The manifest is a JSON-formatted text file that describes the aspects of your engine and build. It provides a full list of resources required for deployment, including the engine's unique ID and category, data types and sources, and runtime environment variables. Each build must specify a unique manifest in the Dockerfile in order to be deployed. Any time a build is modified, a new manifest must be created.

#### [APIs](../apis/)

Veritone's suite of APIs allow you to build the core strengths of the Veritone Platform into your technology. Our collection of GraphQL APIs support the entire task processing processing lifecycle &mdash; including payload retrieval, task statusing, returning output, and indexing results.

#### [Input/Output Models](engine-input-output/)
When constructing your engine, data fields must be used to define the inputs to and outputs from your service. Each engine category follows a unique model with supported data types and required fields, and there are advanced options you can set to control other aspects of how data is delivered to its defined output.

#### [Compliance Testing](quick-start/step-4-upload-build#L111/)
Each build that's uploaded to Veritone is required to undergo compliance testing to ensure it works securely and meets the needs of our customers. Part of this testing includes a vulnerability scan of the Docker image to detect security issues and potential vulnerabilities. A build must pass the compliance testing before it can be deployed to production in Veritone. If security issues are found, a report that details the results of the testing is provided to give insight as to why the build did not pass.


## The Engine Processes

#### Engine Development Process

When developing your engine, you'll work locally, package and upload your build as a Docker image, then deploy your approved engine container into production.

1. [Create an Engine: ](quick-start/step-1-create-an-engine/)Specify basic information about your engine, including the engine name, description, logo, and deployment model.
2. Add APIs and [configure your code](quick-start/step-2-construct-code/) to support Veritone's task processing flow and your engine category's specific input/output fields.
3. [Create your manifest file](quick-start/step-3-manifest/) with specific details about your engine and how it will run.
4. [Build a Dockerfile](quick-start/step-4-upload-build/) that packages your code, dependencies, and manifest, and use it to create a Docker image. Then push your Docker image to Veritone's Docker Registry and initiate the compliance testing process.
5. [Submit your build for approval](quick-start/step-5-submit-build/) by a member of our team.
6. [Deploy your approved engine](quick-start/step-6-deploy-engine/) to production in the Veritone Platform.
7. Perform various actions to [manage an active engine or build](quick-start/step-7-manage-engine/), such as pause, disable, or edit.

Our [Quick Start](quick-start/) is designed to take you through the engine lifecycle as quickly as possible. By the end, you'll have created and deployed an engine in the Veritone Platform.

#### Task Processing Flow

An engine in the Veritone Platform follows a logical set of steps to process a task. This includes receiving the payload from Veritone with the task details, retrieving the asset, analyzing and transforming the data into actionable information, generating output data, and returning insights to Veritone. Each step in the task flow must be built into your code. A high-level overview of the process is described below, and you'll find detailed information and step-by-step instructions on adding the task processing flow to your code in the [Engine Construction Guidelines](guidelines/).

* **Input:** Veritone passes a payload specifying the resources and operations of the task.

* **Processing:** The engine retrieves the asset and processes the data.

* **Upload Output:** Submit output data back to Veritone.

![](VDA-Task-Process-Flow-Diagram.png)

#### Engine States

The engine state allows you easily identify and track an engine's progression and regression through the workflow cycle. Veritone uses four different engine states to capture the most relevant aspects of an engine's lifecycle and operation.

Three engine states apply to workflow stages. They're automatically set by the system and transition from one to the next when certain functions are carried out. When an engine is newly created, it automatically enters the *Pending* state. From there, it progresses to *Ready* when a build is approved, and then *Active* when the engine is live in the Veritone Platform. The fourth state allows you to manually *Disable* an engine and stop it from processing new tasks. For added flexibility, each engine state offers optional actions that help you manage the engine's settings and operations.

The table below specifies the various engine states, transitions, reasons for the transitions, and optional actions that can be performed during each state.

| **Description** | **Available Actions**                                                                                                                                                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pending**     | The _Pending_ state is system-triggered and takes effect when the engine has been created but it does not have any _Approved_ builds.                                                                                                                                                                                                          | Edit, Disable, Delete |
| **Ready**       | The _Ready_ state is system-triggered and takes effect when an engine has at least one approved build, but no builds that are deployed.                                                                                                                                                                                                        | Edit, Disable, Delete |
| **Active**      | The _Active_ state is system-triggered and takes effect when a build is deployed.                                                                                                                                                                                                                                                              | Edit, Disable, Delete |
| **Disabled**    | The _Disabled_ state is user-enabled. Disabling an engine prevents it from running and processing new jobs. Any jobs that are in progress when the engine is disabled will finish processing. In addition, when a build is *Disabled,* the _Deploy_ option will be removed from any _Approved_ builds. An engine can only be set to _Disabled_ from the _Ready_ or _Active_ states. | Enable |

#### Build States

The build state allows you easily identify and track a build's progression through the workflow cycle. Veritone uses seven different states to capture the most relevant aspects of a build's lifecycle stages and general operations.

| **Build State** | **Description**                                                                                                                                                                                                                                            | **Available Actions**                  |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Fetching        | The _Fetching_ state is system-triggered and takes effect when the build has been successfully uploaded and is undergoing compliance testing.                                                                                                              | N/A                                    |
| Available       | The _Available_ state is system-triggered and takes effect when a build successfully completes and passes the compliance testing process. A build in the _Available_ state can be submitted to Veritone for approval and then be deployed into production. | Submit, Delete, Download Build Report  |
| Invalid         | The _Invalid_ state is system-triggered and takes effect when a build fails the compliance testing process. A report can be downloaded that presents testing results.                                                                                      | Delete, Download Build Report          |
| Approved        | The _Approved_ state is system-triggered and takes effect when build is verified as ready for deployment by Veritone. When a build enters the _Approved_ state, the engine's state automatically transitions to _Ready_.                             | Deploy, Delete, Download Build Report  |
| Disapproved     | The _Disapproved_ state is system-triggered and takes effect when build is not approved for deployment.                                                                                                                                                    | Delete                                 |
| Deployed        | The _Deployed_ state takes effect when a user deploys an _Approved_ build into production. When a build is _Deployed,_ the engine's status moves to _Active_.                                                                                        | Pause, Delete, Download Build Report   |
| Paused          | The _Paused_ state is user-triggered and suspends operation of the build. A build can be manually put in the _Paused_ state, or a previously deployed build will enter the _Paused_ state when a new build is _Deployed._                                  | Unpause, Delete, Download Build Report |

#### Help and Resources

We've provided comprehensive documentation and resources to help get your software up and running as quickly as possible, including detailed process steps, APIs, input and output models, technical requirements, and more. We've tried to make our documentation user-friendly and example-filled, but if you have any questions, please don't hesitate to reach out to our developer support team for help.
