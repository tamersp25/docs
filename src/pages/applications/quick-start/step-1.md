---
title: Step 1. Create an Application
order: 1
---

When you create an app in Veritone, you specify general information that defines the basic configuration and settings of your app. Once your application is created, you’ll be provided with unique identifiers that you'll use [in the next section](step-2/) to set up user and API authentication with OAuth 2.0. 

## To create and configure your application
1\.  Log into Veritone Developer. Click **Overview** in the upper left of the window and select **Applications** from the dropdown. The _Applications_ page opens.

![VDA-Create-Application-1](VDA-Create-Application-1.png)

2\. Click **New Application** in the upper right of the window. The _Basic Application Details_ page opens.

![VDA-Create-Application-2](VDA-Create-Application-2.png)

3\. Enter the following basic details to define your application:  

* **Application Name**: _(required)_ Enter your application's name (up to 50 characters in length) as you would like it to appear to users.
* **Application Description**: _(required)_ Describe what your application does in a few sentences. This description will be shown to users.
*   **URL:** Enter the URL where the application can be accessed.
*   **Redirect URL:** Enter your application server's Oauth2 redirect/callback URL. See the section on [OAuth](../../oauth) for more information. 
*   **Icon**: _(optional)_ Upload an icon for your application from your local file system as a 128x128 png or jpg file. For best results, upload a square image. The icon displays to the left of the application name in the Veritone App Picker and will automatically be resized and converted to grayscale in the Veritone UI. If an icon is not uploaded, a generic icon will display with your application name.

4\. Click **Submit** to continue. The application details page opens and an "Application created successfully" message momentarily displays. 

![VDA-Create-Application-3](VDA-Create-Application-3.png)

5\. Review your application details.

*   If no changes need to be made, no further action is necessary.
*   If changes are required, make the necessary edits and click _Save_. An "Application updated successfully" message displays momentarily. Note that the _Save_ button remains blue after your changes have been applied. 

Once your app has been created, use the values at the top of the page to [configure your app with OAuth 2.0 authentication](../../oauth). 

![VDA-Create-Application-4](VDA-Create-Application-4.png)

6\. To access your app for testing, click the **App Picker** at the top of the window and select your app from the drop-down list.

![VDA Access Application from App Picker](VDA-Access-Application-from-App-Picker.png)
