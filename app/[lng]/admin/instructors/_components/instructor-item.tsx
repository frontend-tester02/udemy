'use client'

import { sendNotification } from '@/actions/notification.action'
import { updateUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

interface Props {
	instructor: IUser
}

function InstructorItem({ instructor }: Props) {
	const pathname = usePathname()

	const onRoleChange = async () => {
		const msg = instructor.role === 'instructor' ? 'Disapprove' : 'Approve'

		const isConfirmed = confirm(`Aru you sure you want to ${msg} this user?`)

		if (isConfirmed) {
			const upd = updateUser({
				clerkId: instructor.clerkId,
				updatedData: {
					role: instructor.role === 'user' ? 'instructor' : 'user',
				},
				path: pathname,
			})

			const not = sendNotification(
				instructor.clerkId,
				`messageRoleChanged ${
					instructor.role === 'user' ? 'instructor' : 'user'
				}`
			)

			const promise = Promise.all([upd, not])

			toast.promise(promise, {
				loading: 'Loading...',
				success: `${msg} successfully!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	const onAdmin = async () => {
		const isConfirmed = confirm(
			`Aru you sure you want to make this user an admin?`
		)

		if (isConfirmed) {
			const upd = updateUser({
				clerkId: instructor.clerkId,
				updatedData: {
					isAdmin: true,
				},
				path: pathname,
			})

			const not = sendNotification(
				instructor.clerkId,
				instructor.isAdmin ? 'messageYoureNotAdmin' : 'messageYoureAdmin'
			)

			const promise = Promise.all([upd, not])

			toast.promise(promise, {
				loading: 'Loading...',
				success: `Successfully!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	const onDelete = async () => {
		const isConfirmed = confirm(
			`Aru you sure you want to delete this instructor?`
		)

		if (isConfirmed) {
			const upd = updateUser({
				clerkId: instructor.clerkId,
				updatedData: {
					approvedInstructor: false,
					role: 'user',
				},
				path: pathname,
			})

			const not = sendNotification(
				instructor.clerkId,
				'messageDeleteInstructor'
			)

			const promise = Promise.all([upd, not])

			toast.promise(promise, {
				loading: 'Loading...',
				success: `Successfully!`,
				error: 'Something went wrong. Please try again.',
			})
		}
	}

	return (
		<TableRow>
			<TableCell className='text-xs capitalize'>
				{instructor.isAdmin ? 'Admin/' : ''}
				{instructor.role}
			</TableCell>
			<TableCell className='text-xs'>{instructor.email}</TableCell>
			<TableCell
				className='cursor-pointer text-xs text-primary hover:underline'
				onClick={() => window.open(instructor.website, '_blank')}
			>
				{instructor.website.replace(/^https?:\/\//, '')}
			</TableCell>
			<TableCell
				className='cursor-pointer text-xs text-primary hover:underline'
				onClick={() => window.open(instructor.youtube, '_blank')}
			>
				{instructor.youtube.replace(/^https?:\/\//, '')}
			</TableCell>
			<TableCell
				className='cursor-pointer text-xs text-primary hover:underline'
				onClick={() => window.open(instructor.github, '_blank')}
			>
				{instructor.github.replace(/^https?:\/\//, '')}
			</TableCell>
			<TableCell className='text-xs'>{instructor.job}</TableCell>
			<TableCell className='text-right'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size={'icon'} variant={'ghost'}>
							<MoreHorizontal className='size-6' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Manage</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onRoleChange}>
							{instructor.role === 'instructor' ? 'Disapprove' : 'Approve'}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onAdmin}>
							{instructor.isAdmin ? 'Remove admin' : 'Make admin'}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}

export default InstructorItem
