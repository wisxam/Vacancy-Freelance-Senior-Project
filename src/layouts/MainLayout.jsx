import * as React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Topbar, Sidebar, ScrollToTop } from '../components';
import { tokens } from '../theme';
import { Outlet } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const [mode, setMode] = React.useState(
		localStorage.getItem('currentMode')
			? localStorage.getItem('currentMode')
			: 'light'
	);
	const theme = React.useMemo(() => createTheme(tokens(mode)), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<Topbar
					open={open}
					handleDrawerOpen={handleDrawerOpen}
					setMode={setMode}
				/>

				<Sidebar
					open={open}
					handleDrawerClose={handleDrawerClose}
				/>
				<Box
					component='main'
					sx={{
						flexGrow: 1,
						p: 3,
						width: { xs: '100%', sm: `calc(100% - ${open ? 240 : 0}px)` },
						transition: theme.transitions.create(['margin', 'width'], {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
					}}>
					<DrawerHeader />
					<ScrollToTop />
					<Outlet />
				</Box>
			</Box>
		</ThemeProvider>
	);
}
