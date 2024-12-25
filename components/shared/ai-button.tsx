import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Bot } from 'lucide-react'

function AiButton() {
	return (
		<Button
			className='fixed bottom-5 right-5 size-12 rounded-full text-white'
			size={'icon'}
			asChild
			aria-label='Open AI'
		>
			<Link href={'/ai'} aria-label='Open AI'>
				<Bot />
			</Link>
		</Button>
	)
}

export default AiButton
