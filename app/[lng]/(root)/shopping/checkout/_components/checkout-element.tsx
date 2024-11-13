'use client'

import { Card, CardContent } from '@/components/ui/card'
import CheckoutOrdersElement from './checkout-orders-element'
import CheckoutResultsElement from './checkout-results-element'
import useTranslate from '@/hooks/use-translate'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from './checkout'
import { ICard } from '@/app.types'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface Props {
	cards: ICard[]
}

function CheckoutElement({ cards }: Props) {
	const t = useTranslate()
	return (
		<div className='container mx-auto mt-12 max-w-6xl'>
			<div className='grid grid-cols-3 gap-2 max-md:grid-cols-1'>
				<Card className='relative col-span-2 bg-gradient-to-t from-secondary to-background'>
					<CardContent className='py-4'>
						<h1 className='font-spaceGrotesk text-2xl font-bold'>
							{t('checkout')}
						</h1>
						<p className='text-sm text-muted-foreground'>{t('fillDetails')}</p>

						<Elements stripe={stripePromise}>
							<Checkout cards={cards} />
						</Elements>
					</CardContent>
				</Card>

				<div className='flex flex-col space-y-3'>
					<CheckoutOrdersElement />
					<CheckoutResultsElement />
				</div>
			</div>
		</div>
	)
}

export default CheckoutElement
