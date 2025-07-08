import { createOpenAI } from '@ai-sdk/openai';
import { streamText, type Message } from 'ai';

import { OPENAI_KEY } from '$env/static/private';

const openai = createOpenAI({
	apiKey: OPENAI_KEY
});

export async function POST({ request }) {
	const { messages }: { messages: Message[] } = await request.json();

	const result = streamText({
		model: openai('gpt-4o'),
		messages,
		system:
			'You are a chat platform to answer questions about the knowledge base. If possible, answer the questions using the knowledge base. If you do not have an answer, say so.'
	});

	return result.toDataStreamResponse();
}
