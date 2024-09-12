import { useEffect, useState } from 'react';
import {
	IconButton,
	Menu,
	MenuItem,
	Avatar,
	Typography,
	Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '../utils/AuthUser';
import { Link } from 'react-router-dom';

const UserMenu = () => {
	const { getUser, http } = useAuthUser();
	const [anchorEl, setAnchorEl] = useState(null);
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const handleOpenMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleCloseMenu = () => {
		setAnchorEl(null);
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

	if (!userData) {
		return (
			<Link to='log-in'>
				<Button>Sign in</Button>
			</Link>
		);
	}

	const logout = async () => {
		try {
			const token = sessionStorage.getItem('token');
			if (!token) {
				throw new Error('No token found in sessionStorage');
			}
			await http.post(`auth/logout?token=${token.replace(/^"|"$/g, '')}`);
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('user');
			setUserData(null);
			navigate('/');
		} catch (error) {
			console.error('Error logging out:', error);
		}
	};
	return (
		<>
			<IconButton onClick={handleOpenMenu}>
				<Avatar
					alt={userData.name}
					src='/static/images/avatar/1.jpg'
				/>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}>
				<Link to='/user-profile'>
					<MenuItem>
						<Typography variant='subtitle1'>{userData.name}</Typography>
					</MenuItem>
				</Link>
				<MenuItem onClick={logout}>Logout</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;
