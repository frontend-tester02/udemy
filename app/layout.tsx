import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Startup - Next.js',
	description: 'Startup Next.js project',
}

function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	)
}

export default RootLayout
