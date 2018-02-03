<!-- ---
title: Labeled Objects
--- -->

Object-related engines output text tags for specific objects found with a corresponding confidence score for each object.  Examples include:

Actions:

- General human activity like running, standing, laying down, or waving
- Domain specific actions such as kicking a ball or climbing a wall

Apparel:

- Clothing such as shirt, jacket, pants, skirt, etc
- Color
- Accessories such as sunglasses, watches, hats, etc
- Fashion designer or brand

Image Features:

- Color
- Focus
- Dimensions
- Resolution

Landmarks:

- Landmark buildings and architecture
- National monuments, such as the White House
- Geographical features such as mountains, rock formations, or landscape views
- Points of interest identifiable by several unique features in a scene

Logos:

- Stylized corporate logos
- Brand representations in signage
- Brand representations on products
- Some combination of the above

Scene Descriptions:

- e.g. "Man riding a horse in the mountains" or "Children at a playground"

Vehicles:

- General Vehicle Class (e.g. Sedan, Van, Compact Car, Motorcycle, etc)
- Color
- Make and Model (e.g. Ford Focus)
- Year or Year Range (e.g. 2012 or 2012-2105)
- Some combination of the above

Visual Moderation:

- Male or Female Nudity
- Offensive Content Tags
- Age Appropriateness tags

# Inputs #

Input assets to object recognition engines typically take the form of video files.  

Be sure to indicate your preferred and supported input format MIME types in the build .

# Outputs #

Object Recognition engines produce . This series data must be provided two ways: as an uploaded asset using the Create Asset endpoint of the Veritone API, and the engine's Task Output. See the  for more info.
