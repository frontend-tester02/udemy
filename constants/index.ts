import { Contact, Home, ListVideo, Rss } from 'lucide-react'

export const navLinks = [
	{ route: '', name: 'Home', icon: Home },
	{ route: 'courses', name: 'Courses', icon: ListVideo },
	{ route: 'blogs', name: 'Blogs', icon: Rss },
	{ route: 'contacts', name: 'Contacts', icon: Contact },
]

export const lngs = [
	{ route: 'en', label: 'English' },
	{ route: 'uz', label: "O'zbekcha" },
	{ route: 'ru', label: 'Русский' },
	{ route: 'tr', label: 'Türkçe' },
]
