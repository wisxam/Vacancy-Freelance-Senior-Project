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
import { usePutSecurityEmployees } from '../hooks/put';
// import { useDeleteTransportationEmployee } from '../hooks/delete';
// import { useGetTransportationEmployees } from '../hooks/get';
import { MenuItem } from '@mui/material';
import PageContent from '../../../components/pageContent';
import StarIcon from '@mui/icons-material/Star';
import { useDeleteSecurityEmployee } from '../hooks/delete';
import { useGetSecurityEmployees } from '../hooks/get';
import {
	status_activity,
	employeeRatingsTables,
	SecurityEmployeesTypes,
} from '../../../Data';

// eslint-disable-next-line react/prop-types
const LinkToCV = ({ value }) => {
	const handleClick = () => {
		window.open(value, '_blank');
	};

	return (
		<div
			style={{ cursor: 'pointer' }}
			onClick={handleClick}>
			{value}
		</div>
	);
};

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

const columns = [
	{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
	{ field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
		minWidth: 100,
	},
	{ field: 'date', headerName: 'Birth Date', flex: 1, minWidth: 100 },
	{ field: 'email', headerName: 'Email', flex: 1, minWidth: 50 },
	{ field: 'created_at', headerName: 'Joined On', flex: 1, minWidth: 50 },
	{ field: 'address', headerName: 'Address', flex: 1, minWidth: 50 },
	{ field: 'type', headerName: 'Type', flex: 1, minWidth: 50 },
	{
		field: 'cv',
		headerName: 'CV/Resume',
		flex: 1,
		minWidth: 50,
		renderCell: (params) => <LinkToCV value={params.value} />,
	},
	{ field: 'phone_number', headerName: 'Phone Number', flex: 1, minWidth: 50 },
	{
		field: 'rate',
		headerName: 'Rate',
		flex: 1,
		minWidth: 150,
		renderCell: (params) => <StarRating value={params.value} />,
	},
];

const SecurityEmployeesTable = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateEmployee } = usePutSecurityEmployees();
	const { mutate: deleteEmployee } = useDeleteSecurityEmployee();

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

	const { data } = useGetSecurityEmployees(userData?.company?.id);

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
			status: selectedRow.status,
			name: selectedRow.name,
			date: selectedRow.date,
			phone_number: selectedRow.phone_number,
			address: selectedRow.address,
			cv: selectedRow.cv,
			rate: selectedRow.rate,
			type: selectedRow.type,
			email: selectedRow.email,
		};

		updateEmployee(
			{ id: selectedRow.id, data: updatedEmployee },
			{
				onSuccess: () => {
					setSnackbarOpenSuccess(true);
					handleClose();
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
		deleteEmployee(
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
							Security Company Employees
						</label>
						<Box
							sx={{
								width: '100%',
								flexGrow: 1,
								display: 'flex',
								height: '300px',
							}}>
							<DataGrid
								key={resizeKey}
								rows={data?.data?.user || []}
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
						تعديل على الموظف
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
									name='status'
									label='Status'
									select
									fullWidth
									value={selectedRow.status || ''}
									onChange={handleInputChange}>
									{status_activity.map((option) => (
										<MenuItem
											key={option.id}
											value={option.value}>
											{option.value}
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
									{SecurityEmployeesTypes.map((option) => (
										<MenuItem
											key={option.id}
											value={option.name}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='date'
									label='Date'
									fullWidth
									value={selectedRow?.date || ''}
									onChange={handleInputChange}></TextField>
								<TextField
									margin='dense'
									name='phone_number'
									label='Phone Number'
									type='text'
									fullWidth
									value={selectedRow.phone_number || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='address'
									label='Address'
									type='text'
									fullWidth
									value={selectedRow.address || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='cv'
									label='CV/Resume'
									type='text'
									fullWidth
									value={selectedRow.cv || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='email'
									label='Email'
									type='text'
									fullWidth
									value={selectedRow.email || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='rate'
									label='Rate'
									select
									fullWidth
									value={selectedRow.rate || ''}
									onChange={handleInputChange}>
									{employeeRatingsTables.map((option) => {
										return (
											<MenuItem
												key={option.value}
												value={option.value}>
												{option.label}
											</MenuItem>
										);
									})}
								</TextField>
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
						هل تريد ان تمسح هذا الموظف من قاعدة البيانات نهائيا؟
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

export default SecurityEmployeesTable;
