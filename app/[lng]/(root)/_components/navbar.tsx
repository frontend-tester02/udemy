'use client'

import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import GlobalSearch from './global-search'
import LanguageDropdown from '@/components/shared/language-dropdown'
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'
import UserBox from '@/components/shared/user-box'
import Mobile from './mobile'
import useTranslate from '@/hooks/use-translate'
import { useParams, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/use-cart'

function Navbar() {
	const t = useTranslate()
	const pathname = usePathname()
	const { lng } = useParams()
	const { cartsLength } = useCart()

	return (
		<div className='fixed inset-0 z-40 h-20 bg-background/70 backdrop-blur-xl'>
			<div className='container mx-auto flex h-full max-w-7xl items-center justify-between border-b'>
				<div className='flex items-center gap-4'>
					<Logo />
					<div className='hidden items-center gap-3 border-l pl-2 md:flex'>
						{navLinks.map(nav => (
							<Link
								href={`/${nav.route}`}
								key={nav.route}
								className={cn(
									'font-medium transition-all hover:text-blue-500 hover:underline',
									pathname === `/${lng}/${nav.route}` && 'text-blue-500'
								)}
							>
								{t(nav.name)}
							</Link>
						))}
					</div>
				</div>

				<div className='flex items-center gap-2'>
					<div className='flex items-center gap-2 md:border-r md:pr-3'>
						<div className='hidden gap-1 md:flex'>
							<GlobalSearch />
							<LanguageDropdown isMobile={false} />
							<Button
								size={'icon'}
								variant={cartsLength() ? 'secondary' : 'ghost'}
								asChild
								className='relative'
							>
								<Link href={'/shopping/cart'}>
									<ShoppingCart />
									{cartsLength() ? (
										<div
											className='absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full 
										bg-destructive'
										>
											{cartsLength()}
										</div>
									) : null}
								</Link>
							</Button>
						</div>
						<Mobile />
						<ModeToggle />
					</div>
					<SignedIn>
						<UserBox />
					</SignedIn>
					<SignedOut>
						<SignInButton mode='modal'>
							<Button size={'lg'} variant={'ghost'} className='rounded-full'>
								{t('logIn')}
							</Button>
						</SignInButton>
						<SignUpButton mode='modal'>
							<Button size={'lg'} className='rounded-full'>
								{t('signUp')}
							</Button>
						</SignUpButton>
					</SignedOut>
				</div>
			</div>
		</div>
	)
}

export default Navbar
