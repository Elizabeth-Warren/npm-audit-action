const { Toolkit } = require('actions-toolkit');

async function postComment(tools, details) {
  const {
    issue: {
      owner,
      repo,
      number: issue_number,
    },
  } = tools.context;

  await tools.github.issues.createComment({
    owner,
    repo,
    issue_number,
    body: `## npm audit report\n\n\`\`\`\n${details}\n\`\`\``,
  });
}

async function audit(tools) {
  let details = null;

  try {
    details = await tools.runInWorkspace('npm', ['audit']);
  } catch (error) {
    if (error
      && error.message
      && error.message.includes('npm audit security report')
    ) {
      details = error.message.replace('Command failed: npm audit', '');
    } else {
      console.error('error', error);
    }
  }

  if (details) {
    await postComment(tools, details);
  }
}

(async function() {
  const tools = new Toolkit({
    event: [
      'pull_request.opened',
      'issue_comment.created',
    ],
  });

  const { event, payload: { action } } = tools.context;

  if (event === 'issue_comment') {
    await tools.command('audit', async () => await audit(tools));
  } else if (event === 'pull_request') {
    await audit(tools);
  }
})();
