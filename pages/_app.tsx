import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material'
import theme from '../styles/theme'
import createEmotionCache from '../styles/createEmotionCache'
import { CacheProvider } from '@emotion/react'
import Head from 'next/head'

const clientSideEmotionCache = createEmotionCache()

interface IAppProps extends AppProps {
	emotionCache?: typeof clientSideEmotionCache
}

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps
}: IAppProps) {
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	)
}

export default MyApp
