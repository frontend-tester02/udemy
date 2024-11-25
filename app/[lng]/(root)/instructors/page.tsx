import { getAdminInstructors } from '@/actions/user.action'
import { SearchParamsProps } from '@/app.types'
import InstructorCard from '@/components/cards/instructor.card'
import Pagination from '@/components/shared/pagination'
import TopBar from '@/components/shared/top-bar'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Udemy | Instructors',
	description:
		'List of all teachers available on our platform. Find the right teacher for you and start learning.',
}

async function Page({ searchParams }: SearchParamsProps) {
	const page = searchParams.page ? +searchParams.page : 1
	const instructorData = await getAdminInstructors({ page, pageSize: 6 })

	return (
		<>
			<TopBar label='allInstructors' description='allInstructorsDescription' />

			<div className='container mx-auto mt-12 max-w-6xl'>
				<div className='mt-4 grid grid-cols-3 gap-4'>
					{instructorData.instructors.map(instructor => (
						<InstructorCard
							key={instructor._id}
							instructor={JSON.parse(JSON.stringify(instructor))}
						/>
					))}
				</div>

				<div className='mt-4'>
					<Pagination isNext={instructorData.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
