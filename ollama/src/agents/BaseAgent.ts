import axios from "axios";



const REQUEST_TIMEOUT = process.env.REQUEST_TIMEOUT
    ? parseInt(process.env.REQUEST_TIMEOUT, 10)
    : 120000

const LOCAL_OLLAMA = process.env.LOCAL_OLLAMA || 'http://localhost:11434'
const REMOTE_OLLAMA = process.env.OLLAMA_URL || ''

export abstract class BaseAgent<T> {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * Méthode à implémenter obligatoirement pour fournir le prompt spécifique à l'agent.
     */
    public abstract getPrompt(): string;

    /**
     * Méthode à implémenter obligatoirement pour lancer le comportement principal de l'agent.
     */
    public abstract execute(): Promise<T | null>;

    /**
     * Appelle le serveur de chat avec un prompt donné.
     */
    protected async callChatServer(prompt: string): Promise<string> {
        const remoteUp = await this.isOllamaAvailable(REMOTE_OLLAMA)
        const baseUrl = remoteUp ? REMOTE_OLLAMA : LOCAL_OLLAMA

        try {
            const response = await axios.post(
                baseUrl + '/api/generate',
                {
                    model: 'mistral',
                    prompt,
                    stream: false,
                },
                { timeout: REQUEST_TIMEOUT }
            )
            return response.data.response
        } catch (err: any) {
            console.error(`Ollama call failed at ${baseUrl}: ${err.message}`)
            throw err
        }
    }

    private async isOllamaAvailable(url: string) {
        try {
            const res = await axios.get(url, { timeout: 1000 })
            console.log(`Ollama is available at ${url}: ${res.status}`)
            return res.status === 200
        } catch (e: any) {
            console.error(`Ollama is not available at ${url}: ${e.message}`)
            return false
        }
    }

    /**
     * Appelle le serveur de chat avec le prompt propre à l'agent.
     */
    protected async talk(): Promise<string> {
        const prompt = this.getPrompt();
        return await this.callChatServer(prompt);
    }
}
