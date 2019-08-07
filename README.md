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

### Formatting conventions

In general, try to keep everything as simple as possible.
Use heading 1s (`# Title`) for the page title, then heading 2s (`## Title`) for major sections, section 3s for subsections and so on.
Don't choose headings based on the font size.

Separate sentences with a single carriage return.
When rendered this will just put a single space between the sentences.
Keeping sentences on separate lines helps to keep the markdown easily viewable without paragraphs running way off the screen.
For an actual paragraph break, separate with two carriage returns.

#### How to add important content or general tip snippets.

See the [docsify documentation](https://docsify.js.org/#/helpers) for the available helpers.
Our conventions for this repo are as follows:

- `>` is used for generally helpful hints and tips.
- `?>` is used for more important hints and tips.
While `>` notes could probably be skipped over by the reader and they'd still be successful, we expect they need to read the `?>` notes.
- `!>` is used for warnings about deprecated or otherwise problematic "land mines" the user should stay away from.



#### How to add code examples

Note the code type distinction after the 3 backticks.  It can be any of the following codes:

- graphql
- json
- javascript
- python
- bash
- http
- css
- html

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

#### Using Tables

Tables are great for displaying multi-dimensional information.
Unfortunately, they're a bit of a pain to deal with in Markdown.
Don't try to line everything up perfectly in the markdown; just ensure you have all the right separators.
Line up the table headers and the line under them, and for the rows, just add separators where appropriate.

```markdown
| Parameter | Value |
| --------- | ----- |
| `preferredInputFormat` | `"text/plain"` |
| `supportedInputFormats` | `["text/plain"]` |
| `engineMode` | `"chunk"` |
```

#### Advanced Formatting

If needed, Markdown does support using HTML directly inside of it, but try to avoid it wherever possible.
For example, don't sprinkle around a bunch of `<br>` tags just to get more spacing; let the site handle the formatting for you.
If we start to see that we need extra padding after h3s for example, we can apply it globally in the future.

If there is an advanced feature that you want added to lots of different places, consider building a plugin to render it based on very simple markdown (e.g. )
See the [docsify documentation](https://docsify.js.org/#/helpers) for the available helpers.
Our conventions for this repo are as follows:

### How to add a new link to the side bar

To add a new link to the sidebar, please add a new entry to the [_sidebar.md file](docs/_sidebar.md).

### How to add a new child link to an existing side bar link

To add a child link to the sidebar, navigate to the child folder and update the `_sidebar.md` file to include the child link.
See https://github.com/veritone/veritone.github.io/blob/develop/docs/engines/quick-start/_sidebar.md for an example.

### Useful Resources

- [Markdown Cheatsheet][markdown-cheat]
- [Docsify Docs][docsify]

## Testing

There is a suite of end-to-end tests at [test/e2e](test/e2e).
They are written using [CodeceptJS with Puppeteer](https://codecept.io/puppeteer).
To add a test file, just add any file under the test/e2e with `.test.js` at the end of it.

The test suite is run automatically as part of the Jenkins and Docker builds.
The test suite is also run as a git commit hook.
This ensures that you cannot commit unless tests are passing.

To quickly run the test suite manually while you already have a docs instance running on port 3000 (via `yarn start`)
you can run `yarn test:only` in another console.

### JUnit Test Results

All the test scripts are configured to output basic information to stdout and to also write a JUnit test result report at `test-results.xml`.
The JUnit results should then be able to be visualized in CI pipelines like Jenkins or other tools.

### Pretty Test Results

To generate a nice pretty interactive report of test results, you can run `yarn test`.
It will run the full test suite in a way that generates detailed results and then open a UI called [Allure](http://allure.qatools.ru/) to view those results in an interactive web report.

> Allure requires Java to be installed

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
