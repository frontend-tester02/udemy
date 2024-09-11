import Header from '../_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import { getCourses } from '@/actions/course.action'
import { auth } from '@clerk/nextjs/server'

async function Page() {
	const { userId } = auth()
	const courses = await getCourses(userId as string)

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
