import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Avatar, Collapse, GlobalStyles, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthUser from '../utils/AuthUser';
import { useEffect, useState } from 'react';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import FeedIcon from '@mui/icons-material/Feed';
import {
	transportationAO,
	securityAO,
	cleaningAO,
	insuranceAO,
	adminAO,
	HomeIcon,
	DirectionsBusIcon,
	BadgeOutlinedIcon,
	CalendarMonthIcon,
	InsertDriveFileIcon,
	PieChartOutlineIcon,
	AccountBoxIcon,
	CrisisAlertIcon,
	HomeRepairServiceIcon,
	StoreIcon,
	PeopleOutlined,
	DirectionsOutlinedIcon,
	GroupsIcon,
	ConstructionIcon,
} from '../routes/sidebarItems';

const iconMap = {
	HomeIcon: <HomeIcon />,
	DirectionsBusIcon: <DirectionsBusIcon />,
	BadgeOutlinedIcon: <BadgeOutlinedIcon />,
	CalendarMonthIcon: <CalendarMonthIcon />,
	InsertDriveFileIcon: <InsertDriveFileIcon />,
	PieChartOutlineIcon: <PieChartOutlineIcon />,
	AccountBoxIcon: <AccountBoxIcon />,
	CrisisAlertIcon: <CrisisAlertIcon />,
	HomeRepairServiceIcon: <HomeRepairServiceIcon />,
	StoreIcon: <StoreIcon />,
	PeopleOutlined: <PeopleOutlined />,
	DirectionsOutlinedIcon: <DirectionsOutlinedIcon />,
	GroupsIcon: <GroupsIcon />,
	ConstructionIcon: <ConstructionIcon />,
};

const allSideBar = [
	{
		type: 'Transportation',
		items: transportationAO.map((item) => ({
			...item,
			icon: iconMap[item.icon],
		})),
	},
	{
		type: 'Security',
		items: securityAO.map((item) => ({ ...item, icon: iconMap[item.icon] })),
	},
	{
		type: 'Cleaning',
		items: cleaningAO.map((item) => ({ ...item, icon: iconMap[item.icon] })),
	},
	{
		type: 'Insurance',
		items: insuranceAO.map((item) => ({ ...item, icon: iconMap[item.icon] })),
	},
	{
		type: 'Admin',
		items: adminAO.map((item) => ({ ...item, icon: iconMap[item.icon] })),
	},
];

const findSidebarItems = (type) => {
	const sidebar = allSideBar.find((item) => item.type === type);
	return sidebar ? sidebar.items : [];
};

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
	// @ts-ignore
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

// eslint-disable-next-line react/prop-types
const Sidebar = ({ open, handleDrawerClose }) => {
	const [tablesOpen, setTablesOpen] = useState(false);
	const [formsOpen, setFormsOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();
	const theme = useTheme();

	const sidebarItems = userData ? findSidebarItems(userData.company?.type) : [];

	const handleTablesClick = () => {
		setTablesOpen(!tablesOpen);
	};

	const handleFormsClick = () => {
		setFormsOpen(!formsOpen);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUser();
				setUserData(user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!open) {
			setTablesOpen(false);
			setFormsOpen(false);
		}
	}, [open]);
	return (
		<>
			<GlobalStyles
				styles={{
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
				}}
			/>
			<Drawer
				align='center'
				variant='permanent'
				open={open}>
				<DrawerHeader sx={{}}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Avatar
					sx={{
						mx: 'auto',
						width: open ? 88 : 44,
						height: open ? 88 : 44,
						my: 1,
						border: '2px solid grey',
						transition: '0.25s',
					}}
					alt='Wisam'
					src={userData?.company?.company_picture}
				/>
				<Typography
					align='center'
					sx={{ fontSize: open ? 15 : 0, transition: '0.25s' }}>
					{userData?.company?.name}
				</Typography>
				<Typography
					sx={{
						fontSize: open ? 17 : 0,
						color: theme.palette.info.main,
						transition: '0.25s',
					}}>
					{userData?.company?.type}
				</Typography>
				<List>
					{sidebarItems
						.filter(
							(item) =>
								!item.path.includes('-form') && !item.path.includes('-table')
						)
						.map((item) => (
							<ListItem
								key={item.name}
								disablePadding
								sx={{ display: 'block' }}>
								<ListItemButton
									onClick={() => navigate(item.path)}
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
										bgcolor:
											location.pathname === item.path
												? theme.palette.mode === 'dark'
													? theme.palette.grey[700]
													: theme.palette.grey[400]
												: null,
									}}>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}>
										{item.icon}
									</ListItemIcon>
									<ListItemText
										primary={item.name}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					<Divider />
					<ListItemButton onClick={handleTablesClick}>
						<ListItemIcon>
							<BackupTableIcon />
						</ListItemIcon>
						<ListItemText primary='Tables' />
						{tablesOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse
						in={tablesOpen}
						timeout='auto'
						unmountOnExit>
						<List
							component='div'
							disablePadding>
							{sidebarItems
								.filter((item) => item.path.includes('-table'))
								.map((item) => (
									<ListItem
										key={item.name}
										disablePadding
										sx={{ display: 'block' }}>
										<ListItemButton
											onClick={() => navigate(item.path)}
											sx={{
												minHeight: 48,
												justifyContent: open ? 'initial' : 'center',
												px: 2.5,
												bgcolor:
													location.pathname === item.path
														? theme.palette.mode === 'dark'
															? theme.palette.grey[700]
															: theme.palette.grey[400]
														: null,
											}}>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: open ? 3 : 'auto',
													justifyContent: 'center',
												}}>
												{item.icon}
											</ListItemIcon>
											<ListItemText
												primary={item.name}
												sx={{ opacity: open ? 1 : 0 }}
											/>
										</ListItemButton>
									</ListItem>
								))}
						</List>
					</Collapse>
					<Divider />
					<ListItemButton onClick={handleFormsClick}>
						<ListItemIcon>
							<FeedIcon />
						</ListItemIcon>
						<ListItemText primary='Forms' />
						{formsOpen ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse
						in={formsOpen}
						timeout='auto'
						unmountOnExit>
						<List
							component='div'
							disablePadding>
							{sidebarItems
								.filter((item) => item.path.includes('-form'))
								.map((item) => (
									<ListItem
										key={item.name}
										disablePadding
										sx={{ display: 'block' }}>
										<ListItemButton
											onClick={() => navigate(item.path)}
											sx={{
												minHeight: 48,
												justifyContent: open ? 'initial' : 'center',
												px: 2.5,
												bgcolor:
													location.pathname === item.path
														? theme.palette.mode === 'dark'
															? theme.palette.grey[700]
															: theme.palette.grey[400]
														: null,
											}}>
											<ListItemIcon
												sx={{
													minWidth: 0,
													mr: open ? 3 : 'auto',
													justifyContent: 'center',
												}}>
												{item.icon}
											</ListItemIcon>
											<ListItemText
												primary={item.name}
												sx={{ opacity: open ? 1 : 0 }}
											/>
										</ListItemButton>
									</ListItem>
								))}
						</List>
					</Collapse>
				</List>
			</Drawer>
		</>
	);
};

export default Sidebar;
