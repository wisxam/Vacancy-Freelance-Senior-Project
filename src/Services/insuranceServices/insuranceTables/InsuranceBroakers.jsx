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
import { usePutInsuranceBroakers } from '../hooks/put';
import { useDeleteInsuranceBroakers } from '../hooks/delete';
import { useGetInsuranceBroakers } from '../hooks/get';
import { MenuItem } from '@mui/material';
import PageContent from '../../../components/pageContent';
import StarIcon from '@mui/icons-material/Star';
import { employeeRatingsTables } from '../../../Data';
import { broakerPercentage } from '../../../Data';

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

const InsuranceBroakers = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateBroaker } = usePutInsuranceBroakers();
	const { mutate: deleteBroaker } = useDeleteInsuranceBroakers();

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

	const { data } = useGetInsuranceBroakers(userData?.company?.id);

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

		const updateBroakerForm = {
			name: selectedRow.name,
			percentage: selectedRow.percentage,
			phone: selectedRow.phone,
			address: selectedRow.address,
			rate: selectedRow.rate,
			email: selectedRow.email,
		};

		updateBroaker(
			{ id: selectedRow.id, data: updateBroakerForm },
			{
				onSuccess: () => {
					console.log(updateBroakerForm);
					setSnackbarOpenSuccess(true);
					handleClose();
				},
				onError: (error) => {
					console.log(updateBroakerForm);
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
		deleteBroaker(
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
							{userData?.company?.name} Company Broakers
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
									name='phone'
									label='Phone Number'
									type='text'
									fullWidth
									value={selectedRow.phone || ''}
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
									name='email'
									label='Email'
									type='text'
									fullWidth
									value={selectedRow.email || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='percentage'
									label='Percentage'
									fullWidth
									select
									value={selectedRow.percentage || ''}
									onChange={handleInputChange}>
									{broakerPercentage.map((option) => {
										return (
											<MenuItem
												value={option.label}
												key={option.value}>
												{option.label}
											</MenuItem>
										);
									})}
								</TextField>
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
				<DialogTitle>
					<Typography>Confirm Delete</Typography>
				</DialogTitle>
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

export default InsuranceBroakers;
