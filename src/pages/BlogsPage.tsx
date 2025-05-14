'use client'

import BlogCard from '@/components/cards/blog.card'
import { getBlogs } from '@/service/blogs.service'
import { IBlog } from '@/types'
import { useEffect, useState } from 'react'

export default function BlogsPage() {
	const [blogs, setBlogs] = useState<IBlog[]>([])

	useEffect(() => {
		async function fetchBlogs() {
			try {
				const data = await getBlogs()
				setBlogs(data)
			} catch (error) {
				console.error('Error fetching blogs:', error)
			}
		}
		fetchBlogs()
	}, [])

	return (
		<>
			<div className='container mx-auto max-w-6xl'>
				<div className='mt-24 grid grid-cols-2 gap-x-4 gap-y-24 max-md:grid-cols-1'>
					{blogs.map(blog => (
						<BlogCard key={blog.slug} {...blog} />
					))}
				</div>
			</div>
		</>
	)
}
