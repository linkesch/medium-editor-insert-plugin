# Maintainers

## How to add contributors to README

After every pull request merge, use [all-contributors bot](https://all-contributors.js.org) to update contributors table in README. Do that by commenting in the same pull request the following message:

`@all-contributors please add @[name of the contributor] for [code|doc|or other type]`

Types of contribution are described in [all-contributors' docs](https://all-contributors.js.org/docs/emoji-key). Most commonly used ones are: `code` and `doc`.

The bot will automatically create a new pull request with changes to README. Merge that to master and you're done.

## How to release a new version

1. Update changelog:

    a. Run [`git changelog`](https://github.com/tj/git-extras) or
    b. Find the last release commit in log history. Look through all the commits or PR history and see all the stuff that has happened since the last release. Add a row describing each high-level change into CHANGES.md.

2. Depending upon the changes, decide if it is a major/minor/patch release ([semantic versioning](http://semver.org/)).
3. Update version number in package.json and bower.json.
4. Run `grunt` to build dist files.
5. Commit all your changes (including CHANGES.md) into your commit. Add the new release number into your commit message. And push it up to the remote master branch.
6. [Go here](https://github.com/orthes/medium-editor-insert-plugin/releases) and ‘Draft a new release’. Title the release as the new release number (ex: 5.11.0). Copy/paste the entries you made in CHANGES.md into the release summary. Make sure the release is against the master branch.
7. Once the release is created, go back to your git and run `npm publish`.
