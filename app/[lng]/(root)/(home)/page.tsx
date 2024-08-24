'use client'

import { useTranslation } from '@/i18n/client'
import { useParams } from 'next/navigation'

function Page() {
	const { lng } = useParams()
	const { t } = useTranslation(lng as string)

	return <div className='mt-24 w-10 p-9 text-xl font-bold'>{t('home')}</div>
}

export default Page
