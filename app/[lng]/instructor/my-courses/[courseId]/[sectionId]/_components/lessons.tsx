'use client'

import { createLesson } from '@/actions/lesson.action'
import { ILessonFields } from '@/actions/types'
import { ILesson, ISection } from '@/app.types'
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
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import UseToggleEdit from '@/hooks/use-toggle-edit'
import { lessonSchema } from '@/lib/validation'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { zodResolver } from '@hookform/resolvers/zod'
import { BadgePlus, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import LessonList from './lesson-list'

interface Props {
	section: ISection
	lessons: ILesson[]
}

function Lessons({ section, lessons }: Props) {
	const { onToggle, state } = UseToggleEdit()
	const [isLoading, setIsLoading] = useState(false)
	const path = usePathname()

	const onAdd = async (lesson: ILessonFields) => {
		setIsLoading(true)
		return createLesson({ lesson, section: section._id, path })
			.then(() => onToggle())
			.finally(() => setIsLoading(false))
	}

	const onDragEnd = () => {}

	return (
		<Card>
			<CardContent className='relative p-6'>
				{isLoading && <FillLoading />}
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Manage chapters</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <BadgePlus />}
					</Button>
				</div>

				<Separator className='my-3' />
				{state ? (
					<Forms lesson={{} as ILessonFields} handler={onAdd} />
				) : (
					<>
						{!lessons.length ? (
							<p className='text-muted-foreground'>No lessons</p>
						) : (
							<DragDropContext onDragEnd={onDragEnd}>
								<Droppable droppableId='lessons'>
									{provided => (
										<div {...provided.droppableProps} ref={provided.innerRef}>
											{lessons.map((lesson, index) => (
												<LessonList
													key={lesson._id}
													lesson={lesson}
													index={index}
												/>
											))}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						)}
					</>
				)}
			</CardContent>
		</Card>
	)
}

export default Lessons

interface FormProps {
	lesson: ILessonFields
	handler: (lesson: ILessonFields) => Promise<void>
}

function Forms({ handler, lesson }: FormProps) {
	const { content, hours, minutes, seconds, videoUrl, title } = lesson

	const form = useForm<z.infer<typeof lessonSchema>>({
		resolver: zodResolver(lessonSchema),
		defaultValues: {
			title,
			videoUrl,
			hours: `${hours}`,
			minutes: `${minutes}`,
			seconds: `${seconds}`,
			content,
		},
	})

	const onSubmit = (values: z.infer<typeof lessonSchema>) => {
		const promise = handler(values).finally(() => form.reset())

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully!',
			error: 'Something went wrong!',
		})
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Lesson title</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-secondary'
									placeholder='e.g. "What is JavaScript"'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='videoUrl'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Video URL</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className='bg-secondary'
									placeholder='e.g. "Embed video url"'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='content'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Content</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									className='bg-secondary'
									placeholder='e.g. "Content"'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='grid grid-cols-3 gap-2'>
					<FormField
						control={form.control}
						name='hours'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Hours</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										type='number'
										placeholder='e.g. "Hours"'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='minutes'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Minutes</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										type='number'
										placeholder='e.g. "Minutes"'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='seconds'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Seconds</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										type='number'
										placeholder='e.g. "Seconds"'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex items-center gap-2'>
					<Button type='submit'>Save</Button>
				</div>
			</form>
		</Form>
	)
}
