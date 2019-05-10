const { Toolkit } = require('actions-toolkit');

(async function() {
  const tools = new Toolkit({
    event: ['pull_request'],
  });

  try {
    const result = await tools.runInWorkspace('npm', ['audit']);

    console.log('result', result);

    await tools.github.pulls.createComment({
      ...tools.context.issue,
      body: `## npm audit report\n\n\`\`\`\n${result}\n\`\`\``,
    });
  } catch (error) {
    console.error('error', error);
  }
})();
