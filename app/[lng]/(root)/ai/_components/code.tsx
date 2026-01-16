'use client'
import { IMessage } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import NoResult from '@/components/shared/no-result'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useTranslate from '@/hooks/use-translate'
import { promptSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Bot, Send, User, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import axios from 'axios'
import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'next/navigation'

function Code() {
	const [messages, setMessages] = useState<IMessage[]>([])
	const { lng } = useParams()
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	const form = useForm<z.infer<typeof promptSchema>>({
		resolver: zodResolver(promptSchema),
		defaultValues: { prompt: '' },
	})

	const isLoading = form.formState.isSubmitting

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const onSubmit = async (values: z.infer<typeof promptSchema>) => {
		try {
			const userMessage = {
				role: 'user',
				content: values.prompt,
			}

			const response = await axios.post(`/${lng}/api/code`, {
				messages: [...messages, userMessage],
			})

			setMessages(prev => [
				...prev,
				userMessage,
				{ role: 'system', content: response.data.content },
			])
			form.reset()
		} catch (error) {
			console.error('API Request Error:', error)
			toast.error(t('error'))
		} finally {
			form.reset()
		}
	}

	const t = useTranslate()

	return (
		<div className='flex h-full flex-col' suppressHydrationWarning>
			{messages.length === 0 ? (
				<div className='flex flex-1 items-center justify-center'>
					<NoResult
						title={t('howCanIHelp')}
						description={t('codeDescription')}
					/>
				</div>
			) : (
				<div
					ref={scrollContainerRef}
					className='flex-1 overflow-y-auto px-4 py-6'
				>
					<div className='mx-auto flex max-w-3xl flex-col gap-6'>
						{messages.map((item, index) => (
							<div
								key={`${item.role}-${index}`}
								className={cn(
									'flex gap-4',
									item.role === 'user' ? 'flex-row-reverse' : 'flex-row'
								)}
							>
								{/* Avatar */}
								<div
									className={cn(
										'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
										item.role === 'user'
											? 'bg-primary text-primary-foreground'
											: 'bg-muted text-muted-foreground'
									)}
								>
									{item.role === 'user' ? (
										<User className='size-4' />
									) : (
										<Bot className='size-4' />
									)}
								</div>

								{/* Message Content */}
								<div
									className={cn(
										'flex-1 rounded-lg px-4 py-3',
										item.role === 'user'
											? 'bg-primary text-primary-foreground'
											: 'bg-muted'
									)}
								>
									{item.role === 'user' ? (
										<p className='text-sm leading-relaxed'>{item.content}</p>
									) : (
										<div className='prose prose-sm max-w-none dark:prose-invert'>
											<ReactMarkdown
												components={{
													p: ({ children }) => (
														<p className='mb-2 text-sm leading-relaxed last:mb-0'>
															{children}
														</p>
													),
													pre: ({ children }) => (
														<div className='my-2 w-full overflow-auto rounded-lg bg-background p-4'>
															<pre className='text-xs'>{children}</pre>
														</div>
													),
													code: ({ children, className }) => {
														const isInline = !className
														return isInline ? (
															<code className='rounded bg-background px-1.5 py-0.5 font-mono text-xs'>
																{children}
															</code>
														) : (
															<code className='block font-mono text-xs'>{children}</code>
														)
													},
													ul: ({ children }) => (
														<ul className='mb-2 ml-4 list-disc space-y-1 text-sm last:mb-0'>
															{children}
														</ul>
													),
													ol: ({ children }) => (
														<ol className='mb-2 ml-4 list-decimal space-y-1 text-sm last:mb-0'>
															{children}
														</ol>
													),
													li: ({ children }) => (
														<li className='text-sm leading-relaxed'>{children}</li>
													),
													strong: ({ children }) => (
														<strong className='font-semibold'>{children}</strong>
													),
												}}
											>
												{item.content}
											</ReactMarkdown>
										</div>
									)}
								</div>
							</div>
						))}
						<div ref={messagesEndRef} />
					</div>
				</div>
			)}

			{isLoading && <FillLoading />}

			{/* Input Area */}
			<div className='absolute bottom-0 w-full bg-secondary p-2'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='mx-auto flex w-full max-w-4xl items-center justify-between gap-4'
					>
						<FormField
							control={form.control}
							name='prompt'
							render={({ field }) => (
								<FormControl>
									<Input
										className='border-0 bg-background outline-none focus-visible:ring-0 focus-visible:ring-transparent'
										placeholder={t('codePlaceholder')}
										{...field}
										disabled={isLoading}
									/>
								</FormControl>
							)}
						/>

						<div className='flex gap-2'>
							<Button
								type='submit'
								disabled={isLoading}
								size='icon'
								className='size-11'
								aria-label='Send'
							>
								<Send className='size-4' />
							</Button>

							{messages.length > 0 && (
								<Button
									type='button'
									disabled={isLoading}
									size='icon'
									variant='destructive'
									className='size-11'
									onClick={() => setMessages([])}
									aria-label='Clear'
								>
									<X className='size-4' />
								</Button>
							)}
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default Code
