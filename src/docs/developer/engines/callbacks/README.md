# Implementing Callbacks

Sometimes an engine needs to delegate work to a long-running external process (in which humans may or may not be enlisted).
This could apply, for example, to scenarios involving:

* human-aided training of a feature-detection or classification engine, to improve the engine's accuracy
* complex transcription or translation workflows,
in which text must be approved or corrected by human domain experts before it can be passed to downstream logic
* realtime intervention by human operators to augment the performance of a "chat bot"
* potentially many other scenarios

As an example, consider a facial recognition engine that has been trained against a library of faces,
yet still has accuracy problems with some faces (faces that it *should* be able to recognize with high confidence, but doesn't).
Such an engine might benefit from human-intervention-based "edge case" training.

![Human Review](HumanReview.jpg)

In Step 1 of the above diagram, a facial recognition engine identifies a face with low confidence.
To improve the confidence level (and train the image to recognize this face again later),
the engine pauses (Step 2) while it sends the low-confidence data out to a Human Review and Labeling service.
When the service reports its results (Step 3), the engine resumes operation.
In the meantime, its library has been updated with new data, so that engine reliability is improved.

In order to accommodate such scenarios, engine builders can take advantage of features in the Veritone platform that allow an engine to:

1\. Call out to an external service.

2\. Shut itself down.

3\. Be woken up later, when the external service calls the aiWARE platform back.

In this flow pattern, the engine doesn't just yield thread time to other processes &mdash; it actually _exits_, freeing up the CPU for other work.
When aiWARE receives the "wakeup" request from the outside service, it starts the engine up again, so the engine can continue working from where it left off.

In the discussion to follow, we'll talk about what you need to do, as an engine developer, to implement an engine that uses this type of workflow.

> The pause-and-resume execution pattern described here can be utilized by _any_ engine that needs to call out to a long-running external service.
Sometimes the term "Human Review" is used with reference to this pattern,
but in reality there is no requirement for human involvement _per se_.

## When to Use This Pattern

If your engine needs to call out to an external service,
you can choose to [poll the external service](developer/engines/polling/), or (alternatively) follow the callback pattern described here.
The choice of pattern is at the developer's discretion, but as a rule,
if you expect the external service to return results fairly quickly (e.g., in less than a minute),
you should probably consider [polling](developer/engines/polling/). If, on the other hand, the external service might take many minutes or hours to do its work,
you should consider the callback mechanism.

## Implementing the Callback Pattern

Any cognitive engine can implement the callback pattern.
There are no special build considerations (e.g., no special manifest fields indicating that the engine is pausable) nor configuration options.
Processing proceeds normally (all the usual cognitive-engine idioms apply),
until the engine decides it needs to call out to a service.
At that point, the engine needs to:

1\. Take care of any internal housekeeping it might need to do before going to sleep (so for example, close any open file handles or database connections).

2\. Obtain a wakeup token (explained below).

3\. Create any data payload(s) the external service will need.

4\. Optionally, put together any state data the engine might need, upon waking up, to restore its working state.

5\. Combine the wakeup token and the state data into a parameter string.

6\. Append the parameter string to a wakeup URL (see details below).

7\. Call the external service, supplying it the fully formed wakeup URL, along with any other data the service needs.

8\. Update the engine's task status to `paused`.

9\. Exit.

### Creating the Wakeup URL

When the external service has finished its work, it will need to call aiWARE (Edge) back, using the callback URL (or "wakeup URL") mentioned in Step 6 abvove.

This URL should take the folowing form:

`https://push2.aws-prod-rt.veritone.com/callback?jwt=ENGINE_TOKEN&engineId=ENGINE_ID&data=DATA`

where `ENGINE_TOKEN` is a JSON Web Token obtained from Veritone as described below,
and `DATA` is any data the engine wishes to send to its future self.

#### Obtaining the JWT

To guard against malicious activities, third parties that call on aiWARE to unpause an engine need to provide a valid [JSON Web Token](https://tools.ietf.org/html/rfc7519) (JWT) whenever a callback URL is invoked.

Your engine can obtain a JWT (to give to a trusted third party) by making a `getEngineJWT` call to the GraphQL server, at the usual Veritone API endpoint.
The mutation will look something like this:

```graphql
mutation getWakeupToken($engineId: ID!, $tdoId: ID!, $jobId: ID!, $taskId: ID!) {
    getEngineJWT(input: {
      engineId: $engineId
      resource: {
        tdoId: $tdoId
        jobId: $jobId
        taskId: $taskId
      }
    }) {
      engineId
      token
      resource {
        applicationId
        tdoId
        jobId
        taskId
      }
    }
  }
```

When aiWARE receives the incoming request (via the "wakeup URL" described above), it looks for a JWT in the URL's parameters.
The JWT contains a cryptographic hash that can be verified by aiWARE as having come from Veritone (and having originated with a particular engine and task).

After aiWARE (Edge) has validated the token, it will restart your engine so that it can continue processing.

#### Passing State Data

If your engine wants to send itself state data, as a reminder of how/where to resume operation, it can do so by packaging data into the `data` parameter of the callback URL.

For example, if your engine wants to send the following JSON to its future self when the task resumes:

```json
{
  "isCallback": true,
  "myExternalJobRef": "xyz"
}
```

it can marshal the above JSON into a string and set it as value of the `data` field in the callback URL.

Typically, you might call the external service to initiate interaction, and receive a JobID of some kind from the service.
Then you might store that JobID in your state data, so that upon waking up, your engine knows how to query the external service for any additional data that might be waiting there, relevant to this specific job.

You can pass any JSON-serializable data in the `data` field of the callback URL. The choice of what kind(s) of data to use here (if any) is up to you.

### Pausing the Engine

As a final step before your engine exits, it should post a task status update, setting its status to `paused`.

## Task Restart

When your engine is restarted by Edge, it will be associated with the same `taskId` as before.
Thus, the same task continues operation.

Your engine should check the `PAYLOAD_JSON` environment variable to see if the `isCallback` field is set to `true` (indicating that the engine is running in callback mode &mdash; it has been called back).

The `PAYLOAD_JSON` value will look something like:

```metadata json
{
    jobId: "123",
    token: "xxxxxxx",
    taskId: "456",
    recordingId: "78901234",
    applicationId: "abc",
    organizationId: "7682",
    isCallback: true,
    data: "\{\"myStateData\":\"xyz\"\}",
    veritoneApiBaseUrl: "https://api.veritone.com"
}
```

The engine should check the `data` field of this JSON object to find its "note to future self" (arbitrary state data).

If the engine needs to retrieve finished output from the external service, it can now do so.
Such data can then be further processed, or encoded as `vtn-standard` output, and (finally) sent to `createAsset`.
