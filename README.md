# npm-audit-action

Run `npm audit` on every pull request and output the results to the comments.

## Setup

Create a new workflow templates under `${PROJECT_ROOT}/.github/workflows`.

Use the following templates,

**issue_comment.yml**
```yml
on: issue_comment
name: Audit npm packages on command
jobs:
  npmAudit:
    name: npm audit
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: npm audit
      uses: ./
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**pull_request.yml**
```yml
on: pull_request
name: Audit npm packages on pull request
jobs:
  npmAudit:
    name: npm audit
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: npm audit
      uses: ./
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
