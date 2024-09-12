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
import { useGetPartners } from '../hooks/get';
import useAuthUser from '../../../utils/AuthUser';
import { usePutPartners } from '../hooks/put';
import { useDeletePartner } from '../hooks/delete';
import { MenuItem } from '@mui/material';
import PageContent from '../../../components/pageContent';
import { ReusableTextField } from '../../../components';
import { insurancePartners } from '../../../Data';
import { contractStatuses } from '../../../Data';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

const InsurancePartnersTable = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updatePartners } = usePutPartners();
	const { mutate: deletePartners } = useDeletePartner();

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

	const { data } = useGetPartners(userData?.company?.id);

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

		const updatePartnersData = {
			name: selectedRow.name,
			type: selectedRow.type,
			contract_status: selectedRow.contract_status,
			Certificate: selectedRow.Certificate,
			email: selectedRow.email,
			phone: selectedRow.phone,
			specialization: selectedRow.specialization,
		};

		updatePartners(
			{ id: selectedRow.id, data: updatePartnersData },
			{
				onSuccess: () => {
					setSnackbarOpenSuccess(true);
					handleClose();
					setConfirmOpen(false);
				},
				onError: (error) => {
					console.log(updatePartnersData);
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
		deletePartners(
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
								{userData?.company?.type} Company Partners
							</label>
							<Box sx={{ flexGrow: 1, display: 'flex' }}>
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
			</Box>

			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Edit Partner Details</DialogTitle>
				<DialogContent>
					<form onSubmit={handleFormSubmit}>
						{selectedRow && (
							<>
								<TextField
									margin='dense'
									name='name'
									label='Name'
									type='text'
									fullWidth
									value={selectedRow?.name || ''}
									onChange={handleInputChange}></TextField>
								<TextField
									margin='dense'
									name='type'
									label='Type'
									select
									fullWidth
									value={selectedRow.type || ''}
									onChange={handleInputChange}>
									{insurancePartners.map((option) => {
										return (
											<MenuItem
												key={option.type}
												value={option.type}>
												{option.type}
											</MenuItem>
										);
									})}
								</TextField>
								<TextField
									margin='dense'
									name='contract_status'
									label='Contract Status'
									select
									fullWidth
									value={selectedRow.contract_status || ''}
									onChange={handleInputChange}>
									{contractStatuses.map((option) => {
										return (
											<MenuItem
												key={option.status}
												value={option.status}>
												{option.status}
											</MenuItem>
										);
									})}
								</TextField>
								<TextField
									margin='dense'
									name='Certificate'
									label='Certificate'
									type='text'
									fullWidth
									value={selectedRow?.Certificate || ''}
									onChange={handleInputChange}></TextField>
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
									name='phone'
									label='Phone'
									type='text'
									fullWidth
									value={selectedRow.phone || ''}
									onChange={handleInputChange}
								/>
								<ReusableTextField
									name='specialization'
									label='Specialization'
									value={selectedRow.specialization}
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
					<Typography>Are you sure you want to delete this partner?</Typography>
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

export default InsurancePartnersTable;
