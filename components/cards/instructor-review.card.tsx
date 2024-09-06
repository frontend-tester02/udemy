'use client'

import { Flag } from 'lucide-react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import ReactStars from 'react-stars'

function InstructorReviewCard() {
	return (
		<div className='flex gap-4 border-b pb-4'>
			<div className='flex-1'>
				<div className='flex gap-3'>
					<Avatar>
						<AvatarFallback className='uppercase'>SB</AvatarFallback>
					</Avatar>

					<div className='flex flex-col'>
						<div className='font-spaceGrotesk text-sm'>
							Nuriddinov Shokhrukh{' '}
							<span className='text-xs text-muted-foreground'>3 days ago</span>
						</div>
						<ReactStars value={4.5} edit={false} color2='#E59819' />
						<div className='font-spaceGrotesk font-bold'>
							Full Course ReactJS
						</div>
						<p className='text-sm text-muted-foreground'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
							beatae ipsa voluptate dolorum provident iure eius ut facere culpa
							tenetur doloribus, assumenda recusandae quibusdam quidem alias
							sequi quas? Sint, quis?
						</p>
					</div>
				</div>
			</div>
			<Button size={'icon'} variant={'ghost'} className='self-start'>
				<Flag className='text-muted-foreground' />
			</Button>
		</div>
	)
}

export default InstructorReviewCard
