import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()

// Configuration du timeout (en ms)
const REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT
  ? parseInt(process.env.REQUEST_TIMEOUT, 10)
  : 120000 // 120 secondes par défaut

// Middleware CORS - autoriser tout le monde
app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
}))

// Middleware pour parser le JSON
app.use(express.json())

// Exemple de config mockée (tu peux remplacer par ton import config réel)
import config from './config.js' // ou adapte l'import

// Fonction getPrompt identique à ton code
function getPrompt(message, action) {
  return `You are YANA, a friendly assistant who helps the user by interpreting commands and chatting naturally.

User command: "${message}"

Available actions:
${action}

Your task:
- If the user command clearly corresponds to one of the available actions, respond ONLY in JSON format with two fields:
  {
    "message": "A short confirmation that the action is being executed (e.g. 'Le redémarrage du serveur est lancé').",
    "action": "the id of the chosen action"
  }
  
- If the user command is a question or conversational (not a command to trigger an action), respond ONLY in JSON with:
  {
    "message": "A short, friendly, natural reply as if you were a friend named YANA.",
    "action": null
  }

- If the command is unclear and you cannot confidently choose an action, respond ONLY in JSON with:
  {
    "message": "Could you please clarify?",
    "action": null
  }

Always respond ONLY with valid JSON matching the formats above.

Examples:

Command example:
{
  "message": "Le redémarrage du serveur est lancé.",
  "action": "restart-nginX"
}

Conversational example:
{
  "message": "Salut ! Comment puis-je t'aider aujourd'hui ?",
  "action": null
}

Unclear example:
{
  "message": "Could you please clarify?",
  "action": null
}

Begin now.`
}


app.post('/api/ollama', async (req, res) => {
  const { message } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Missing "message" in request body' })
  }

  const remoteUp = await isOllamaAvailable(process.env.OLLAMA_URL);
  const baseUrl = remoteUp ? process.env.OLLAMA_URL : process.env.LOCAL_OLLAMA;

  try {
    // Construction des actions depuis la config
    const actions = JSON.stringify(
      config.sites
        .map(site =>
          (site.webHook ?? [])
            .filter(webHook => webHook.noIa !== true)
            .map(webHook => ({
              name: webHook.name,
              id: webHook.id,
              description: webHook.description ?? '',
            }))
        )
        .flat()
    )

    console.log(`Ollama call with message: "${message}" and actions: ${actions}`)




    const response = await axios.post(
      baseUrl + '/api/generate',
      {
        model: 'mistral',
        prompt: getPrompt(message, actions),
        stream: false,
      },
      { timeout: REQUEST_TIMEOUT }
    )

    console.log(`Ollama response: ${JSON.stringify(response.data)}`)

    return res.status(200).json({ response: response.data.response })
  } catch (error) {
    console.error(`Ollama call failed: ${error.message}`)
    return res.status(500).json({ error: `Error: ${error.message}` })
  }
})

async function isOllamaAvailable(url) {
  try {
    const res = await axios.get(url, { timeout: 1000 });
    console.log(`Ollama is available at ${url}: ${res.status}`);
    return res.status === 200;
  } catch (e) {
    console.error(`Ollama is not available at ${url}: ${e.message}`);
    return false;
  }
}

// Pour le healthcheck ou GET simple (optionnel)
app.get('/api/ollama', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

// Démarrage du serveur
const PORT = 5156
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
