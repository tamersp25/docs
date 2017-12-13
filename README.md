# Veritone Docs


### Overview

Veritone Docs is static site built with a mix of React / Markdown and powered by [Gatsby](https://www.gatsbyjs.org). Currently hosted on github pages and can be found at https://docs.veritone.com. Gatsby is powered by `graphql` under the hood and has a plugin eco-system which allows us to customize the site with ease.


## Quick Start

Dev -

```bash
npm install
npm start
```

Deploy -

```bash
npm run deploy
```


### How to add a graphiql code example

To add a graphql code snippet that will interpolate into a graphiql code example all you need to do is to add a graphiql code snippet as shown below to your markdown file.

```graphql
---
---
query {
  temporalDataObjects {
    records {
      id,
      name,
      description,
      tasks {
        records {
          id,
          name,
          description
        }
      }
    }
  }
}
---
```


### How to add a new link to the side bar

All links in the side bar represent a folder in `src/pages`. To create a new side bar link, simply create a new `folder` in the pages folder i.e `src/pages/folderName`. You must ensure to include an `index.md` file which contains a `title` attribute in the markdown.


### How to add a new child link to an existing side bar link

To add a child link - follow the same steps above for adding a new link but nest the child folder inside of the parent link i.e `src/pages/parentFolder/childFolder`.


### How to deploy

Run `npm run deploy` and your current source files will be bundled and pushed to the `master` branch. Github pages will automatically update with your latest changes. (This can sometimes take a few mins due to caching).


### Useful Resources

[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

[Gatsby Docs](https://www.gatsbyjs.org/docs/)

[Veritone External Developer Documentation](https://veritone-developer.atlassian.net/wiki/spaces/DOC/overview)

