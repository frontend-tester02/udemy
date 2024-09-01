import Categories from './_components/categories'
import FeaturedCourses from './_components/featured-courses'
import Hero from './_components/hero'
import Instructor from './_components/instructor'

function Page() {
	return (
		<>
			<Hero />
			<FeaturedCourses />
			<Categories />
			<Instructor />
		</>
	)
}

export default Page
