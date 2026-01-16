import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const apiKey = process.env.GEMINI_API_KEY
		
		if (!apiKey) {
			return NextResponse.json(
				{
					success: false,
					error: 'GEMINI_API_KEY is not defined',
				},
				{ status: 500 }
			)
		}

		// List available models using REST API
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
		)
		
		if (!response.ok) {
			const errorData = await response.text()
			return NextResponse.json(
				{
					success: false,
					error: `API Error: ${response.status} ${response.statusText}`,
					details: errorData,
				},
				{ status: response.status }
			)
		}

		const data = await response.json()
		const models = data.models || []
		
		return NextResponse.json({
			success: true,
			apiKeyFormat: apiKey.substring(0, 10) + '...',
			models: models.map((model: any) => ({
				name: model.name,
				displayName: model.displayName,
				supportedMethods: model.supportedGenerationMethods,
				description: model.description,
			})),
		})
	} catch (error: any) {
		console.error('Test Gemini Error:', error)
		return NextResponse.json(
			{
				success: false,
				error: error?.message || 'Unknown error',
				details: error,
			},
			{ status: 500 }
		)
	}
}

