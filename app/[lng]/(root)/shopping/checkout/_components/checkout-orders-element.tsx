'use client'

import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/hooks/use-cart'
import useTranslate from '@/hooks/use-translate'
import Image from 'next/image'

function CheckoutOrdersElement() {
	const t = useTranslate()
	const { carts } = useCart()
	return (
		<Card className='bg-gradient-to-b from-secondary to-background'>
			<CardContent className='py-4'>
				<h1 className='font-spaceGrotesk text-2xl font-bold'>{t('orders')}</h1>
				<p className='text-sm text-muted-foreground'>{t('reviewItems')}</p>

				<div className='mt-4 flex flex-col space-y-3'>
					{carts.map(cart => (
						<div
							key={cart._id}
							className='flex items-center justify-between border-b pb-2'
						>
							<div className='flex items-center gap-2'>
								<div className='relative size-12 rounded-md bg-gray-300'>
									<Image
										src={cart.previewImage}
										alt={cart.title}
										fill
										className='object-cover'
									/>
								</div>
								<h1 className='font-spaceGrotesk font-bold'>{cart.title}</h1>
							</div>

							<div className='flex items-center gap-2'>
								<h1 className='font-spaceGrotesk text-sm font-bold'>
									{cart.currentPrice.toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</h1>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export default CheckoutOrdersElement
