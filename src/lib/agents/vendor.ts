import { createMistral } from '@ai-sdk/mistral';
import { streamText, generateObject, type Message } from 'ai';
import { tool as createTool } from 'ai';
import { z } from 'zod';
import { MISTRAL_API_KEY } from '$env/static/private';
import products from '$store/products.json';

const mistral = createMistral({
	apiKey: MISTRAL_API_KEY || ''
});

const system = `Find relevat products in the store based on the user query and return an array of their ids.
The products list:
${JSON.stringify(products, null, 2)}
`;

const productList = createTool({
	description: 'List of specific products available in the store based on the query.',
	parameters: z.object({
		query: z.string()
	}),
	execute: async ({ query }) => {
		return await contextProductList(query);
	}
});

async function contextProductList(query: string) {
	const { object } = await generateObject({
		model: mistral('mistral-small-latest'),
		schema: z.array(z.number().describe('Product ID')),
		system,
		prompt: 'User query: ' + query
	});

	const selectedProducts = products.filter((product) => object.includes(product.id));
	return selectedProducts;
}

const tools = {
	displayProductList: productList
};

export async function VendorAgent(messages: Message[]) {
	const result = streamText({
		model: mistral('mistral-small-latest'),
		system: `You are a nice vendor in an AI Commerce shop online proposing products to the user. You have a tool to list products in the store. You can use it to find relevant products based on the user query. You can also answer questions about the products.`,
		messages,
		maxSteps: 5,
		tools
	});
	return result;
}
