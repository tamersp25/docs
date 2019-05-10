# Teaching Facebox

In this tutorial we will run a fresh instance of facebox, and manually teach it who
The Beatles are.

![Recognized Beatles](beatles-with-paul.png)

## Run facebox

To get a fresh facebox container running, head over to your [Machine Box Account page](/account)
click on the _facebox_ tab, copy the code and paste it into a terminal.

The code looks something like this:

```bash
MB_KEY="YOUR_KEY_HERE"
docker run -p 8080:8080 -e "MB_KEY=$MB_KEY" machinebox/facebox
```

* If you've already [configured your Box key](/developer/machine-box/setup/box-key), you may only need to write the second line

After a few moments, a fresh facebox container will be running.

## Download the teaching data

We have prepared a collection of photographs of The Beatles which we will use to teach facebox:

* [Download the teaching data set](/samples/faces/beatles-training-data.zip)

Unzip the file to a place that is easy for you to find later when we come to teach facebox who
these guys are.

The images are structured like this:

```text
├── George_Harrison
│   ├── george1.jpg
│   ├── george2.jpg
│   └── george3.jpg
├── John_Lennon
│   ├── john1.jpg
│   ├── john2.jpg
│   └── john3.jpg
├── Paul_McCartney
│   ├── paul1.jpg
│   ├── paul2.jpg
│   ├── paul3.jpg
│   ├── paul4.jpg
│   └── paul5.jpg
└── Ringo_Starr
    ├── ringo1.jpg
    ├── ringo2.jpg
    ├── ringo3.jpg
    └── ringo4.jpg
```

Each folder is the name of the Beatle, and the files are images containing a single example face of each Beatles member.

## Access the Live demo

The Interactive console provides complete and up-to-date documentation for facebox, and is already
running on [localhost:8080](http://localhost:8080/). You can also use it to interact without writing a
single line of code.

* Go to [http://localhost:8080/](http://localhost:8080/) in a web browser

Click on the *Live demo* button, or go to [http://localhost:8080/demo](http://localhost:8080/demo)

## See what facebox does with no teaching

Although we haven't done any teaching, let's ask facebox to see what it can do with the sample
Beatles picture.

In the *URL* box, paste the link to the Beatles sample picture and click the *Check image for faces* button.

```text
https://machinebox.io/samples/faces/thebeatles.jpg
```

Notice that it indeed founds lots of faces, but doesn't know who they are.

![Unrecognized Beatles](beatles-no-teaching.png)

## Teach Paul McCartney

Head back to the [main page in the Interactive console](http://localhost:8080/) and select *Teach faces*
from the sub-menu on the right.

In the */facebox/teach endpoint* section, click the *POST the file* tab, and expand the *Try it now*
section.

This is where we will teach facebox who Paul McCartney is.

1. Enter his name into the *Name* box: `Paul McCartney`
1. Choose a file for the *Select the file to post* field
1. Navigate to the Beatles sample folder that you downloaded earlier
1. Select `Paul_McCartney/paul1.jpg`
1. In the *ID* field, enter the filename `paul1.jpg`
1. Click *POST*

* You can ignore the *ID* field altogether, but it's highly recommended that you use the name of the file you used to teach the face. They become very useful when searching for similar faces, as well as knowing which face matches most closely during the recognition step.

All being well, you should see the output:

```json
{
    "success": true
}
```

Repeat the above steps for the `paul2.jpg` file being sure to have the name the same (`Paul McCartney`) and the ID different (`paul2.jpg`).

## Test process

Let's see if our teaching has had any effect so far. Head back to the *Live demo* and in the *URL* box, paste the link to the Beatles same sample picture and click the *Check image for faces* button.

```text
https://machinebox.io/samples/faces/thebeatles.jpg
```

Hover over Paul's face and notice that facebox has indeed learned him:

![Recognized Paul](beatles-with-paul.png)

## Train the rest of the Beatles

For completeness, teach facebox the rest of the teaching data set in the same way you did for Paul, until
you have used all the images.

## Downloading state

facebox is stateless, which means that if you turn it off and restart it, you'll lose all your
teaching.

Luckily, we can download and upload the state as we wish through the API.

In the Interactive console for facebox, click on the [Managing state](http://localhost:8080/#Managing%20state) item in the sub-menu.

Find the *Do it now* section, and click on the *Download state file* button.

A `.facebox` file will be downloaded to your computer.

This file contains the learning that facebox has done.

## Uploading state manually

In the terminal where you started facebox, press `Ctrl+C` to terminate the process. This will
stop facebox.

Restart it (you can usually just press the up arrow key to repeat the last command) in the same way
you did before, and go back to the [Interactive console](http://localhost:8080).

Use the *Live demo* again and notice that this facebox instance does not know who The Beatles are. In order
to teach it, we are going to use the `.facebox` file we downloaded from the other instance.

Click [Managing state](http://localhost:8080/#Managing%20state) item in the sub-menu, and look for the *Uploading state* section.

Select the *POST the file* tab and expand the *Try it now* section.

Use the form to select the `.facebox` file you downloaded earlier, and click *POST*.

Assuming it is successful, you need to wait for a short period while the teaching is configured internally. The amount of time it takes depends on the size and complexity of the `.facebox` file, but will probably have to only wait about five seconds with this small `.facebox` file.

Now head back to the *Live demo* and notice that this fresh facebox instance has learned who The Beatles are.

![Recognized Beatles](beatles-with-paul.png)

## Specifying state when starting the box

If you were to spin up 1,000 instances of facebox, it would be pretty tiresome to
have to go into the console for each one and upload the state. Since we care equally about
dev and ops experience, we thought about that.

1. Host your state file somewhere accessible to the boxes
1. Configure the `MB_FACEBOX_STATE_URL` environment variable to point to the file

If the `MB_FACEBOX_STATE_URL` environment variable is set with an absolute URL,
facebox will download the file when it starts up.

## What next?

### See the JSON

Use the main page in the Interactive console to submit the Beatles URL so you can see the actual JSON
output returned from the API.

You will see that the `id` field contains the name of the file that most closely matched the face.

### Use the terminal

Navigate around the Interactive console and drop down the various *cURL* sections to see how
you can use the facebox API in the command line, without using the consoles.

### Build something cool

Using the language of your choice, build something awesome with facebox, and then [let us know
about it](/contact) on Twitter.
