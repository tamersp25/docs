# Check a Job Status

To check the status of the job and its tasks, make a call to the Job query and provide the Job ID returned by the *Create Job* request. Successful calls return a Job object with a status and a list of tasks with requested details. Unsuccessful calls will result in an error.

#### Request Payload: Check a Job Status
```graphql
query{
-------request fields-----------
  job                => The Job object query type. (required)
    (id: "string") { => The Job ID returned by the Create Job request. (required)
-------return fields------------
    id            => The unique ID of the job, provided by the server. (required)
    status        => The status of the job as a whole. Possible Values are “accepted” (the job is valid and has been accepted for processing), “running” (the job is running), “failed” (at least one task failed and job execution was terminated), and “complete” (all tasks in the job finished normally). (required)
    tasks {       => The tasks object parameter with data specific to the job’s tasks. (required)
      records {   => The records object parameter with data specific to individual tasks. (required)
        id        => The unique ID of a task, provided by the server. (required)
        status    => The status of the task. Possible values are “pending” (the task was received but hasn’t been queued), “queued” (the task has been accepted for processing), “running” (the task is running), “failed” (the task failed and execution was terminated), and “complete” (the task finished normally). (required)
      }
    }
  }
}
```

#### Sample Request: Check a Job Status
```graphql
query{
  job(id: "2791851b-0d02-4aaf-97e0-cd77a2e771ad") {
    id
    status
    tasks {
      records {
        id
        status
        engineId
      }
    }
  }
}
```

#### Sample Response: Check a Job Status
```json
{
  "data": {
    "job": {
      "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad",
      "status": "running",
      "tasks": {
        "records": [
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-caaa51ab-e4b4-49e3-b6d9-3291fa4b9836",
            "status": "complete",
            "engineId": "fc004413-89f0-132a-60b2-b94522fb7e66"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-fcd5c69b-0f8e-46f0-9aa0-2718529836ad",
            "status": "queued",
            "engineId": "f0acacba-2c33-86c1-0deb-c479906f17c5"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-563e8f85-f733-45b7-8eb7-3ff68aed498a ",
            "status": "queued",
            "engineId": "b00fc05e-3502-e8da-4871-7182dc1aa9f2"
          },
          {
            "id": "2791851b-0d02-4aaf-97e0-cd77a2e771ad-a4c4767a-f7a4-4244-8481-a036a286e3a3",
            "status": "pending",
            "engineId": "c2aaa6d7-14fa-f840-f77e-4d2c0b857fa8"
          }
        ]
      }
    }
  }
}
```
