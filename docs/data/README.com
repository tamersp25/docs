# Data

The Veritone Developer platform now allows you to enhance the insights from your content with structured data. Structured data is data with well-defined fixed fields, which can be stored in relational databases. Structured data can take any text-based format, and Veritone is initially supporting structured data expressed as JSON. Look for other formats to be supported in the future, though.

## Overview

Structured data can be used in two ways, either as primary data or secondary data.

### Primary Data
Structured data can be used as the primary content that you would like to analyze further, using cognitive engines. Some examples of structured data that can be used as primary data:
* Social media streams
* News feeds
* Stock tickers
* Press releases
* Personnel records
* Private databases

The list can go on and on. Structured data can be ingested into the Veritone platform. Once ingested, you can run any compatible engines to extract cognitive insights from the data.

### Secondary Data
Structured data can also be used as secondary data, in order to augment or enhance the value of other content. This is done by correlating the structured data to the primary content along a common value. So for example, if your primary content is a broadcast of a press conference by a particular company, you can correlate the stock price of that company or the number of social media mentions of that company by time.
