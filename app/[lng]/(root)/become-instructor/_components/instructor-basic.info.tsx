interface Props {
	title: string
}

function InstructorBasicInfo({ title }: Props) {
	return (
		<>
			<h2 className='font-spaceGrotesk text-xl font-bold'>{title}</h2>
			<p className='text-xs text-muted-foreground'>
				We are excited to have you on board! Please fill out the form below to
				get started.
			</p>
		</>
	)
}

export default InstructorBasicInfo
