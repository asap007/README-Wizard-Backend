const express = require('express');
const { getRepoData } = require('../services/github-service');
const { analyzeRepoData } = require('../utils/analyzer');
const { generateReadme } = require('../services/ai-service');
const { parseGitHubUrl } = require('../utils/url-parser');

const router = express.Router();

router.post('/generate-readme', async (req, res, next) => {
  try {
    const { repoUrl } = req.body;
    
if (!repoUrl) {
      return res.status(400).json({ error: 'Repository URL is required' });
    }

    const { owner, repo } = parseGitHubUrl(repoUrl);
    if (!owner || !repo) {
      return res.status(400).json({ error: 'Invalid GitHub repository URL' });
    }

    const repoData = await getRepoData(owner, repo);
    const analyzedData = analyzeRepoData(repoData);
    const readme = await generateReadme(analyzedData);
    
    res.json({ readme });
  } catch (error) {
    next(error);
  }
});

module.exports = router;