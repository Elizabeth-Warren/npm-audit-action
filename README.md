# npm-audit-action

Run `npm audit` on every pull request and output the results to the comments.

## Setup

Create a new workflow template in your repo under `${PROJECT_ROOT}/.github/main.workflow`.

Use the following template,

```js
workflow "Audit npm packages" {
  on = "pull_request"
  resolves = ["npm audit"]
}

workflow "Audit npm packages on command" {
  on = "issue_comment"
  resolves = ["npm audit"]
}

action "npm audit" {
  uses = "elizabeth-warren/npm-audit-action@master"
  secrets = ["GITHUB_TOKEN"]
}
```

## Local Development

Use [act](https://github.com/nektos/act) for running Github actions locally.
