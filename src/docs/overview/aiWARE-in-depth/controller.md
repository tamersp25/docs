<!-- markdownlint-disable -->

## Controller

### Overview

Controller is the central service that registers hosts &amp; engine instances, manages all work, and communicates to the DB layer. Controllers are stateless API services, typically deployed behind a load balancer, to achieve API and business logic scalability. Within the cluster, a single Controller is promoted to be a Primary Controller and serves as the Edge supervisor, responsible for specific critical functions.

### Primary Controller

- Initial Startup
- Pulls work, syncs with core (Stateful)
- Usage Reporting
- Loading Engines
- Initial layout of services
- Checks all resources and availability
- Dumps DB backups to file system periodically
- Error notifications
- Also removes stopped hosts from EC2/Azure after a period

### Controller

The Controller&#39;s principal function is to assign tasks to engines and adapters in an optimal manner to meet SLAs and minimize costs.  It is also responsible for communicating with external services via an HTTP API.

There are several core functions that a controller must manage:

- Control the starting and stopping of engines
- Provide data to Master Controller to properly scale engine hardware
- Provide stats data to the DB and Forecaster, so it can properly forecast engine and hardware demand
- Route data from one task to the next
- Control the assignment of engines to tasks
- Manage failures and retries
- Log data for analysis
- Expose billing metrics
- HTTP API
  - Admin
  - Edge API

### Controller Process Flow

**Startup Flow**

Step 1:  When a controller launches it connects directly to the database via the PG GO library Lib/PG and establishes a connection pool to read and write from DB.  It stores this connection info in the database in DB Table config and logs it as well.

Step 2:  The controller creates an HTTP Server endpoint for engines and adapters to communicate with it.  The HTTP library used is FastHTTP.

Step 3:  Startup engine servers (created at edge launch) are running a local aiWARE Agent.  This aiWARE Agent is written in Go and connects to a controller via HTTP connection and registers the server with controller and provides a status update on the engines running on this server (zero for now) and the resource capacity and current usage of them (memory, CPU, Disk).  This information is logged in DB Table `host_status`.

Step 4: Controller is in startup mode still.  It checks the DB to see what engines it can run on this Edge and what the base configuration of engines should be.   It will know how many total startup edge servers will be available. As each Engine Agent connects, Controller tells the agent via http to launch certain engines.

Step 5:  Engine Agent launches engines.

Step 6:  As each Engine comes online, it makes http requests to Controller via a long lived http connection, waiting work.  It registers itself with controller, which in turn stores this information in a DB Table.

Step 7: Once all the startup servers are launched, registered and startup engines are running, controller changes a field in the DB, telling the Edge cluster that it is ready to process jobs.

Step 8: Controller queries DB to get the highest priority task.  It pings the appropriate engine via HTTP and asks if its ready for work.   If it receives a positive response, it assigns the work to the engine via an HTTP response and logs this in the DB in a Table.  If it receives a negative response, controller moves on to the next available engine and takes the appropriate action depending on the type of negative response, for example:  no response, error, system busy, etc.

Step 9:  Controller repeats Step 8, until all tasks are assigned to engines.

Step 10:  Every 5 seconds, engines report back status and progress on processing to Controller via HTTP POST.  This data is logged in DB Tables.

Step 11:  When an engine completes its task, it reports back to controller the units of work completed, errors, retries, etc.,\;  controller stores this information in the DB.  Engines then make a request for more work and are either given work or are left idle.   Go to Step 8 for work assigned.

### Routing

A route is a directed acylcic graph (DAG) that defines the path that data will follow from ingestion to final engine execution for every Job.   Each node on the graph is a task and represents an engine or adapter on edge.   Each vertex represents a route where the output of one engine become the input of another.   For the most part, each Job is associated with a static DAG, defined apriori to execution on Edge; however, the architecture and Edge API&#39;s support dynamic DAGs (modified during runtime, while the data is being routed through the DAG).

#### Routing Tables

Each route is defined by a JSON payload for serialization and communication between services.

In the Edge DB, in addition to storing the JSON, there is a set of routing tables that break the routes down into more granular parts for tracking and process management.   From an implementation perspective, each vertex in the DAG is represented by two file system folders, an output folder from the prior engine and an input folder for the next engine on the DAG.


## Engine Process Flow

### Startup

Step 1:  An engine is started by a message sent from Controller to the Engine Agent running on the server that in turn launches an Engine with a Docker run command.

### Processing Tasks

Step 1:  An engine is started by a message sent from Controller to the Engine Agent running on the server that in turn launches an Engine with a Docker run command.

Step 2:  Controller responds by assigning it a TaskId and the number of units to process.  A unit is a file in the task input folder.  For example, there may be 10000 files (units) in the input task folder, but controller only wants the engine to process 100 of them before checking back in for more work.  This is important, because it allows Controller to re-allocate the engine to work on other higher priority tasks, without blocking on this task until all 10000 files are done.

Step 3:  The Engine reads the directory of files left to be processed in the TaskId Input Folder.  It randomizes the list.   It selects a number of units of work from the randomized list (configurable).  It then tries to process each file.

Step 4:  If it is successful opening a file to work, it marks it as being processed.

Step 5:  When it has finished the work on the file, it marks the file as being completed and writes the engine output to the output folder.

Step 6: The Engine keeps track of the work it has performed by calling the API on the RT Engine Library.

Step 7:  At 5 second intervals the RT Engine Library wakes up and posts a status update to the Controller.   For example:  12 units complete or 11 units complete, 1 error, 1 retry.  Etc.

Step 8:  When the last work is done, the engine notifies Controller that all work assigned is done.

### Controller HTTP API

Controller HTTP API is implemented using the _fasthttp_ Go library.    We are using a RESTful style for these HTTP-based APIs.

The APIs are defined at [https://github.com/veritone/project-edge/tree/master/api/controller](https://github.com/veritone/project-edge/tree/master/api/controller) in swagger definition.

General notes:

- GET must be idempotent.  E.g., it cannot change resources
- POST can either create, update resources or take action
- PUT same as POST for this
- DELETE will take action and typically be STOP or DELETE
- PATH will not be used currently.  If used, it will be used for updates to a resource.

### Request Bodies

All Request Bodies will be JSON.

### Authentication

Controller provides a security token upon registration of Engine Instances and Host/Node.  The Agent or Engine Instance will include its token in the Authorization Header using the Bearer scheme as documented at [https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml).

**HTTP Response Codes**

Errors will be returned as part of the HTTP specification.  The response body will be in JSON format with the following fields:

- ErrorId, String: The error ID
- ErrorDescription, String: Information describing the type of error
- ErrorDetail: Any relevant information as part of the error such as IDs.

Please see [https://en.wikipedia.org/wiki/List\_of\_HTTP\_status\_codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) for more information on HTTP Status Codes.

| HTTP Code | HeadlineDescription |
| --- | --- |
| 201 Created | Node registered correctly.  Response in Body |
| 400 Bad Request | Request not in appropriate format or missing information.ETK001 - Not JSON, Fields missing, ... |
| 401 Not Authorized | Currently the APIs are not authenticated. |
| 408 Client Timeout | The client timed out in sending information.  The client can repeat the request. |
| 409 Conflict | Engine Instance is already registered.  The Engine Instance should generate a new |
| 415 Unsupported Media Type | The request sent a non supported payload type such as XML instead of JSON. |
| 429 Too Many Requests | The server has too many requests currently. The server will use the Header Retry-After with seconds to try again.  This will follow [https://tools.ietf.org/html/rfc6585](https://tools.ietf.org/html/rfc6585). |
| 500 Internal Error | These will be tracked.  There should be no 500 errors. |

Engine Instance APIs

| HTTP Method | API | Description |
| --- | --- | --- |
| POST | /engine/register | When an Engine Instance comes up, it will register with the controller and get the first batch of work |
| POST | /engine\_instance/{EngineInstanceId}/getwork | The Engine Instance will use this to update controller on completed work and get additional work. Controller may also respond with terminate. |
| POST | /engine\_instance/{EngineInstanceId}/updatestatus | The Engine Instance will use this to provide status updates (heartbeats) on an interval to controller. |
| POST | /engine\_instance/{EngineInstanceId}/terminate | This will mark the engine instance for termination. |
| GET | /engine\_instance/{EngineInstanceId}/detail | This provides information about the engine instance. |
| GET | /engine\_instance/{EngineInstanceId}/workdetail | This provides information about the work assigned to the engine instance. |

Host APIs

| HTTP Method | API | Description |
| --- | --- | --- |
| POST | /host/register | The agent will use this to register a new host with controller.  The agent will send information about the host, the docker containers running and related statistics. |
| POST | /host/{HostId}/updatestatus | The agent will use this to update the controller with current information on the host including how much cpu, ram and gpus are available.  The controller will respond with here are the containers to launch and containers to terminate. The controller may also decide to tell the agent to terminate the host. |
| POST | /host{HostId}/terminate | This will direct the controller to mark the host for deletion.  This will be communicated to the host on the next update status request |
| GET | /host/{HostId}/detail | This provides information about the host |
| GET | /host/{HostId}/status | This provides information on the last status update for the host |
| POST | /host/{HostId}/drain | This updates the host into draining status.  No engines running on that host will be given new work. |



### Controller DB Tables

#### Routing Tables

This table contains Task Parent and Task Child.

| Task (Node) | Field |
| --- | --- |
| TaskID | GUID for the engine node on a graph |
| JobID | Job ID |
| EngineTypeID | Type of engine |
| ParallelProcessing | Boolean : can have multiple engines for running in parallel for this node |
| RetryCount | Numeric: 0 - 100, number of retries |
| ParentCompleteBeforeStarting | Boolean: T if engine requires all input files in the directory before starting engine |



In this table, route Parent->Out #1->In #1->Task Child is a row.  That diagram has two more additional rows that can be inserted into the table

| Task\_Vertix (DAG Vertix) | Field Name |
| --- | --- |
| VertexID | Unique ID |
| TaskParentId | TaskID |
| TaskChildID | TaskID |
| ParentOutputID | IO ID |
| ChildInputID | IO ID |
| TaskParentOutputFolder | Denormalized.  This is the folder in the ~job directory for the output |
| TaskParentOutputCount | This is the count produced to the output folder |
| TaskParentOutputFormat | This is a JSON object containing any format parameters required |
| TaskChildInputFolder | Denormalized.  This is the folder in the ~job directory for the output. |
| TaskChildInputCountTotal | This is the total inputs produced. |
| TaskChildInputCountRemaining | This is the total inputs remaining to be processed |
| FirstWriteTimestamp | This is the first timestamp an |
| LastWriteTimestamp | This is the last timestamp an output/input pair was produced |

| DAG IO | Field Name |
| --- | --- |
| IO ID | Unique ID |
| IO\_TYPE | Input or Output |
| Path | String, path from inside ~job folder to the input. |
| Format | JSONB Object.   |



#### DAG Execution Tables

For an up to date definition of tables, please see the github repo: [https://github.com/veritone/project-edge/tree/master/sql](https://github.com/veritone/project-edge/tree/master/sql).

These are here to discuss the main points of the tables and how the execution functions.

| task\_route | Field Name |
| --- | --- |
| VertexID | Vertex ID |
| FirstWriteTimestamp | Timestamp |
| LastWriteTimestamp | Timestamp |
| MaxUnits | The total units expected to be created on this Vertex |
| ParentOutputUnitCount | The number of units created in the output IO. |
| ChildInputUnitCount | The number of units created in the child input IO - which should match the ParentOutput. |
| RetryCount | Number of retries on the vertex |
| FailureCount | The number of failures on this vertex |

Every 5 seconds, every engine reports via a timestamp the following data

| task\_status | Description |
| --- | --- |
| EngineID, GUID | The ID of the task |
| JobID, GUID | The ID of the job |
| TaskID, GUID | The DAG node being processed |
| StartTimestamp, timestamp | Timestamp : the time of the last heartbeat, or when the task was first assigned (whichever is later) |
| DoneTimestamp, timestamp | Timestamp : the time when this heartbeat call was made |
| WorkRequestID,GUID |   |
| Inputs, JSON | The input IDs processed.  The number of units processed since the last heartbeat, by input\_IO. |
| OutputCount, JSON | The number of units written to output, by output type |
| ErrorCount, int | Number of errors |
| RetryCount, int | Number of retries |
| FailCount, int | Number of fails |
| CPU, float | CPU % of container |
| Memory , float | Memory % of container |

During processing, the engine toolkit on a seperate thread within the process should sample CPU and Memory via a command such as PS (&quot;ps -p [ARRAY of PID] -f -v&quot;) every second, and then publish average values over the 5 second interval.   Note which ones is the engine toolkit.  Docker Container stats.   Add Swap to server.

#### DB Data Overview

**Admin**

Each edge has a set of admin parameters.  This data is stored in the following tables:

| Table Name | Description |
| --- | --- |
| core\_system | This is the set of available cores and their configuration. |
| config | This is a configuration table to for Edge. |
| server\_types | A list of the server types containing the necessary information to launch and monitor them |
| engine | A list of engines and associated meta-data.   |
| build | A list of builds for the engines and their status |
| scheduled\_process | A list of functions that should run on a given schedule.  These are contained as a docker container or host command |
| scheduled\_process\_run | A list of scheduled process runs |



**Engine Servers**

Each edge has either a fixed or scalable number of servers that it can launch and run processes on to do various tasks.  The types of servers, the number to launch at startup, the launch instructions and other data critical to managing the servers are stored in these tables:

| Table Name | Description |
| --- | --- |
| host | A list of servers launched for this edge with associated meta-date. |
| host\_status | This is the status updates from each host |



**Processes**

Each edge is configured to run a subset of processes:  engines, adapters, controllers.  This data is stored in the following tables:

| Table Name | Description |
| --- | --- |
| engine\_instance | A list of processes running and recently killed that are mapped to the servers they run on. |
| engine\_instance\_status | A list of all processes in the last configurable period (e.g., 24)  that have been launched and stopped. |

**Jobs and Tasks**

Jobs and their corresponding tasks assigned to an Edge by one or multiple aiWARE Cores or via a local Edge HTTP API are stored here.  Job and task data assigned are stored in the following tables:

| Table Name | Description |
| --- | --- |
| job | This is a list of jobs (scheduled and adhoc) that are either running, waiting to run and recently finished. |
| task | This is a list of tasks (scheduled and adhoc) that are either running, waiting to run and recently finished. This also includes scheduled tasks referenced by scheduled jobs. |
| scheduled\_job | This contains the job templates (graph definition) for jobs that are scheduled to run on some frequency |
|   |   |



**Task Processing, Engine Allocation and Performance**

The controller reads and writes from DB to maintain state of the jobs, tasks and engine processing them.   Engines are assigned work and report back via an HTTP heartbeat every 5 seconds and also when the assigned work is complete.  Data of this type is stored in the following tables:

| Table Name | Description |
| --- | --- |
| DAG Node | This is the task table above. |
| task\_route | This contains all the edges between the nodes (tasks) along with associated Inputs &amp; Outputs.  This will have a row for each edge. |
| task\_io | This contains all the definitions of Inputs and Outputs.  This data will be duplicated to the TaskVertex table. |
| task\_status | Every Engine Instance will output in its heartbeat the following data in aggregate form:
- --Timestamp, Input ID, number of items processed
- --Timestamp, Output ID, number of items produced
 The Controller will per heartbeat issue atomic sql updates to the vertices to keep the counts current. |
| engine\_instance\_status | The heartbeats per Engine Instance will also go here and provide detail  There will be a row for each engine instance, timestamp and input/output. |



### Implementation
<!--
**Auto-generated code docs:** [**http://localhost:6060/pkg/veritone.com/realtime/modules/controller/**](http://localhost:6060/pkg/veritone.com/realtime/modules/controller/)
-->

The Controller is a cluster of stateless servers that has connections to the DB, to a number of filesystems which store engine/task output data, and to engines and adapters via an HTTP server.

Aligning Task Load with Engine Resources

Adding Engine Capacity

Step 1:  Every 60 seconds, Engine Agent checks in with Controller by calling the controller API.

Payload format:

Example:



Step 2:  Controller writes data to DB.

DB Tables and fields updated:



Step 3:  In response to these check ins, Controller can instruct Engine Agent to launch new engines based on a DB query to the Forecast Table that returns the engine deficiency count to meet current or forecasted SLAs.   The Forecast Table takes into consideration not only SLA but the priority of the SLA Tasks.   Controller should send to EA a request ID, that is subsequently  passed to the new Engine upon startup from EA.

Payload format:

Example:



Step 4:  Engine Agent launches engine and subsequently registers with controller.  When registering the request ID passed to it at startup is passed back to Controller, so that controller can verify and track the time it takes to request and engine and the lag time to registering.  This is critical information, both from a cost management but also performance management / forecasting.

Removing Engine Capacity

Step 1:  Engines request work from controller with a GetWork request to the API:

Payload format:

Example:

Step 2:  A server that has been marked for shutdown in the DB is returned with the get work DB sql request the controller makes.   Forecaster is responsible for marking a server for shutdown.   API:

Payload format:

Example:



Step 3:  Controller will shut down this engine by sending a shutdown message to the engine in response to the API call in step 1.

Payload format:

Example:





### Adding and Removing Engine Logic

Increasinhg or decreasing engine capacity is not a simple task.   Let&#39;s look at a few situations where modifying engine allocation can occur.

Case 1 : High priority task is going to miss its SLA without more engine capacity.

Root causes:  poor forecasting, bursting ad-hoc requests.

Solution:  If possible, assign more engines to the task, assuming lower priority tasks exist and engine ping to Controller happens within a short enough duration to catch up.

Case 2:  Task forecast predicts that the workload for a given engine type is below or above current capacity.

The forecasting process uses data provided by Controller to predict engine supply requirements given scheduled and historical ad-hoc demand. In the case where there are clear over and under capacity engines based on the forecast, then the controller&#39;s task is straight forward:  kill the over capacity engines and launch the under capacity based on the SLA rankings in the DB.

Case 3: Task forecast predicts the need for more engines than the hardware servers will support to meet SLAs.

Controller is not responsible for solving this problem.

Case 4: Task forecast predicts that we have excess engine capacity across the board.

In this case, based on the forecasted lowest engine demand, controller will mark a server for termination.  First it marks the server for termination in the DB.
Controller kills the engine.   When Engine Agent checks in and provides a status report, showing what is running on the box, when this data confirms what the controller and DB should know at some point, that all engines are dead &mdash; then controller will send a message to Engine Agent, to kill the server.  Controller will then mark the server as being killed.