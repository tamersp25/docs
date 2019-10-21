# Deeper Dive: How to Train a Cognitive Engine

![Machine learning](ML.png)

Cognitive engines often need to be _trained_ to recognize features of interest.
Training usually involves showing the engine various representative examples of the particular kinds of objects you want the engine to detect.
Generally speaking, this means running the engine in a special "training mode," and submitting exemplars to it, from which it can learn.
The engine ultimately captures its learnings in a state file, which can later be loaded by the engine when it is called upon to analyze audio, video, or other data it may never have seen before.

In the brief tutorial shown below, we'll show how a face detection engine, running in aiWARE, can be trained to recognize specific people. We'll use GraphQL mutations and queries to create library objects, populate them with exemplars, initiate training, and then run the trained engine.

> For this tutorial, we'll be using a face detection engine to analyze still images (rather than video), but the same training principles  and API methods that apply to face images also apply to audio and video engine training (and many other training scenarios).

## Face Detection in aiWARE

Veritone's aiWARE platform exposes more than a dozen face detection engines, which vary in terms of configuration options (e.g. confidence-thresholding) and other characteristics.
One general-purpose face detection engine that's easy to use "out of the box" is the engine with ID `dcef5300-5cc1-4fe3-bd8f-5c4d3a09b281`, which is named "Face Recognition - I - V2F."
This engine uses Veritone's [Facebox](developer/machine-box/boxes/facebox-overview) technology to carry out face recognition.

> If you want to run Facebox locally, or bundle a licensed version of it into your own standalone (non-aiWARE) app, you can easily do so. To learn more about using Facebox offline, see our tutorial called [Teaching  Facebox](developer/machine-box/boxes/teaching-facebox).

The tutorial that follows assumes you will be using the _online_ (aiWARE-deployed) version of this engine. All interactions with aiWARE will be done through the online GraphiQL IDE. Accordingly, the only prerequisite for this tutorial is a Veritone login.

?> Be sure to obtain your (free) Veritone system [login](https://www.veritone.com/onboarding/#/signUp) now, if you have not already done so.

## Plan of Attack

To train an engine in aiWARE, you just need to:

1\. Create an empty Library.

2\. Create an empty Entity in that Library.

3\. Add one or more learnable assets (images) to the Entity.

4\. Publish the Library (this kicks off training tasks!)

5\. Poll for status of training tasks

6\. Use your trained engine(s).

As it turns out, aiWARE is set up so that when you publish a Library (Step 4), all applicable engines (i.e., all engines that can be trained using such a library) are automatically given training tasks targeting that library; and those tasks are immediately queued &mdash; and run, in the background &mdash; automatically.
