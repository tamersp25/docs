# Textbox

Textbox processes text and performs natural language processing, sentiment analysis and entity and keyword extraction allowing you to build tools that programatically understand the content of text.

* BLOG: [Introducing Textbox: Natural language processing](https://blog.machinebox.io/introducing-textbox-natural-language-processing-inside-a-docker-container-bdb57a2a3e64)
* BLOG: [Increase the power of your search engine](https://blog.machinebox.io/increase-the-power-of-your-search-engine-with-textbox-bd5f773a1410)

## Uses for Textbox

This capability has a variety of utilities:

* Understand if a comment is positive or negative
* Discover any people mentioned in unstructured data
* Build email auto-responders that automatically reply with the right answers
* Extract and handle dates and times (like "yesterday", or "next Tuesday")
* Get a list of the most significant keywords from a series of tweets
* Analyze customer reviews to discover up and down trends in sentiment

To learn more about what you can do with Textbox, visit the [Machine Box blog](https://blog.machinebox.io/tagged/nlp).

## Capabilities

Textbox analyzes a block of text and discovers the following items:

* *Sentences* - Each sentence from a body of text is extracted
* *Sentiment* - A sentiment value indicates whether a sentence is positive or negative
* *Entities* - People, places, organizations, dates and times, etc. for each sentence are extracted
* *Keywords* - The most significant items mentioned in the text are returned

## Text analyzer tool

Textbox ships with a live text analysis tool that shows you the true power of
what can be achieved.

![Text analyzer demo preview](textbox-demo.png)

To access the Text analyzer:

1. Sign into the Account page
1. Setup your `MB_KEY` variable
1. Use the Textbox `docker run` command provided on the account page
1. Access `http://localhost:8080/demo` in your browser
