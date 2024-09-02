'use client'

import { Button } from '@/components/ui/button'
import { Facebook, Link2, Linkedin, Send, Twitter } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

function ShareBtns() {
	const pastname = usePathname()
	const onCopy = () => {
		const link = process.env.NEXT_PUBLIC_BASE_URL + pastname
		navigator.clipboard
			.writeText(link)
			.then(() => toast.success('Copied to clipboard'))
	}
	return (
		<div className='mt-4 flex flex-col max-md:flex-row max-md:space-x-3 md:space-y-3'>
			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
				<Twitter />
			</Button>
			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
				<Facebook />
			</Button>
			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
				<Linkedin />
			</Button>
			<Button size={'icon'} variant={'outline'} onClick={onCopy}>
				<Send />
			</Button>
			<Button size={'icon'} variant={'outline'}>
				<Link2 />
			</Button>
		</div>
	)
}

export default ShareBtns
