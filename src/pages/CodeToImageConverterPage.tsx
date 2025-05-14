'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import {
	Download,
	Settings,
	Check,
	AlertCircle,
	ChevronDown,
	X,
} from 'lucide-react'
import html2canvas from 'html2canvas'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup' // HTML
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// Language icons component
const LanguageIcon = ({ language }: { language: string }) => {
	switch (language) {
		case 'javascript':
			return (
				<div className='flex items-center'>
					<span className='language-icon js-icon'>JS</span>JavaScript
				</div>
			)
		case 'typescript':
			return (
				<div className='flex items-center'>
					<span className='language-icon ts-icon'>TS</span>TypeScript
				</div>
			)
		case 'html':
			return (
				<div className='flex items-center'>
					<span className='language-icon html-icon'>{'<>'}</span>HTML
				</div>
			)
		case 'css':
			return (
				<div className='flex items-center'>
					<span className='language-icon css-icon'>CSS</span>CSS
				</div>
			)
		case 'python':
			return (
				<div className='flex items-center'>
					<span className='language-icon py-icon'>PY</span>Python
				</div>
			)
		case 'java':
			return (
				<div className='flex items-center'>
					<span className='language-icon java-icon'>JV</span>Java
				</div>
			)
		case 'jsx':
			return (
				<div className='flex items-center'>
					<span className='language-icon jsx-icon'>JSX</span>JSX (React)
				</div>
			)
		case 'tsx':
			return (
				<div className='flex items-center'>
					<span className='language-icon tsx-icon'>TSX</span>TSX (React)
				</div>
			)
		default:
			return (
				<div className='flex items-center'>
					<span className='language-icon'>{'</>'}</span>
					{language}
				</div>
			)
	}
}

export default function CodeToImageConverter() {
	const [language, setLanguage] = useState('javascript')
	const [theme, setTheme] = useState('dracula')
	const [fileName, setFileName] = useState('')
	const [backgroundType, setBackgroundType] = useState('gradient')
	const [gradientType, setGradientType] = useState('spring-warmth')
	const [code, setCode] = useState('// Paste your code here...')
	const [isCodeValid, setIsCodeValid] = useState(true)
	const [validationMessage, setValidationMessage] = useState('')
	const [highlightedCode, setHighlightedCode] = useState('')
	const [cursorPosition, setCursorPosition] = useState(0)
	const [showDropdown, setShowDropdown] = useState<string | null>(null)
	const [showSettings, setShowSettings] = useState(false)

	// Settings state
	const [fontFamily, setFontFamily] = useState('Roboto Mono')
	const [fontSize, setFontSize] = useState('12px')
	const [tabSize, setTabSize] = useState('2 spaces')
	const [showLineNumbers, setShowLineNumbers] = useState(false)
	const [showFoldGutter, setShowFoldGutter] = useState(false)

	const editorRef = useRef<HTMLDivElement>(null)
	const codeContainerRef = useRef<HTMLPreElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const settingsRef = useRef<HTMLDivElement>(null)

	// Language options with icons
	const languageOptions = [
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'html', label: 'HTML' },
		{ value: 'css', label: 'CSS' },
		{ value: 'python', label: 'Python' },
		{ value: 'java', label: 'Java' },
		{ value: 'jsx', label: 'JSX (React)' },
		{ value: 'tsx', label: 'TSX (React)' },
	]

	// Theme options
	const themeOptions = [
		{ value: 'dracula', label: 'Dracula - Dark' },
		{ value: 'github', label: 'GitHub - Light' },
		{ value: 'monokai', label: 'Monokai' },
		{ value: 'solarized', label: 'Solarized Dark' },
		{ value: 'nord', label: 'Nord' },
	]

	// Font family options
	const fontFamilyOptions = [
		{ value: 'Roboto Mono', label: 'Roboto Mono' },
		{ value: 'Fira Code', label: 'Fira Code' },
		{ value: 'JetBrains Mono', label: 'JetBrains Mono' },
		{ value: 'Source Code Pro', label: 'Source Code Pro' },
		{ value: 'Consolas', label: 'Consolas' },
	]

	// Font size options
	const fontSizeOptions = [
		{ value: '10px', label: '10px' },
		{ value: '12px', label: '12px' },
		{ value: '14px', label: '14px' },
		{ value: '16px', label: '16px' },
		{ value: '18px', label: '18px' },
	]

	// Tab size options
	const tabSizeOptions = [
		{ value: '2 spaces', label: '2 spaces' },
		{ value: '4 spaces', label: '4 spaces' },
		{ value: '8 spaces', label: '8 spaces' },
		{ value: 'Tab', label: 'Tab' },
	]

	// Gradient styles
	const gradientStyles = {
		'spring-warmth': 'bg-gradient-to-br from-pink-200 to-orange-200',
		'ocean-blue': 'bg-gradient-to-br from-blue-200 to-cyan-200',
		'forest-green': 'bg-gradient-to-br from-green-200 to-emerald-200',
		sunset: 'bg-gradient-to-br from-orange-200 to-red-200',
		lavender: 'bg-gradient-to-br from-purple-200 to-indigo-200',
	}

	// Theme CSS classes
	const themeStyles = {
		dracula: 'prism-dracula',
		github: 'prism-github',
		monokai: 'prism-monokai',
		solarized: 'prism-solarized',
		nord: 'prism-nord',
	}

	// Toggle dropdown
	const toggleDropdown = (dropdown: string) => {
		if (showDropdown === dropdown) {
			setShowDropdown(null)
		} else {
			setShowDropdown(dropdown)
		}
	}

	// Toggle settings panel
	const toggleSettings = () => {
		setShowSettings(!showSettings)
	}

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showDropdown &&
				!(event.target as Element).closest('.dropdown-container')
			) {
				setShowDropdown(null)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showDropdown])

	// Close settings when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				showSettings &&
				settingsRef.current &&
				!settingsRef.current.contains(event.target as Node) &&
				!(event.target as Element).closest('.settings-button')
			) {
				setShowSettings(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showSettings])

	// Validate code based on selected language
	const validateCode = (codeToValidate: string, lang: string) => {
		if (!codeToValidate || codeToValidate === '// Paste your code here...') {
			setIsCodeValid(true)
			setValidationMessage('')
			return
		}

		try {
			// Basic validation for JavaScript/TypeScript
			if (
				lang === 'javascript' ||
				lang === 'typescript' ||
				lang === 'jsx' ||
				lang === 'tsx'
			) {
				// Try to parse the code
				new Function(codeToValidate)
				setIsCodeValid(true)
				setValidationMessage('')
			} else {
				// For other languages, we'll just assume it's valid
				// In a real app, you might want to use language-specific validators
				setIsCodeValid(true)
				setValidationMessage('')
			}
		} catch (error) {
			setIsCodeValid(false)
			setValidationMessage((error as Error).message)
		}
	}

	// Handle code change
	const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newCode = e.target.value
		setCode(newCode)
		validateCode(newCode, language)

		// Update cursor position
		if (textareaRef.current) {
			setCursorPosition(textareaRef.current.selectionStart)
		}
	}

	// Handle language change
	const handleLanguageChange = (newLanguage: string) => {
		setLanguage(newLanguage)
		validateCode(code, newLanguage)
		setShowDropdown(null)
	}

	// Handle theme change
	const handleThemeChange = (newTheme: string) => {
		setTheme(newTheme)
		setShowDropdown(null)
	}

	// Handle gradient change
	const handleGradientChange = (newGradient: string) => {
		setGradientType(newGradient)
		setShowDropdown(null)
	}

	// Handle background type change
	const handleBackgroundTypeChange = (newType: string) => {
		setBackgroundType(newType)
		setShowDropdown(null)
	}

	// Handle font family change
	const handleFontFamilyChange = (newFontFamily: string) => {
		setFontFamily(newFontFamily)
		setShowDropdown(null)
	}

	// Handle font size change
	const handleFontSizeChange = (newFontSize: string) => {
		setFontSize(newFontSize)
		setShowDropdown(null)
	}

	// Handle tab size change
	const handleTabSizeChange = (newTabSize: string) => {
		setTabSize(newTabSize)
		setShowDropdown(null)
	}

	// Track cursor position
	const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
		const target = e.target as HTMLTextAreaElement
		setCursorPosition(target.selectionStart)
	}

	// Focus the textarea when clicking on the code container
	const handleCodeContainerClick = () => {
		if (textareaRef.current) {
			textareaRef.current.focus()
		}
	}

	// Highlight code using Prism.js
	useEffect(() => {
		// Map our language values to Prism's language classes
		const languageMap: Record<string, string> = {
			javascript: 'language-javascript',
			typescript: 'language-typescript',
			html: 'language-html',
			css: 'language-css',
			python: 'language-python',
			java: 'language-java',
			jsx: 'language-jsx',
			tsx: 'language-tsx',
		}

		const prismLanguage = languageMap[language] || 'language-javascript'

		// Highlight the code
		const highlighted = Prism.highlight(
			code,
			Prism.languages[language] || Prism.languages.javascript,
			language
		)

		// Insert cursor at the right position
		if (cursorPosition >= 0 && cursorPosition <= code.length) {
			const beforeCursor = code.substring(0, cursorPosition)
			const afterCursor = code.substring(cursorPosition)

			const highlightedBeforeCursor = Prism.highlight(
				beforeCursor,
				Prism.languages[language] || Prism.languages.javascript,
				language
			)

			const highlightedAfterCursor = Prism.highlight(
				afterCursor,
				Prism.languages[language] || Prism.languages.javascript,
				language
			)

			setHighlightedCode(
				`${highlightedBeforeCursor}<span class="cursor"></span>${highlightedAfterCursor}`
			)
		} else {
			setHighlightedCode(highlighted)
		}
	}, [code, language, cursorPosition])

	// Download the code as an image
	const handleDownload = async () => {
		if (!editorRef.current) return

		try {
			const canvas = await html2canvas(editorRef.current, {
				backgroundColor: null, // Transparent background
				scale: 2, // Higher resolution
			})

			// Convert to JPG (white background)
			const jpgCanvas = document.createElement('canvas')
			jpgCanvas.width = canvas.width
			jpgCanvas.height = canvas.height
			const ctx = jpgCanvas.getContext('2d')

			if (ctx) {
				// Fill with white background
				ctx.fillStyle = '#FFFFFF'
				ctx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height)

				// Draw the original canvas on top
				ctx.drawImage(canvas, 0, 0)

				// Convert to JPG and download
				const dataUrl = jpgCanvas.toDataURL('image/jpeg', 0.9)
				const link = document.createElement('a')
				const name = fileName || `code-${language}-${new Date().getTime()}`
				link.download = `${name}.jpg`
				link.href = dataUrl
				link.click()
			}
		} catch (error) {
			console.error('Error generating image:', error)
			alert('Failed to generate image. Please try again.')
		}
	}

	// Get line numbers for display
	const getLineNumbers = () => {
		if (!showLineNumbers) return null

		const lines = code.split('\n')
		return (
			<div className='line-numbers select-none text-gray-500 pr-3 text-right'>
				{lines.map((_, i) => (
					<div key={i} className='line-number'>
						{i + 1}
					</div>
				))}
			</div>
		)
	}

	return (
		<div className='space-y-6 bg-slate-950 p-5 rounded-md'>
			<div className='prose dark:prose-invert max-w-none'>
				<h1 className='text-3xl font-bold text-white '>
					Code to Image Converter
				</h1>
				<p className='text-white dark:text-gray-400'>
					Convert your code snippets into beautiful images to share on social
					media or in presentations.
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
				{/* Language Selector */}
				<div className='dropdown-container'>
					<label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2'>
						Highlight language
					</label>
					<div className='relative'>
						<button
							onClick={() => toggleDropdown('language')}
							className='w-full flex items-center justify-between bg-gray-900 text-white rounded-md border border-gray-700 p-3 hover:bg-gray-800 transition-colors'
						>
							<LanguageIcon language={language} />
							<ChevronDown className='h-5 w-5 text-gray-400' />
						</button>

						{showDropdown === 'language' && (
							<div className='absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto'>
								{languageOptions.map(option => (
									<button
										key={option.value}
										className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
											language === option.value ? 'bg-gray-800' : ''
										}`}
										onClick={() => handleLanguageChange(option.value)}
									>
										<LanguageIcon language={option.value} />
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Theme Selector */}
				<div className='dropdown-container'>
					<label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2'>
						Theme
					</label>
					<div className='relative'>
						<button
							onClick={() => toggleDropdown('theme')}
							className='w-full flex items-center justify-between bg-gray-900 text-white rounded-md border border-gray-700 p-3 hover:bg-gray-800 transition-colors'
						>
							<div className='flex items-center'>
								<span className='mr-2'>🌙</span>
								<span>{themeOptions.find(t => t.value === theme)?.label}</span>
							</div>
							<ChevronDown className='h-5 w-5 text-gray-400' />
						</button>

						{showDropdown === 'theme' && (
							<div className='absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto'>
								{themeOptions.map(option => (
									<button
										key={option.value}
										className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
											theme === option.value ? 'bg-gray-800' : ''
										}`}
										onClick={() => handleThemeChange(option.value)}
									>
										{option.label}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* File Name Input */}
				<div>
					<label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2'>
						File Name
					</label>
					<input
						type='text'
						value={fileName}
						onChange={e => setFileName(e.target.value)}
						placeholder='File Name'
						className='w-full bg-gray-900 text-white rounded-md border border-gray-700 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
					/>
				</div>

				{/* Settings Button */}
				<div>
					<label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2'>
						Settings
					</label>
					<button
						className='settings-button w-full flex items-center justify-between bg-gray-900 text-white rounded-md border border-gray-700 p-3 hover:bg-gray-800 transition-colors'
						onClick={toggleSettings}
					>
						<div className='flex items-center'>
							<Settings className='h-5 w-5 mr-2' />
							<span>Settings</span>
						</div>
					</button>
				</div>

				{/* Background Type Selector */}
				<div className='dropdown-container'>
					<label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2'>
						Background type
					</label>
					<div className='relative'>
						<button
							onClick={() => toggleDropdown('backgroundType')}
							className='w-full flex items-center justify-between bg-gray-900 text-white rounded-md border border-gray-700 p-3 hover:bg-gray-800 transition-colors'
						>
							<span className='capitalize'>{backgroundType}</span>
							<ChevronDown className='h-5 w-5 text-gray-400' />
						</button>

						{showDropdown === 'backgroundType' && (
							<div className='absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg'>
								<button
									className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
										backgroundType === 'gradient' ? 'bg-gray-800' : ''
									}`}
									onClick={() => handleBackgroundTypeChange('gradient')}
								>
									Gradient
								</button>
								<button
									className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
										backgroundType === 'solid' ? 'bg-gray-800' : ''
									}`}
									onClick={() => handleBackgroundTypeChange('solid')}
								>
									Solid Color
								</button>
								<button
									className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
										backgroundType === 'image' ? 'bg-gray-800' : ''
									}`}
									onClick={() => handleBackgroundTypeChange('image')}
								>
									Image
								</button>
							</div>
						)}
					</div>
				</div>

				{/* Gradient Selector */}
				<div className='dropdown-container'>
					<label className='block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2'>
						Gradient
					</label>
					<div className='relative'>
						<button
							onClick={() => toggleDropdown('gradient')}
							className='w-full flex items-center justify-between bg-gray-900 text-white rounded-md border border-gray-700 p-3 hover:bg-gray-800 transition-colors'
						>
							<div className='flex items-center'>
								<div
									className={`w-5 h-5 rounded-full mr-2 ${
										gradientStyles[gradientType as keyof typeof gradientStyles]
									}`}
								></div>
								<span className='capitalize'>
									{gradientType.replace('-', ' ')}
								</span>
							</div>
							<ChevronDown className='h-5 w-5 text-gray-400' />
						</button>

						{showDropdown === 'gradient' && (
							<div className='absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg'>
								{Object.keys(gradientStyles).map(gradient => (
									<button
										key={gradient}
										className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${
											gradientType === gradient ? 'bg-gray-800' : ''
										}`}
										onClick={() => handleGradientChange(gradient)}
									>
										<div className='flex items-center'>
											<div
												className={`w-5 h-5 rounded-full mr-2 ${
													gradientStyles[
														gradient as keyof typeof gradientStyles
													]
												}`}
											></div>
											<span className='capitalize'>
												{gradient.replace('-', ' ')}
											</span>
										</div>
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Settings Panel */}
			{showSettings && (
				<div
					ref={settingsRef}
					className='bg-gray-900 border border-gray-700 rounded-md p-4 mb-6 shadow-lg'
				>
					<div className='flex justify-between items-center mb-4'>
						<h3 className='text-lg font-medium text-white'>Editor Settings</h3>
						<button
							onClick={() => setShowSettings(false)}
							className='text-gray-400 hover:text-white'
						>
							<X size={20} />
						</button>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						{/* Font Family */}
						<div>
							<label className='block text-sm font-medium text-gray-300 mb-2'>
								Font Family
							</label>
							<div className='relative dropdown-container'>
								<button
									onClick={() => toggleDropdown('fontFamily')}
									className='w-full flex items-center justify-between bg-gray-800 text-white rounded-md border border-gray-700 p-2 hover:bg-gray-700 transition-colors'
								>
									<span>{fontFamily}</span>
									<ChevronDown className='h-5 w-5 text-gray-400' />
								</button>

								{showDropdown === 'fontFamily' && (
									<div className='absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg'>
										{fontFamilyOptions.map(option => (
											<button
												key={option.value}
												className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
													fontFamily === option.value ? 'bg-gray-700' : ''
												}`}
												onClick={() => handleFontFamilyChange(option.value)}
											>
												{option.label}
											</button>
										))}
									</div>
								)}
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							{/* Font Size */}
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-2'>
									Font Size
								</label>
								<div className='relative dropdown-container'>
									<button
										onClick={() => toggleDropdown('fontSize')}
										className='w-full flex items-center justify-between bg-gray-800 text-white rounded-md border border-gray-700 p-2 hover:bg-gray-700 transition-colors'
									>
										<span>{fontSize}</span>
										<ChevronDown className='h-5 w-5 text-gray-400' />
									</button>

									{showDropdown === 'fontSize' && (
										<div className='absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg'>
											{fontSizeOptions.map(option => (
												<button
													key={option.value}
													className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
														fontSize === option.value ? 'bg-gray-700' : ''
													}`}
													onClick={() => handleFontSizeChange(option.value)}
												>
													{option.label}
												</button>
											))}
										</div>
									)}
								</div>
							</div>

							{/* Tab Size */}
							<div>
								<label className='block text-sm font-medium text-gray-300 mb-2'>
									Tab Size
								</label>
								<div className='relative dropdown-container'>
									<button
										onClick={() => toggleDropdown('tabSize')}
										className='w-full flex items-center justify-between bg-gray-800 text-white rounded-md border border-gray-700 p-2 hover:bg-gray-700 transition-colors'
									>
										<span>{tabSize}</span>
										<ChevronDown className='h-5 w-5 text-gray-400' />
									</button>

									{showDropdown === 'tabSize' && (
										<div className='absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg'>
											{tabSizeOptions.map(option => (
												<button
													key={option.value}
													className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
														tabSize === option.value ? 'bg-gray-700' : ''
													}`}
													onClick={() => handleTabSizeChange(option.value)}
												>
													{option.label}
												</button>
											))}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Checkboxes */}
						<div className='col-span-1 md:col-span-2 space-y-3'>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='lineNumbers'
									checked={showLineNumbers}
									onChange={() => setShowLineNumbers(!showLineNumbers)}
									className='h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500'
								/>
								<label
									htmlFor='lineNumbers'
									className='ml-2 block text-sm text-gray-300'
								>
									Line numbers
								</label>
							</div>

							<div className='flex items-center'>
								<input
									type='checkbox'
									id='foldGutter'
									checked={showFoldGutter}
									onChange={() => setShowFoldGutter(!showFoldGutter)}
									className='h-4 w-4 rounded border-gray-700 text-blue-600 focus:ring-blue-500'
								/>
								<label
									htmlFor='foldGutter'
									className='ml-2 block text-sm text-gray-300'
								>
									Fold gutter
								</label>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='flex justify-between items-center mb-4'>
				<div className='flex items-center'>
					{isCodeValid ? (
						<div className='flex items-center text-green-500'>
							<Check className='h-5 w-5 mr-1' />
							<span>Valid code</span>
						</div>
					) : (
						<div className='flex items-center text-red-500'>
							<AlertCircle className='h-5 w-5 mr-1' />
							<span>{validationMessage || 'Invalid code'}</span>
						</div>
					)}
				</div>
				<button
					onClick={handleDownload}
					className='flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow transition-colors'
				>
					Download JPG
					<Download className='ml-2 h-5 w-5' />
				</button>
			</div>

			<div
				className={`p-8 rounded-lg ${
					gradientStyles[gradientType as keyof typeof gradientStyles]
				}`}
			>
				<div
					ref={editorRef}
					className='bg-gray-800 rounded-lg overflow-hidden shadow-lg'
				>
					<div className='flex items-center px-4 py-2 bg-gray-900'>
						<div className='flex space-x-2'>
							<div className='w-3 h-3 bg-red-500 rounded-full'></div>
							<div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
							<div className='w-3 h-3 bg-green-500 rounded-full'></div>
						</div>
						{fileName && (
							<div className='ml-4 text-gray-400 text-sm'>{fileName}</div>
						)}
					</div>
					<div className='relative' onClick={handleCodeContainerClick}>
						{/* Hidden textarea for editing */}
						<textarea
							ref={textareaRef}
							value={code}
							onChange={handleCodeChange}
							onSelect={handleSelect}
							className='absolute inset-0 w-full h-full opacity-0 p-4 font-mono resize-none'
							style={{ zIndex: 10 }}
							spellCheck='false'
							rows={10}
						/>
						{/* Visible syntax highlighted code */}
						<div className='flex'>
							{getLineNumbers()}
							<pre
								ref={codeContainerRef}
								className={`p-4 m-0 overflow-auto flex-1 ${
									themeStyles[theme as keyof typeof themeStyles] || ''
								}`}
								style={{
									minHeight: '300px',
									fontFamily: fontFamily,
									fontSize: fontSize,
									tabSize:
										tabSize === 'Tab'
											? 8
											: Number.parseInt(tabSize.split(' ')[0]),
								}}
							>
								<code
									className={`language-${language}`}
									dangerouslySetInnerHTML={{ __html: highlightedCode }}
								/>
							</pre>
							{showFoldGutter && (
								<div className='fold-gutter w-4 bg-gray-900 border-l border-gray-700'></div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
