import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Container, Stack } from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import PageContent from '../../../components/pageContent';
import StarIcon from '@mui/icons-material/Star';
import { broakerPercentage } from '../../../Data';
import { useGetAllBroakers } from '../hooks/get';

// eslint-disable-next-line react/prop-types
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

const percentageColorMapping = {
	'30%': 'red',
	'25%': 'orange',
	'20%': 'yellow',
	'15%': 'green',
	'10%': 'white',
};

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
	{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
	{ field: 'email', headerName: 'Email', flex: 1, minWidth: 50 },
	{ field: 'address', headerName: 'Address', flex: 1, minWidth: 50 },
	{ field: 'phone', headerName: 'Phone Number', flex: 1, minWidth: 50 },
	{
		field: 'percentage',
		headerName: 'Percentage',
		flex: 1,
		minWidth: 100,
		renderCell: (params) => (
			<Box
				sx={{
					color: percentageColorMapping[params.value] || 'black',
				}}>
				{broakerPercentage.find((option) => option.value === params.value)
					?.label || params.value}
			</Box>
		),
	},
	{
		field: 'rate',
		headerName: 'Rate',
		flex: 1,
		minWidth: 150,
		renderCell: (params) => <StarRating value={params.value} />,
	},
];

const AllBroakers = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const { data } = useGetAllBroakers();

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
							Insurance Companies Broakers
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

export default AllBroakers;
