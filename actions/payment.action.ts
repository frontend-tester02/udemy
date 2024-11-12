'use server'

import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'
import { attachPayment, getCustomer } from './customer.action'
import { generateNumericId } from '@/lib/utils'

export const payment = async (
	price: number,
	clerkId: string,
	paymentMethod: string
) => {
	try {
		await connectToDatabase()
		const customer = await getCustomer(clerkId)
		await attachPayment(paymentMethod, customer.id)

		const paymentIntent = await stripe.paymentIntents.create({
			amount: price * 100,
			currency: 'usd',
			customer: customer.id,
			payment_method: paymentMethod,
			payment_method_types: ['card'],
			metadata: { orderId: generateNumericId() },
		})

		return paymentIntent.client_secret
	} catch (error) {
		const result = error as Error
		console.log(result.message)
	}
}

export const retrievePayment = async (pi: string) => {
	try {
		return await stripe.paymentIntents.retrieve(pi, {
			expand: ['payment_method'],
		})
	} catch (error) {
		throw new Error("Couldn't retrieve payment")
	}
}
