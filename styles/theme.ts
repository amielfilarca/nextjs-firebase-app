import { createTheme } from '@mui/material'

declare module '@mui/material/styles' {
	interface Theme {}
	interface ThemeOptions {}
}

const theme = createTheme({})

export default theme
