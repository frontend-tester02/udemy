import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function UseTranslate() {
	const { lng } = useParams()
	const { t } = useTranslation(lng as string)

	return t
}

export default UseTranslate
