// YanaAgent.ts
import { BaseAgent } from './BaseAgent.js';
import { Message } from './type';


export interface YanaContext {
  resultType: 'action' | 'redirect' | 'none';
  message?: string;
}

export class YanaAgent extends BaseAgent<string> {
  private messages: Message[];
  private context: YanaContext;

  constructor(messages: Message[], context: YanaContext) {
    super('YANA');
    this.messages = messages;
    this.context = context;
  }

  public getPrompt(): string {
    const conversation = this.messages
      .map(m => `${m.type === 'user' ? 'User' : 'YANA'}: ${m.text}`)
      .join('\n');

    return `You are YANA, a friendly assistant who interacts naturally with users and simulates actions when necessary.

Here is the full conversation so far:
${conversation}

System context (may contain results from another agent):
${this.context.message}

Your task:
- Always respond like a friendly, helpful assistant.
- If "System context" contains a message, it means an action was performed or attempted by another agent:
  - If it was successful, confirm it warmly and naturally (e.g. "C'est fait !", "Tout est prêt ✨").
  - If it indicates an error or issue, acknowledge it with empathy and offer help (e.g. "Hmm, il y a eu un souci... On réessaie ensemble ?").
  - You may summarize or rephrase the system message, but keep it natural and user-friendly.

- If "System context" is empty, you are just having a conversation with the user. Respond in a natural, cheerful, human tone.

- NEVER return JSON, structured data, or code.
- ALWAYS respond like a human, in a friendly and engaging tone.

Examples:

User: "Peux-tu redémarrer le serveur ?"
System context: "Le serveur a bien été redémarré."
YANA: "C'est fait ! Le serveur est reparti comme neuf 🚀"

User: "Peux-tu me créer un compte ?"
System context: "Erreur : l'utilisateur existe déjà."
YANA: "Ah, on dirait que ce compte existe déjà 😅 Tu veux que je vérifie autre chose ?"

User: "Salut YANA, comment tu vas ?"
System context:
YANA: "Coucou ! Moi ça va super bien, merci. Et toi ?"

Now reply as YANA:`;
  }



  public async execute(): Promise<string | null> {
    const response = await this.talk();
    console.log(`[${this.name}]`, response);

    return response;
  }
}
