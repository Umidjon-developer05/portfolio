'use client'

import { Button } from '@/components/ui/button'
import { Facebook, Link2, Linkedin, Send, Twitter } from 'lucide-react'

function ShareBtns() {
	return (
		<div className='flex flex-col max-md:flex-row md:space-y-3 max-md:space-x-3 mt-4'>
			<Button size={'icon'} variant={'outline'}>
				<Twitter />
			</Button>
			<Button size={'icon'} variant={'outline'}>
				<Facebook />
			</Button>
			<Button size={'icon'} variant={'outline'}>
				<Linkedin />
			</Button>
			<Button size={'icon'} variant={'outline'}>
				<Send />
			</Button>
			<Button size={'icon'} variant={'outline'}>
				<Link2 />
			</Button>
		</div>
	)
}

export default ShareBtns
