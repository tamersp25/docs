<!-- markdownlint-disable -->

<img width="60%" alt="AI emblem" 
style="border-radius: 9px;" src="developer/applications/app-tutorial/_media/AI-mini-hero.png"><br/>

# Tutorial: Build Your Own AI App 
<div style="font-family: Verdana; font-size:10.5pt; transform:scaleX(.86); transform-origin: top left; 
display: inline-block; line-height:80%;
              border-style: solid;
              border-radius: 2px;
              border-width: 1.2px;
              padding:1px 10px 0px 15px;">
              
**Goal:** Create a single-page web app that can detect objects in a video,
using the Veritone platform's GraphQL-based API.
The app will allow the user to log in to Veritone via OAuth,
select a media asset in Veritone CMS, and perform object detection on the asset.

**Technology Stack:** Plain-vanilla static HTML, CSS, and JavaScript (client side).
Communication with Veritone's GraphQL endpoint via HTTP POST.

**Prerequisites:** A solid understanding of web technologies. Prior familiarity with JSON a plus.
</div>

<style>
aside  {
  border-style: solid;
  border-radius: 9px;
  border-width: 2.2px;
  border-color:#ccc;
  padding: 5px;
  background: #e6e8ef;
}

aside.small {
  display:inline;
  font-size:9pt;
  position:relative; top:-4px;
}

.topruled {
  border-top-width: 1.2px;
  border-top-style: solid;
  border-top-color: rgb(76, 76, 100);
  line-height:45%;
}
.bottomruled {
  border-bottom-width: 1.2px;
  border-bottom-style: solid;
  border-bottom-color: rgb(76, 76, 100);
  line-height:45%;
}
</style>
To show how easy it is to build AI-aware apps on Veritone's platform,
we'll create a simple single-page browser app that can perform object detection on a video of your choice.
Object detection can be useful for making video clips searchable
(e.g. "Search for all scenes containing motor vehicles"), or as a preliminary step in positively identifying faces, weapons, logos, license plates, etc.

<div style="transform:scaleX(.91);">
<img alt="helpful mini-robot" width="18%" style="float:left;" src="developer/applications/app-tutorial/_media/botty.png">
<div 
style="font-family:Palatino;
font-size:12.5pt;
padding:1px 0px 0px 130px;
transform:scaleX(.95); 
transform-origin: top left; "><div class="topruled"><br/></div>
Once you know the basics of the Veritone API,
you can adapt the code in this project to do other types of cognitive analysis as well.
(For example, you can change from <i>object detection</i> to <i>voice transcription</i> by modifying just one line of code!)
<div class="bottomruled"><br/></div>
</div>
</div>

Our goal throughout this tutorial will be to _get to working code quickly, with a minimum of ceremony._
To keep the focus on aiWARE-related idioms, we'll stick to plain-vanilla JavaScript and HTML,
with no reliance on web development frameworks (no React, no Vue, etc.) and no server-side logic &mdash; not even NodeJS!
Our single HTML file is only 55 lines long. Our JavaScript file weighs in at just under 500 lines of code.<br/><br/>

<h2 style="display: inline;">Step 0: Getting Started &nbsp;</h2>&nbsp;&nbsp;<aside class="small">
<b>ESTIMATED TIME:</b> 5 minutes
</aside>

The setup for this tutorial is super-duper simple. You need just 3 source files. And a (free) Veritone developer login.

### Get the Code

The files for our sample app are available at https://github.com/veritone/veritone-sample-app-netlify.
(Incidentally, the app itself is live at https://veritone-sample-app.netlify.com/.)
Although you don't need a Github account to view the source files, the easiest way to get the files is simply to clone or fork the repo.

The app consists of three files:

* `index.html` contains the markup for the page
* `styles.css` contains CSS for the page
* `scripts/utils.js` contains the client-side logic

That's it! Deploy those 3 static files to any server, and you're done.

For convenience, the project includes `yarn.lock`, `package.json`, and other files to allow [Netlify](https://www.netlify.com/) to deploy the files automatically, straight from the Github repo.
If you fork the project to your own repository, you should be able to point [Netlify](https://www.netlify.com/) to your repo and get it to deploy your _own_ version of the app in just a couple of minutes.

### Get a Veritone Login

To use Veritone's aiWARE platform, you'll need a (free) login.
Go to https://developer.veritone.com to set up your username and password.

### What's Next?
That's it! You're ready to begin. 

We recommend you run through the steps shown below in the order listed:

<style>a {text-decoration: none;} </style>
1\. **Register your app with Veritone.** (10 minutes) Once your app is part of the Veritone ecosystem, it can integrate easily into powerhouse Veritone platform services like CMS and Discovery.
[Read more ⇨](developer/applications/app-tutorial/app-tutorial-step-1)

2\. **Set up authentication.** (10 minutes) We'll show you two ways to log in and get an API token. 
We'll also talk about error handling. [Read more ⇨](developer/applications/app-tutorial/app-tutorial-step-2)

3\. **Add custom logic** (15 minutes) to make the app respond to a context menu command in Veritone's CMS.
[Read more ⇨](developer/applications/app-tutorial/app-tutorial-step-3)

4\. **Run Object Detection against a video** (30 minutes) in response to user interaction.
[Read more ⇨](developer/applications/app-tutorial/app-tutorial-step-4)
