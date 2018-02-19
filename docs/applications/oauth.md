# OAuth2 Authentication and Authorization

Integrated apps in Veritone use the [OAuth 2.0](http://oauth.net/2/) protocol to authenticate, provide single sign-on, and generate tokens for use with APIs. OAuth 2.0 works by delegating user authentication to the service that hosts the user account, and then granting a third-party application access to specific user account data while keeping usernames, passwords, and other information private. The result of the OAuth 2.0 auth flow is a token your application can use to interact with Veritone's APIs.

All Veritone-integrated applications have authorization credentials that identify the app to Veritone’s OAuth 2.0 server. These credentials are generated when an application is created in Veritone Developer and they are used to authenticate users and configure API access through OAuth 2.0.

* **Application Client ID:** A publicly exposed string that is used by the service API to identify the application. The Client ID is also used to build authorization URLs that are presented to users.
* **Client Secret:** A unique value used to authenticate the identity of the application to the service API when the application requests to access a user's account. The Client Secret must be kept private between the application and the API.
* **Redirect URI:** The URI where the user will be directed after they authorize (or deny) your application. The Redirect URI must point to the part of your application that will handle authorization codes or access tokens.

## Examples and libraries

The [passport-veritone](https://github.com/veritone/veritone-sdk/tree/master/packages/passport-veritone) library provides a strategy for [Passport JS](http://www.passportjs.org/) which can be used in NodeJS apps to handle the OAuth2 token exchange.

[veritone-widgets-server](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-widgets-server) implements the full token exchange using passport-veritone.

[veritone-oauth-helpers](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-oauth-helpers) implements the client-side portion of the OAuth2 flow, with simple login() and logout() functions.

## OAuth Implementation Flow

Veritone uses an authorization code flow to verify the identity of users and issue tokens that provide your application with access to user account data. After creating your application’s OAuth credentials, follow the steps below to implement OAuth 2.0 authentication for your app.

1.  Your application sends to the user to the Authorization URL.
2.  The user logs in, authorizes your application, and is redirected back to your app's OAuth2 redirect URL.
3.  Your application receives an Authorization Code in the query of the request to the OAuth2 redirect URL.
4.  Your application requests an Access Token from Veritone using the Authorization Code.
5.  Your application receives the Access Token and uses it to authenticate subsequent requests.

### Step 1: Load the Authorization URL

First, load the authorization URL into a web browser window by sending the user to the OAuth Authorize endpoint with the following four parameters included in the query string:

*   **client_id:** The value for Application ID you received when creating your application. You can get the ID of your application from the Application Details page.
*   **redirect_uri:** The URL value for Redirect URL you set when creating your application. You can access or change the redirect URL of your application from the Application Details page. Remember to URL encode this value. This is where Veritone sends a user after an authorization code is granted.
*   **response_type:** Set the value as "code" to indicate that your application is requesting an authorization code in the response.
*   **scope:** The scope specifies the level of access that your application is requesting. Currently the only permissible value for the scope parameter is "all"

#### Sample Request 

```http
https://api.veritone.com/v1/admin/oauth/authorize?response\_type=code&client\_id=CLIENT\_ID&redirect\_uri=REDIRECT_URI&scope=all
```

### Step 2: User Authorizes Application

When a user clicks the link, they’ll be prompted to log into Veritone to authenticate their identity and then to authorize or deny the application access to their account.

### Step 3: Application Receives Authorization Code

If the user authorizes the application, they are sent to your application redirect URI with the OAuth token in the query string.

#### Sample Request

```http
https://myapp.com/oauth?code=sByW9xJiuqI
```

### Step 4: Application Requests Access Token

The authorization code must be exchanged for an OAuth access token to make API requests. Make a call to the token exchange endpoint with the following query parameters:

* **client_id:** The value for Application ID you received when creating your application. You can get the ID of your application from the Application Details page.
* **client_secret:** The value for Client Secret you received when creating your application. You can get the Client Secret from the Application Details page.
* **grant_type:** The value must be authorization_code indicating your application is exchanging an authorization code for an access token.
* **code:** The value for the authorization code your application extracted in the previous step.
* **redirect_uri:** The URL value for Redirect URL you set when creating your application. You can access or change the redirect URL of your application from the *Application Details* page.

#### Sample Request 

```bash
curl -X POST \ 
   https://api.veritone.com/v1/admin/oauth/token \
   -H 'content-type: application/x-www-form-urlencoded' \ 
   -d 'client\_id=CLIENT\_ID&client\_secret=CLIENT\_SECRET&code=ACCESS\_CODE&grant\_type=authorization\_code&redirect\_uri=REDIRECT_URI
```
  

Please remember that this request must happen from your application server, and not the frontend of your app. It is critical that your client_secret is not exposed.

### Step 5: Application Receives Access Token

A successful response from the code exchange request contains the access token.

#### Sample Response

```json
{ "access\_token": "\[the token\]", "token\_type": "Bearer" }
```

Your application is now authorized! Include the token in the Authorization header for calls to the Veritone API. 

  

#### Sample authorization header 

```bash
request headers:
... 
Authorization: Bearer ${your_access_token} 
...
```

### Important Notes About OAuth Access Tokens:

* OAuth tokens expire every seven days. When a token expires, the user/application must complete the OAuth implementation process again.
* The token refresh feature is currently not implemented.
* API calls made with an expired token will return error code 401.
* Tokens are not granted granular privileges; they are given access to the same resources that are available to the user.
