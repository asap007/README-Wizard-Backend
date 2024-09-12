function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err.message === 'Repository not found') {
      return res.status(404).json({ error: 'Repository not found' });
    }
  
    if (err.message.includes('API rate limit exceeded')) {
      return res.status(429).json({ error: 'GitHub API rate limit exceeded. Please try again later.' });
    }
  
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
  
  module.exports = errorHandler;