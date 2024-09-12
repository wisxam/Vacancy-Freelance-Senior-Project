import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Container, Stack } from '@mui/material';

import PageContent from '../../../components/pageContent';
import { useGetAllRoutes } from '../hooks/get';
import useAuthUser from '../../../utils/AuthUser';

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
	{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
	{
		field: 'type',
		headerName: 'Type',
		flex: 1,
		minWidth: 100,
	},
	{ field: 'Starting', headerName: 'Starting', flex: 1, minWidth: 100 },
	{
		field: 'start_location',
		headerName: 'start location',
		flex: 1,
		minWidth: 50,
	},
	{ field: 'end_location', headerName: 'end location', flex: 1, minWidth: 50 },
	{ field: 'distance', headerName: 'Distance', flex: 1, minWidth: 50 },
	{ field: 'duration', headerName: 'Duration', flex: 1, minWidth: 50 },
	{ field: 'checkpoints', headerName: 'Checkpoints', flex: 1, minWidth: 50 },
];

const AllRoutes = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [userData, setUserData] = useState(null);
	const { getUser } = useAuthUser();
	const { data } = useGetAllRoutes();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUser();
				setUserData(user);
			} catch (error) {
				console.log('Error fetching using data', error);
			}
		};
		fetchData;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setResizeKey((prevKey) => prevKey + 1);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

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

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '120%',
				width: '100%',
			}}>
			<PageContent height={'120%'}>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						<label>
							<Typography
								color={'cyan'}
								variant='h3'>
								{userData?.company?.name}
							</Typography>
							Transportation Companies Routes
						</label>
						<Box sx={{ flexGrow: 1, display: 'flex' }}>
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
		</Box>
	);
};

export default AllRoutes;
