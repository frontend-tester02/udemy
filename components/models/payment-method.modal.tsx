import { usePaymentMethod } from '@/hooks/use-payment-method'
import { Dialog, DialogContent } from '../ui/dialog'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardNumberElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { useState } from 'react'
import FillLoading from '../shared/fill-loading'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import PaymentForm from '../forms/payment.form'
import { addressSchema } from '@/lib/validation'
import { z } from 'zod'
import { attachPayment, getCustomer } from '@/actions/customer.action'
import { useAuth } from '@clerk/nextjs'
import useTranslate from '@/hooks/use-translate'
import { usePathname } from 'next/navigation'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

function PaymentMethodModal() {
	const { isOpen, onClose } = usePaymentMethod()
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl'>
				<Elements stripe={stripePromise}>
					<StripeElement />
				</Elements>
			</DialogContent>
		</Dialog>
	)
}

export default PaymentMethodModal

function StripeElement() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const elements = useElements()
	const stripe = useStripe()
	const { userId } = useAuth()
	const pathname = usePathname()
	const t = useTranslate()
	const { onClose } = usePaymentMethod()

	const onSubmit = async (values: z.infer<typeof addressSchema>) => {
		if (!stripe || !elements) return null
		setLoading(true)

		const { address, fullName, city, zip } = values

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardNumberElement)!,
			billing_details: {
				name: fullName,
				address: { line1: address, city, postal_code: zip },
			},
		})

		if (error) {
			setLoading(false)
			setError(`${t('paymentError')} ${error.message}`)
		} else {
			const customer = await getCustomer(userId!)
			await attachPayment(paymentMethod.id, customer.id, pathname)
			onClose()
			setError('')
			setLoading(false)
		}
	}

	return (
		<>
			{loading && <FillLoading />}
			{error && (
				<Alert variant={'destructive'} className='mb-4'>
					<AlertCircle className='size-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			<PaymentForm isProfile onHandler={onSubmit} />
		</>
	)
}
