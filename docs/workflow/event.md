# Veritone Event Node

## Overview

The Veritone event node allows the user to listen to a specific or range of events by subscribing to the Veritone eventing system. The node will create the subscription and listen via HTTP for incoming events.

## Output

The node will output the payload of the event when it is received by HTTP from Veritone. The payload includes a property called `vtn` that contains the event name, type and organizationID.

## Properties

To subscribe to a specific event, enter the event name, type and app. To subscribe to all system events, enter `system` in the app property and leave Event and Type empty.


