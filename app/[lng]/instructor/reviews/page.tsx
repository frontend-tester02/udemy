import { Separator } from '@/components/ui/separator'
import Header from '../../../../components/shared/header'
import InstructorReviewCard from '@/components/cards/instructor-review.card'
import { SearchParamsProps } from '@/app.types'
import { auth } from '@clerk/nextjs/server'
import { getReviews } from '@/actions/review.action'
import Pagination from '@/components/shared/pagination'

async function Page({ searchParams }: SearchParamsProps) {
	const { userId } = auth()
	const page = searchParams.page ? +searchParams.page : 1

	const { reviews, isNext } = await getReviews({
		clerkId: userId!,
		page,
		pageSize: 6,
	})
	return (
		<>
			<Header
				title='Review'
				description='Here are you can see all the reviews of your courses'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<h3 className='font-spaceGrotesk text-lg font-medium'>All Reviews</h3>
				<Separator className='my-3' />

				<div className='flex flex-col space-y-3'>
					{reviews.map(review => (
						<InstructorReviewCard
							key={review._id}
							review={JSON.parse(JSON.stringify(review))}
						/>
					))}
				</div>

				<div className='mt-6'>
					<Pagination isNext={isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
