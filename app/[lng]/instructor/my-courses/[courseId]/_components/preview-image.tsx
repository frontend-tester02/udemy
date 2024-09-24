'use client'
import { updateCourse } from '@/actions/course.action'
import { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import UseToggleEdit from '@/hooks/use-toggle-edit'
import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import { Edit2, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

function PreviewImage(course: ICourse) {
	const { state, onToggle } = UseToggleEdit()
	return (
		<Card>
			<CardContent className='relative p-2'>
				<div className='flex items-center justify-between'>
					<span className='text-lg font-medium'>Replace image</span>
					<Button size={'icon'} variant={'ghost'} onClick={onToggle}>
						{state ? <X /> : <Edit2 />}
					</Button>
				</div>

				<Separator className='my-3' />
				{state ? (
					<Forms course={course} onToggle={onToggle} />
				) : (
					<div className='relative h-72 w-full'>
						<Image
							src={course.previewImage}
							alt='Preview image'
							fill
							className='rounded-sm object-cover'
						/>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default PreviewImage

interface FormProps {
	course: ICourse
	onToggle: () => void
}

function Forms({ course, onToggle }: FormProps) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname = usePathname()

	function onUpload(e: ChangeEvent<HTMLInputElement>) {
		setIsLoading(true)
		const files = e.target.files
		if (!files) {
			return null
		}

		const file = files[0]

		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = e => {
			const refs = ref(storage, `/udemy/course/${uuidv4()}`)
			const result = e.target?.result as string
			const promise = uploadString(refs, result, 'data_url')
				.then(() => {
					getDownloadURL(refs).then(url =>
						updateCourse(course._id, { previewImage: url }, pathname)
					)
				})
				.then(() => onToggle())
				.finally(() => setIsLoading(false))

			toast.promise(promise, {
				loading: 'Uploading...',
				success: 'Successfully uploaded!',
				error: 'Something went wrong!',
			})
		}
	}
	return (
		<>
			{isLoading && <FillLoading />}
			<Input
				className='bg-secondary'
				type='file'
				disabled={isLoading}
				onChange={onUpload}
			/>
		</>
	)
}
