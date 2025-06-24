export type ActionType = {
    action: string | null; // Action ID or null if no action
    message: string; // Confirmation message or error message
}

export type RedirectType = {
    redirect: string | null; // URL to redirect to or null if no redirection
    message: string; // Confirmation message or error message
}

export type YanaAgentType = string

export type ChainofThought = {
    call: 'action' | 'redirect'; // Type of agent called (action or redirect)
    prompt: string; // The original user prompt or message
}

export type OperatorAgentType = {
    message: string | null; // Final response from YANA
    action: string | null; // Action ID if an action was taken, otherwise null
    redirect: string | null; // Redirect URL if a redirection was made, otherwise null
    chainofThought: [ChainofThought | RedirectType | ActionType]; // The main decision made by the operator agent
}

export type Message = {
    type: "user" | "bot";
    text: string;
};