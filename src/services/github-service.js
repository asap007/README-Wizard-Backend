// src/services/github-service.js
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getRepoData(owner, repo) {
  try {
    const [repoInfo, languages, contents, commits, contributors, issues] = await Promise.all([
      octokit.repos.get({ owner, repo }),
      octokit.repos.listLanguages({ owner, repo }),
      octokit.repos.getContent({ owner, repo, path: '' }),
      octokit.repos.listCommits({ owner, repo, per_page: 1 }),
      octokit.repos.listContributors({ owner, repo, per_page: 5 }),
      octokit.issues.listForRepo({ owner, repo, state: 'open', per_page: 5 })
    ]);

    const packageJson = await octokit.repos.getContent({ owner, repo, path: 'package.json' }).catch(() => null);

    return {
      name: repoInfo.data.name,
      fullName: repoInfo.data.full_name,
      description: repoInfo.data.description,
      languages: Object.keys(languages.data),
      stars: repoInfo.data.stargazers_count,
      forks: repoInfo.data.forks_count,
      openIssues: repoInfo.data.open_issues_count,
      createdAt: repoInfo.data.created_at,
      updatedAt: repoInfo.data.updated_at,
      license: repoInfo.data.license,
      folderStructure: contents.data.filter(item => item.type === 'dir').map(dir => dir.name),
      files: contents.data.filter(item => item.type === 'file').map(file => file.name),
      latestCommit: commits.data[0],
      topContributors: contributors.data.map(c => ({ name: c.login, contributions: c.contributions })),
      recentIssues: issues.data.map(i => ({ title: i.title, url: i.html_url })),
      packageJson: packageJson ? JSON.parse(Buffer.from(packageJson.data.content, 'base64').toString()) : null
    };
  } catch (error) {
    console.error('Error fetching repo data:', error);
    throw error;
  }
}

module.exports = { getRepoData };