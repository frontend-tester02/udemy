'use client'
import useTranslate from '@/hooks/use-translate'

interface Props {
	title: string
}

function InstructorBasicInfo({ title }: Props) {
	const t = useTranslate()
	return (
		<>
			<h2 className='font-spaceGrotesk text-xl font-bold'>{t(title)}</h2>
			<p className='text-xs text-muted-foreground'>
				{t('basicInformationDescription')}
			</p>
		</>
	)
}

export default InstructorBasicInfo
