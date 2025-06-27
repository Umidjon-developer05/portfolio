'use client'
import { useEffect, useState, useRef } from 'react'
import { ExternalLink, Github, X, Code, Eye } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sphere, Box } from '@react-three/drei'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import * as THREE from 'three'
import GlobalsApi from '../_utils/GlobalsApi'

interface Portfolio {
	id: number
	title: string
	description: string
	images: { url: string }
	portfoliocom: { lanuges: string }[]
	url: string
}

interface ApiResponse {
	portfolios: Portfolio[]
}

// 3D Background Component
function FloatingGeometry() {
	const meshRef = useRef<THREE.Mesh>(null)

	useFrame(state => {
		if (meshRef.current) {
			meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
			meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
			meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
		}
	})

	return (
		<Float speed={2} rotationIntensity={1} floatIntensity={2}>
			<Box ref={meshRef} args={[0.5, 0.5, 0.5]} position={[2, 1, -2]}>
				<meshStandardMaterial color='#6366f1' transparent opacity={0.6} />
			</Box>
		</Float>
	)
}

function ParticleField() {
	const pointsRef = useRef<THREE.Points>(null)
	const particleCount = 100

	const positions = new Float32Array(particleCount * 3)
	for (let i = 0; i < particleCount * 3; i++) {
		positions[i] = (Math.random() - 0.5) * 20
	}

	useFrame(state => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
		}
	})

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach='attributes-position'
					count={particleCount}
					array={positions}
					itemSize={3}
					args={[positions, 3]}
				/>
			</bufferGeometry>
			<pointsMaterial size={0.02} color='#8b5cf6' transparent opacity={0.6} />
		</points>
	)
}

function Scene3D() {
	return (
		<Canvas
			camera={{ position: [0, 0, 5], fov: 75 }}
			style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}
		>
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} intensity={1} />
			<Environment preset='night' />

			<ParticleField />
			<FloatingGeometry />

			<Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
				<Sphere args={[0.3]} position={[-3, -1, -1]}>
					<meshStandardMaterial color='#ec4899' transparent opacity={0.7} />
				</Sphere>
			</Float>

			<Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5}>
				<Box args={[0.4, 0.4, 0.4]} position={[3, -2, -3]}>
					<meshStandardMaterial color='#10b981' transparent opacity={0.6} />
				</Box>
			</Float>
		</Canvas>
	)
}

// 3D Modal Component
function ProjectModal({
	project,
	isOpen,
	onClose,
}: {
	project: Portfolio | null
	isOpen: boolean
	onClose: () => void
}) {
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		if (isOpen) {
			// Current scroll position ni saqlash
			setScrollY(window.scrollY)
			document.body.style.overflow = 'hidden'
			document.body.style.position = 'fixed'
			document.body.style.top = `-${window.scrollY}px`
			document.body.style.width = '100%'
		} else {
			document.body.style.overflow = 'unset'
			document.body.style.position = 'unset'
			document.body.style.top = 'unset'
			document.body.style.width = 'unset'
			// Scroll pozitsiyasini qaytarish
			window.scrollTo(0, scrollY)
		}

		return () => {
			document.body.style.overflow = 'unset'
			document.body.style.position = 'unset'
			document.body.style.top = 'unset'
			document.body.style.width = 'unset'
		}
	}, [isOpen, scrollY])

	if (!project) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-50 flex  justify-center p-4'
					style={{
						// backgroundColor: 'rgba(0, 0, 0, 0.9)',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						position: 'fixed',
					}}
					onClick={onClose}
				>
					<motion.div
						initial={{ scale: 0.5, rotateY: -90, y: 50 }}
						animate={{ scale: 1, rotateY: 0, y: 0 }}
						exit={{ scale: 0.5, rotateY: 90, y: 50 }}
						transition={{ type: 'spring', damping: 25, stiffness: 300 }}
						className='relative w-full max-w-6xl h-[85vh] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl'
						onClick={e => e.stopPropagation()}
						style={{
							maxHeight: '85vh',
							transform: 'translateZ(0)', // Hardware acceleration uchun
						}}
					>
						{/* Close Button */}
						<motion.button
							className='absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300'
							onClick={onClose}
							whileHover={{ scale: 1.1, rotate: 90 }}
							whileTap={{ scale: 0.9 }}
						>
							<X className='w-6 h-6' />
						</motion.button>

						<div className='flex flex-col justify-center lg:flex-row h-full'>
							{/* 3D Scene */}
							<div className='flex-1 relative '>
								{/* <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
									<Modal3DScene project={project} />
								</Canvas> */}
								<motion.img
									src={project.images?.url}
									alt={project.title}
									className='w-[800px] ml-4 mt-10 rounded-md h-[600px] object-contain'
									whileHover={{ scale: 1.1 }}
									transition={{ duration: 0.4 }}
								/>
							</div>

							{/* Project Details */}
							<motion.div
								initial={{ x: 100, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ delay: 0.3 }}
								className='lg:w-96 p-8 overflow-y-auto'
							>
								<div className='space-y-6'>
									<div>
										<motion.h2
											className='text-3xl font-bold text-white mb-2'
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.4 }}
										>
											{project.title}
										</motion.h2>
										<motion.div
											className='w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'
											initial={{ width: 0 }}
											animate={{ width: 80 }}
											transition={{ delay: 0.5, duration: 0.8 }}
										/>
									</div>

									<motion.p
										className='text-white/80 leading-relaxed text-lg'
										initial={{ y: 20, opacity: 0 }}
										animate={{ y: 0, opacity: 1 }}
										transition={{ delay: 0.6 }}
									>
										{project.description}
									</motion.p>

									{/* Tech Stack */}
									<div>
										<motion.h3
											className='text-xl font-semibold text-white mb-4 flex items-center gap-2'
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.7 }}
										>
											<Code className='w-5 h-5 text-purple-400' />
											Technologies
										</motion.h3>
										<div className='flex flex-wrap gap-3'>
											{project.portfoliocom.map((tech, index) => (
												<motion.span
													key={tech.lanuges}
													className='px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 backdrop-blur-sm font-medium'
													initial={{ scale: 0, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													transition={{ delay: 0.8 + index * 0.1 }}
													whileHover={{ scale: 1.05 }}
												>
													{tech.lanuges}
												</motion.span>
											))}
										</div>
									</div>

									{/* Action Buttons */}
									<div className='space-y-4 pt-6'>
										<motion.a
											href={project.url}
											target='_blank'
											rel='noreferrer'
											className='flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25'
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 0.9 }}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Eye className='w-5 h-5' />
											View Live Demo
											<ExternalLink className='w-4 h-4' />
										</motion.a>

										<motion.a
											href='#'
											className='flex items-center justify-center gap-3 w-full py-4 px-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300'
											initial={{ y: 20, opacity: 0 }}
											animate={{ y: 0, opacity: 1 }}
											transition={{ delay: 1 }}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
										>
											<Github className='w-5 h-5' />
											View Source Code
										</motion.a>
									</div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

const ProjectsPage = () => {
	const [projects, setPortfolio] = useState<Portfolio[]>([])
	const [loading, setLoading] = useState(true)
	const [selectedProject, setSelectedProject] = useState<Portfolio | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	async function GetALLN() {
		try {
			setLoading(true)
			const resp = await GlobalsApi.getAllPortfolio()
			console.log('API Response:', resp)

			const data = resp as ApiResponse
			setPortfolio(data.portfolios || [])
		} catch (error) {
			console.error('Error fetching portfolio data:', error)
			setPortfolio([]) // Fallback in case of an error
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		GetALLN()
	}, [])

	const openModal = (project: Portfolio) => {
		setSelectedProject(project)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setTimeout(() => setSelectedProject(null), 300)
	}

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	const cardVariants = {
		hidden: {
			opacity: 0,
			y: 50,
			rotateX: 90,
		},
		visible: {
			opacity: 1,
			y: 0,
			rotateX: 0,
			transition: {
				duration: 0.5,
				ease: easeInOut, // ✅ Correct type
			},
		},
	}

	if (loading) {
		return (
			<div className='min-h-screen  relative overflow-hidden'>
				<Scene3D />
				<div className='relative z-10 flex items-center justify-center min-h-screen'>
					<motion.div
						animate={{ rotate: 360 }}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
						className='w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full'
					/>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen  relative overflow-hidden'>
			<Scene3D />

			<div className='relative z-10 container mx-auto px-6 py-12'>
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center mb-16'
				>
					<motion.span
						className='inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium mb-6 backdrop-blur-sm border border-purple-500/30'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						My Work
					</motion.span>
					<motion.h1
						className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-8'
						initial={{ opacity: 0, scale: 0.5 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Featured Projects
					</motion.h1>
				</motion.div>

				<motion.div
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
					variants={containerVariants}
					initial='hidden'
					animate='visible'
				>
					{projects.map(project => (
						<motion.div
							key={project.id}
							variants={cardVariants}
							whileHover={{
								y: -10,
								rotateY: 5,
								scale: 1.02,
								transition: { duration: 0.3 },
							}}
							className='group relative cursor-pointer'
							onClick={() => openModal(project)}
						>
							<div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100' />

							<div className='relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300'>
								<div className='aspect-video overflow-hidden relative'>
									<motion.img
										src={project.images?.url}
										alt={project.title}
										className='w-full h-full object-cover'
										whileHover={{ scale: 1.1 }}
										transition={{ duration: 0.4 }}
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

									{/* View Details Overlay */}
									<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
										<motion.div
											className='px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30'
											whileHover={{ scale: 1.1 }}
										>
											View Details
										</motion.div>
									</div>
								</div>

								<div className='p-6'>
									<motion.h3
										className='text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors duration-300'
										layoutId={`title-${project.id}`}
									>
										{project.title}
									</motion.h3>

									<motion.p
										className='text-white/70 mb-4 text-sm leading-relaxed line-clamp-3'
										initial={{ opacity: 0.7 }}
										whileHover={{ opacity: 1 }}
									>
										{project.description}
									</motion.p>

									<div className='flex flex-wrap gap-2 mb-6'>
										{project.portfoliocom.slice(0, 3).map((tag, tagIndex) => (
											<motion.span
												key={tag.lanuges}
												className='text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border border-purple-500/30 backdrop-blur-sm'
												initial={{ opacity: 0, scale: 0 }}
												animate={{ opacity: 1, scale: 1 }}
												transition={{ delay: 0.1 * tagIndex }}
												whileHover={{ scale: 1.1 }}
											>
												{tag.lanuges}
											</motion.span>
										))}
										{project.portfoliocom.length > 3 && (
											<span className='text-xs px-3 py-1 rounded-full bg-white/10 text-white/50'>
												+{project.portfoliocom.length - 3}
											</span>
										)}
									</div>

									<div className='flex justify-between items-center'>
										<motion.button
											className='text-white/70 hover:text-white transition-colors flex items-center gap-2 group/link'
											whileHover={{ x: 5 }}
											whileTap={{ scale: 0.95 }}
											onClick={e => {
												e.stopPropagation()
												// Handle GitHub link
											}}
										>
											<Github className='h-4 w-4 group-hover/link:rotate-12 transition-transform duration-300' />
											<span className='text-sm'>Source</span>
										</motion.button>

										<motion.a
											className='text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 group/link'
											href={project.url}
											target='_blank'
											whileHover={{ x: -5 }}
											whileTap={{ scale: 0.95 }}
											rel='noreferrer'
											onClick={e => e.stopPropagation()}
										>
											<span className='text-sm'>Live Demo</span>
											<ExternalLink className='h-4 w-4 group-hover/link:-rotate-12 transition-transform duration-300' />
										</motion.a>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>

				{projects.length === 0 && !loading && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className='text-center py-20'
					>
						<p className='text-white/70 text-lg'>No projects found.</p>
					</motion.div>
				)}
			</div>

			{/* 3D Modal */}
			<ProjectModal
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={closeModal}
			/>
		</div>
	)
}

export default ProjectsPage
