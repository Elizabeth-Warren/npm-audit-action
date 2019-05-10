const { Toolkit } = require('actions-toolkit');

(async function() {
  const tools = new Toolkit({
    event: ['pull_request'],
  });

  let details = null;

  async function postComment() {
    const {
      issue: {
        owner,
        repo,
        issue_number: number,
      },
    } = tools.context;

    await tools.github.issues.createComment({
      owner,
      repo,
      issue_number,
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
