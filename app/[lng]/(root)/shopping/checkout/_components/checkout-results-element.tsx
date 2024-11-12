'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-cart'
import useTranslate from '@/hooks/use-translate'

function CheckoutResultsElement() {
	const t = useTranslate()
	const { totalPrice, taxes } = useCart()
	return (
		<Card className='bg-gradient-to-t from-secondary to-background'>
			<CardContent className='py-4'>
				<h1 className='font-spaceGrotesk text-2xl font-bold'>{t('results')}</h1>
				<p className='text-sm text-muted-foreground'>{t('controlsResult')}</p>

				<Separator className='my-3' />
				<div className='flex items-center justify-between text-sm'>
					<div className='font-spaceGrotesk font-bold'>{t('subtotal')}</div>
					<div className='font-medium'>
						{totalPrice().toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</div>
				</div>

				<div className='flex items-center justify-between text-sm'>
					<div className='font-spaceGrotesk font-bold'>{t('taxes')}</div>
					<div className='font-medium'>
						{taxes().toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</div>
				</div>

				<div className='flex items-center justify-between text-sm'>
					<div className='font-spaceGrotesk font-bold'>{t('total')}</div>
					<div className='font-medium'>
						{(totalPrice() + taxes()).toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default CheckoutResultsElement
