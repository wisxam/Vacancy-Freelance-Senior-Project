import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const globalStyles = {
	'*::-webkit-scrollbar': {
		width: '8px',
		height: '8px',
	},
	'*::-webkit-scrollbar-track': {
		background: theme.palette.grey[800],
	},
	'*::-webkit-scrollbar-thumb': {
		backgroundColor: theme.palette.grey[600],
		borderRadius: '4px',
	},
	'*::-webkit-scrollbar-thumb:hover': {
		backgroundColor: theme.palette.grey[500],
	},
};

export { globalStyles, theme };
