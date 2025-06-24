// ActionAgent.ts
import { BaseAgent } from './BaseAgent.js';
import { ActionType } from './type';
import config from './config.js';

export class ActionAgent extends BaseAgent<ActionType> {
  private message: string;
  private actionsJson: string;

  constructor(message: string) {
    super('Action');
    this.message = message;

    console.log(`[${this.name}] Initializing with message:`, message, config);

    const actions = config.sites
      .flatMap((site: any) =>
        (site.webHook ?? [])
          .filter((w: any) => !w.noIa)
          .map((w: any) => ({
            name: w.name,
            id: w.id,
            description: w.description ?? '',
          }))
      )

    this.actionsJson = JSON.stringify(actions, null, 2)
  }

  public getPrompt(): string {
    return `You are an intelligent action detector.

User command: "${this.message}"

Available actions (JSON format):
${this.actionsJson}

Your task:
- Try to match the user command with one of the available actions.
- If, and ONLY IF, there is a **clear and explicit** match, respond with:
  { "action": "action-id", "message": "Action successfully triggered." }

- If the command does NOT clearly match any of the available actions (e.g. it mentions something not listed, is too vague, or is conversational), respond strictly with:
  { "action": null, "message": "No matching action found or command not understood." }

IMPORTANT:
- DO NOT guess or infer actions.
- DO NOT try to interpret synonyms or similar intentions unless they **clearly** match an action label.
- If the command mentions something unrelated or unknown (e.g. “start telnet” and no telnet action exists), respond with a message like:
  { "action": null, "message": "No telnet server found." }

Rules:
- Return ONLY a single JSON object.
- DO NOT return any explanation or additional text.

Examples:

Command:
"Relance nginx"
Response:
{ "action": "restart-nginX", "message": "Action successfully triggered." }

Command:
"Tu peux m’aider ?"
Response:
{ "action": null, "message": "No matching action found or command not understood." }

Command:
"Démarrer telnet"
(Assuming no telnet-related action exists)
Response:
{ "action": null, "message": "No telnet server found." }

Now respond with ONLY a JSON object as specified.`;
  }



  public async execute(): Promise<ActionType | null> {
    const response = await this.talk();

    try {
      const result = JSON.parse(response);
      console.log(`[${this.name}] Action detection:`, result);

      return result
    } catch (e) {
      console.error(`[${this.name}] Invalid JSON response:`, response);
    }
    return null;
  }
}
