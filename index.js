const core = require('@actions/core');
const github = require('@actions/github');

try {
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  
  const payload = github.context.payload;
  const authors = [payload.author.username, payload.commiter.username, payload.sender.login];
  const authorRegex = [...new Set(authors)].join('|');
  const todoRegex = `TODO.*?${authorRegex}`;
  core.setOutput("todoRegex", todoRegex);
} catch (error) {
  core.setFailed(error.message);
}
