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
import { usePutInsuranceReinsurer } from '../hooks/put';
import { useDeleteInsuranceReinsurer } from '../hooks/delete';
import { useGetInsuranceReinsurerById } from '../hooks/get';
import { MenuItem } from '@mui/material';
import PageContent from '../../../components/pageContent';
import { reinsurerTypes } from '../../../Data';

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

const InsuranceReinsurerTable = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateReinsurer } = usePutInsuranceReinsurer();
	const { mutate: deleteReinsurer } = useDeleteInsuranceReinsurer();

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

	const { data } = useGetInsuranceReinsurerById(userData?.company?.id);

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

		const updatedEmployee = {
			name: selectedRow.name,
			address: selectedRow.address,
			reinsurer_type: selectedRow.reinsurer_type,
			email: selectedRow.email,
			phone: selectedRow.phone,
			fax: selectedRow.fax,
		};

		updateReinsurer(
			{ id: selectedRow.id, data: updatedEmployee },
			{
				onSuccess: () => {
					setSnackbarOpenSuccess(true);
					handleClose();
				},
				onError: (error) => {
					console.log(updatedEmployee);
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
		deleteReinsurer(
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
								autoHeight={false}
								autoPageSize={false}
								onRowClick={handleRowClick}
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
						Update the reinsurer
					</Typography>
				</DialogTitle>
				<DialogContent>
					<form onSubmit={handleFormSubmit}>
						{selectedRow && (
							<>
								<TextField
									margin='dense'
									name='name'
									label='Name'
									fullWidth
									value={selectedRow?.name || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='reinsurer_type'
									label='Reinsurer Type'
									select
									fullWidth
									value={selectedRow?.reinsurer_type || ''}
									onChange={handleInputChange}>
									{reinsurerTypes.map((option) => (
										<MenuItem
											key={option.id}
											value={option.value}>
											{option.value}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='address'
									label='Address'
									fullWidth
									value={selectedRow?.address || ''}
									onChange={handleInputChange}></TextField>
								<TextField
									margin='dense'
									name='email'
									label='Email'
									fullWidth
									value={selectedRow?.email || ''}
									onChange={handleInputChange}></TextField>
								<TextField
									margin='dense'
									name='phone'
									label='Phone Number'
									type='text'
									fullWidth
									value={selectedRow.phone || ''}
									onChange={handleInputChange}
								/>

								<TextField
									margin='dense'
									name='fax'
									label='Fax'
									type='text'
									fullWidth
									value={selectedRow.fax || ''}
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
						Are you sure you want to delete this Reinsurer from the database?
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

export default InsuranceReinsurerTable;
