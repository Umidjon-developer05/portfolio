import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Helmet, HelmetProvider } from '@dr.pogodin/react-helmet'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<HelmetProvider>
			<Helmet>
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
