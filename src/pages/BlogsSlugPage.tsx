import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getReadingTime } from '@/lib/utils'
import { getDetailedBlog } from '@/service/blogs.service'
import { format } from 'date-fns'
import { ArrowUpRight, CalendarDays, Clock, Minus } from 'lucide-react'
import parse from 'html-react-parser'
import { Helmet } from '@dr.pogodin/react-helmet'
import { useState } from 'react'
import { IBlog } from '@/types'
import ShareBtns from '@/components/share-btns'

function BlogsSlugPage() {
	const { slug } = useParams()
	const [blog, setBlog] = useState<IBlog | null>(null)

	useEffect(() => {
		async function fetchBlog() {
			const data = await getDetailedBlog(slug as string)
			setBlog(data)
			document.title = data.title
		}
		fetchBlog()
	}, [slug])

	if (!blog) return <div className='pt-32 text-center'>Loading...</div>
	console.log(blog.content.html)

	return (
		<div className=' max-w-5xl mx-auto'>
			<Helmet>
				<title>{blog.title}</title>
				<meta
					name='description'
					content={blog.title || blog.author.bio || 'Blog post'}
				/>
				<meta property='og:title' content={blog.title} />
				<meta
					property='og:description'
					content={blog.title || blog.author.bio || 'Blog post'}
				/>
				<meta property='og:image' content={blog.image.url} />
				<meta property='og:type' content='article' />
				<meta property='og:url' content={window.location.href} />

				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content={blog.title} />
				<meta
					name='twitter:description'
					content={blog.title || blog.author.bio || 'Blog post'}
				/>
				<meta name='twitter:image' content={blog.image.url} />
			</Helmet>
			<h1 className='lg:text-6xl md:text-5xl text-4xl font-creteRound'>
				{blog.title}
			</h1>

			<div className='flex items-center flex-wrap max-md:justify-center gap-4 mt-4'>
				<div className='flex items-center gap-2'>
					<img
						src={blog.author.image.url}
						alt='author'
						width={30}
						height={30}
						className='object-cover rounded-sm'
					/>
					<p>by {blog.author.name}</p>
				</div>
				<Minus />
				<div className='flex items-center gap-2'>
					<Clock className='w-5 h-5' />
					<p>{getReadingTime(blog.content.html)} min read</p>
				</div>
				<Minus />
				<div className='flex items-center gap-2'>
					<CalendarDays className='w-5 h-5' />
					<p>{format(new Date(blog.createdAt), 'MMM dd, yyyy')}</p>
				</div>
			</div>

			<img
				src={blog.image.url}
				alt='alt'
				width={`1120`}
				height={`595`}
				className='mt-4 rounded-md'
			/>

			<div className='flex md:gap-12 max-md:flex-col-reverse mt-12 relative'>
				<div className='flex flex-col space-y-3'>
					<div className='sticky top-36'>
						<p className='text-lg uppercase text-muted-foreground'>Share</p>
						<ShareBtns />
					</div>
				</div>
				<div className='flex-1 prose prose-invert'>
					{parse(blog.content.html)}
				</div>
			</div>

			<div className='flex mt-6 gap-6 items-center max-md:flex-col'>
				<img
					src={blog.author.image.url}
					alt='author'
					width='155'
					height='155'
					className='rounded-md max-md:self-start'
				/>
				<div className='flex-1 flex flex-col space-y-4'>
					<h2 className='text-3xl font-creteRound'>{blog.author.name}</h2>
					<p className='line-clamp-2 text-muted-foreground'>
						{blog.author.bio}
					</p>
					<Link
						to={`/author/${blog.author.id}`}
						className='flex items-center gap-2 hover:text-blue-500 underline transition-colors'
					>
						<span>See all posts by this author</span>
						<ArrowUpRight />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default BlogsSlugPage
