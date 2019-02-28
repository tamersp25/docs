# Text Translation Engine Output Example

TODO: Do a better explanation than this.  And you'll have to explain how there's no standard validationContract.
Output should conform to the validationContract that the input was given in.

At the moment, there is not vtn-standard for translation.
Translation engines run on the entire file in batch mode.
They use the updateTask mutation to update the task status with a taskOutput in the following format:

[](taskOutput.example.json ':include :type=code javascript')

> At the moment there is no standard list for language codes.
The language name codes are specific to each translation engine.
