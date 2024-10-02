interface Props {
	title: string
	description: string
}

function NoResult({ title, description }: Props) {
	return (
		<div className='mt-10 flex w-full flex-col items-center justify-center'>
			<h2 className='mt-8 font-spaceGrotesk text-2xl font-bold'>{title}</h2>
			<p className='my-3.5 max-w-md text-center'>{description}</p>
		</div>
	)
}

export default NoResult
