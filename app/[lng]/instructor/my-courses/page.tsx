import Header from '../_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import { getCourses } from '@/actions/course.action'

async function Page() {
	const courses = await getCourses()
	return (
		<>
			<Header title='My courses' description='Here are your latest courses' />
			<div className='mt-4 grid grid-cols-3 gap-4'>
				{courses.map(course => (
					<InstructorCourseCard
						key={course._id}
						course={JSON.parse(JSON.stringify(course))}
					/>
				))}
			</div>
		</>
	)
}

export default Page
