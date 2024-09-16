'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import UseToggleEdit from '@/hooks/use-toggle-edit'
import { BadgePlus, X } from 'lucide-react'

function Sections() {
	const { state, onToggle } = UseToggleEdit()
	return (
		<Card>
			<CardContent className='relative p-2'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Sections</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <BadgePlus />}
					</Button>
				</div>

				<Separator className='my-3' />
			</CardContent>
		</Card>
	)
}

export default Sections