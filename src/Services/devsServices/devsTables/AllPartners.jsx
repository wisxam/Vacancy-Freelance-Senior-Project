import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Container, Stack } from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import PageContent from '../../../components/pageContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useGetAllPartner } from '../hooks/get';

const getIconForStatus = (status) => {
	switch (status) {
		case 'ساري':
			return <CheckCircleIcon />;
		case 'منتهي':
			return <HighlightOffIcon />;
		case 'معلق':
			return <HourglassEmptyIcon />;
		case 'ملغي':
			return <CancelIcon />;
		case 'مؤجل':
			return <ScheduleIcon />;
		case 'مكتمل':
			return <CheckCircleOutlineIcon />;
		default:
			return null;
	}
};

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
	{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
	{
		field: 'type',
		headerName: 'Type',
		flex: 1,
		minWidth: 100,
	},
	{ field: 'Certificate', headerName: 'Certificate', flex: 1, minWidth: 100 },
	{
		field: 'specialization',
		headerName: 'Specialization',
		flex: 1,
		minWidth: 50,
	},
	{ field: 'email', headerName: 'Email', flex: 1, minWidth: 50 },
	{ field: 'phone', headerName: 'Phone', flex: 1, minWidth: 50 },
	{
		field: 'contract_status',
		headerName: 'Contract status',
		flex: 1,
		minWidth: 50,
		renderCell: (params) => {
			const status = params.row.contract_status;
			const icon = getIconForStatus(status);
			return <div>{icon}</div>;
		},
	},
];

const AllPartners = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const { data } = useGetAllPartner();

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
								Insurance Company Partners
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

export default AllPartners;
