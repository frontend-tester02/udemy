import geminiAI from '@/lib/gemini'
import { NextResponse } from 'next/server'

const systemInstruction =
	'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { messages } = body

		if (!messages || !Array.isArray(messages) || messages.length === 0) {
			return new NextResponse('Messages array is required', { status: 400 })
		}

		const model = geminiAI.getGenerativeModel({
			model: 'gemini-2.5-flash',
			systemInstruction,
		})

		// Convert messages to Gemini format
		const chatHistory = messages
			.filter((msg: any) => msg.role === 'user' || msg.role === 'system')
			.map((msg: any) => ({
				role: msg.role === 'user' ? 'user' : 'model',
				parts: [{ text: msg.content }],
			}))

		// Start chat with history (excluding the last message)
		const history = chatHistory.slice(0, -1)
		const lastMessage = chatHistory[chatHistory.length - 1]

		let response
		if (history.length > 0) {
			// Continue existing conversation
			const chat = model.startChat({
				history,
			})
			response = await chat.sendMessage(lastMessage.parts[0].text)
		} else {
			// New conversation
			response = await model.generateContent(lastMessage.parts[0].text)
		}

		return NextResponse.json({ content: response.response.text() })
	} catch (error: any) {
		console.error('Gemini API Error:', error)
		
		// Provide more helpful error messages
		if (error?.status === 404) {
			return new NextResponse(
				JSON.stringify({
					error: 'Model not found',
					message: 'The specified Gemini model is not available. Please check your API key has access to the model, or try a different model name.',
					details: error?.message,
				}),
				{ status: 404, headers: { 'Content-Type': 'application/json' } }
			)
		}
		
		return new NextResponse(
			JSON.stringify({
				error: 'Internal Error',
				message: error?.message || 'An error occurred while processing your request',
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		)
	}
}
