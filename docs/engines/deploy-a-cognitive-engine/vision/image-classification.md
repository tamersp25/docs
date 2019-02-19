# Image Classification

Image classification refers to the art of classifying an entire image into a class or category. This is different from object detection or recognition which attempts to locate specific objects within an image. 

Image classification is sometimes single label or multi label. 

## Use Case

A stock footage or stock photo company may wish to classify millions of photos into categories to make it easier for users to search and find images they're looking for. 

For example, you can classify images as `moody`, `dark`, `bright`, or you can classify what is in the image such as `cat` or `dog`. 

Results that get returned can include a single label, or a ranked list of possible labels. 

## Sample Output

Below is an example output from an image classification engine run inside Veritone. It is truncated and includes only two labels for the same frame, one is a label from training by Library, the other is a pretrained returned label.:
```"series": [
              {
                "startTimeMs": 0,
                "stopTimeMs": 1000,
                "libraryId": "7d7c5aae-8671-486b-b09f-4e3feaf899f6",
                "object": {
                  "boundingPoly": [
                    {
                      "x": 0,
                      "y": 0
                    },
                    {
                      "x": 1,
                      "y": 0
                    },
                    {
                      "x": 1,
                      "y": 1
                    },
                    {
                      "x": 0,
                      "y": 1
                    }
                  ],
                  "confidence": 0,
                  "label": "Text",
                  "libraryId": "7d7c5aae-8671-486b-b09f-4e3feaf899f6",
                  "type": "object",
                  "uri": "https://chunk-cache.s3.amazonaws.com/frames/341278665/b037c273-24a0-4764-8403-650dbcb2133b.jpg"
                }
              },
              {
                "startTimeMs": 0,
                "stopTimeMs": 1000,
                "libraryId": "7d7c5aae-8671-486b-b09f-4e3feaf899f6",
                "object": {
                  "boundingPoly": [
                    {
                      "x": 0,
                      "y": 0
                    },
                    {
                      "x": 1,
                      "y": 0
                    },
                    {
                      "x": 1,
                      "y": 1
                    },
                    {
                      "x": 0,
                      "y": 1
                    }
                  ],
                  "confidence": 0,
                  "label": "Font",
                  "libraryId": "7d7c5aae-8671-486b-b09f-4e3feaf899f6",
                  "type": "object",
                  "uri": "https://chunk-cache.s3.amazonaws.com/frames/341278665/b037c273-24a0-4764-8403-650dbcb2133b.jpg"
                }
              }...
}```
