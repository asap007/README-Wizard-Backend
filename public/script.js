document.getElementById('repoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const repoUrl = document.getElementById('repoUrl').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const readmeContent = document.getElementById('readmeContent');

    try {
        const response = await fetch('/api/generate-readme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ repoUrl })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate README');
        }

        const data = await response.json();
        readmeContent.value = data.readme;
        resultDiv.style.display = 'block';
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
        resultDiv.style.display = 'none';
    }
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const readmeContent = document.getElementById('readmeContent');
    readmeContent.select();
    document.execCommand('copy');
    alert('README copied to clipboard!');
});