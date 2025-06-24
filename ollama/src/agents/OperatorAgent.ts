// OperatorAgent.ts
import { ActionAgent } from './ActionAgent.js';
import { BaseAgent } from './BaseAgent.js';
import { RedirectAgent } from './RedirectAgent.js';
import { Message, OperatorAgentType } from './type';
import { YanaAgent } from './YanaAgent.js';


export class OperatorAgent extends BaseAgent<OperatorAgentType> {
  private messages: Message[];

  constructor(messages: Message[]) {
    super('Operator');
    this.messages = messages;
  }

  public getPrompt(): string {
    const fullConversation = this.messages
      .map(m => `${m.type === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');

    const lastUserMessage = [...this.messages]
      .reverse()
      .find(m => m.type === 'user')?.text || '';

    return `You are a coordinator agent.

Your job is to decide which specialized agent should handle the latest user input, using the full conversation for context if needed.

Conversation history:
${fullConversation}

Latest user message:
"${lastUserMessage}"

Available agents:
- "action": Use if the latest user message seems to trigger a system or service action (like restarting a server).
- "redirect": Use if the user wants to access or be sent to a specific page, dashboard, or external resource.
- "none": Use if it's a casual conversation, small talk, or does not require any specific action or redirection.

Instructions:
- Reply ONLY with a valid JSON object using one of the following formats:

{ "call": "action", "prompt": "summary or cleaned-up version of the user's last command" }
{ "call": "redirect", "prompt": "summary or cleaned-up version of the user's intent for redirection" }
{ "call": "none" }

Examples:
- Message: "Peux-tu redémarrer nginx ?" → { "call": "action", "prompt": "redémarrer nginx" }
- Message: "Je veux accéder au dashboard" → { "call": "redirect", "prompt": "accéder au dashboard" }
- Message: "Salut, tu vas bien ?" → { "call": "none" }

Now analyze the last user message and respond ONLY with one of the JSON objects above.`;
  }

  public async execute(): Promise<OperatorAgentType | null> {
    const response = await this.talk();
    const chainofThought = []

    const mainDecision = JSON.parse(response)
    console.log('Main agent decision:', mainDecision)
    chainofThought.push(mainDecision)

    let actionResult = null
    let redirectResult = null
    let agentType = mainDecision.call

    // 2. Appel de l’agent secondaire si besoin
    if (agentType === 'action') {

      const actionAgent = new ActionAgent(mainDecision.prompt)
      actionResult = await actionAgent.execute()
      chainofThought.push(actionResult)
    }

    if (agentType === 'redirect') {

      const redirectAgent = new RedirectAgent(mainDecision.prompt)
      redirectResult = await redirectAgent.execute()
      chainofThought.push(redirectResult)
    }

    // 3. Appel à YANA avec le contexte complet

    const context = {
      resultType: agentType,
      message: agentType === 'action' ? actionResult?.message : redirectResult?.message,
    }
    const yanaAgent = new YanaAgent(this.messages, context)

    const yanaRaw = await yanaAgent.execute()

    return {
      message: yanaRaw,
      action: actionResult?.action,
      redirect: redirectResult?.redirect,
      chainofThought: chainofThought,
    } as OperatorAgentType
  }
}
