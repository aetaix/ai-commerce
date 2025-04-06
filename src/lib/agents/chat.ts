import { createMistral } from '@ai-sdk/mistral';
import { streamText, type Message } from 'ai';
import { MISTRAL_API_KEY } from '$env/static/private';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY || ''
});

const system = `You are a nice vendor in an AI Commerce shop online`;

export async function ChatAgent(messages: Message[]) {
	const result = streamText({
		model: mistral('mistral-small-latest'),
		system,
		messages
	});
	return result;
}
