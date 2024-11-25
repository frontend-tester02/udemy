import type { Metadata } from 'next'
import { Roboto, Space_Grotesk as SpaceGrotesk } from 'next/font/google'
import './globals.css'
import { ChildProps } from '@/types'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { languages } from '@/i18n/settings'
import { dir } from 'i18next'
import { ClerkProvider } from '@clerk/nextjs'
import { localization } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const roboto = Roboto({
	subsets: ['latin', 'cyrillic'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
})

const spaceGrotesk = SpaceGrotesk({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--font-space-grotesk',
})

export async function generateStaticParams() {
	return languages.map(lng => ({ lng }))
}
export const metadata: Metadata = {
	metadataBase: new URL('https://shokh-udemy.vercel.app'),
	title: 'Udemy',
	description:
		'Udemy, Programming courses, startup projects and best qualitiy eduaction',
	authors: [
		{ name: 'Nuriddinov Shokhrukh', url: 'https://shokh-udemy.vercel.app' },
	],
	icons: { icon: '/logo.svg' },
	openGraph: {
		title: 'Udemy | Udemy courses',
		description:
			'Udemy, Programming courses, startup projects and best qualitiy eduaction',
		type: 'website',
		url: 'https://shokh-udemy.vercel.app',
		locale: 'en_US',
		images: 'https://media.graphassets.com/f4jkBWQ6SVaKwySKRNQT',
		countryName: 'Uzbekistan',
		siteName: 'Udemy',
		emails: 'nuriddinovshokhrukh@gmail.com',
	},
	keywords:
		'Udemy, Udemy programming courses, NextJS, NextJS full course, ReactJs, ReactJS full course, Shokh udemy, Startup udemy, Udemy courses, Shokh udemy courses, Startup project, Shokh startup, Programming courses, ',
}

interface Props extends ChildProps {
	params: { lng: string }
}

function RootLayout({ children, params: { lng } }: Props) {
	const local = localization(lng)
	return (
		<ClerkProvider localization={local}>
			<html lang={lng} dir={dir(lng)} suppressHydrationWarning>
				<body
					className={`${roboto.className} ${spaceGrotesk.variable} custom-scrollbar overflow-x-hidden`}
					suppressHydrationWarning
				>
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<Toaster position='top-center' />
						{children}
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
