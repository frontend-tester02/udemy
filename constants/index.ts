import { Contact, Home, ListVideo, Rss } from 'lucide-react'
import * as DiIcons from 'react-icons/di'

export const navLinks = [
	{ route: '', name: 'navLink1', icon: Home },
	{ route: 'courses', name: 'navLink2', icon: ListVideo },
	{ route: 'blogs', name: 'navLink3', icon: Rss },
	{ route: 'contacts', name: 'navLink4', icon: Contact },
]

export const lngs = [
	{ route: 'en', label: 'English' },
	{ route: 'uz', label: "O'zbekcha" },
	{ route: 'ru', label: 'Русский' },
	{ route: 'tr', label: 'Türkçe' },
]

export const companies = [
	DiIcons.DiCisco,
	DiIcons.DiCreativecommonsBadge,
	DiIcons.DiGhost,
	DiIcons.DiGithubFull,
	DiIcons.DiMeteorfull,
	DiIcons.DiLess,
	DiIcons.DiMailchimp,
	DiIcons.DiNetmagazine,
	DiIcons.DiNginx,
	DiIcons.DiStylus,
	DiIcons.DiYahoo,
	DiIcons.DiDjango,
	DiIcons.DiDocker,
]
