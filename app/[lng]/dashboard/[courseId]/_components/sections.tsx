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

