import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<Helmet link={[{ rel: 'icon', type: 'image/svg+xml', href: '/' }]}>
				<title>Umidjon Portfolio | Full Stack Developer</title>
				<meta
					name='description'
					content='Umidjon Portfolio - Full Stack Developer. Next.js, React va boshqa texnologiyalar bo‘yicha ishlarimni ko‘rib chiqishingiz mumkin.'
				/>
				<meta
					name='keywords'
					content='Umidjon Portfolio, Full Stack Developer, Next.js, React, Web Developer, JavaScript, Frontend, Backend, Portfolio'
				/>
				<meta name='author' content='Umidjon' />

				<meta name='twitter:card' content='summary_large_image' />
				<meta
					name='twitter:title'
					content='Umidjon Portfolio | Full Stack Developer'
				/>
				<meta
					name='twitter:description'
					content='Umidjon Portfolio - Full Stack Developer. Next.js, React va boshqa texnologiyalar bo‘yicha ishlarimni ko‘rib chiqishingiz mumkin.'
				/>
				<meta
					name='twitter:image'
					content='https://www.umidjon.site/umidjonlogo.jpg'
				/>
				<meta
					property='og:title'
					content='Umidjon Portfolio | Full Stack Developer'
				/>
				<meta
					property='og:description'
					content='Umidjon Portfolio - Full Stack Developer. Next.js, React va boshqa texnologiyalar bo‘yicha ishlarimni ko‘rib chiqishingiz mumkin.'
				/>
				<meta
					property='og:image'
					content='https://www.umidjon.site/umidjonlogo.jpg'
				/>
				<meta property='og:url' content='https://www.umidjon.site' />
				<meta property='og:type' content='website' />
			</Helmet>
			<App />
		</HelmetProvider>
	</StrictMode>
)
