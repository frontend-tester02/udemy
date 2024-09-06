import { courses } from '@/constants'
import Header from '../_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'

function Page() {
	return (
		<>
			<Header title='My courses' description='Here are your latest courses' />
			<div className='mt-4 grid grid-cols-3 gap-4'>
				{courses.map(course => (
					<InstructorCourseCard key={course.title} {...course} />
				))}
			</div>
		</>
	)
}

export default Page