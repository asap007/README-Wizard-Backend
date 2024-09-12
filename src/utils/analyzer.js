// src/utils/analyzer.js
function analyzeRepoData(repoData) {
    return {
      name: repoData.name,
      fullName: repoData.fullName,
      description: repoData.description,
      languages: repoData.languages,
      mainLanguage: repoData.languages[0],
      stars: repoData.stars,
      forks: repoData.forks,
      openIssues: repoData.openIssues,
      createdAt: new Date(repoData.createdAt).toLocaleDateString(),
      updatedAt: new Date(repoData.updatedAt).toLocaleDateString(),
      license: repoData.license ? repoData.license.name : 'Not specified',
      folderStructure: repoData.folderStructure,
      mainFiles: repoData.files,
      latestCommit: {
        message: repoData.latestCommit.commit.message,
        author: repoData.latestCommit.commit.author.name,
        date: new Date(repoData.latestCommit.commit.author.date).toLocaleDateString()
      },
      topContributors: repoData.topContributors,
      recentIssues: repoData.recentIssues,
      dependencies: repoData.packageJson ? Object.keys(repoData.packageJson.dependencies || {}) : [],
      devDependencies: repoData.packageJson ? Object.keys(repoData.packageJson.devDependencies || {}) : []
    };
  }
  
  module.exports = { analyzeRepoData };