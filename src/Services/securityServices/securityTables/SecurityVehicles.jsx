import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
	Box,
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Snackbar,
	Alert,
	Typography,
	Container,
	Stack,
	MenuItem,
} from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import { usePutSecurityVehicles } from '../hooks/put';
import { useGetSecurityVehicles } from '../hooks/get';
import PageContent from '../../../components/pageContent';
import { useDeleteSecurityVehicles } from '../hooks/delete';
import { busManufacturers, busStatus, securityVehicles } from '../../../Data';

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
	{ field: 'type', headerName: 'Type', flex: 1, minWidth: 50 },
	{ field: 'year', headerName: 'Year', flex: 1, minWidth: 50 },
];

const SecurityVehicles = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateVehicle } = usePutSecurityVehicles();
	const { mutate: deleteVehicle } = useDeleteSecurityVehicles();

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

	const { data } = useGetSecurityVehicles(userData?.company?.id);

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedRow(null);
	};

	const handleRowClick = (params) => {
		setSelectedRow(params.row);
		setOpen(true);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const updateVehicles = {
			status: selectedRow.status,
			license_plate: selectedRow.license_plate,
			capacity: selectedRow.capacity,
			make: selectedRow.make,
			model: selectedRow.model,
			image: selectedRow.image,
			year: selectedRow.year,
			type: selectedRow.type,
		};

		updateVehicle(
			{ id: selectedRow.id, data: updateVehicles },
			{
				onSuccess: () => {
					setSnackbarOpenSuccess(true);
					handleClose();
				},
				onError: (error) => {
					console.log(updateVehicles);
					console.error('Error updating data:', error);
					setSnackbarOpenFailed(true);
					handleClose();
				},
			}
		);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSelectedRow((prev) => ({ ...prev, [name]: value }));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const url = e.target.value;
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const convertedLink = reader.result;
				setSelectedRow((prev) => ({ ...prev, image: convertedLink }));
			};
			reader.readAsDataURL(file);
		} else if (url) {
			setSelectedRow((prev) => ({ ...prev, image: url }));
		}
	};

	const handleDelete = () => {
		setConfirmOpen(true);
	};

	const handleDeleteConfirm = () => {
		deleteVehicle(
			{ id: selectedRow.id },
			{
				onSuccess: () => {
					setSnackbarOpenSuccess(true);
					handleClose();
					setConfirmOpen(false);
				},
				onError: (error) => {
					console.error('Error updating data:', error);
					setSnackbarOpenFailed(true);
					handleClose();
				},
			}
		);
	};
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
							Security Company Vehicles
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
								onCellClick={handleRowClick}
							/>
						</Box>
					</Stack>
				</Container>
			</PageContent>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>
					<Typography
						variant='h4'
						sx={{ fontFamily: '-moz-initial' }}>
						Update Weapon
					</Typography>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleFormSubmit}>
						{selectedRow && (
							<>
								<input
									accept='image/*'
									style={{ display: 'none' }}
									id='contained-button-file'
									type='file'
									name='image'
									onChange={handleImageChange}
								/>
								<label htmlFor='contained-button-file'>
									<Button
										variant='contained'
										component='span'
										color='primary'>
										Upload Image
									</Button>
								</label>
								{selectedRow?.image && (
									<Box
										component='img'
										src={selectedRow.image}
										alt='Selected Weapon'
										sx={{ width: '100%', marginTop: 2 }}
									/>
								)}
								<TextField
									margin='dense'
									name='status'
									label='Status'
									select
									fullWidth
									value={selectedRow?.status || ''}
									onChange={handleInputChange}>
									{busStatus.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='license_plate'
									label='License Plate'
									type='text'
									fullWidth
									value={selectedRow.license_plate || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='capacity'
									label='Capacity'
									type='number'
									fullWidth
									value={selectedRow.capacity || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='type'
									label='Type'
									select
									fullWidth
									value={selectedRow.type || ''}
									onChange={handleInputChange}>
									{securityVehicles.map((option) => {
										return (
											<MenuItem
												key={option.value}
												value={option.label}>
												{option.label}
											</MenuItem>
										);
									})}
								</TextField>
								<TextField
									margin='dense'
									name='make'
									label='Manufacturer'
									select
									fullWidth
									value={selectedRow?.make || ''}
									onChange={handleInputChange}>
									{busManufacturers.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='model'
									label='Model'
									type='text'
									fullWidth
									value={selectedRow.model || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='year'
									label='Year'
									type='text'
									fullWidth
									value={selectedRow.year || ''}
									onChange={handleInputChange}
								/>
							</>
						)}
						<DialogActions>
							<Button
								onClick={handleDelete}
								color='error'
								variant='contained'>
								Delete
							</Button>
							<Button
								onClick={handleClose}
								color='primary'>
								Cancel
							</Button>
							<Button
								type='submit'
								color='primary'>
								Save
							</Button>
						</DialogActions>
					</form>
				</DialogContent>
			</Dialog>
			<Dialog
				open={confirmOpen}
				onClose={() => setConfirmOpen(false)}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<Typography>
						هل تريد ان تمسح هذا السلاح من قاعدة البيانات نهائيا؟
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setConfirmOpen(false)}
						color='secondary'>
						No
					</Button>
					<Button
						onClick={handleDeleteConfirm}
						color='secondary'>
						Yes
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={snackbarOpenSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'
					sx={{ width: '100%' }}>
					تمت العملية بنجاح
				</Alert>
			</Snackbar>
			<Snackbar
				open={snackbarOpenFailed}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarFailed}>
				<Alert
					onClose={handleCloseSnackbarFailed}
					severity='error'
					sx={{ width: '100%' }}>
					حدث خطأ ما, حاول مجددا
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default SecurityVehicles;
