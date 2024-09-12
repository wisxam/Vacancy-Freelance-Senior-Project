import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Stack } from '@mui/system';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { LightModeOutlined } from '@mui/icons-material';
import Menubutton from './Menubutton';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: 'black',
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		backgroundColor: 'black',
	}),
}));

// eslint-disable-next-line react/prop-types
const Topbar = ({ open, handleDrawerOpen, setMode }) => {
	const theme = useTheme();
	return (
		<AppBar
			position='fixed'
			open={open}>
			<Toolbar>
				<IconButton
					color='inherit'
					onClick={handleDrawerOpen}
					edge='start'
					sx={{
						marginRight: 5,
						...(open && { display: 'none' }),
					}}>
					<MenuIcon />
				</IconButton>
				<Box flexGrow={1} />
				<Stack
					direction={'row'}
					spacing={2}>
					{theme.palette.mode === 'light' ? (
						<IconButton
							color='inherit'
							onClick={() => {
								localStorage.setItem(
									'currentMode',
									theme.palette.mode === 'light' ? 'dark' : 'light'
								);
								setMode((prevMode) =>
									prevMode === 'light' ? 'dark' : 'light'
								);
							}}>
							<LightModeOutlined />
						</IconButton>
					) : (
						<IconButton
							color='inherit'
							onClick={() => {
								localStorage.setItem(
									'currentMode',
									theme.palette.mode === 'light' ? 'dark' : 'light'
								);
								setMode((prevMode) =>
									prevMode === 'light' ? 'dark' : 'light'
								);
							}}>
							<DarkModeOutlinedIcon />
						</IconButton>
					)}
					<Menubutton />
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Topbar;
