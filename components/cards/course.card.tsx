import Link from 'next/link'
import { Card, CardContent } from '../ui/card'
import { Separator } from '../ui/separator'
import { ICourse } from '@/app.types'
import CustomImage from '../shared/custom-image'

function CourseCard(course: ICourse) {
	return (
		<Link href={`/course/${course._id}`}>
			<Card className='group'>
				<CardContent className='relative h-56 w-full'>
					<CustomImage src={course.previewImage} alt={course.title} />
				</CardContent>
				<div className='my-4 flex flex-col space-y-2 px-2'>
					<h2 className='line-clamp-1 font-spaceGrotesk text-2xl font-bold'>
						{course.title}
					</h2>
					<Separator />
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='relative size-[40px]'>
								<CustomImage
									src={course.instructor.picture}
									alt={course.instructor.fullName}
									className='rounded-full'
								/>
							</div>

							<p className='line-clamp-1 text-sm text-muted-foreground'>
								{course.instructor.fullName}
							</p>
						</div>
						<div className='flex gap-2'>
							<div className='self-start font-spaceGrotesk text-xs text-muted-foreground line-through'>
								{course.oldPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</div>
							<div className='self-start font-spaceGrotesk text-sm'>
								{course.currentPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</div>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	)
}

export default CourseCard
