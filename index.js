const core = require('@actions/core');
const github = require('@actions/github');

try {
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  
  const payload = github.context.payload;

  const hasAuthorUsername = [payload.commits, payload.head_commit].flat();
  const commitUsernames = hasAuthorUsername.reduce((acc, p) => {
    acc.push(p.author.username, p.committer.username);
    return acc;
  }, []);

  commitUsernames.push(payload.pusher.name, payload.sender.login);
  
  const authorRegex = [...new Set(commitUsernames)].join('|');
  const todoRegex = `\\b[T]ODO(?!-badger).*?${authorRegex}\\b`;
  core.setOutput("todoRegex", todoRegex);
  core.setOutput("gitGrepFlags", "-i -P");
} catch (error) {
  core.setFailed(error.message);
}
