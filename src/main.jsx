import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter.jsx';
import { GlobalStyles, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme, globalStyles } from './styles/globalStyles.js';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<GlobalStyles styles={globalStyles} />
		<AppRouter />
	</ThemeProvider>
);
