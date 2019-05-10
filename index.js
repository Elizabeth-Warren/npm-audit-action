const { Toolkit } = require('actions-toolkit');

(async function() {
  const tools = new Toolkit({
    event: ['pull_request'],
  });

  let details = null;

  async function postComment() {
    await tools.github.pulls.createComment({
      ...tools.context.issue,
      body: `## npm audit report\n\n\`\`\`\n${details}\n\`\`\``,
    });
  }

  try {
    details = await tools.runInWorkspace('npm', ['audit']);
  } catch (error) {
    if (error
      && error.message
      && error.message.includes('npm audit security report')
    ) {
      details = error.message;
    } else {
      console.error('error', error);
    }
  }

  if (details) {
    await postComment();
  }
})();
