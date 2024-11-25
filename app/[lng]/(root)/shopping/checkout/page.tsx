import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import CheckoutElement from './_components/checkout-element'
import { auth } from '@clerk/nextjs/server'
import { getCustomerCards } from '@/actions/customer.action'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Udemy | Checkout',
	description: 'Course purchase page.',
}

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)

	const cards = await getCustomerCards(userId!)

	return (
		<>
			<TopBar label={t('shoppingCart')} extra={t('checkout')} />
			<CheckoutElement cards={JSON.parse(JSON.stringify(cards))} />
		</>
	)
}

export default Page
