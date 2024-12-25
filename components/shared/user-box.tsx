'use client'

import { SignOutButton } from '@clerk/nextjs'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarImage } from '../ui/avatar'
import Link from 'next/link'
import useTranslate from '@/hooks/use-translate'
import useUser from '@/hooks/use-user'

function UserBox() {
	const { user } = useUser()
	const t = useTranslate()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='size-10 cursor-pointer' aria-label='User'>
					<AvatarImage
						src={user?.picture}
						className='object-cover'
						alt={user?.fullName}
					/>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-80'
				align='start'
				alignOffset={11}
				forceMount
			>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none text-muted-foreground'>
						{user?.email}
					</p>

					<div className='flex items-center gap-x-2'>
						<div className='rounded-md bg-secondary'>
							<Avatar className='size-10'>
								<AvatarImage src={user?.picture} />
							</Avatar>
						</div>

						<div className='space-y-1'>
							<p className='line-clamp-1 font-spaceGrotesk text-sm'>
								{user?.fullName}
							</p>
						</div>
					</div>
				</div>

				<DropdownMenuSeparator />
				{user?.isAdmin && (
					<Link href={'/admin'} aria-label='Admin'>
						<DropdownMenuItem className='w-full cursor-pointer text-muted-foreground'>
							{t('admin')}
						</DropdownMenuItem>
					</Link>
				)}

				{user?.role === 'instructor' && (
					<Link href={'/instructor'} aria-label='Instructor'>
						<DropdownMenuItem className='w-full cursor-pointer text-muted-foreground'>
							{t('instructor')}
						</DropdownMenuItem>
					</Link>
				)}

				<Link href={'/profile'} aria-label='Profile'>
					<DropdownMenuItem className='w-full cursor-pointer text-muted-foreground'>
						{t('manageAccount')}
					</DropdownMenuItem>
				</Link>
				<DropdownMenuItem
					asChild
					className='w-full cursor-pointer text-muted-foreground'
				>
					<SignOutButton>{t('logout')}</SignOutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserBox
