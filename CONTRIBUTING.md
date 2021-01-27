# Contributing

First, we are open and grateful for any contribution, bellow is what you need to know about.

## Code Style

The code style is enforced with eslint and prettier and is automatically checked when you commit. Any violation of the code style may prevent merging your contribuition, so please make sure to follow it.

## Commit Style

Commit messages are checked and enforced with commitlint [conventional config](https://github.com/conventional-changelog/commitlint). To help you write an appropriate message, checking is done when committing. Please if commit is about a open issue insert the issue id in end of commit inside parentheses. Ex: `fix: fix getProfile method not return profile data (#12)`.

## Docs

If you find some error in docs, please feel free to fix it in README.md.

## Issues

When creating issues, please provide as many details as possible. A clear explanation of the issue and a reliable example can help us, or someone, a lot to improving this project. Your issue may get closed if it cannot be easily reproduced so please provide a working example using either [Codesandbox](https://codesandbox.io/) or [jsfiddle](https://jsfiddle.net/). Your example should only focus on the issue, minimal and clearly produces the issue.

If your issue gets closed for not providing enough info or not responding to the maintainers comments, do not consider it a hostile action. There are probably other issues that the maintainers are working on and must give priority to issues that are well investigated, you can always revisit the issue and address the reasons that it was closed and we will be happy to re-open it and address it properly. Sometimes a commit will close your issue without a response from the maintainers so make sure you read the issue timeline to prevent any misunderstandings.

## Pull Requests

Before opening a PR, make sure to communicate via issues about your intent to avoid PRing something you think is an issue when might not be.

Feel free to propose changes that you think improve the project in some way, but make sure to provide a clear explanation of the why and how did you imagine that.

Checklist of stuff you need to be aware of
- Make sure you fill the PR template provided
- PRs should have titles that are clear as possible
- Make sure that your PR is up to date with the branch you are targeting, use [git rebase](https://git-scm.com/docs/git-rebase) for this
- Unfinished/In-Progress PRs should be marked as a `draft`
- Make sure to preview all pending PRs to make sure your work won't conflict with other ongoing pull-request
- The `main` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. *Do not submit PRs against the `main`* branch.
- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.
- Make sure to mention which issues are being fixed by the PR so they can be closed properly - [See how mention a issue to be closed](https://docs.github.com/pt/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword)
- If adding a new feature:
  <!-- - Add accompanying test case. -->
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.
<!-- - If fixing bug:
  - Add appropriate test coverage if applicable. -->

## Source Code

Currently we are using Typescript for the codebase, make sure to correctly type and export your changes if needed.

## Building

Use this command to build project build and test locally
```sh
npm run build

# Or

yarn build
```

## Tips for testing your changes

If you want to try out your changes

- Run [build command](#building) once you are done with your changes
- Run [npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) or [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/) and link @letscloud/node dist files to your project, or use [yalc](https://github.com/wclr/yalc)
