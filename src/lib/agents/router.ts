import { createMistral, type MistralProvider } from '@ai-sdk/mistral';
import { streamText, generateObject, type Message } from 'ai';
import { z } from 'zod';
import { MISTRAL_API_KEY } from '$env/static/private';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY || ''
});

const schema = z.object({
	choice: z.enum(['text', 'product', 'order'])
});

const system = `You are a router agent in charge of routing messages to the appropriate agent.
You will receive a message and you need to determine the type of agent that should handle it.
The possible choices are:
1. text: This message should be handled by the text agent.
2. product: The message ask to find a product in a catalog.
3. order: The message is about ordering a product or service.
If the message does not fit any of these categories, please respond with "text.
You will receive a message and you need to determine the type of agent that should handle it.`;

export async function AgentRouter(messages: Message[]) {
	const prompt = messages[messages.length - 1].content;

	const { object } = await generateObject({
		model: mistral('ministral-8b-latest'),
		schema,
		system,
		prompt
	});

	return object;
}
