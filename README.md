# npm-audit-action

Run `npm audit` on every pull request and output the results to the comments.

## Setup

Create a new workflow template in your repo under `${PROJECT_ROOT}/.github/audit.workflow`.

Use the following template,

```js
workflow "Test most recent commit" {
  on = "pull_request"
  resolves = ["npm audit"]
}

action "npm audit" {
  uses = "elizabeth-warren/npm-audit-action@master"
}
```
