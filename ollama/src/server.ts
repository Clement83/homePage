import express from 'express'
import cors from 'cors'
import { OperatorAgent } from './agents/OperatorAgent.js'

const app = express()
app.use(cors({ origin: '*', methods: ['POST', 'OPTIONS'] }))
app.use(express.json())



app.post('/api/ollama', async (req, res) => {
  const { messages } = req.body
  if (!messages) {
    return res.status(400).json({ error: 'Missing "message" in request body' })
  }

  try {

    const operator = new OperatorAgent(messages)

    const response = await operator.execute()
    return res.status(200).json(response)
  } catch (error: any) {
    console.error('Global error:', error.message)
    return res.status(500).json({ error: `Error: ${error.message}` })
  }
})


app.get('/api/ollama', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

const PORT = 5156
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
