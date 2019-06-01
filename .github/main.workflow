workflow "Audit npm packages on pull request" {
  on = "pull_request"
  resolves = ["npm audit"]
}

workflow "Audit npm packages on command" {
  on = "issue_comment"
  resolves = ["npm audit"]
}

action "npm audit" {
  uses = "./"
  secrets = ["GITHUB_TOKEN"]
}
