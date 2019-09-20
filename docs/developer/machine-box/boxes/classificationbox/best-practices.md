<!-- markdownlint-disable -->
# Best practices for using Classificationbox

The quality of classifiers depends largly on the input data, and _how_ you teach a model.

## A good dataset

For the best results, following these guidelines:

* Example count: aim to have at least 100 examples for each class - exact requirements differ by case
* Balanced number of examples: have the same (or very similar) number of examples per class
* Clean dataset: take the time to ensure the quality of the examples you train with, and make sure each example is in the correct class

## Teaching technique

Take a random selection of 80% of your examples for teaching, and use the other 20% for validating. You can measure what percentage of your validation set was correctly predicted by the model; this is the model accuracy. You can experiment with different data sets and compare them to decide which gives you the best results.

To avoid a biased model, the order of the examples you teach should be random. Do not teach all examples for each class in a group, instead spread the teaching out among all classes.

## Tools

A few tools exist to help you train your classifier:

* [imgclass](https://github.com/machinebox/toys/tree/master/imgclass) - Train Classificationbox with images from your hard drive
* [textclass](https://github.com/machinebox/toys/tree/master/textclass) - Train Classificationbox with text files to build a text-based classifier
