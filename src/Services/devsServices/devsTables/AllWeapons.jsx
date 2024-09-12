import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Typography, Container, Stack } from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import { useGetAllWeapon } from '../hooks/get';
import PageContent from '../../../components/pageContent';
import { weaponConditions } from '../../../Data';

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
	{ field: 'Wepon_Name', headerName: 'Weapon Name', flex: 1, minWidth: 100 },
	{
		field: 'Wepon_Number',
		headerName: 'Serial Number',
		flex: 1,
		minWidth: 100,
	},
	{
		field: 'Wepon_Type',
		headerName: 'Wepon Type',
		flex: 1,
		minWidth: 100,
	},
	{
		field: 'Wepon_Category',
		headerName: 'Wepon Category',
		flex: 1,
		minWidth: 100,
	},
	{
		field: 'Acquisition_Date',
		headerName: 'Acquisition Date',
		flex: 1,
		minWidth: 50,
	},
	{
		field: 'rarity',
		headerName: 'Condition',
		flex: 1,
		minWidth: 50,
		renderCell: (params) => {
			const condition = weaponConditions.find(
				(cond) => cond.name === params.value
			);
			return (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
					}}>
					<Typography style={{ color: condition?.color }}>
						{condition?.name}
					</Typography>
				</Box>
			);
		},
	},
];

const AllWeapons = () => {
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

	const { data } = useGetAllWeapon();

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
								variant='h4'>
								{userData?.company?.name}
							</Typography>
							Security Companines Weapons
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

export default AllWeapons;
