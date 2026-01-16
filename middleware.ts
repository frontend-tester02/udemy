import { authMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
	locales: ['en', 'ru', 'uz', 'tr'],
	defaultLocale: 'en',
})

export default authMiddleware({
	beforeAuth: req => intlMiddleware(req),
	publicRoutes: [
		'/:lng',
		'/:lng/courses',
		'/:lng/course/:slug',
		'/:lng/blogs',
		'/:lng/blogs/:slug',
		'/:lng/contacts',
		'/:lng/instructors',
		'/:lng/instructors/:instructorId',
		'/:lng/shopping/cart',
		'/:lng/sign-in',
		'/:lng/sign-up',
		'/:lng/ai',
		'/:lng/api/conversation',
		'/:lng/api/code',
		'/:lng/api/image',
		'/:lng/api/test-gemini',
	],
	ignoredRoutes: [
		'/en/api/webhook',
		// API routes - ignore auth for all language prefixes
		'/en/api/conversation',
		'/en/api/code',
		'/en/api/image',
		'/en/api/test-gemini',
		'/ru/api/conversation',
		'/ru/api/code',
		'/ru/api/image',
		'/ru/api/test-gemini',
		'/uz/api/conversation',
		'/uz/api/code',
		'/uz/api/image',
		'/uz/api/test-gemini',
		'/tr/api/conversation',
		'/tr/api/code',
		'/tr/api/image',
		'/tr/api/test-gemini',
	],
})

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
