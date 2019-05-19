# FAQ

#### What should I do with Flow?

Hrmmm, this is an interesting one! We recommend starting with this question: What kind of process do you or your customers still have to manually address with humans actively in the process loop? We think you will have some items that come to mind! Flow is the tool you can use to address these pain points and rapidly develop new solutions that automate more of these processes and move your end-users to the edge of the loop.

#### How technical do I need to be to use Flow?

Flow is a visual workflow tool that does use Node-RED's underlying technology, so some basic familiarity with coding principles would be very helpful but not a hard requirement. The Flow Designer is visuall driven, so coding is not required.

If you are interested in going deeper, we recommend Codecademy's free course on Javascript or equivalent instruction to really drill into some of the Flow Designer's deeper features.

#### How much familiarity do I need with Veritone's data model and layout?

A fair amount, although we are looking where we can decrease the ramp needed. We have introduced several new aiWARE nodes specifically for abstracting away some knowledge of GraphQL to make it easier for users to jump straight into incorporating AI into their workflows.

#### Can I expect to run my Flow on the Flow Designer Runtime for a long standing period of time?

In short: no. The longer answer is that the Flow Designer is intended to serve as your testing environment. The Designer is not directly connected to Veritone's production run time, and so all of the testing is mock data. We have created (and will undoubtedly create more) several guides on how to create your flows so that you understand how to create your engine to run on Veritone's real time framework.

#### What is a "Flow Engine?"

This phrase serves as a description of the Flow once it has been deployed "as an Engine" to run on Veritone's realtime framework. Veritone engines take an input and produce an output that is managed by Veritone's realtime framework and run on Edge. You can check out the Veritone Engines docs for more details as well.

#### What are the Chunk and Batch engine modes and which should I choose?

Chunk and Batch terms refer to "engine modes" for Veritone engines and refer to how Veritone's realtime framework

#### Can I use Flow to create new Cognitive Engines?

Yes! We have adapted Flow's underlying Node-RED open source technology to run as a new kind of Engine build runtime on Veritone's realtime framework. This means that Flow is a viable avenue for creating new cognitive engines without having to write code and manage the docker files.

#### What does being in a "Beta" mean for Flow?

We are incredibly excited to give this new tool to our customers and partners. We have been using Flow to experiment with new cognition classes and engines, automate new processes, and build new AI Solutions that we have then taken to market. Sharing this product in Beta with our customers gives us the chance to hear your feedback directly and release new enhancements faster while giving you a powerful new tool to customize Veritone's cognitive capabilities even more for your organization.

#### I have an idea for a new aiWARE node, who can I contact? 

We always love hearing suggestions from our developer community and end customers! You can submit your ideas here!

Alternatively, you can build your own nodes, submit to the Node-RED repo and flag Veritone to review them and incorporate into the official aiWARE palette.
