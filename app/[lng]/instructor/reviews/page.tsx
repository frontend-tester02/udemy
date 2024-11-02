import { Separator } from '@/components/ui/separator'
import Header from '../_components/header'
import InstructorReviewCard from '@/components/cards/instructor-review.card'
import { SearchParamsProps } from '@/app.types'

async function Page({ searchParams }: SearchParamsProps) {
	return (
		<>
			<Header
				title='Review'
				description='Here are you can see all the reviews of your courses'
			/>

			<div className='mt-4 rounded-md bg-background p-4'>
				<h3 className='font-spaceGrotesk text-lg font-medium'>All Reviewa</h3>
				<Separator className='my-3' />

				<div className='flex flex-col space-y-3'>
					<InstructorReviewCard />
					<InstructorReviewCard />
					<InstructorReviewCard />
				</div>
			</div>
		</>
	)
}

export default Page
