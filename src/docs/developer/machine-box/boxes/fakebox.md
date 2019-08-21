# Fakebox

Fakebox analyzes news articles to assess whether they are likely to be real news or not. By looking at a range of available aspects of an article (title, content and URL) using built-in machine learning models and a manually curated database, Fakebox can successfully identify fake news.

* BLOG: [I trained fake news detection AI with >95% accuracy, and almost went crazy](https://towardsdatascience.com/i-trained-fake-news-detection-ai-with-95-accuracy-and-almost-went-crazy-d10589aa57c)

## Uses for Fakebox

This capability has a variety of utilities:

* Warn users before they share questionable content on your platform
* Ensure your article content is impartial and your titles are not clickbait
* Analyze ad placement to determine how often ads are placed on questionable sites
* Give your manual content moderation a head start or helping hand

## What Fakebox checks

Fakebox checks the following aspects of an article. Users must provide *at least one* property to be checked, but the more information Fakebox is given, the more useful the results will be.

* Title - Titles can be clickbait or biased
* Content - The textual content of an article can be analyzed to determine if its written like real news or not
* Domain name - Some domains are known for hosting certain types of content, Fakebox knows about the most popular sites

## Get started

The best way to get started with Fakebox is to spin up a local instance and play with it.

* Sign into your account and obtain your box key
* Open a terminal and run: `docker run -p 8080:8080 -e "MB_KEY=$MB_KEY" machinebox/fakebox`
* Go to `http://localhost:8080/` in your browser to access the Fakebox console
