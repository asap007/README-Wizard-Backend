// src/services/ai-service.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateReadme(repoData) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a comprehensive, engaging, and personalized README.md file for the GitHub project "${repoData.fullName}". Use the following information to create a detailed and accurate description of the project:

    Project Information:
    - Name: ${repoData.name}
    - Full Name: ${repoData.fullName}
    - Description: ${repoData.description}
    - Main Language: ${repoData.mainLanguage}
    - All Languages: ${repoData.languages.join(', ')}
    - Stars: ${repoData.stars}
    - Forks: ${repoData.forks}
    - Open Issues: ${repoData.openIssues}
    - Created: ${repoData.createdAt}
    - Last Updated: ${repoData.updatedAt}
    - License: ${repoData.license}

    Latest Commit:
    - Message: "${repoData.latestCommit.message}"
    - Author: ${repoData.latestCommit.author}
    - Date: ${repoData.latestCommit.date}

    Top Contributors:
    ${repoData.topContributors.map(c => `- ${c.name} (${c.contributions} contributions)`).join('\n')}

    Recent Issues:
    ${repoData.recentIssues.map(i => `- [${i.title}](${i.url})`).join('\n')}

    Folder Structure:
    ${repoData.folderStructure.map(folder => `- ${folder}`).join('\n')}

    Main Files: ${repoData.mainFiles.join(', ')}

    Dependencies: ${repoData.dependencies.join(', ')}
    Dev Dependencies: ${repoData.devDependencies.join(', ')}

    Please create a README.md with the following structure and content:

    1. Project Title and Description
    - Create an ASCII art or emoji-based logo that represents the project's main purpose or language
    - Provide a concise yet compelling project description
    - Include relevant badges (build status, version, license, etc.)

    2. Table of Contents
    - Create a clickable table of contents for easy navigation

    3. 🌟 Key Features
    - List and briefly explain the main features of the project
    - Highlight what makes this project unique or valuable

    4. 🚀 Getting Started
    - Prerequisites
    - Step-by-step installation guide
    - Quick start example

    5. 📘 Usage
    - Provide detailed examples of how to use the project
    - Include code snippets with syntax highlighting
    - Explain common use cases and scenarios

    6. 🏗️ Project Structure
    - Explain the purpose of key directories and files
    - Provide a tree-like visualization of the folder structure

    7. 🛠️ Technologies Used
    - List and briefly describe the main technologies, languages, and libraries used in the project

    8. 🔧 Configuration
    - Explain any configuration files and their options
    - Provide examples of common configurations

    9. 📈 Roadmap
    - Outline future plans and potential features
    - Invite community input on the project's direction

    10. 🤝 Contributing
        - Guidelines for contributors
        - Code of conduct
        - How to submit pull requests
        - List top contributors with links to their profiles

    11. 📄 License
        - Explain the project's license and any implications for users

    12. 📞 Contact & Support
        - How to reach the project maintainers
        - Links to issue tracker, chat channels, etc.

    13. 🙏 Acknowledgments
        - Credits to inspirations, libraries used, or contributors

    14. 📊 Project Stats
        - Display dynamic stats like stars, forks, and open issues

    Ensure the README is well-formatted in Markdown, using appropriate headings, code blocks, lists, and emphasis. Use emojis strategically to enhance readability and visual appeal. Make the README engaging and informative, highlighting the unique aspects of this specific project based on the provided information.

    Analyze the project's structure, dependencies, and recent activity to infer its main purpose and target audience. Use this insight to tailor the tone and content of the README to the likely users of the project.

    If the project seems to be a library or framework, focus on API documentation and integration examples. If it's an application, emphasize installation and usage instructions. For data science projects, highlight datasets and methodologies used.

    Remember to maintain a balance between comprehensiveness and readability. The goal is to create a README that not only informs but also motivates users to engage with and contribute to the project. also make sure to not put any other information as it is for the final output so don't have back tick or any other thing in the beginning of the output, just give the required output nicely.`;

    const result = await model.generateContent(prompt);
    console.log(`readme generated for this repository:${repoData.fullName}`);
    return result.response.text();
  } catch (error) {
    console.error('Error generating README:', error);
    throw new Error('Failed to generate README content');
  }
}

module.exports = { generateReadme };