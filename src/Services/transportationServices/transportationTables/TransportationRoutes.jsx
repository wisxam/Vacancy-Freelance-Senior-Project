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
import useAuthUser from '../../../utils/AuthUser';
import { MenuItem } from '@mui/material';
import { useGetBussesRoutesTable } from '../hooks/get';
import { usePutBussesRoutesTableById } from '../hooks/put';
import { useDeleteBusRouteById } from '../hooks/delete';
import PageContent from '../../../components/pageContent';
import { route_name, route_type } from '../../../Data';

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

const TransportationRoutes = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [confirmOpen, setConfirmOpen] = useState(false);

	const { mutate: updateRoute } = usePutBussesRoutesTableById();
	const { mutate: deleteRoute } = useDeleteBusRouteById();

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

	const { data } = useGetBussesRoutesTable(userData?.company?.id);

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};
	const handleDelete = () => {
		setConfirmOpen(true);
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

		const updateRouteData = {
			name: selectedRow.name,
			type: selectedRow.type,
			Starting: selectedRow.Starting,
			start_location: selectedRow.start_location,
			end_location: selectedRow.end_location,
			distance: selectedRow.distance,
			duration: selectedRow.duration,
			checkpoints: selectedRow.checkpoints,
		};

		updateRoute(
			{ id: selectedRow.id, data: updateRouteData },
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

	const handleDeleteConfirm = () => {
		deleteRoute(
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
			<PageContent height={'120%'}>
				<Container maxWidth='lg'>
					<Stack spacing={3}>
						<label>
							<Typography
								color={'cyan'}
								variant='h3'>
								{userData?.company?.name}
							</Typography>
							Transportation Company Routes
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

			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Edit Bus Details</DialogTitle>
				<DialogContent>
					<form onSubmit={handleFormSubmit}>
						{selectedRow && (
							<>
								<TextField
									margin='dense'
									name='name'
									label='name'
									select
									fullWidth
									value={selectedRow.name || ''}
									onChange={handleInputChange}>
									{route_name.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='type'
									label='Type'
									select
									fullWidth
									value={selectedRow?.type || ''}
									onChange={handleInputChange}>
									{route_type.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='Starting'
									label='Starting'
									type='text'
									fullWidth
									value={selectedRow.Starting || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='start_location'
									label='Start location'
									type='text'
									fullWidth
									value={selectedRow.start_location || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='end_location'
									label='End location'
									type='text'
									fullWidth
									value={selectedRow.end_location || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='distance'
									label='Distance'
									type='text'
									fullWidth
									value={selectedRow.distance || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='duration'
									label='Duration'
									type='text'
									fullWidth
									value={selectedRow.duration || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='checkpoints'
									label='Checkpoints'
									type='text'
									fullWidth
									value={selectedRow.checkpoints || ''}
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
					<Typography>Are you sure you want to delete this route?</Typography>
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

export default TransportationRoutes;
