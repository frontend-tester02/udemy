import ContactForm from '@/components/forms/contact'
import TopBar from '@/components/shared/top-bar'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { Mail, Phone } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Udemy | Contact',
	description:
		'If you have any questions, you can contact us. Our operators are ready to help you.',
}

async function Page({ params: { lng } }: LngParams) {
	const { t } = await translation(lng)
	return (
		<>
			<TopBar label='contacts' />
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27381.093809614!2d127.074304!3d37.55132105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4d713856077%3A0x169df594b1f221cc!2sSeoul%20Children&#39;s%20Grand%20Park!5e1!3m2!1sen!2skr!4v1725374618988!5m2!1sen!2skr'
				loading='lazy'
				className='h-96 w-full'
			></iframe>
			<div className='container mx-auto max-w-6xl'>
				<div className='mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1'>
					<div className='flex flex-col'>
						<h1 className='font-spaceGrotesk text-4xl'>{t('contactTitle')}</h1>
						<p className='mt-2 text-muted-foreground'>
							{t('contactDescription')}
						</p>

						<div className='mt-12 flex items-center gap-3'>
							<Mail className='size-4' />
							<p className='text-sm'>shokhrukhnuriddinov@gmail.com</p>
						</div>
						<div className='flex items-center gap-2'>
							<Phone className='size-4' />
							<p className='text-sm'>+82 10 2115 4633</p>
						</div>
					</div>

					<div>
						<h1 className='mb-2 font-spaceGrotesk text-4xl'>
							{t('contactForm')}
						</h1>
						<ContactForm />
					</div>
				</div>
			</div>
		</>
	)
}

export default Page
