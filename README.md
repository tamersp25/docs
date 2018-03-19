# Veritone Docs

### Overview

Veritone Docs is static site built using Markdown files and powered by [Docsify](https://docsify.js.org/#/?id=docsify). Hosted on github pages and can be found at https://docs.veritone.com.

### Quick Start

Dev -

```bash
npm install
npm start
```

Deploy -

```bash
npm run deploy
```

### How to add code examples

```graphql
query {
  temporalDataObjects {
    records {
      id
      name
      description
      tasks {
        records {
          id
          name
          description
        }
      }
    }
  }
}
```

### How to add important content or general tip snippets.

https://docsify.js.org/#/helpers

### How to add a new link to the side bar

To add a new link to the sidebar, please add a new entry to https://github.com/veritone/veritone.github.io/blob/develop/docs/_sidebar.md.

### How to add a new child link to an existing side bar link

To add a child link to the sidebar, navigate to the child folder and update the `_sidebar.md` file to include the child link. See https://github.com/veritone/veritone.github.io/blob/develop/docs/engines/quick-start/_sidebar.md for an example.

### How to deploy

Run `npm run deploy` and your current source files will be bundled and pushed to the `master` branch. Github pages will automatically update with your latest changes. (This can sometimes take a few mins due to caching).

### Useful Resources

[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

[Docsify Docs](https://docsify.js.org/#/?id=docsify)

[Veritone External Developer Documentation](https://docs.veritone.com)
