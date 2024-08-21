import { ChildProps } from '@/types'
import Navbar from './(home)/_components/navbar'

function Layout({ children }: ChildProps) {
	return (
		<div>
			<Navbar />
			<main>{children}</main>
		</div>
	)
}

export default Layout
