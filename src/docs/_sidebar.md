<!-- markdownlint-disable no-inline-html first-line-h1 -->

- [aiWARE Overview](overview/)

  - [Architecture Overview](overview/architecture-overview/)
  - [Glossary](overview/glossary/)

- [Quickstart](quickstart/)

  - <span class="engine-developer">[Engine Developer](quickstart/engine-developer/)</span>
  - <span class="ml-integrator">[ML Integrator](quickstart/ml-integrator/)</span>
  - <span class="ml-explorer">[ML Explorer](quickstart/ml-explorer/)</span>
  - <span class="app-developer">[App Developer](quickstart/app-developer/)</span>

- [Applications](apps/)

- [APIs](apis/)

  - Developer Guide
    - [The Veritone API Data Model](apis/data-model.md)
    - [Using GraphQL](apis/using-graphql.md)
    - [Authentication](apis/authentication.md)
    - [Error Codes](apis/error-codes.md)
    - [Jobs, Tasks, and TDOs](apis/jobs-tasks-tdos.md)
  - API Reference
    - [Mutation Methods](apis/reference/mutation/)
    - [Query Methods](apis/reference/query/)
    - [API Examples](apis/examples.md)
    - [Job Quickstart Guide](apis/job-quickstart/)
    - [Search Quickstart Guide](apis/search-quickstart/)
  - [Tutorials](apis/tutorials/)
    - [GraphQL API Basics](apis/tutorials/graphql-basics.md)
    - [Clean up TDO data](apis/tutorials/cleanup-tdo.md)
    - [Creating Export Requests](apis/tutorials/create-export-request/)
    - [Posting Engine Results](apis/tutorials/engine-results.md)
    - [Lookup Available Engines](apis/tutorials/get-engines.md)
    - [Error Handling in the GraphQL API](apis/tutorials/graphql-error-handling.md)
    - [Uploading and Processing Files](apis/tutorials/upload-and-process.md)
    - [Uploading Large Files](apis/tutorials/uploading-large-files.md)
    - [Handling File Upload Errors](apis/tutorials/file-upload-error-handling.md)
    - [Authentication and Authorization Tokens](apis/tutorials/tokens.md)
    - [Paging](apis/tutorials/paging.md)
    - [Asset Types](apis/tutorials/asset-types.md)

- [Developer](developer/)

  - [Developer Benefits](developer/benefits.md)

  - [Building **Applications**](developer/applications/)

    - [Quickstart](developer/applications/quick-start/)
      - [Step 1 - Register Your Application](developer/applications/quick-start/step-1.md)
      - [Step 2 - Set Up Authentication](developer/applications/quick-start/step-2.md)
      - [Step 3 - Add APIs and Components](developer/applications/quick-start/step-3.md)
      - [Step 4 - Submit Your Application](developer/applications/quick-start/step-4.md)
      - [Step 5 - Deploy Your Application](developer/applications/quick-start/step-5.md)
    - [Tutorial: Build Your Own AI App](developer/applications/app-tutorial/)
      - [Step 1: Register Your App](developer/applications/app-tutorial/app-tutorial-step-1.md)
      - [Step 2: Set Up Authentication](developer/applications/app-tutorial/app-tutorial-step-2.md)
      - [Step 3: Add Processing Logic](developer/applications/app-tutorial/app-tutorial-step-3.md)
      - [Step 4: Run Object Detection on a Video](developer/applications/app-tutorial/app-tutorial-step-4.md)
    - [Application Integration](developer/applications/integration/)
    - [Context Menu Extensions](developer/applications/context-menu-extensions.md)
    - [OAuth](developer/applications/oauth.md)
    - [Resources](developer/applications/resources.md)
    - [FAQ](developer/applications/faq.md)

  - [Building **Engines**](developer/engines/)

    - [Getting Started](developer/engines/getting-started/)
      - [Path to Monetization](developer/engines/getting-started/path-to-monetization/)
      - [Support](developer/engines/getting-started/support/)
      - [Technologies Used](developer/engines/getting-started/technologies/)
    - [Building **Cognitive Engines**](developer/engines/cognitive/)
      - Audio
        - [Audio Fingerprinting](developer/engines/cognitive/audio/audio-fingerprinting/)
      - Biometrics
        - [Face Detection](developer/engines/cognitive/biometrics/face-detection/)
        - [Face Recognition](developer/engines/cognitive/biometrics/face-recognition/)
      - Data
        - [Data Correlation](developer/engines/cognitive/data/correlation/)
        - [Geolocation](developer/engines/cognitive/data/geolocation/)
      - Speech
        - [Speaker Detection](developer/engines/cognitive/speech/speaker-detection/)
        - [Speaker Recognition](developer/engines/cognitive/speech/speaker-recognition/)
        - [Transcription](developer/engines/cognitive/speech/transcription/)
      - Text
        - [Content Classification](developer/engines/cognitive/text/content-classification/)
        - [Entity Extraction](developer/engines/cognitive/text/entity-extraction/)
        - [Keyword Extraction](developer/engines/cognitive/text/keyword-extraction/)
        - [Language Identification](developer/engines/cognitive/text/language-identification/)
        - [Sentiment Analysis](developer/engines/cognitive/text/sentiment/)
        - [Summarization](developer/engines/cognitive/text/summarization/)
        - [Text Extraction](developer/engines/cognitive/text/text-extraction/)
        - [Translation](developer/engines/cognitive/text/translation/)
          - [Extracted Text Translation](developer/engines/cognitive/text/translation/extracted-text/)
          - [Plain Text Translation](developer/engines/cognitive/text/translation/plain-text/)
          - [Recognized Text (OCR) Translation](developer/engines/cognitive/text/translation/recognized-text/)
          - [Rich Text Translation](developer/engines/cognitive/text/translation/rich-text/)
          - [Transcript Translation](developer/engines/cognitive/text/translation/transcript/)
      - Vision
        - [License Plate Recognition (ALPR)](developer/engines/cognitive/vision/license-plate/)
        - [Logo Detection](developer/engines/cognitive/vision/logo-detection/)
        - [Object Detection](developer/engines/cognitive/vision/object-detection/)
        - [Text Recognition (OCR)](developer/engines/cognitive/vision/text-recognition/)
    - [Building **Correlation Engines**](developer/engines/correlation/)
    - [Engine Developer Toolkit](developer/engines/toolkit/)
    - [Tutorial: Build Your Own Engine](developer/engines/tutorial/)
      - [Step 0 - Introduction and Project Setup](developer/engines/tutorial/)
      - [Step 1 - Register Your Project with Veritone](developer/engines/tutorial/engine-tutorial-step-1.md)
      - [Step 2 - Use Docker to Create a Build](developer/engines/tutorial/engine-tutorial-step-2.md)
      - [Step 3 - Test Your Build Locally](developer/engines/tutorial/engine-tutorial-step-3.md)
      - [Step 4 - Upload Your Build to Veritone](developer/engines/tutorial/engine-tutorial-step-4.md)
      - [Step 5 - Test Your Engine in aiWARE](developer/engines/tutorial/engine-tutorial-step-5.md)
      - [Deeper Dive: Customizing Engine Output](developer/engines/tutorial/customizing-engine-output.md)
      - [Deeper Dive: How to Train an Engine](developer/engines/tutorial/engine-training-tutorial)
    - [Approval Process](developer/engines/approval/)
    - [Deployment Models](developer/engines/deployment-model/)
    - [Processing Modes](developer/engines/processing-modes/)
      - [Segment Engine Processing](developer/engines/processing-modes/segment-processing/)
      - [Stream Engine Processing](developer/engines/processing-modes/stream-processing/)
    - [Engine Standards](developer/engines/standards/)
      - [Engine Output (vtn-standard)](developer/engines/standards/engine-output/)
      - [Engine Manifest](developer/engines/standards/engine-manifest/)
        <!-- - [Message Types](developer/engines/standards/message-types/)-->
    - [Custom Fields](developer/engines/custom-fields/)
    - [Polling](developer/engines/polling/)
    - [Callbacks](developer/engines/callbacks/)
    - [Testing & Debugging](developer/engines/testing-and-debugging/)

  - [Building **Flows**](developer/flow/)
    - [FAQ](developer/flow/faq.md)

  - [Building **Adapters**](developer/adapters/)

    - [Quickstart](developer/adapters/quick-start/)
      - [Step 1 - Register Your Adapter](developer/adapters/quick-start/step-1.md)
      - [Step 2 - Construct Your Code for the Veritone Platform](developer/adapters/quick-start/step-2.md)
      - [Step 3 - Create Your Manifest File](developer/adapters/quick-start/step-3.md)
      - [Step 4 - Package and Upload a Build](developer/adapters/quick-start/step-4.md)
      - [Step 5 - Submit Your Build for Approval](developer/adapters/quick-start/step-5.md)
      - [Step 6 - Deploy Your Adapter](developer/adapters/quick-start/step-6.md)
    - [Construction Guidelines](developer/adapters/guidelines.md)
    - [Adapter Manifest](developer/adapters/manifest.md)

  - [Working with **Structured Data**](developer/data/)

    - [Quickstart](developer/data/quick-start/)

  - [Working with **Libraries**](developer/libraries/)

    - [Library-enabled Engines](developer/libraries/engines.md)
    - [Training Engines](developer/libraries/training.md)
    - [Running Engines](developer/libraries/running.md)

  - [Machine Box](/developer/machine-box/)

    - [API guidelines](/developer/machine-box/api-guidelines)
    - [Setup](/developer/machine-box/setup/)
      - [Install Docker](/developer/machine-box/setup/docker)
      - [Box Keys](/developer/machine-box/setup/box-key)
    - [Boxes](/developer/machine-box/boxes/)
      - [Facebox](/developer/machine-box/boxes/facebox-overview)
        - [Facebox tutorial: Teaching Facebox](/developer/machine-box/boxes/teaching-facebox)
      - [Tagbox](/developer/machine-box/boxes/tagbox)
        - [Tagbox tutorial: Recognizing images](/developer/machine-box/boxes/tagbox/recognizing-images)
      - [Textbox](/developer/machine-box/boxes/textbox)
      - [Classificationbox](/developer/machine-box/boxes/classificationbox)
        - [Best practices for using Classificationbox](/developer/machine-box/boxes/classificationbox/best-practices)
      - [Nudebox](/developer/machine-box/boxes/nudebox)
      - [Objectbox](/developer/machine-box/boxes/objectbox)
      - [Fakebox](/developer/machine-box/boxes/fakebox)

  - [Developer Terms & Conditions](developer/terms-and-conditions.md)
