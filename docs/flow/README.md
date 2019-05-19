<!-- This is the Readme for the `Building Flows` sub-section of the Developer section on docs.veritone.com -->
<!-- The general layout will read something like: Building Flows -> What is Flow -> Why Flow -> Creating Flows --> 
<!-- How does it work? -> Quickstarts -> FAQ -->

# Building Flows

Now, with Veritone Flow, less technical users can create their own AI Solutions that incorporate Veritone's cognitive engines and real time services directly into daily business problems that were historically untenable with out an active intelligence participating.

## What is Flow?

Veritone Flow has three components: 
1. The Flow Designer where users can drag and drop shapes (or "nodes") that visualize discrete logic onto the Flow Designer canvas and test the logic using the Flow Designer runtime.
1. The Veritone Real Time framework which serves as the production grade runtime for the Flow, running "as an engine," which in Veritone vocab, is just a fancy way of saying "custom logic that runs on Veritone's runtime"
1. Managing the Flow application and related features as they are released to aiWARE users

## Why do you need Flow?

Flow enables you to rapidly develop AI solutions that let you tap into veritone's 400+ Cognitive engines across more than a dozen classes of AI cognition and incorporate that artificial intelligence into an existing business process that you want to automate. 

## What can you do with Flow?

While Flow enables you to rapidly develop AI solutions that run on Veritone's real time and horizontally scaling framework, what you build is entirely up to you. Want to send out email alerts when a Face is recognized? You can use Flow to do that! Want to automate scraping the web for training data? You can do that too! You could even build a flow that texts your designated recipients and asks them to confirm if certain detections are accurate, and then setup logic to handle the recipient's text back!

## How does it work?

The Flow Designer is built with the Node-RED open source technology that is supported by the JavaScript foundation. At Veritone, we have taken this foundational open source technology and infused our own aiWARE palette of nodes that abstract away the underlying Veritone logic and data model, as well as make it easier for users to take advantage of the underlying power of aiWARE in a more approachable and less technically demanding format. 

Make no mistake though, we certainly want to enable users who want to push the tool as far as they can!

For more info on how Flow fits into the aiAWRE architecture, see the *Flow Engine* section of the docs.
