<!-- markdownlint-disable -->

# aiWARE Architectural Overview

**Veritone aiWARE Edge** is the cognitive processing subsystem of aiWARE. Edge’s primary purpose is to ingest data (structured, unstructured, streams and/or files), and to cognitively analyze this data in a predictable manner that meets applicable SLA and business objectives.

Edge instances may be deployed as standalone subsystems in supported public clouds; on a single machine (e.g. laptop); or on-premise at customer locations. Edge instances may also be integrated into third-party on-premise software, or connect to an aiWARE Core subsystem, which provides augmented functionality and hosted applications.

Edge is designed to be a stateless cognitive processing unit, not a long term repository for information, which is a function handled by Core in the larger aiWARE architecture. Edge does provide short term persistence of all data and an API to access it. This short term memory duration is configurable (but limited) and dependent on the resources allocated to an Edge installation.

## Edge Design Considerations

### Simplicity
* Minimal footprint
* Reduced complexity
* Use standard Linux services, hardware, and off the shelf technology that are proven and battle tested
* No DevOps required to run and maintain
* Transparency &mdash; No black box services
* Measure everything, with intermediary steps archivable for playback and debugging

### Separation of Concerns
* Subsystems provide discrete, independent processes
* Subsystems can run independently of any other subsystems
* Subsystems manage themselves and coordinate their behavior and scale directly
* Subsystems communicate with other processes via well-defined standard protocols

### Fail-Safety and Fault Tolerance
* Recovery from failures is innate to the architecture
* System design handles different High Availability and Fault Tolerant objectives on a job by job basis, at the org level

### Security
* Base level security per-deployment
* Multitenant environment still allows for tiered Security (Encryption at Rest) at the customer level

### Resiliency

In addition to many of the requirements and features of older versions of Edge, the latest architecture supports the following:
* No Dev-Ops or IT required to install or run
* Run on a single CPU or laptop
* Scale up to 1M simultaneous streams
* Local HTTP administrative interface
* SLA at Job and organization level
* No blocking tasks that clog the process pipeline
* Expect errors and recover gracefully
* Design for high availability at the Job level
* Security and access control scoped to the org level
* Never lose data
* Engine permissions
* No hard-coded references to managed services (AWS, Azure, and so on)

## Edge Subsystems
Links (TBD) provide a deeper dive into each subsystem and its implementation.
* Edge Agent
* [File System](overview/aiWARE-in-depth/file-system.md)
* Controller & Primary Controller
* Database
* [Engines & Engine Toolkit](overview/aiWARE-in-depth/engines.md)
* Engine Registry
* Metrics (Prometheus)
* Forecaster

## Interfaces
External interfaces available in Edge 3.0 are as follows.
* Installation & Update
* API, CLI, & SDK
* Admin UI
* Engine Development
* Standup Local Environment

## Workflows
Describes in detail how Edge works at a functional level.
* Workflow
* Job Processing
* Interface with aiWARE Core
* Coreless Edge
* Scaling
* Testing Requirements
* Registering Engines
* RT Processing (Mobile App)
* Processing external HTTP

## Base Engines
Base engines are engines owned by Veritone.
* Stream Ingestor
* Output Writer
* Adapters

## References
* Edge 3.0 specification document [can be seen here](overview/aiWARE-in-depth/new-edge.md).
* Original Edge 3.0 diagrams: link.
