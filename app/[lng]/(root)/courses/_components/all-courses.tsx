'use client'

import { ICourse } from '@/app.types'
import CourseCard from '@/components/cards/course.card'
import Pagination from '@/components/shared/pagination'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	courseLanguage,
	courses,
	filterCourses,
	filterLevels,
} from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { useSearchParams } from 'next/navigation'

interface Props {
	result: {
		courses: ICourse[]
		isNext: boolean
		totalCourses: number
	}
}

function AllCourses({ result }: Props) {
	const t = useTranslate()

	const searchParams = useSearchParams()
	const page = searchParams.get('page')

	const { courses, isNext, totalCourses } = result

	const onUpdateParams = (value: string) => {
		const newUrl = formUrlQuery({
			value,
			key: 'filter',
			params: searchParams.toString(),
		})

		router.push(newUrl)
	}
	return (
		<div className='container mx-auto mt-12 max-w-6xl'>
			<div className='flex items-center justify-between max-md:flex-col max-md:items-start max-md:space-y-2'>
				<h2 className='max-md:self-end'>
					{t('result1')} {''}
					<span className='font-spaceGrotesk font-bold'>{totalCourses} </span>
					{''}
					{t('result2')}
				</h2>
				<div className='flex items-center gap-2'>
					<p>{t('sortBy')}</p>

					<Select>
						<SelectTrigger className='w-[120px] bg-gradient-to-r from-secondary to-background'>
							<SelectValue placeholder={t('filter')} />
						</SelectTrigger>
						<SelectContent>
							{filterCourses.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className='w-[120px] bg-gradient-to-l from-background via-se to-background'>
							<SelectValue placeholder={t('level')} />
						</SelectTrigger>
						<SelectContent>
							{filterLevels.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select>
						<SelectTrigger className='w-[120px] bg-gradient-to-l from-secondary to-background'>
							<SelectValue placeholder={t('language')} />
						</SelectTrigger>
						<SelectContent>
							{courseLanguage.map(item => (
								<SelectItem key={item} value={item} className='capitalize'>
									{t(item)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{courses.map((course, index) => (
					<CourseCard key={index} {...course} />
				))}
			</div>

			<div className='mt-10'>
				<Pagination pageNumber={page ? +page : 1} isNext={isNext} />
			</div>
		</div>
	)
}

export default AllCourses
