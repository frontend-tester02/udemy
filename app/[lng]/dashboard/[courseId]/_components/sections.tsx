import { ISection } from '@/app.types'

interface Props {
	sections: ISection[]
}

function Sections({ sections }: Props) {
	return <div>Sections</div>
}

export default Sections

function SectionList(section: ISection) {
	const searchParams = useSearchParams()
	const sectionId = searchParams.get('s')
	return (
		<AccordionItem value={section._id} className='mt-1'>
			<AccordionTrigger
				className={cn(
					'text-left hover:no-underline hover:bg-gray-50 hover:dark:bg-gray-800 px-3 bg-gray-100 dark:bg-black/20',
					sectionId === section._id && 'bg-white dark:bg-gray-800'
				)}
			>
				{section.title}
			</AccordionTrigger>
			<AccordionContent>
				{section.lessons.map(lesson => (
					<LessonList
						key={lesson._id}
						lesson={lesson}
						sectionId={section._id}
					/>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}

interface LessonProps {
	lesson: ILesson
	sectionId: string
}

function LessonList({ lesson, sectionId }: LessonProps) {
	const { courseId, lessonId } = useParams()
	return (
		<Button
			className={cn(
				'mx-auto mt-2 flex h-12 w-[calc(100%-12px)] items-center justify-between gap-x-2 rounded-none p-0 px-2 text-sm',
				lessonId === lesson._id && 'bg-secondary'
			)}
			variant={'ghost'}
		>
			<Link
				href={`/dashboard/${courseId}/${lesson._id}?s=${sectionId}`}
				className='flex size-full justify-start px-3'
			>
				<div className='flex max-w-[90%] items-center gap-x-2'>
					<div className='flex-1'>
						<PlayCircle size={16} />
					</div>
					{lesson.title.length > 30
						? `${lesson.title.slice(0, 30)}...`
						: lesson.title}
				</div>
			</Link>
			<div className='w-[10%]'>
				<Checkbox />
			</div>
		</Button>
	)
}
