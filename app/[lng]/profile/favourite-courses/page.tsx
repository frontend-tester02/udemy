import { getFavouriteCourses } from '@/actions/course.action'
import CourseCard from '@/components/cards/course.card'
import Header from '@/components/shared/header'
import NoResult from '@/components/shared/no-result'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)
	const courses = await getFavouriteCourses(userId!)

	return (
		<>
			<Header
				title={t('favouriteCourses')}
				description={t('favouriteDescription')}
			/>

			{courses.length === 0 && (
				<NoResult
					title={t('noFavourite')}
					description={t('noFavouriteDescription')}
				/>
			)}

			<div className='mt-4 grid grid-cols-3 gap-4 max-md:grid-cols-1'>
				{courses.map(course => {
					const data = JSON.parse(JSON.stringify(course))
					return <CourseCard key={course.id} {...data} />
				})}
			</div>
		</>
	)
}

export default Page
