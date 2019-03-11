# Resources

The [veritone-sdk](https://github.com/veritone/veritone-sdk) repo on GitHub contains several packages Veritone has created for both internal use and for the use of our developers, to help streamline application development.

## Widgets

[veritone-widgets](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-widgets) is an evolving library of self-contained "widgets" used to build Veritone applications. These simplify the process of including common, but complex, pieces of UI such as our [app bar](https://veritone-react-common.now.sh/?knob-Size=75&selectedKind=AppBar&selectedStory=Base&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs), app switcher, profile menu, and [file picker](https://veritone-react-common.now.sh/?knob-Size=75&selectedKind=FilePicker&selectedStory=Base&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybooks%2Fstorybook-addon-knobs).

Take a look at our [quick-start](https://github.com/veritone/veritone-sdk/blob/master/packages/veritone-widgets/README.md#quick-start) to see how easy it is to get started.

## Sample App

The [Veritone Sample App - React](https://github.com/veritone/veritone-sample-app-react) is a minimal boilerplate for creating Veritone powered web applications (SPAs).

## Packages

All packages can be easily installed into any NodeJS application with a simple `npm install <package-name>`.
For the full source code of all packages, see the [package index on GitHub](https://github.com/veritone/veritone-sdk/tree/master/packages).

### [passport-veritone](https://www.npmjs.com/package/passport-veritone)

Provides a strategy for [Passport JS](http://www.passportjs.org/) which can be used in NodeJS apps to handle the OAuth2 token exchange.

### [veritone-dev-env](https://www.npmjs.com/package/veritone-dev-env)

Configurations for common devtools used in other SDK repos:

* prettier
* eslint
* stylelint

### [veritone-functional-permissions](https://www.npmjs.com/package/veritone-functional-permissions)

Tools for decoding the permission bitmask on a user object, verifying the users permission to access platform functionality.

### [veritone-oauth-helpers](https://www.npmjs.com/package/veritone-oauth-helpers)

Implements the client-side portion of the OAuth2 flow, with simple login() and logout() functions. Relies on veritone-widgets-server.

### [veritone-react-common](https://www.npmjs.com/package/veritone-react-common)

Library of common React components used when building Veritone frontends.

### [veritone-redux-common](https://www.npmjs.com/package/veritone-redux-common)

Library of common Redux components used when building Veritone frontends. User management, authentication, common helpers, etc.

### [veritone-widgets-server](https://github.com/veritone/veritone-sdk/tree/master/packages/veritone-widgets-server)

Implements a simple OAuth backend, required when using veritone-widgets (serverless implicit grant flow coming soon). Built with Node and Express. Can easily be used as the base for a custom app server when writing an app on Veritone's platform.

### [veritone-widgets](https://www.npmjs.com/package/veritone-widgets)

Library of self-contained "widgets" used when building Veritone applications. These simplify the process of including common, but complex, pieces of UI such as our app bar, app switcher, profile menu, and file uploader.
