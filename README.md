# openai-check-the-docs

This Github action compares the contents of pushed code with the contents of the README.md and creates a pull request with suggested documentation changes. It uses the OpenAI API to generate suggestions for documentation updates.

## Local Setup 
0. Create an OpenAI API key at https://platform.openai.com/ if you do not already have one
1. Install the required dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory and add your OpenAI API key:

```ini
OPENAI_API_KEY=your_api_key_here
```

## Local Usage

Run the script with the following command:

```bash
node index.js
```

## Github Setup
I have no idea whatsoever

## Github Usage

0. The Documentation Check.yml Github Action in the .github/workflows runs on remote pushes to Github (yes, in this repo it checks the index.js script in the root, so it kind of scans a version of itself)
1. The script in .github/workflows loads the required modules and configures the OpenAI API client with the provided API key.
2. It reads the contents of the `index.js` file in the repo root.
3. If a `README.md` file exists, it compares the contents of the README and the code, and suggests changes. If the README file doesn't exist, it generates a new one based on the code.
4. The script calls the OpenAI API with the prepared messages and logs the suggested changes or new README content.

## TODO

- Read changed files in a commit from GitHub instead of reading directly from the local filesystem.
- Change the script to read the content of files affected by a commit instead of a hardcoded `index.js` file.