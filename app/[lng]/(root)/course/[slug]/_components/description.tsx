'use client'

import { ICourse } from '@/app.types'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import {
	BarChart2,
	Clock,
	Infinity,
	Languages,
	MonitorPlay,
} from 'lucide-react'
import { GrCertificate } from 'react-icons/gr'
import { BiCategory } from 'react-icons/bi'
import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import Link from 'next/link'
import { toast } from 'sonner'
import { addWishlistCourse } from '@/actions/course.action'
import { sendNotification } from '@/actions/notification.action'

interface Props {
	course: ICourse
	isPurchase: boolean
}

function Description({ course, isPurchase }: Props) {
	const [isLoading, setIsLoading] = useState(false)

	const { userId } = useAuth()
	const t = useTranslate()
	const router = useRouter()
	const { addToCart } = useCart()

	const onCart = () => {
		setIsLoading(true)
		addToCart(course)
		router.push('/shopping/cart')
	}

	const onAdd = () => {
		if (!userId) return toast.error('Please Sign Up!')
		setIsLoading(true)

		const upd = addWishlistCourse(course._id, userId!).finally(() =>
			setIsLoading(false)
		)

		const not = sendNotification(userId!, 'messageAddWishlist')

		const promise = Promise.all([upd, not])

		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: `${t('alreadyAdded')} Wishlist`,
		})
	}

	return (
		<div className='rounded-md border bg-secondary/50 p-4 shadow-lg dark:shadow-white/20 lg:sticky lg:top-24 lg:p-6'>
			<div className='flex items-center justify-between font-spaceGrotesk'>
				<div className='text-2xl font-bold'>
					{course.currentPrice.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</div>
				<div className='font-bold line-through'>
					{course.oldPrice.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</div>
			</div>

			{isPurchase ? (
				<Button size={'lg'} className='relative mt-2 w-full font-bold' asChild>
					<Link href={`/dashboard/${course._id}`}>{t('toLesson')}</Link>
				</Button>
			) : (
				<Button
					size={'lg'}
					className='relative mt-2 w-full font-bold'
					disabled={isLoading}
					onClick={onCart}
				>
					{t('buyNow')}
				</Button>
			)}

			<Button
				size={'lg'}
				className='relative mt-2 w-full font-bold'
				variant={'outline'}
				disabled={isLoading}
				onClick={onAdd}
			>
				{t('addWishlist')}
			</Button>

			<p className='my-3 text-center text-sm text-muted-foreground'>
				{t('guarantee')}
			</p>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<MonitorPlay className='size-5' />
					<span className='font-bold'>{t('lessons')}</span>
				</div>
				<p className='text-muted-foreground'>{course.totalLessons}</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<Clock className='size-5' />
					<span className='font-bold'>{t('durations')}</span>
				</div>
				<p className='text-muted-foreground'>
					{course.totalDuration} {''}
					{t('hours')}
				</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<BarChart2 className='size-5' />
					<span className='font-bold'>{t('skillLevel')}</span>
				</div>
				<p className='capitalize text-muted-foreground'>{course.level}</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<Languages className='size-5' />
					<span className='font-bold'>{t('language')}</span>
				</div>
				<p className='capitalize text-muted-foreground'>{course.language}</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<BiCategory className='size-5' />
					<span className='font-bold'>{t('Category')}</span>
				</div>
				<p className='capitalize text-muted-foreground'>{course.category}</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<GrCertificate className='size-5' />
					<span className='font-bold'>{t('certificate')}</span>
				</div>
				<p className='text-muted-foreground'>{t('yes')}</p>
			</div>

			<div className='mt-4 flex items-center justify-between border-b pb-2'>
				<div className='flex items-center gap-2 font-spaceGrotesk'>
					<Infinity className='size-5' />
					<span className='font-bold'>{t('fullLifetime')}</span>
				</div>
				<p className='text-muted-foreground'>{t('yes')}</p>
			</div>
		</div>
	)
}

export default Description
