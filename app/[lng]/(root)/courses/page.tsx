import TopBar from '@/components/shared/top-bar'
import AllCourses from './_components/all-courses'
import { getAllCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Udemy | Courses',
	description:
		'List of all courses available on our platform. Find the course that suits you and start learning!',
}

async function Page({ searchParams }: SearchParamsProps) {
	const resultJSON = await getAllCourses({
		searchQuery: searchParams.q,
		filter: searchParams.filter,
		page: searchParams.page ? +searchParams.page : 1,
	})

	const result = JSON.parse(JSON.stringify(resultJSON))
	return (
		<>
			<TopBar label='allCourses' description='allCourseDescription' />
			<AllCourses result={result} />
		</>
	)
}

export default Page
