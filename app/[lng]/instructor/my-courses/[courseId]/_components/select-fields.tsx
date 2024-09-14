'use client'

import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import UseToggleEdit from '@/hooks/use-toggle-edit'
import { selectFiledsSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function SelectFields(course: ICourse) {
	const { state, onToggle } = UseToggleEdit()
	return (
		<Card>
			<CardContent className='relative p-2'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Select fields</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>

				<Separator className='my-3' />

				{state ? (
					<Forms course={course} onToggle={onToggle} />
				) : (
					<div className='flex flex-col space-y-2'>
						<div className='flex grid-cols-3 gap-2'>
							<div className=' col-span-1 font-spaceGrotesk font-bold text-muted-foreground'>
								Language:
							</div>
							<div className='col-span-2 line-clamp-3'>{course.language}</div>
						</div>

						<div className='flex grid-cols-3 gap-2'>
							<div className=' col-span-1 font-spaceGrotesk font-bold text-muted-foreground'>
								Category:
							</div>
							<div className='col-span-2 line-clamp-3'>{course.category}</div>
						</div>

						<div className='flex grid-cols-3 gap-2'>
							<div className=' col-span-1 font-spaceGrotesk font-bold text-muted-foreground'>
								Level:
							</div>
							<div className='col-span-2 line-clamp-3'>{course.level}</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default SelectFields

interface FormProps {
	course: ICourse
	onToggle: () => void
}

function Forms({ course, onToggle }: FormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const form = useForm<z.infer<typeof selectFiledsSchema>>({
		resolver: zodResolver(selectFiledsSchema),
		defaultValues: {
			language: course.language,
			category: course.category,
			level: course.level,
		},
	})

	const onSubmit = (values: z.infer<typeof selectFiledsSchema>) => {
		setIsLoading(true)
		const promise = updateCourse(course._id, values, pathname)
			.then(() => onToggle())
			.finally(() => setIsLoading(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong!',
		})
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
					<FormField
						control={form.control}
						name='language'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Language<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={isLoading}
									>
										<SelectTrigger className='w-full bg-secondary'>
											<SelectValue placeholder={'Select'} />
										</SelectTrigger>
										<SelectContent>
											{courseLanguage.map(item => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Category<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={isLoading}
									>
										<SelectTrigger className='w-full bg-secondary'>
											<SelectValue placeholder={'Select'} />
										</SelectTrigger>
										<SelectContent>
											{courseCategory.map(item => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='level'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Level<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Select
										defaultValue={field.value}
										onValueChange={field.onChange}
										disabled={isLoading}
									>
										<SelectTrigger className='w-full bg-secondary'>
											<SelectValue placeholder={'Select'} />
										</SelectTrigger>
										<SelectContent>
											{courseLevels.map(item => (
												<SelectItem key={item} value={item}>
													{item}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type='submit' disabled={isLoading}>
						Save
					</Button>
				</form>
			</Form>
		</>
	)
}
