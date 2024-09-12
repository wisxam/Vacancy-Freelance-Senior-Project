/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
	Box,
	Typography,
	Container,
	Stack,
	Snackbar,
	Alert,
} from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import { useGetAllEmployees } from '../hooks/get';
import PageContent from '../../../components/pageContent';
import StarIcon from '@mui/icons-material/Star';

const StarRating = ({ value }) => {
	return (
		<div>
			{[...Array(5)].map((_, index) => (
				<StarIcon
					key={index}
					style={{ color: index < value ? '#FFD700' : '#C0C0C0' }}
				/>
			))}
		</div>
	);
};

const AllEmployeesTable = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const { data } = useGetAllEmployees();

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
		{ field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
		{ field: 'date', headerName: 'Birth Date', flex: 1, minWidth: 100 },
		{ field: 'email', headerName: 'Email', flex: 1, minWidth: 50 },
		{ field: 'created_at', headerName: 'Joined On', flex: 1, minWidth: 50 },
		{ field: 'address', headerName: 'Address', flex: 1, minWidth: 50 },
		{ field: 'type', headerName: 'Type', flex: 1, minWidth: 50 },
		{
			field: 'cv',
			headerName: 'CV/Resume',
			flex: 1,
			minWidth: 50,
			renderCell: (params) => <LinkToCV value={params.value} />,
		},
		{
			field: 'phone_number',
			headerName: 'Phone Number',
			flex: 1,
			minWidth: 50,
		},
		{
			field: 'rate',
			headerName: 'Rate',
			flex: 1,
			minWidth: 150,
			renderCell: (params) => <StarRating value={params.value} />,
		},
	];

	const LinkToCV = ({ value }) => {
		const handleClick = () => {
			if (value.toLowerCase().endsWith('.pdf')) {
				window.open(value, '_blank');
			} else {
				setOpenSnackbar(true);
			}
		};

		return (
			<div
				style={{ cursor: 'pointer' }}
				onClick={handleClick}>
				View CV
			</div>
		);
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
		const handleResize = () => {
			setResizeKey((prevKey) => prevKey + 1);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '120%',
			}}>
			<PageContent height={'90%'}>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						<label>
							<Typography
								color={'cyan'}
								variant='h3'>
								{userData?.company?.name}
							</Typography>
							All Employees
						</label>
						<Box sx={{ width: '100%', flexGrow: 1, display: 'flex' }}>
							<DataGrid
								key={resizeKey}
								rows={data?.data || []}
								columns={columns}
								slots={{ toolbar: GridToolbar }}
								autoHeight={true}
								autoPageSize={false}
								pageSize={25}
								rowsPerPageOptions={[25]}
								pagination
							/>
						</Box>
					</Stack>
				</Container>
			</PageContent>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message='Error: Not a PDF CV'>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'
					sx={{ width: '100%' }}>
					حدث خطأ ما, حاول مجددا
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AllEmployeesTable;
