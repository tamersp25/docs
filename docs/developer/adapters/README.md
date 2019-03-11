# Building Adapters
The first step toward realizing the full potential of data is getting it into the Veritone platform. Adapters solve this challenge by providing content ingestion capabilities to consume data from external sources. They work by establishing a connection with a source and then acquiring, parsing, and outputting data in a format that can be processed in Veritone. 

The adapter infrastructure provides mechanisms for ingesting structured or unstructured data in the form of a real-time stream or a bounded file. Veritone offers a set of out-of-the-box adapters for popular sources such as Amazon Web Services S3, YouTube, Google Drive, Box, Dropbox, and RSS feeds. Depending on your needs, you may require the use of a custom adapter. With Veritone Developer, you can quickly build an adapter to ingest data from an external source that’s not already supported. Custom adapters are created based on the data source, the format of the incoming data, and the proprietary logic written in the code. In addition, they include various elements configured together to deliver data to and publish data from the adapter. These elements include environment variables, a task payload, APIs, and a data source type schema — all of which can be configured in a number of combinations. 

Before you begin development, it’s important to get a sense of how adapters interact with Veritone and understand how all of the pieces and processes work together. Understanding the structure of data, the way Veritone handles data, and how data maps to the Veritone UI may influence your design and development strategy. The topics that follow summarize the key concepts of how adapter technology is used in Veritone. Each of these is covered in more detail in our [Quickstart](https://docs.veritone.com/#/adapters/quick-start/) guide and throughout the remaining sections of the adapter documentation.

Remember that our developer support team is here to answer questions and provide assistance. Reach out to us on our [Slack channel](https://chat.veritone.com/) any time you need help.

> In the GraphQL API, adapters are identified as `engines` where `EngineType=Ingestion`

## Adapter Categories

Adapters fall into two categories, which are defined by the way data is served up from the source. The protocol follows a client-server approach for communication between the data source and the adapter. Based on the nature of the interaction, an adapter will operate in either a push- or a pull-based manner for retrieving data records. 

### Pull Adapters

Pull adapters are the most common type of adapter implementation. With this adapter type, data is pulled from a server by a client-initiated request, and a separate request is made each time data is to be retrieved. Pull adapters are services that work "by reference" (being instructed to fetch media based on some pointer, such as an S3 bucket or Dropbox folder)

### Push Adapters

With push adapters, the data source serves as the client and drives the transfer operation by notifying the adapter (server) whenever new data is available. After the initial request, data continues to be pushed from the source to the adapter without any subsequent requests.

## Kafka

Veritone's real-time pipeline uses [Kafka](https://kafka.apache.org/) to connect and manage communication between various components in the system. Kafka is a distributed pub-sub messaging system rethought as a distributed commit log. Kafka works by storing messages in topics that are partitioned and replicated across multiple brokers. Producers write data to topics and consumers read from topics using a topic subscription.

To understand how Kafka works, we define some of the key concepts below. For additional information, visit [Kafka’s website](https://kafka.apache.org/). 

**Message:** A record or unit of data within Kafka. Messages are byte arrays that can store any object in any format. Each message has a key and a value, and optional headers. 

**Producer:** Producers publish messages to Kafka topics. Producers decide which topic partition to publish to either randomly (round-robin) or using a partitioning algorithm based on a message’s key.

**Broker:** Kafka runs in a distributed system or cluster. Each node in the cluster is called a broker.

**Topic:** A topic is a category to which data records—or messages—are published. Adapters define where data should be copied to and from and publish data to a specific topic. 

**Topic partition:** Topics are divided into partitions, and each message is given an offset. Each partition is typically replicated at least once or twice. Each partition has a leader and one or more replicas (copies of the data) that exist on followers, providing protection against a broker failure. All brokers in the cluster are both leaders and followers, but a broker has at most one replica of a topic partition. The leader is used for all reads and writes.

**Consumer:** Consumers subscribe to topic partitions in order to read the data written to them. The consumer then processes the message to accomplish whatever work is required.

## Adapter Workflow 

The adapter workflow is structured as a sequence of actions that are executed one after the other to process a task from start to finish. Fundamentally, the workflow consists of three basic concepts: receiving a task, executing it, and outputting the results. The adapter workflow is initiated when an ingestion task is created for an adapter to perform. Based on the information described in the task payload, the adapter will acquire specific data from an external source, break it into a set of time-segmented chunks, and output the chunks in a format that can be used for processing.  

The basic adapter workflow consists of the following steps:

1. A new job is created with an ingestion task targeted at the adapter. 

2. The adapter is triggered to run by the events queue. A new instance is created that receives a JSON payload with the task details and environment variables.  

3. The adapter instance reads the message and calls the external system and coordinates the data collection task. 

4. The adapter acquires the raw data from the input source and parses the received content into a set of time-based segments. 

5. Each of the segments is written to Kafka as a separate task that can be passed on to other parts of the system for processing.

Each step in the workflow must be built into your code. You'll find detailed information and step-by-step instructions on adding the task processing flow to your code in the [Construction Guidelines](/developer/adapters/quick-start/step-2) section of the Quickstart.

### Manifest

To create a custom adapter, you'll need to provide a manifest file that contains specific information required to deploy and use your connector in Veritone. The manifest is a JSON-formatted text file that defines the type of data that your adapter handles and contains format-specific settings for connecting to and collecting data from the external source. It also sets execution options and provides any authentication details necessary to access the source. Each build must reference a unique manifest file in the Dockerfile in order to be deployed. Any time a build is modified, a new manifest must be created.

### Source Type and Schema 

An adapter references a Source Type and contains a schema that describes the structure for incoming data. Together, a Source Type and schema define a set of fields that can be queried. When your adapter runs, it runs against the schema of the `Source Type ID` received in the task payload. 

Veritone has a large and growing number of Source Types with preconfigured schemas that support a variety of types of data sources. Your adapter must specify what Source Type(s) it supports by declaring an array of Source Type IDs in the manifest file:

<table>
  <tr>
    <td>{
    "ingestion": {
        "supportedSourceTypes": ["6"]
    }
}</td>
  </tr>
</table>


A list of Source Types can be retrieved by calling the `getSourceTypes` query.

```graphql
query getSourceTypes {
  sourceTypes {
    records {
      id
      name
    }
  }
}
```

To view the schema properties for a particular Source Type, make a call to the `getSourceTypes` query and specify the `Source Type ID` in the request along with the `sourceSchema` return fields shown below. The `details` field will return the configuration information of the schema.

```graphql
query getSourceType {
  sourceType(id: 6) {
    name
  	sourceSchema {
      id
      validActions
      definition
    }
    organizationId
  }
}
```

> Although a schema cannot be modified, Veritone supports adding a subset of Custom Fields to the query.

### Payload and Environment Variables

Upon execution, your adapter receives a standard set of environment variables that provide a number of runtime configuration settings, such as Kafka messaging properties and Veritone’s API base URL. Adapters also receive a task payload that describes the task to be performed.

### APIs

[Veritone's suite of APIs](/apis/) allow you to build the core strengths of the Veritone Platform into your technology.
Our collection of GraphQL APIs support the entire task processing processing lifecycle — including payload retrieval, task statusing, returning output, and indexing results.

### Input/Output Models

When constructing your adapter, specific data fields must be used to define the inputs to and outputs from your service. Each adapter type has supported data types and required fields, and there are advanced options you can set to control other aspects of how data is delivered to its defined output.

### The "Adapter" and “Build” Approach

Throughout Veritone Developer, the term *adapter* is used to reference the external-facing, user-friendly representation of your software. The actual code and processing algorithms are contained in a *build*. A single adapter can contain multiple builds, but only one build can deployed in production at a time. The adapter and build approach allows you to update, test, and refine your code while offering the latest version of your adapter to the marketplace. Once a new build is approved, it can be deployed to production and replace the existing one.

### Deployment Models

Adapters can be deployed in different ways to satisfy a broad set of security and compliance requirements. Veritone supports two deployment models that describe how and where your adapter will be made available to users: 

* **Network Isolated:** The adapter is fully isolated and runs solely within Veritone's infrastructure. It does not require network access.

* **External Access:** The adapter performs within its container and does not send user data off the container. It requires internet access for tasks such as license checks and database updates.

Both options give you the flexibility to choose exactly how you'd like to implement your solution. Selecting the best model depends on your business needs — the environment should promote availability and connectivity while providing maximum security, performance, and scalability.

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

1. [Register your adapter](https://docs.veritone.com/#/adapters/quick-start/step-1) by specifying basic information about your adapter, including the name, type, description, logo, and deployment model.

2. Add APIs and [configure your code](https://docs.veritone.com/#/adapters/quick-start/step-2) to support Veritone's task processing flow and your adapter’s specific input/output fields.

3. [Create your manifest file](https://docs.veritone.com/#/adapters/quick-start/step-3) with details about your adapter and how it will run.

4. [Build a Dockerfile](https://docs.veritone.com/#/adapters/quick-start/step-4) that packages your code, dependencies, and manifest, and use it to create a Docker image. Then push your Docker image to Veritone's Docker Registry and initiate the compliance testing process.

5. [Submit your build for approval](https://docs.veritone.com/#/adapters/quick-start/step-5) by a member of our team.

6. [Deploy your approved ](https://docs.veritone.com/#/adapters/quick-start/step-6)adapter to production in the Veritone Platform.


Our [Quickstart](https://docs.veritone.com/#/adapters/quick-start/) is designed to take you through the development workflow as quickly as possible. By the end, you'll have created and deployed a custom adapter in the Veritone Platform.

### Help and Resources

Our documentation and resources are designed to help get your adapter up and running as quickly as possible, but if you have any questions, please don't hesitate to reach out to our [developer support team](https://chat.veritone.com/) for help.
