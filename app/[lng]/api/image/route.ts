import { NextResponse } from 'next/server'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { prompt, amount = 1, resolution = '1024x1024' } = body

		if (!prompt) {
			return new NextResponse('Prompt is required', { status: 400 })
		}

		const apiKey = process.env.GEMINI_API_KEY
		if (!apiKey) {
			return new NextResponse('API key not configured', { status: 500 })
		}

		// Try using Gemini image generation model via REST API
		// Using gemini-2.5-flash-image or gemini-3-pro-image-preview
		const modelName = 'gemini-2.5-flash-image'
		
		// Parse resolution
		const [width, height] = resolution.split('x').map(Number)
		const aspectRatio = width > height ? '16:9' : width < height ? '9:16' : '1:1'
		
		// Generate images using REST API
		const images = []
		const numImages = Math.min(Number(amount) || 1, 4) // Limit to 4 images max

		for (let i = 0; i < numImages; i++) {
			try {
				const response = await fetch(
					`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							contents: [
								{
									parts: [{ text: prompt }],
								},
							],
							generationConfig: {
								responseModalities: ['IMAGE'],
								imageConfig: {
									aspectRatio,
									imageSize: width >= 2048 ? '4K' : width >= 1024 ? '2K' : '1K',
								},
							},
						}),
					}
				)

				if (!response.ok) {
					const errorText = await response.text()
					console.error(`Image generation failed: ${response.status}`, errorText)
					
					// If image generation model doesn't work, try alternative approach
					if (response.status === 404) {
						return NextResponse.json(
							{
								error: 'Image generation model not available',
								message:
									'Image generation requires access to specialized models. Please check your API key permissions or use an alternative image generation service.',
							},
							{ status: 404 }
						)
					}
					continue
				}

				const data = await response.json()
				
				// Extract image data from response
				if (data.candidates && data.candidates[0]?.content?.parts) {
					for (const part of data.candidates[0].content.parts) {
						if (part.inlineData) {
							// Convert base64 to data URL
							const imageUrl = `data:image/${part.inlineData.mimeType || 'png'};base64,${part.inlineData.data}`
							images.push({ url: imageUrl })
						}
					}
				}
			} catch (error: any) {
				console.error(`Error generating image ${i + 1}:`, error)
			}
		}

		if (images.length === 0) {
			return NextResponse.json(
				{
					error: 'Failed to generate images',
					message:
						'Image generation is not available with your current API key or model access. Please check your API key permissions.',
				},
				{ status: 500 }
			)
		}

		return NextResponse.json(images)
	} catch (error: any) {
		console.error('Image API Error:', error)
		return NextResponse.json(
			{
				error: 'Internal Error',
				message: error?.message || 'An error occurred while generating images',
			},
			{ status: 500 }
		)
	}
}
