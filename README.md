# Veritone Docs

This is the source code to the Veritone aiWARE platform documentation available at [docs.veritone.com](https://docs.veritone.com).
If you'd like to read the documentation, it's probably easiest to do it there.
If you find something you think is inaccurate, feel free to [create an issue](https://github.com/veritone/docs/issues/new).

## Contributing

If you would like to suggest an edit to the docs, feel free to submit a pull request.
You'll probably want to chat with us in our [Slack community][veri-slack] first if it's a large change
to make sure we're in alignment.

### Overview

Veritone Docs is a static site built using Markdown files and powered by [Docsify][docsify].

### Requirements

- node 8
- yarn

### Developing Locally

```bash
yarn install
yarn start
```

This will spin up a local instance of the docs at http://localhost:3000.

### Submitting Changes

To submit changes, create a branch off master, add your commits, and create a pull request from your branch to master.
If the branch is in this repo (not a fork) and the name begins with `feature/VTN-` (internal Veritone users only), 
our build system will build it and let you know if it passed in the PR.
Once the PR is merged into master, it will be auto-deployed to docs.veritone.com.

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

To add a new link to the sidebar, please add a new entry to
https://github.com/veritone/veritone.github.io/blob/develop/docs/_sidebar.md.

### How to add a new child link to an existing side bar link

To add a child link to the sidebar, navigate to the child folder and update the `_sidebar.md` file to include the child link.
See https://github.com/veritone/veritone.github.io/blob/develop/docs/engines/quick-start/_sidebar.md for an example.

### Useful Resources

- [Markdown Cheatsheet][markdown-cheat]
- [Docsify Docs][docsify]

## Docker Test

To test the Docker build locally (internal Veritone users only), you can do the following:

```bash
# First, connect to VPN
# Export github access token
export GITHUB_ACCESS_TOKEN=redacted

# Build
docker build --build-arg GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN --build-arg ENVIRONMENT=dev -t docs .

# Run
docker run -it --rm -p 9000:9000 docs:latest
```

This is for local testing only.  Production builds happen through Jenkins.

# License
Copyright 2017, Veritone Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[docsify]: https://docsify.js.org/#/?id=docsify
[markdown-cheat]: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
[veri-slack]: https://chat.veritone.com
