import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Container, Stack } from '@mui/material';
import { useGetAllBusses } from '../hooks/get';
import useAuthUser from '../../../utils/AuthUser';
import PageContent from '../../../components/pageContent';

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
	{
		field: 'image',
		headerName: 'Image',
		flex: 1,
		minWidth: 100,
		renderCell: (params) => (
			<Box
				component='img'
				src={params.value}
				alt={params.row.make + ' ' + params.row.model}
				sx={{ width: '50px', height: '50px', objectFit: 'cover' }}
			/>
		),
	},
	{ field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
	{
		field: 'license_plate',
		headerName: 'License Plate',
		flex: 1,
		minWidth: 100,
	},
	{ field: 'capacity', headerName: 'Capacity', flex: 1, minWidth: 100 },
	{ field: 'make', headerName: 'Manufacturer', flex: 1, minWidth: 50 },
	{ field: 'model', headerName: 'Model', flex: 1, minWidth: 50 },
	{ field: 'year', headerName: 'Year', flex: 1, minWidth: 50 },
];

const AllBusses = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

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

	const { data } = useGetAllBusses();

	useEffect(() => {
		const handleResize = () => {
			setResizeKey((prevKey) => prevKey + 1);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '120%',
				width: '100%',
			}}>
			<Box sx={{ flexGrow: 1 }}>
				<PageContent height={'120%'}>
					<Container maxWidth='lg'>
						<Stack spacing={3}>
							<label>
								<Typography
									color={'cyan'}
									variant='h3'>
									{userData?.company?.name}
								</Typography>
								Transportation Companies Busses
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
		</Box>
	);
};

export default AllBusses;
