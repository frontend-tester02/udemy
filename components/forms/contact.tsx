'use client'

import { Send } from 'lucide-react'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from '../ui/textarea'
import { toast } from 'sonner'
import { contactSchema } from '@/lib/validation'
import useTranslate from '@/hooks/use-translate'

function ContactForm() {
	const [isLoading, setIsLoading] = useState(false)
	const t = useTranslate()

	const form = useForm<z.infer<typeof contactSchema>>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			email: '',
			message: '',
			name: '',
		},
	})

	function onSubmit(values: z.infer<typeof contactSchema>) {
		setIsLoading(true)
		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API!
		const telegramChatId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_CHAT_ID!
		const promise = fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
				},
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: `
                    Name: ${values.name} 
                Email: ${values.email} 
                Message: ${values.message},
                `,
				}),
			}
		)
			.then(() => form.reset())
			.finally(() => setIsLoading(false))
		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									className='h-32 resize-none'
									placeholder={t('contactFormTextarea')}
									{...field}
									disabled={isLoading}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={t('contactFormEmail')}
									{...field}
									disabled={isLoading}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={t('contactFormName')}
									{...field}
									disabled={isLoading}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className='w-fit rounded-full'
					size={'lg'}
					type='submit'
					disabled={isLoading}
				>
					<span>{t('send')}</span>
					<Send className='ml-2 size-4' />
				</Button>
			</form>
		</Form>
	)
}

export default ContactForm
