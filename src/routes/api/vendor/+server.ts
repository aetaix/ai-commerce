import { AgentRouter } from '$lib/agents/router.js';
import { ChatAgent } from '$lib/agents/chat.js';
import { VendorAgent } from '$lib/agents/vendor.js';

export async function POST({ request }) {
	const { messages } = await request.json();

	const route = await AgentRouter(messages);

    console.log('Route:', route);

	switch (route.choice) {
		case 'text':
			return (await ChatAgent(messages)).toDataStreamResponse();
		case 'product':
			return (await VendorAgent(messages)).toDataStreamResponse();
		case 'order':
            return (await ChatAgent(messages)).toDataStreamResponse();
        default:
            return (await ChatAgent(messages)).toDataStreamResponse();
	}
}
