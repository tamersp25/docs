# Overview

# Network Isolated
The engine is fully isolated and runs solely within Veritone's infrastructure. It does not require network access.

# External Access
The engine performs processing within its container and does not send user data off the container.  
It requires internet access for tasks such as license checks and database updates.

## Use Cases


## Implications
 - Security
 	<risks>
 - Selection for use by 3rd Parties in aiWARE
 	<risks>
 
# External Processing
The engine performs some or all of its processing outside of Veritone's infrastructure.  
User data is sent off the container to outside services for processing.
 
# Human Review
Engine’s processing is performed by humans outside of Veritone's infrastructure. (e.g., A human labeling service would fall into this category.)
