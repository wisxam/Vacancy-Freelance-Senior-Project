import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Container, Stack } from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import { useGetAllReinsurers } from '../hooks/get';
import PageContent from '../../../components/pageContent';

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
	{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
	{
		field: 'address',
		headerName: 'Address',
		flex: 1,
		minWidth: 100,
	},
	{ field: 'reinsurer_type', headerName: 'Reinsurer', flex: 1, minWidth: 100 },
	{ field: 'email', headerName: 'Email', flex: 1, minWidth: 50 },
	{ field: 'phone', headerName: 'Phone', flex: 1, minWidth: 50 },
	{ field: 'fax', headerName: 'Fax', flex: 1, minWidth: 50 },
];

const AllReinsurers = () => {
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

	const { data } = useGetAllReinsurers();

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
							{userData?.company?.type} Company Reinsurers
						</label>
						<Box
							sx={{
								width: '100%',
								flexGrow: 1,
								display: 'flex',
							}}>
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

export default AllReinsurers;
