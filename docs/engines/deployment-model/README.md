# Engine Deployment Model
The engine **deployment model** indicates what type of network access the engine requires.
It is important for customers when it comes to the security and location of their data.

!> Make sure to read about every deployment model before selecting the best fit for your engine.

## Network-isolated
The engine does all processing entirely within its container (ie. itself), running solely within Veritone's infrastructure.
There is no internet access, and no external calls are made to the outside world ever.
This is the most secure deployment model, which makes "network-isolated deployment" a requirement for most Goverment agencies and Legal & Compliance customers. This deployment is also highly requested by Media & Entertainment customers, since network-isolated engines may be deployed on-premises. (Click here <!> to read about the differences between "on-premises" and "network-isolated"). Read more about each deployment type before selecting the best fit for your engine.

<!--### On-premises ("On-prem") vs. Network-isolated-->
<!--TODO: Re-visit later-->

## External Access
The engine does its processing within its container (ie. itself) but requires internet access for tasks like license checks to an external server or downloading reference data.
It does not send user data outside the container.
This deployment model is not commonly used.
If your engine does not require a license server check or any type of internet access, we suggest you deploy it as network-isolated.
If your engine does its processing outside the container itself, you should deploy it as an external processing or human review engine.

## External Processing
The engine does some or all of its processing outside it's container, so outside Veritone's infrastructure.
User data is sent outside the container to external services (eg. a cloud API) for processing.

## Human Review

The engine performs some or all of its processing outside it's container (ie. itself) and by **humans** outside Veritone's infrastructure.
Some examples of human review engines including labeling, transcription or translation services performed by humans.
