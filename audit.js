const { Toolkit } = require('actions-toolkit');

const tools = new Toolkit({
  event: ['pull_request'],
});

const result = await tools.runInWorkspace('npm', ['audit']);

await tools.github.issues.create({
  ...tools.context.issue,
  body: `## npm audit report\n\n\`\`\`\n${result}\n\`\`\``,
});
