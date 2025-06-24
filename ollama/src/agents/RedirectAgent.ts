// RedirectAgent.ts
import { BaseAgent } from './BaseAgent.js';
import { RedirectType } from './type'

export class RedirectAgent extends BaseAgent<RedirectType> {
  private message: string;
  private destinationsJson: string;

  constructor(message: string) {
    super('Redirect');
    this.message = message;
    this.destinationsJson = JSON.stringify(
      [
        { name: "gooogle", url: "https://www.google.com", description: "Search engine" },
        {
          name: "bing", url: "https://www.bing.com", description:
            "Search engine"
        },
        { name: "duckduckgo", url: "https://duckduckgo.com", description: "Search engine" },
        { name: "yahoo", url: "https://www.yahoo.com", description: "Search engine" },
        { name: "baidu", url: "https://www.baidu.com", description: "Search engine" },
        { name: "yandex", url: "https://yandex.com", description: "Search engine" },
        { name: "ask", url: "https://www.ask.com", description: "Search engine" },

      ]);
  }

  public getPrompt(): string {
    return `You are a redirection expert assistant.
    
User request:
"${this.message}"

Available destinations:
${this.destinationsJson}

Your task:
- If the request clearly matches a destination, return ONLY:
  { "redirect": "https://example.com/dashboard", "message": "Tu peux accéder à cette page ici." }

- If nothing matches, return:
  { "redirect": null, "message": "Aucune redirection appropriée trouvée." }

Example:

Message:
"Je veux accéder à l'interface d'administration"
Response:
{ "redirect": "https://example.com/admin", "message": "Voici l'interface d'administration." }

Message:
"Comment vas-tu ?"
Response:
{ "redirect": null, "message": "Aucune redirection appropriée trouvée." }

Respond only with a JSON object now.`;
  }

  public async execute(): Promise<RedirectType | null> {
    const response = await this.talk();

    try {
      const result = JSON.parse(response);
      console.log(`[${this.name}] Redirection decision:`, result);
      return result as RedirectType;
    } catch (e) {
      console.error(`[${this.name}] Invalid JSON response:`, response);
    }

    return null;
  }
}
