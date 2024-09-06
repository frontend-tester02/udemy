'use client'
import ReactStars from 'react-stars'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

function ReviewCard() {
	return (
		<div className='mt-6 border-t border-t-secondary'>
			<div className='mt-8 flex gap-2'>
				<Avatar>
					<AvatarImage
						src={
							'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2F35ca3db9-fb43-4f12-bd48-8b08a503db09-kilwwj.png&w=1920&q=75'
						}
					/>
					<AvatarFallback className='uppercase'>SB</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<div>Shokhrukh</div>
					<div className='flex items-center gap-1'>
						<ReactStars value={4.5} edit={false} color2='#DD6B20' />
						<p className='text-sm opacity-50'>5 minutes ago</p>
					</div>
				</div>
			</div>

			<div className='mt-2'>Kurs prosta bomba 💥</div>
		</div>
	)
}

export default ReviewCard
