---
title: Veritone SDK
---

The [Veritone-SDK](https://github.com/veritone/veritone-sdk) repo on GitHub contains several packages Veritone has created for both internal use and for the use of our developers, to make Veritone platform app development easier.

## Packages
[Package index on GitHub](https://github.com/veritone/veritone-sdk/tree/master/packages)

### [passport-veritone](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-client-js)
Provides a strategy for [Passport JS](http://www.passportjs.org/) which can be used in NodeJS apps to handle the OAuth2 token exchange.

### [veritone-client-js](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-client-js)
(Deprecated)
A wrapper around our legacy REST API. 

### [veritone-dev-env](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-dev-env)
Configurations for common devtools used in other SDK repos:
* prettier
* eslint
* stylelint

### [veritone-functional-permissions](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-functional-permissions)
Tools for decoding the permission bitmask on a user object, verifying the users permission to access platform functionality.

### [veritone-oauth-helpers](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-oauth-helpers)
Implements the client-side portion of the OAuth2 flow, with simple login() and logout() functions. Relies on veritone-widgets-server.

### [veritone-react-common](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-react-common)
Library of common React components used when building Veritone frontends.

### [veritone-redux-common](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-redux-common)
Library of common Redux components used when building Veritone frontends. User management, authentication, common helpers, etc.

### [veritone-widgets-server](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-widgets-server)
Implements a simple OAuth backend, required when using veritone-widgets (serverless implicit grant flow coming soon). Built with Node and Express. Can easily be used as the base for a custom app server when writing an app on Veritone's platform.

### [veritone-widgets](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-widgets)
Library of self-contained "widgets" used when building Veritone applications. These simplify the process of including common, but complex, pieces of UI such as our app bar, app switcher, profile menu, and file uploader.



