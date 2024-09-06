interface Props {
	title: string
	description: string
}

function Header({ title, description }: Props) {
	return (
		<div className='pt-4'>
			<h1 className='font-spaceGrotesk text-4xl font-bold'>{title}</h1>
			<p className='text-sm font-medium text-muted-foreground'>{description}</p>
		</div>
	)
}

export default Header
