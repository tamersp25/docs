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
    <p><span>Veritone unlocks unique insights from the sea of unstructured data with a rich and optimized portfolio of cognitive engines. Customers can employ multiple AI engines within the same class and across different classes, at high rates of cognition. Veritone currently offers more than 110 different production engines in 11 cognitive classes, including NLP, &nbsp;Computer Vision, Face Recognition, Sentiment, Translation, Audio Fingerprinting, Geolocation, and Content Moderation. </span></p>
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
    <p><span>Veritone currently supports a portfolio of 11 cognitive engines categories that provide an array of service types and deliver deep, targeted, predictable insight. Customers can employ multiple AI engines in parallel &mdash; within the same category and across different categories &mdash; to enance cognition.</span></p>
    <p><span><strong>Audio Detection -</strong> Detect characteristics of specific sounds, such as alarms, breaking glass, and gunshots as well as music.</span></p>
    <p><span><strong>Transcription -</strong> Convert spoken audio and video recordings into readable text. Transcription engines are built to recognize different languages, dialects, and topics. </span></p>
    <p><span><strong>Face Detection/Recognition -</strong>&nbsp;Detection will dentify and index the presence of human faces in video or still image content and display a snapshot from the source file. Recognition identifies specific people found in an organization&rsquo;s face libraries, by name, displaying a reference image from the library.</span></p>
    <p><span><strong>Translation -</strong> Translate written text from one language to another and they o en use algorithms to increase the accuracy of sentence structure and parts of speech.</span></p>
    <p><span><strong>Metadata Extraction -</strong> Analyze files to derive key data points such as file format, audio channels, and video resolution. </span></p>
    <p><span><strong>Object Recognition -</strong> &nbsp;Pinpoint multiple objects within video or still images, including optical character recognition (OCR), license plate, and logo recognition.</span></p>
    <p><span><strong>Geolocation -</strong> Associate media with geolocation data points and enable search by location, displaying a map view of media file collections or an association with a library of landmarks.</span><span><br /></span></p>
    <p><span><strong>Sentiment -</strong> Discern the tone behind a series of words (from text), used to gain an understanding of the attitudes, opinions, and emotions expressed.</span><span><br /></span></p>
    <p><span><strong>Fingerprinting -</strong> Generate a condensed digital summary, deterministically generated as a reference audio or video clip, that can be used to quickly locate similar items across multiple media files. &nbsp;References can be stored as a Library.</span><span><br /></span></p>
    <p><span><strong>Transcoding -</strong> Convert file format, bitrate, or resolution programmatically for improved cognitive processing.</span></p>
    <p><span><strong>OCR -</strong> A type of object recognition, OCR (Optical Character Recognition) engines convert images of typed, handwritten or printed text into machine-coded text. The images may occur in photos, printed or scanned documents, videos, streams or other sources.</span></p>
    <p><span><strong>Logo Recognition -</strong> Find occurrences of logos, typically corporate or institutional logos, when they appear in video.</span></p>
    <p>Veritone will be adding support for new Engine Categories over time based on client demand and/or developer interest.</p>
    <p><br /></p>
    <p><br /></p>
  </div>
)

export default IndexPage
