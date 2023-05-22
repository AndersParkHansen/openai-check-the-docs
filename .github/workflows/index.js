// Load environment variables with API keys
require('dotenv').config();

// Import required modules, fs used as POC to read directly from local filesystem
//TODO: read changed files in a commit from Github instead 
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');

// Configure the OpenAI API client with API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Read the local test file
//TODO: change to reading the content of files affected by a commit 
const codeFile = fs.readFileSync('index.js', 'utf-8');

let readmeFile;
let messages;

try {
  // Try to read an existing README.md file
  readmeFile = fs.readFileSync('README.md', 'utf-8');

  // If README exists, prepare the system and user messages to compare the README and code
  messages = [
    { role: 'system', content: 'You are a README.md expert. You will assist the user in creating documentation for software being built.' },
    { role: 'user', content: `Can you compare this README.md ${readmeFile} with this code ${codeFile} and suggest changes?`}
  ];
} catch (error) {
  // If README doesn't exist, prepare the system and user messages to generate a new README
  messages = [
    { role: 'system', content: 'You are a README.md expert. You will assist the user in creating documentation for software being built.' },
    { role: 'user', content: `Can you create a README.md documenting this code?\n\n ${codeFile}?`}
  ];
}

async function createChatCompletion() {
  // Call the OpenAI API with the prepared messages
  const response = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: messages,
    max_tokens: 2048,
    temperature: 0.0,
  });

  // Log the suggested changes or new README content
  console.log(`Suggested changes or generated README content: ${response.data.choices[0].message.content}`);
}

// Call the function to start the process
createChatCompletion();
