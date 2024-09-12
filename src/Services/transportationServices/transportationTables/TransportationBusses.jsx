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
} from '@mui/material';
import { useGetBussesTable } from '../hooks/get';
import useAuthUser from '../../../utils/AuthUser';
import { usePutBussesTableFormById } from '../hooks/put';
import { useDeleteBusById } from '../hooks/delete';
import { MenuItem } from '@mui/material';
import PageContent from '../../../components/pageContent';
import { busStatus } from '../../../Data';
import { busManufacturers } from '../../../Data';

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

const TransportationBuses = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateBus } = usePutBussesTableFormById();
	const { mutate: deleteBus } = useDeleteBusById();

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

	const { data } = useGetBussesTable(userData?.company?.id);

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedRow(null);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};

	const handleRowClick = (params) => {
		setSelectedRow(params.row);
		setOpen(true);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const updatedBusData = {
			status: selectedRow.status,
			license_plate: selectedRow.license_plate,
			capacity: selectedRow.capacity,
			make: selectedRow.make,
			model: selectedRow.model,
			image: selectedRow.image,
			year: selectedRow.year,
		};

		updateBus(
			{ id: selectedRow.id, data: updatedBusData },
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSelectedRow((prev) => ({ ...prev, [name]: value }));
	};

	const handleDelete = () => {
		setConfirmOpen(true);
	};

	const handleDeleteConfirm = () => {
		deleteBus(
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
								Transportation Company Busses
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
									onCellClick={handleRowClick}
								/>
							</Box>
						</Stack>
					</Container>
				</PageContent>
			</Box>

			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Edit Bus Details</DialogTitle>
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
					<Typography>Are you sure you want to delete this bus?</Typography>
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

export default TransportationBuses;
