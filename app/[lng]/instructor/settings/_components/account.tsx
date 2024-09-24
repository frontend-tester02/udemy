'use client'

import { updatedUser } from '@/actions/user.action'
import { IUser } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { profileSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CandlestickChart, Github, Linkedin, Youtube } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function Account(user: IUser) {
	const { bio, job, website, youtube, github, linkedin, phone } = user

	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const form = useForm<z.infer<typeof profileSchema>>({
		resolver: zodResolver(profileSchema),
		defaultValues: { bio, job, website, youtube, github, linkedin, phone },
	})

	const onSubmit = (values: z.infer<typeof profileSchema>) => {
		setIsLoading(true)
		const promise = updatedUser({
			clerkId: user.clerkId,
			updatedData: {
				email: user.email,
				fullName: user.fullName,
				picture: user.picture,
			},
			path: pathname,
		}).finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong. Please try again.',
		})
	}

	return (
		<Card className='ml-6 max-w-4xl'>
			<CardContent className='relative p-6'>
				{isLoading && <FillLoading />}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='job'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Your job</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='bg-secondary'
												placeholder='e.g. Software Engineer'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='phone'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Mobile phone</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='bg-secondary'
												placeholder='e.g. +82 10 2115 4633'
												type='number'
												disabled={isLoading}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='website'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													placeholder='e.g. www.example.com'
													disabled={isLoading}
												/>
												<CandlestickChart className='ml-2 text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='github'
								render={({ field }) => (
									<FormItem>
										<FormLabel>GitHub</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													placeholder='e.g. www.github.com'
													disabled={isLoading}
												/>
												<Github className='ml-2 text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='linkedin'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Linkedin</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													placeholder='e.g. www.linkedin.com'
													disabled={isLoading}
												/>
												<Linkedin className='ml-2 text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='youtube'
								render={({ field }) => (
									<FormItem>
										<FormLabel>YouTube</FormLabel>
										<FormControl>
											<div className='flex items-center bg-secondary pr-2'>
												<Input
													{...field}
													className='bg-secondary'
													placeholder='e.g. www.youtube.com'
													disabled={isLoading}
												/>
												<Youtube className='ml-2 text-muted-foreground' />
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name='bio'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className='bg-secondary'
											placeholder='e.g. It is not a type, it is a joke!'
											disabled={isLoading}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Save</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}

export default Account
