'use client'

import { updateSectionTitle } from '@/actions/section.action'
import { ISection } from '@/app.types'
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
import UseToggleEdit from '@/hooks/use-toggle-edit'
import { sectionSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Edit2, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

function SectionField(section: ISection) {
	const { state, onToggle } = UseToggleEdit()
	return (
		<Card>
			<CardContent className='relative p-2'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Information</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>

				<Separator className='my-3' />
				{state ? (
					<Forms section={section} onToggle={onToggle} />
				) : (
					<div className='flex flex-col space-y-2'>
						<div className='flex grid-cols-3 gap-2'>
							<span className=' col-span-1 font-spaceGrotesk font-bold text-muted-foreground'>
								Title:
							</span>
							<span className='col-span-2 line-clamp-3'>{section.title}</span>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default SectionField

interface FormProps {
	section: ISection
	onToggle: () => void
}

function Forms({ section, onToggle }: FormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	const form = useForm<z.infer<typeof sectionSchema>>({
		resolver: zodResolver(sectionSchema),
		defaultValues: {
			title: section.title,
		},
	})

	const onSubmit = (values: z.infer<typeof sectionSchema>) => {
		setIsLoading(true)
		const promise = updateSectionTitle(section._id, values.title, pathname)
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
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Section title <span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-secondary'
										placeholder='e.g. Introduction to the course'
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage />
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
