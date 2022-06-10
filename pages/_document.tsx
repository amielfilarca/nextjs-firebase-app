import Document, {
	DocumentContext,
	DocumentProps,
	Head,
	Html,
	Main,
	NextScript
} from 'next/document'
import createEmotionCache from '../styles/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'
import { ReactNode } from 'react'

interface IDocumentProps extends DocumentProps {
	emotionStyleTags: ReactNode
}

const MyDocument = ({ emotionStyleTags }: IDocumentProps) => {
	return (
		<Html>
			<Head>{emotionStyleTags}</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx: DocumentContext) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	const originalRenderPage = ctx.renderPage

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App: any) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />
				}
		})

	const initialProps = await Document.getInitialProps(ctx)
	// This is important. It prevents emotion to render invalid HTML.
	// See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map(style => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return { ...initialProps, emotionStyleTags }
}

export default Document