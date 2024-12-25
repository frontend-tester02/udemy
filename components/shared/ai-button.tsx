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
		>
			<Link href={'/ai'}>
				<Bot />
			</Link>
		</Button>
	)
}

export default AiButton
