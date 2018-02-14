import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () => (
  <div>
    <h1>Veritone Overview</h1>
    <p>Veritone unlocks insights hidden within unstructured audio and video with the power of a single, SaasS-based, artificial intelligence (AI) platform. Pairing a portfolio of best-of-breed cognitive engines with an advanced suite of applications, Veritone delivers the value of artificial intelligence in a way that&rsquo;s accessible, understandable, and useful for a wide spectrum of customers &mdash; from individuals to large organizations. Every frame of video and second of audio can be searched for objects, license plates, faces, voices, brands, and more. With potent content ingestion, indexing, search, correlation, analytics, sharing, and collaboration capabilities, Veritone equips users with tools and insights to make smarter, more well-informed business decisions. <br /> <br />The Veritone Platform is designed to seamlessly integrate with external applications via a robust API. In addition, the Veritone Developer Application allows developers of custom applications, cognitive engines, and data sets/streams to build on the Veritone technology stack and provide their technology to customers through the Veritone Platform.</p>
    <h1><span>Key Platform Features</span></h1>
    <h3><strong>Ingestion &nbsp;</strong></h3>
    <p><span>Veritone ingests both public and private content and media through various adapters from virtually any source, including user computers and network-accessible drives, RSS, Amazon Web Services, YouTube, Google Drive, Dropbox, Vimeo, and FTP. The architecture inherently supports simple and rapid addition of new ingestion adaptors.</span></p>
    <h3><strong>Developer Platform and Ecosystem</strong></h3>
    <p><span>The Veritone Developer Application (VDA) allows developers to bring their ideas to life. The VDA connects developers with resources to create, submit, and deploy custom applications, cognitive engines, and data products into Veritone&rsquo;s architecture. </span></p>
    <h3><strong>A Broad and Growing Cognitive Spectrum</strong></h3>
    <p><span>Veritone unlocks unique insights from the sea of unstructured data with a rich and optimized portfolio of cognitive engines. Customers can employ multiple AI engines &mdash; both within the same category and across different categories &mdash; at high rates of cognition. Veritone&rsquo;s hundreds of production engines encompass seven cognitive classes and more than 50 categories, including NLP, Computer Vision, Face Recognition, Sentiment, Translation, Audio Fingerprinting, Geolocation, and Content Moderation. </span></p>
    <h3><strong>Proprietary Conductor</strong><sup><strong>TM</strong></sup><strong> Orchestration</strong></h3>
    <p><span>Proprietary Veritone Conductor technology optimizes the cognitive engine selection process by periodically evaluating the cost, speed, and accuracy of each engine to improve results and achieve higher levels of cognition. It orchestrates and intelligently routes media to the most appropriate cognitive engines within chosen engine classes to generate the best results.</span></p>
    <h3><strong>A Suite of Proprietary Applications &nbsp;</strong></h3>
    <p><span>Veritone&rsquo;s suite of native applications to enable users to ingest, process, index, manage, search, and share their cognitively-enriched content.</span></p>
    <h3><strong>Philosophy of Open Data</strong></h3>
    <p><span>This is a central tenet of the Veritone value proposition, embracing the philosophy of openly sharing the world&rsquo;s data to accelerate the global pace of machine learning via accessible and ever growing training data sets.</span></p>
    <h3><strong>Flexible Deployment Models &nbsp;</strong></h3>
    <p><span>The Veritone Platform offers a variety of implementation and media storage options to match the technical environment and security requirements of clients. Current deployment options include Amazon Web Services (AWS) and Microsoft Azure Government in the United States. Additional deployment options for AWS in the United Kingdom, AWS Government in the United States, and a hybrid on-premise cloud version of the award-winning solution are in development and scheduled for release in the second half of 2017.</span></p>
    <h3><strong>Future-Proof and Ever-Evolving</strong></h3>
    <p><span>The Veritone ecosystem of best-of-breed AI cognitive engines in a single platform eliminates the need for businesses, agencies, and individuals to select one vendor from the landscape of thousands of engines. This effectively future-proofs AI technology choices and ensures timely and common access to the latest AI advances.</span></p>
    <h1><span>Veritone Application Suite</span></h1>
    <p><span>Veritone&rsquo;s suite of powerful AI applications enables users to organize, manage, search, analyze and extend their cognitively-enriched content. The Platform includes the following native, general-purpose AI applications:</span></p>
    <p><strong>CMS</strong></p>
    <p><span>Veritone CMS (Content Management System) is used to ingest/add media, delete media, define cognitive workflows, process new or previously processed media with additional artificial intelligence engines, organize ingested media, check the status of artificial intelligence engine execution, and view summary statistics for all ingested media.</span></p>
    <p><strong>Discovery</strong></p>
    <p><span>Veritone Discovery allows users to create and execute direct searches against cognitive engine output, either through predefined programmatic queries (called Watchlists) or by ad-hoc searches. Permission-controlled actions including downloading media clips, editing cognitive metadata, and sharing search results are also enabled within the application.</span></p>
    <p><strong>Collections</strong></p>
    <p><span>Veritone Collections presents groupings of search results or Watchlists in shareable units called Collections. Users and organizations can extend and amplify their media by customizing and sharing Collections and Clips via embedded widget, social media, or email. &nbsp;&nbsp;</span></p>
    <p><strong>Analytics</strong></p>
    <p><span>Veritione Analytics features a set of dashboards that provide metrics on top-valued reporting measures and tools, allowing users to intuitively interact with and explore their data. &nbsp;Currently embedded in Discovery App.</span></p>
    <p><strong>Admin</strong></p>
    <p><span>Veritone Admin is used to establish, monitor, and manage account configurations, such as user permissions and cognitive workflows.</span></p>
    <p><strong>Library</strong></p>
    <p><span>Veritone Library provides capabilities for creating a custom database of faces to easily recognize people in video files. Veritone Library also includes a set of pre-defined libraries with more than 10,000 famous faces from around the world, including athletes, TV/news personalities, celebrities, and foreign dignitaries. </span></p>
    <p><strong>Developer</strong></p>
    <p><span>Veritone Developer is a self-service environment where registered AI application and cognitive engine developers alike can access tools, documentation, APIs to build and submit their work for consideration. Transparent usage and revenue reporting, competitive benchmarking, and other key performance indicators are also available within the Veritone Developer Application.</span></p>
    <h1><span>Engine Categories</span></h1>
    <p><span>Veritone&rsquo;s portfolio of seven cognitive engine classes encompasses more than 50 recognized categories to provide an array of service types and deliver deep, targeted, predictable insight. And with Veritone aiWARE technology, customers have the ability to employ multiple AI engines in parallel across any combination of categories to enhance cognition services.</span></p>
    <table>
  <tr>
    <td><strong>Engine Class</strong></td>
    <td><strong>Included Categories</strong></td>
  </tr>
  <tr>
    <td><strong>Speech</strong></td>
    <td>Transcription, Speaker Separation, Phonetic Search, Sentiment Analysis, Language Recognition, Speech Detection, Speech Conversational Bot, Keyword Spotting</td>
  </tr>
  <tr>
    <td><strong>Text</strong></td>
    <td>Translation, Text-to-Speech, Text Keyword/Topic Analysis, Natural Language Generation, Text Analytics, Text Sentiment Analysis, Text Language Recognition, Text Moderation, Text Conversational Bot</td>
  </tr>
  <tr>
    <td><strong>Vision</strong></td>
    <td>Object Recognition, OCR, Barcode/QR Code Recognition, Image Attributes, Scene Description, Visual Moderation, Object Matching, Motion Tracking, Action Classification, Visual Anomaly Detection, Scene Break Detection</td>
  </tr>
  <tr>
    <td><strong>Biometrics</strong></td>
    <td>Face Detection, Face Recognition, Face Verification, Face Attributes, Human Markers, Voice Recognition, Voice Analysis, Vital Signs</td>
  </tr>
  <tr>
    <td><strong>Audio</strong></td>
    <td>Audio Detection, Audio Fingerprinting, Audio Content Recognition, Audio Analytics, Audio Generation</td>
  </tr>
  <tr>
    <td><strong>Data</strong></td>
    <td>Data Anomaly Detection, Prediction/Trend Analysis, Geolocation, Data Analytics, Metadata Extraction, Optimization, Recommendation</td>
  </tr>
  <tr>
    <td><strong>Transformation</strong></td>
    <td>Transcoding, Redaction, Normalization/Combination, Editing, Video Synopsis, Text Alignment</td>
  </tr>
</table>
    <p><span>New engine categories will continue to be added over time based on client demand and/or developer interest. </span></p>
    <p><br /></p>
    <p><br /></p>
  </div>
)

export default IndexPage
