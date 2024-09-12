function parseGitHubUrl(url) {
    try {
      const parsedUrl = new URL(url);
      const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
      
      if (parsedUrl.hostname !== 'github.com' || pathParts.length < 2) {
        throw new Error('Invalid GitHub URL');
      }
  
      return {
        owner: pathParts[0],
        repo: pathParts[1]
      };
    } catch (error) {
      console.error('Error parsing GitHub URL:', error);
      return {};
    }
  }
  
  module.exports = { parseGitHubUrl };