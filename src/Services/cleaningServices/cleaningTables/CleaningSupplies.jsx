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
import { useGetCleaningEquipment } from '../hooks/get';
import useAuthUser from '../../../utils/AuthUser';
import { usePutCleaningEquipment } from '../hooks/put';
import { useDeleteCleaningEquipment } from '../hooks/delete';
import { MenuItem } from '@mui/material';
import PageContent from '../../../components/pageContent';
import {
	cleaningEquipments,
	cleaningCompaniesManufacturers,
} from '../../../Data';
import { cleaningEquipmentStatuses } from '../../../Data';

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
	{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
	{
		field: 'type',
		headerName: 'Type',
		flex: 1,
		minWidth: 100,
	},
	{ field: 'manufacturare', headerName: 'Manufacturer', flex: 1, minWidth: 50 },
	{ field: 'status', headerName: 'Status', flex: 1, minWidth: 50 },
	{ field: 'situation', headerName: 'Situation', flex: 1, minWidth: 50 },
	{ field: 'date', headerName: 'Date Of Acquire', flex: 1, minWidth: 50 },
];

const CleaningSupplies = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateEquipment } = usePutCleaningEquipment();
	const { mutate: deleteEquipment } = useDeleteCleaningEquipment();

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

	const { data } = useGetCleaningEquipment(userData?.company?.id);

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

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const updateEquipmentData = {
			status: selectedRow.status,
			name: selectedRow.name,
			type: selectedRow.type,
			quantity: selectedRow.quantity,
			image: selectedRow.image,
			situation: selectedRow.situation,
			manufacturare: selectedRow.manufacturare,
			date: selectedRow.date,
		};

		updateEquipment(
			{ id: selectedRow.id, data: updateEquipmentData },
			{
				onSuccess: () => {
					setSnackbarOpenSuccess(true);
					handleClose();
					setConfirmOpen(false);
				},
				onError: (error) => {
					console.error('Error updating data:', error);
					console.log(updateEquipmentData);
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
		deleteEquipment(
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
								{userData?.company?.type} Company Equipment
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
									onRowClick={handleRowClick}
								/>
							</Box>
						</Stack>
					</Container>
				</PageContent>
			</Box>

			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Edit Equipment Details</DialogTitle>
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
										alt='Selected Equipment'
										sx={{ width: '100%', marginTop: 2 }}
									/>
								)}
								<TextField
									margin='dense'
									name='name'
									label='Name'
									type='text'
									fullWidth
									value={selectedRow.name || ''}
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
									{cleaningEquipments.map((option) => {
										{
											return (
												<MenuItem
													key={option.name}
													value={option.name}>
													{option.name}
												</MenuItem>
											);
										}
									})}
								</TextField>
								<TextField
									margin='dense'
									name='manufacturare'
									label='Manufacturer'
									select
									fullWidth
									value={selectedRow.manufacturare || ''}
									onChange={handleInputChange}>
									{cleaningCompaniesManufacturers.map((option) => {
										return (
											<MenuItem
												key={option.name}
												value={option.description}>
												{option.name}
											</MenuItem>
										);
									})}
								</TextField>
								<TextField
									margin='dense'
									name='status'
									label='Status'
									select
									fullWidth
									value={selectedRow.status || ''}
									onChange={handleInputChange}>
									{cleaningEquipmentStatuses.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='situation'
									label='Situation'
									type='text'
									fullWidth
									value={selectedRow.situation || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='date'
									label='Date Of Acquire'
									type='text'
									fullWidth
									value={selectedRow.date || ''}
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
						Are you sure you want to delete this equipment?
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

export default CleaningSupplies;
