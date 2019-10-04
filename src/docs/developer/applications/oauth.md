<!-- markdownlint-disable -->
# OAuth2 Authentication and Authorization

Integrated apps in Veritone use the [OAuth 2.0](http://oauth.net/2/) protocol to authenticate, provide single sign-on, and generate tokens for use with APIs. It works by delegating user authentication to Veritone and then authorizing your application to obtain specific user account data while keeping usernames, passwords, and other information private.

## Getting Started

Before using OAuth with your application, you must register your application with Veritone. All registered applications are issued a set of authorization credentials &mdash; a *Client ID* and a *Client Secret* &mdash; that identify the app to Veritone’s OAuth 2.0 server.

* **Application Client ID:** A publicly exposed string that is used by the Veritone API to identify your application. The Client ID is also built into the Authorization URL that authenticates users .

* **Client Secret:** A unique value that can be used to authenticate the identity of your application to the Veritone API when your application requests to access a user's account. _The Client Secret must be kept private._

* **Redirect URI:** The URI where the user will be directed after the user authorizes your application to access the account. The Redirect URI should point to the part of your application that will handle authorization codes or access tokens.

### Access the Client ID, Client Secret, and Redirect URI

The *Client ID*, *Client Secret*, and *Redirect URI* are available at the top of the *Application Settings* page.

1. Log into Veritone Developer. Click *Overview* in the upper left of the window and select *Applications* from the dropdown. The *Applications* dashboard opens.

2. Click the appropriate **application name** in the list. The *Application Settings* panel opens.

![client-secret1](VDA-Oauth-Client-Secret-1.png)

3. The *Client ID*, *OAuth URL* (Redirect URI), and *Client Secret* display in the new panel.

![client-secret2](VDA-Oauth-Client-Secret-2.png)

To retrieve the *Client Secret*, click the **click to reveal** link, enter your Veritone password when prompted, and click **Submit** (do not press enter on your keyboard). The *Client Secret* displays.

### Examples and Libraries

The [passport-veritone](https://github.com/veritone/veritone-sdk/tree/master/packages/passport-veritone) library provides a strategy for [Passport JS](http://www.passportjs.org/) which can be used in NodeJS apps to handle the OAuth2 token exchange.

[veritone-widgets-server](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-widgets-server) implements the full token exchange using passport-veritone.

[veritone-oauth-helpers](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-oauth-helpers) implements the client-side portion of the OAuth2 flow, with simple login() and logout() functions.

For an example of how to implement the Implicit Grant flow, check out the [JavaScript example code for OAuth](developer/applications/app-tutorial/app-tutorial-step-2?id=authentication-option-2-oauth) in our [Build Your Own AI App](developer/applications/app-tutorial/) tutorial.

## Flow Options

Veritone supports two OAuth choreographies:

* A single-factor flow, sometimes called the [Implicit Grant](https://oauth.net/2/grant-types/implicit/) flow, involving a single round trip to the auth server. This flow type can be used by simple static web apps that aren't able to rely on server-side logic.

* A two-factor flow, also known as a [PKCE (Proof Key for Code Exchange)](https://www.oauth.com/oauth2-servers/pkce/) flow, involving a trip to the auth server from the client, and a separate trip (using a second authentication factor, the "Client Secret"), via a back-end server that hosts your app.

We'll discuss each of these in turn.

## Implementing the Single-Factor Flow

The single-factor (Implicit Grant) flow for OAuth is intended for simple browser-based ("serverless") web applications where the confidentiality of the *Client Secret* cannot be maintained. This is a redirection-based flow with all communication happening on the front end. The token to access a user’s account is given to the browser to forward to the application.

At a high-level, the single-factor flow follows these steps when a user clicks a "Sign In with Veritone" button in the app's UI.</br>

![sign-in-button](VDA-AppQS-Step2-OAuth-Sign-in-with-Veritone-Button.png)

1. Your application redirects the user to the Veritone authorization page, where the user authenticates by logging in.

2. Upon user login, Veritone redirects the user back to your application’s redirect URI with an Access Token as a URL fragment after the hash.

3. Your application extracts the Access Token from the URL and uses it as the API key.

![implicit-grant-flow](VDA-Oauth-Single_Factor.jpg)

*Additional notes:*

* The Client Secret is not used with the single-factor flow, since it is not able to be kept confidential.
* The single-factor (Implicit Grant) flow does not support Refresh Tokens. As a result, your app must request a new token each time the user logs in (if the token is not stored), or when the Access Token expires.

### Step 1: Authenticate User and Get Access Token

When a user attempts to begin a session with your app, he or she will click a "Sign In With Veritone" button on your login page and initiate the authentication process. In this first step, you'll construct a link that sends the user to Veritone’s authorization page and requests an *Access Token* from the API.

Use the components shown below to build the authorization URL. The *Client ID* and *Redirect URI* that you'll need to include can be found in the settings for your app, which you can get to by clicking the name of your app from the Applications dashboard.

#### Authorization Link Components

<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>response_type</td>
    <td>string</td>
    <td>The type of response being requested. Set the value as "token" to indicate that your application is requesting an Access Token in the response. </td>
  </tr>
  <tr>
    <td>client_id</td>
    <td>string</td>
    <td>The unique ID of your application. You can get the ID from the Application settings page.</td>
  </tr>
  <tr>
    <td>redirect_uri</td>
    <td>string</td>
    <td>The URL that you want the user redirected to after granting access to your app. This must match the Redirect URI value in the Application settings. </td>
  </tr>
  <tr>
    <td>scope</td>
    <td>string</td>
    <td>The level of access that your application is requesting. Currently the only permissible value for the scope parameter is "all."</td>
  </tr>
</table>

#### Sample Authorization URL

```http
https://api.veritone.com/v1/admin/oauth/authorize?response_type=token&client_id=e6ac4220-5898-456b-b6ae-ff4f4bb6b9bf&redirect_uri=https://bestappever.com/oauth/callback&scope=all
```

#### User Authorizes Application

When the user follows the authorization URL, he or she will be prompted to log in to Veritone to authenticate his/her identity and authorize your application to use the account.

#### Application Receives Access Token

After granting access by logging in, your user will be sent to your application's Redirect URI with an *Access Token* appended to the URL.

##### Sample Redirect URI with Access Token

```http
https://bestappever.com/oauth/callback#access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTEwZjIxYS1mYzY5LTQ4NTctODkwZS1iMDNmZGU1ZGJlYjMiLCJjb250ZW50QXBwbGljYXRpb25JZCI6ImVkMDc1OTg1LWJjOTQtNDA2Yi04NjM5LTQ0ZDFkYTQyYzNmYiIsIm9yaWdpbkhvc3QiOiJjYXBhcHAuY29tIiwic2NvcGUiOlt7ImFjdGlvbnMiOlsiaW5nZXN0aW9uOmRlbGV0ZSIsImluZ2VzdGlvbjp1cGRhdGUiLCJpbmdlc3Rpb246cmVhZCIsImluZ2VzdGlvbjpjcmVhdGUiLCJqb2I6Y3JlYXRlIiwiam9iOnJlYWQiLCJqb2I6dXBkYXRlIiwiam9iOmRlbGV0ZSIsInRhc2s6dXBkYXRlIiwicmVjb3JkaW5nOmNyZWF0ZSIsInJlY29yZGluZzpyZWFkIiwicmVjb3JkaW5nOnVwZGF0ZSIsInJlY29yZGluZzpkZWxldGUiLCJyZWNvcmRpbmc6Y2xvbmUiLCJyZXBvcnQ6Y3JlYXRlIiwiYW5hbHl0aWNzOnVzYWdlIiwibWVudGlvbjpjcmVhdGUiLCJtZW50aW9uOnJlYWQiLCJtZW50aW9uOnVwZGF0ZSIsIm1lbnRpb246ZGVsZXRlIiwiY29sbGVjdGlvbjpjcmVhdGUiLCJjb2xsZWN0aW9uOnJlYWQiLCJjb2xsZWN0aW9uOnVwZGF0ZSIsImNvbGxlY3Rpb246ZGVsZXRlIiwiYXNzZXQ6dXJpIl19XSwiaWF0IjoxNTIxNTUzMTY1LCJleHAiOjE1MjIxNTc5NjUsInN1YiI6Im9hdXRoMiIsImp0aSI6IjQ1OTk3NTBmLWY0ZjYtNGQ4OC05MDAwLTU5M2U1NzI5MmQ5NSJ9.1IduQXLnATUqnJnDKLJ2-uM2iimaT6qEkGetl6qm2Bk&token_type=Bearer
```

#### Possible Errors

If authorization fails, an error response will be sent to your application's redirect URI in the format shown below.

```http
http://yourapp.com#error={error_ID}
```

Any errors will be appended to the URI using one of the following Error IDs.

<table>
  <tr>
    <td>Error ID</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>invalid_request</td>
    <td>The request is missing a necessary parameter or the parameter has an invalid value.</td>
  </tr>
  <tr>
    <td>unauthorized_client</td>
    <td>The Client ID is invalid or the client is not authorized to request an authorization code using this method.</td>
  </tr>
  <tr>
    <td>access_denied</td>
    <td>The server denied the request.</td>
  </tr>
  <tr>
    <td>unsupported_response_type</td>
    <td>The specified response type is invalid or unsupported.</td>
  </tr>
  <tr>
    <td> invalid_scope</td>
    <td>The requested scope is invalid, unknown, or malformed.</td>
  </tr>
  <tr>
    <td>server_error</td>
    <td>The server encountered an internal error.</td>
  </tr>
  <tr>
    <td>temporarily_unavailable</td>
    <td>The server is temporarily unavailable but should be able to process the request at a later time</td>
  </tr>
</table>

### Step 2: Use the Access Token

Once your application has an *Access Token*, you can use it to access the user's account via the Veritone API. To make requests, pass the *Access Token* in the *Authorization* header with the value *Bearer {access token}*, as shown below.

#### Sample header format

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTEwZjIxYS1mYzY5LTQ4NTctODkwZS1iMDNmZGU1ZGJlYjMiLCJjb250ZW50QXBwbGljYXRpb25JZCI6ImVkMDc1OTg1LWJjOTQtNDA2Yi04NjM5LTQ0ZDFkYTQyYzNmYiIsIm9yaWdpbkhvc3QiOiJjYXBhcHAuY29tIiwic2NvcGUiOlt7ImFjdGlvbnMiOlsiaW5nZXN0aW9uOmRlbGV0ZSIsImluZ2VzdGlvbjp1cGRhdGUiLCJpbmdlc3Rpb246cmVhZCIsImluZ2VzdGlvbjpjcmVhdGUiLCJqb2I6Y3JlYXRlIiwiam9iOnJlYWQiLCJqb2I6dXBkYXRlIiwiam9iOmRlbGV0ZSIsInRhc2s6dXBkYXRlIiwicmVjb3JkaW5nOmNyZWF0ZSIsInJlY29yZGluZzpyZWFkIiwicmVjb3JkaW5nOnVwZGF0ZSIsInJlY29yZGluZzpkZWxldGUiLCJyZWNvcmRpbmc6Y2xvbmUiLCJyZXBvcnQ6Y3JlYXRlIiwiYW5hbHl0aWNzOnVzYWdlIiwibWVudGlvbjpjcmVhdGUiLCJtZW50aW9uOnJlYWQiLCJtZW50aW9uOnVwZGF0ZSIsIm1lbnRpb246ZGVsZXRlIiwiY29sbGVjdGlvbjpjcmVhdGUiLCJjb2xsZWN0aW9uOnJlYWQiLCJjb2xsZWN0aW9uOnVwZGF0ZSIsImNvbGxlY3Rpb246ZGVsZXRlIiwiYXNzZXQ6dXJpIl19XSwiaWF0IjoxNTIxNTUzMTY1LCJleHAiOjE1MjIxNTc5NjUsInN1YiI6Im9hdXRoMiIsImp0aSI6IjQ1OTk3NTBmLWY0ZjYtNGQ4OC05MDAwLTU5M2U1NzI5MmQ5NSJ9.1IduQXLnATUqnJnDKLJ2-uM2iimaT6qEkGetl6qm2Bk
```

Access tokens expire after seven days. Unlike the two-factor (PKCE) flow described further below, *Refresh Tokens* are not available via the single-factor flow. Refreshing a token requires use of the Client Secret, which cannot safely be stored in the single-factor flow scenario.

> If your application does not store the *Access Token*, users will be required to log in and re-authorize your app with each session. If your application stores the token and sends the user to the authorization page before the *Access Token* expires, the user will not be prompted to log in and will be immediately redirected to your application. API calls made with an expired or invalid token will, of course, result in an error.

## Implementing the Two-Factor (PKCE) Flow

The two-factor ([PKCE](https://www.oauth.com/oauth2-servers/pkce/)) flow is designed for server-side applications where the confidentiality of the *Client Secret* can be maintained.

> Technically, the two-factor PKCE flow can be used in serverless apps as well, by (for example) taking advantage of Lambda environment variables using something like [serverless-dotenv-plugin](https://www.npmjs.com/package/serverless-dotenv-plugin).

The two-factor PKCE flow is a redirection-based flow that begins with user authentication returning an *Authorization Code* that’s then exchanged for an *Access Token*. (When asking for the Access Token, your app will present the _Client Secret_, as an additional security factor.) Along with the *Access Token*, your app will get a *Refresh Token* that can be saved in a database and used at a later point to generate a new Access Token, after the original expires. Because the Authorization Code Flow uses a Client ID *and* a (securely stored) Client Secret to retrieve tokens from the back end, it has the benefit of not exposing tokens to the web client.

![PKCE-code-flow](VDA-Oauth-Two_Factor.jpg)

At a high level, the two-factor PKCE flow follows these steps when a user clicks your app's "Sign In with Veritone" button:</br>

1. Your application redirects the user to the Veritone authorization server, where the user authenticates his or her identity and authorizes your app to access the user's account by logging in.
2. An Authorization Code is passed to your application from the Veritone authorization server.
3. Your application sends the Authorization Code, _plus the Client Secret_ (which you should have obtained earlier via the Veritone Developer app, per the discussion near the top of this page), to Veritone. In return, Veritone sends back an Access Token and a Refresh Token.
4. Your application uses the Access Token to call the Veritone API.

### Step 1: Authenticate User and Get Authorization Code

User authentication begins when the user clicks your app's "Sign In With Veritone" button. When the button is clicked, you'll send the user to an authorization page where he or she will authenticate. To carry out this first step, you'll need to construct a link to the authorization server by adding specific parameters to the query that identify your app (see below). The *Client ID* and *Redirect URI* that you'll need to include in the authorization URL can be found in the settings for your app, which you can get to by clicking the name of your app from the *Applications* dashboard of Veritone Developer. (See discussion at the top of this page.)

#### Authorization URL Components

<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>response_type</td>
    <td>string</td>
    <td>The type of response being requested. Set the value as "code" to indicate that your application is requesting an authorization code in the response. </td>
  </tr>
  <tr>
    <td>client_id</td>
    <td>string</td>
    <td>The unique ID of your application. You can get the ID from the Application Settings page.</td>
  </tr>
  <tr>
    <td>redirect_uri</td>
    <td>string</td>
    <td>The URL that you want the user redirected to after granting access to your app. This must match the Redirect URI value in the Application Settings. </td>
  </tr>
  <tr>
    <td>scope</td>
    <td>string</td>
    <td>The level of access that your application is requesting. Currently the only permissible value for the scope parameter is "all."</td>
  </tr>
   <tr>
      <td>state</td>
      <td>string</td>
      <td>This can be any string, of any length. The "state" value you send here will be sent back to you in the server response; you should verify that this value has not changed. (The "state" parameter should be a unique one-time value, to prevent replay attacks.) The intended use of this parameter is described in more detail <a href="https://tools.ietf.org/html/rfc6819#section-5.3.5">here</a>.</td>
    </tr>
</table>

##### Sample Authorization URL

```http
https://api.veritone.com/v1/admin/oauth/authorize?response_type=code&client_id=e6ac4220-5898-456b-b6ae-ff4f4bb6b9bf&redirect_uri=https://bestappever.com/oauth/callback&scope=all
```

#### User Authorizes Application

When the user clicks the link, they’re prompted to log into Veritone to authenticate their identity and authorize your application to access their account.

#### Application Receives Authorization Code

After the user grants access by logging in, he or she will arrive at your application’s Redirect URI with an *Authorization Code* query parameter appended to the URL. You'll use that code in the next step to get an *Access Token* and a *Refresh Token* from Veritone.

##### Sample Redirect URI with Authorization Code

```http
https://bestappever.com/oauth/callback?code=U1XbJMBhiRk
```

#### Possible Errors

<table>
  <tr>
    <td>Error ID</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>invalid_request</td>
    <td>The request is missing a necessary parameter or the parameter has an invalid value.</td>
  </tr>
  <tr>
    <td>unauthorized_client</td>
    <td>The Client ID is invalid or the client is not authorized to request an authorization code using this method.</td>
  </tr>
  <tr>
    <td>access_denied</td>
    <td>The server denied the request.</td>
  </tr>
  <tr>
    <td>unsupported_response_type</td>
    <td>The specified response type is invalid or unsupported.</td>
  </tr>
  <tr>
    <td> invalid_scope</td>
    <td>The requested scope is invalid, unknown, or malformed.</td>
  </tr>
  <tr>
    <td>server_error</td>
    <td>The server encountered an internal error.</td>
  </tr>
  <tr>
    <td>temporarily_unavailable</td>
    <td>The server is temporarily unavailable but should be able to process the request at a later time</td>
  </tr>
</table>

### Step 2: Request Access and Refresh Tokens

Your application uses the *Authorization Code* it received, along with a Client Secret (which you should have obtained in the Veritone Developer UI) to request an *Access Token* and a *Refresh Token* from the Veritone server. To exchange the auth code and Client Secret for tokens, POST a request to the *Token Exchange* endpoint with the parameters below posted as a part of the URL-encoded form values.

*Important note:* To ensure the security of the *Client Secret*, this request must happen from your application server and not the front end of your app.

#### Request Details

* **HTTP Method:** POST
* **Content Type:** application/x-www-form-urlencoded
* **Response Format:** JSON
* **Endpoint:** https://api.veritone.com/v1/admin/oauth/token

##### Request Parameters

<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>client_id</td>
    <td>string</td>
    <td>The unique ID of your application. You can get the ID from the Application Settings page.</td>
  </tr>
  <tr>
    <td>client_secret</td>
    <td>string</td>
    <td>Your application’s Client Secret. You can get the Client Secret from the Application Settings page.</td>
  </tr>
  <tr>
    <td>grant_type</td>
    <td>string</td>
    <td>The grant type of the request. The value must be authorization_code to indicate that your application is exchanging an Authorization Code for a Access and Refresh Tokens.</td>
  </tr>
  <tr>
    <td>code</td>
    <td>string</td>
    <td>The Authorization Code value returned to your redirect URI when the user authorized your app. </td>
  </tr>
  <tr>
    <td>redirect_uri</td>
    <td>string</td>
    <td>The redirect URI that was used when the user authorized your app (Step 1). This must match the Redirect URI value in the Application Settings.</td>
  </tr>
</table>

##### Sample Request

```http
curl -X POST \
https://api.veritone.com/v1/admin/oauth/token \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=e6ac4220-5898-456b-b6ae-ff4f4bb6b9bf&client_secret=3GJjP97ryVwKvqXt6L518Hf5wUEZ1Po2lsobEEoAZh1D-WxB35cn-A&code=U1XbJMBhiRk&grant_type=authorization_code&redirect_uri=https://bestappever.com/oauth/callback'
```

#### Application Receives Access Token

A successful response from the code exchange request contains the *Access* and *Refresh Tokens*.

##### Sample Response

```json
{
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTEwZjIxYS1mYzY5LTQ4NTctODkwZS1iMDNmZGU1ZGJlYjMiLCJjb250ZW50QXBwbGljYXRpb25JZCI6ImVkMDc1OTg1LWJjOTQtNDA2Yi04NjM5LTQ0ZDFkYTQyYzNmYiIsIm9yaWdpbkhvc3QiOiJjYXBhcHAuY29tIiwic2NvcGUiOlt7ImFjdGlvbnMiOlsiaW5nZXN0aW9uOmRlbGV0ZSIsImluZ2VzdGlvbjp1cGRhdGUiLCJpbmdlc3Rpb246cmVhZCIsImluZ2VzdGlvbjpjcmVhdGUiLCJqb2I6Y3JlYXRlIiwiam9iOnJlYWQiLCJqb2I6dXBkYXRlIiwiam9iOmRlbGV0ZSIsInRhc2s6dXBkYXRlIiwicmVjb3JkaW5nOmNyZWF0ZSIsInJlY29yZGluZzpyZWFkIiwicmVjb3JkaW5nOnVwZGF0ZSIsInJlY29yZGluZzpkZWxldGUiLCJyZWNvcmRpbmc6Y2xvbmUiLCJyZXBvcnQ6Y3JlYXRlIiwiYW5hbHl0aWNzOnVzYWdlIiwibWVudGlvbjpjcmVhdGUiLCJtZW50aW9uOnJlYWQiLCJtZW50aW9uOnVwZGF0ZSIsIm1lbnRpb246ZGVsZXRlIiwiY29sbGVjdGlvbjpjcmVhdGUiLCJjb2xsZWN0aW9uOnJlYWQiLCJjb2xsZWN0aW9uOnVwZGF0ZSIsImNvbGxlY3Rpb246ZGVsZXRlIiwiYXNzZXQ6dXJpIl19XSwiaWF0IjoxNTIxNTUzMDA3LCJleHAiOjE1MjIxNTc4MDcsInN1YiI6Im9hdXRoMiIsImp0aSI6ImU5M2I1ODI4LTI2ZWEtNDRjZC1iY2RjLTJhODI0NzdjYWUwNCJ9.c8YmVN_R4OhVYFRscBi1wIXIX7MzhPwixHe-UQ05gE0",
   "refresh_token": "xi_kwP2_laa4t7_Mwu-k0a_dka3V3YWfIH-Nm7C84XaBvkjyUDdS5A",
   "token_type": "Bearer"
}
```

Your application is now authorized! The *Access Token* can be used to authenticate API requests that your app makes.

#### Possible Errors

<table>
  <tr>
    <td>Error ID</td>
    <td>Details</td>
  </tr>
  <tr>
    <td>invalid_client</td>
    <td>Application authentication failed.</td>
  </tr>
  <tr>
    <td>invalid_grant</td>
    <td>The code is invalid or the redirect_uri does not match the one used in the authorization request.</td>
  </tr>
  <tr>
    <td>invalid_request</td>
    <td>A required parameter is missing or invalid.</td>
  </tr>
  <tr>
    <td>unauthorized_client</td>
    <td>The application is not authorized to use the grant.</td>
  </tr>
  <tr>
    <td>unsupported_grant_type</td>
    <td>The grant_type isn’t authorization_code.</td>
  </tr>
</table>

### Step 3. Using OAuth 2.0 Access Tokens

Your application will use the Access Token to access the user's account via the Veritone API. An Access Token is passed as a bearer token in the Authorization HTTP header of requests.

#### Sample header format

```http
Authorization: Bearer {access token}
```

> Access tokens expire after seven days. The refresh token may be used to request new a new access token after the initial token expires. If the access token is expired or otherwise invalid, the API will return an error.

### Step 4. Using a Refresh Token

*Access Tokens* expire every seven days. When an *Access Token* expires, using it to make an API request will result in an "Invalid Token Error." You can use the *Refresh Token* that was included when the original *Access Token* was issued to get a new *Access Token* without requiring the user to be redirected.

#### Request Details

* **HTTP Method:** POST
* **Content Type:** application/x-www-form-urlencoded
* **Response Format:** JSON
* **Endpoint**: https://api.veritone.com/v1/admin/oauth/token

##### Request Parameters

<table>
  <tr>
    <td>Parameter</td>
    <td>Type</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>client_id</td>
    <td>string</td>
    <td>The unique ID of your application. You can get the ID from the Application Settings page.</td>
  </tr>
  <tr>
    <td>client_secret</td>
    <td>string</td>
    <td>Your application’s Client Secret. You can get the Client Secret from the Application Settings page.</td>
  </tr>
  <tr>
    <td>grant_type</td>
    <td>string</td>
    <td>The grant type of the request. The value must be `refresh_token` to indicate that your application is exchanging an Authorization Code for Access and Refresh Tokens.</td>
  </tr>
  <tr>
    <td>refresh_token</td>
    <td>string</td>
    <td>The Refresh Token value obtained when the original Access Token was issued. </td>
  </tr>
</table>

##### Sample Request

```http
curl -X POST \
https://api.veritone.com/v1/admin/oauth/token \
-H 'content-type: application/x-www-form-urlencoded' \
-d 'client_id=e6ac4220-5898-456b-b6ae-ff4f4bb6b9bf&client_secret=3GJjP97ryVwKvqXt6L518Hf5wUEZ1Po2lsobEEoAZh1D-WxB35cn-A&grant_type=refresh_token&refresh_token=xi_kwP2_laa4t7_Mwu-k0a_dka3V3YWfIH-Nm7C84XaBvkjyUDdS5A'
```

##### Sample Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4YTEwZjIxYS1mYzY5LTQ4NTctODkwZS1iMDNmZGU1ZGJlYjMiLCJjb250ZW50QXBwbGljYXRpb25JZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIm9yaWdpbkhvc3QiOiJjYXBhcHAuY29tIiwic2NvcGUiOlt7ImFjdGlvbnMiOlsiaW5nZXN0aW9uOmRlbGV0ZSIsImluZ2VzdGlvbjp1cGRhdGUiLCJpbmdlc3Rpb246cmVhZCIsImluZ2VzdGlvbjpjcmVhdGUiLCJqb2I6Y3JlYXRlIiwiam9iOnJlYWQiLCJqb2I6dXBkYXRlIiwiam9iOmRlbGV0ZSIsInRhc2s6dXBkYXRlIiwicmVjb3JkaW5nOmNyZWF0ZSIsInJlY29yZGluZzpyZWFkIiwicmVjb3JkaW5nOnVwZGF0ZSIsInJlY29yZGluZzpkZWxldGUiLCJyZWNvcmRpbmc6Y2xvbmUiLCJyZXBvcnQ6Y3JlYXRlIiwiYW5hbHl0aWNzOnVzYWdlIiwibWVudGlvbjpjcmVhdGUiLCJtZW50aW9uOnJlYWQiLCJtZW50aW9uOnVwZGF0ZSIsIm1lbnRpb246ZGVsZXRlIiwiY29sbGVjdGlvbjpjcmVhdGUiLCJjb2xsZWN0aW9uOnJlYWQiLCJjb2xsZWN0aW9uOnVwZGF0ZSIsImNvbGxlY3Rpb246ZGVsZXRlIiwiYXNzZXQ6dXJpIl19XSwiaWF0IjoxNTIxNzQwNTQyLCJleHAiOjE1MjIzNDUzNDIsInN1YiI6Im9hdXRoMiIsImp0aSI6IjE2ZTg5ZWE1LTUwMTUtNGQzOS05OTJlLTIyZGQ0ZWVhNTdhYiJ9.9zMKZsbKIiAkmxhYsV4QJ1RiSKm4H1jp51w5iRqTQ-8",
  "refresh_token": "xi_kwP2_laa4t7_Mwu-k0a_dka3V3YWfIH-Nm7C84XaBvkjyUDdS5A",
  "token_type": "Bearer"
}
```
