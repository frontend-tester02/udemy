'use client'

import { useReview } from '@/hooks/use-review'
import { Dialog, DialogContent } from '../ui/dialog'
import FillLoading from '../shared/fill-loading'
import { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { reviewSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { createReview, getReview, updateReview } from '@/actions/review.action'
import { useAuth } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { IReview } from '@/app.types'
import useTranslate from '@/hooks/use-translate'
import { sendNotification } from '@/actions/notification.action'

function ReviewModal() {
	const [rating, setRating] = useState(0)
	const [review, setReview] = useState<IReview | null>(null)

	const { isOpen, onClose, isLoading, startLoading, stopLoading } = useReview()
	const { userId } = useAuth()
	const { courseId } = useParams()
	const t = useTranslate()

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: { data: '' },
	})

	const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
		startLoading()
		const data = { ...values, rating }

		let upd
		let not

		if (review) {
			upd = updateReview({ ...data, _id: review._id })
			not = sendNotification(userId!, 'messageUpdateReview')
		} else {
			upd = createReview(data, userId!, `${courseId}`)
			not = sendNotification(userId!, 'messageSendReview')
		}

		upd.then(() => onClose()).finally(() => stopLoading())

		const promise = Promise.all([upd, not])

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}

	useEffect(() => {
		async function fetchReview() {
			startLoading()
			const res = await getReview(`${courseId}`, userId!)
			if (res) {
				setRating(res.rating)
				setReview(res)
				form.setValue('data', res.data)
			}
			stopLoading()
		}

		fetchReview()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen])

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{isLoading && <FillLoading />}
				<div className='flex flex-col items-center justify-center space-y-4'>
					<div className='mt-4 font-spaceGrotesk text-xl font-medium'>
						{review
							? t('changeReview')
							: rating
							? t('whyReview')
							: t('rateCourse')}
					</div>

					<ReactStars
						value={rating}
						size={30}
						onChange={val => setRating(val)}
						color2='#E59819'
					/>

					{rating ? (
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className='flex w-full flex-col gap-4'
							>
								<FormField
									control={form.control}
									name='data'
									render={({ field }) => (
										<FormItem className='flex w-full flex-col'>
											<FormControl>
												<Textarea
													className='h-36 resize-none border-none bg-secondary font-medium'
													placeholder={t('reviewPlaceholder')}
													{...field}
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage className='text-red-500' />
										</FormItem>
									)}
								/>

								<div className='flex justify-end'>
									<Button
										type='submit'
										disabled={isLoading}
										className='font-spaceGrotesk font-bold'
									>
										{review ? t('change') : t('submit')}
									</Button>
								</div>
							</form>
						</Form>
					) : null}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ReviewModal
