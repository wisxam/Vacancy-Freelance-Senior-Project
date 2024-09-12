import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
	Box,
	Typography,
	Container,
	Stack,
	IconButton,
	TextField,
	Button,
	Modal,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Snackbar,
	Alert,
} from '@mui/material';
import { useGetAllRequestsToBeCompany } from '../hooks/get';
import useAuthUser from '../../../utils/AuthUser';
import PageContent from '../../../components/pageContent';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import emailjs from 'emailjs-com';
import { useDeleteuserRequestToBeCompany } from '../hooks/delete';
import { useAddUserRequestToBeCompany } from '../hooks/new';
import { waseet } from '../../../assets';

const AllCompanyRequests = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [openAcceptModal, setOpenAcceptModal] = useState(false);
	const [openDeclineModal, setOpenDeclineModal] = useState(false);
	const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
	const [reason, setReason] = useState('');
	const [currentId, setCurrentId] = useState(null);
	const [currentRowData, setCurrentRowData] = useState({});
	const [rows, setRows] = useState([]);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);

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

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
		{
			field: 'company_picture',
			headerName: 'Company Picture',
			flex: 1,
			minWidth: 100,
			renderCell: (params) => (
				<Box
					component='img'
					src={params.value}
					alt={params.row.name}
					sx={{ width: '50px', height: '50px', objectFit: 'cover' }}
				/>
			),
		},
		{ field: 'name', headerName: 'Company Name', flex: 1, minWidth: 100 },
		{
			field: 'phone',
			headerName: 'Company Phone',
			flex: 1,
			minWidth: 100,
		},
		{ field: 'email', headerName: 'Company Email', flex: 1, minWidth: 100 },
		{ field: 'type', headerName: 'Company Type', flex: 1, minWidth: 50 },
		{ field: 'address', headerName: 'Company Address', flex: 1, minWidth: 50 },
		{
			field: 'description',
			headerName: 'Description',
			flex: 1,
			minWidth: 50,
			renderCell: (params) => (
				<Button onClick={() => handleDescriptionClick(params.row)}>View</Button>
			),
		},
		{
			field: 'accept',
			headerName: 'Accept',
			flex: 0.5,
			minWidth: 100,
			renderCell: (params) => (
				<IconButton
					color='primary'
					onClick={() => handleAccept(params.id)}>
					<CheckIcon />
				</IconButton>
			),
		},
		{
			field: 'decline',
			headerName: 'Decline',
			flex: 0.5,
			minWidth: 100,
			renderCell: (params) => (
				<IconButton
					color='secondary'
					onClick={() => handleDecline(params.id)}>
					<CloseIcon />
				</IconButton>
			),
		},
	];

	const handleDescriptionClick = (row) => {
		setCurrentRowData(row);
		setOpenDescriptionDialog(true);
	};

	const handleAccept = (id) => {
		setCurrentId(id);
		setOpenAcceptModal(true);
	};

	const handleDecline = (id) => {
		setCurrentId(id);
		setOpenDeclineModal(true);
	};

	const { data } = useGetAllRequestsToBeCompany();
	const { mutate: addNewUserCompany } = useAddUserRequestToBeCompany();
	const { mutate: deleteUserRequest } = useDeleteuserRequestToBeCompany();

	useEffect(() => {
		if (data && data?.data) {
			setRows(data?.data);
		}
	}, [data]);

	const handleAcceptSubmit = () => {
		const acceptedRow = rows.find((row) => row.id === currentId);
		console.log(`Accepted request with id: ${currentId}`);
		addNewUserCompany(
			{ id: currentId },
			{
				onSuccess: () => {
					console.log('works');
				},
				onError: (error) => {
					console.error('Error updating data:', error);
				},
			}
		);
		if (acceptedRow) {
			const toEmail = acceptedRow.email;

			emailjs
				.send(
					'service_lsxtrxe',
					'template_kim9obq',
					{
						id: currentId,
						reason: reason,
						to_name: acceptedRow.name,
						to_email: toEmail,
					},
					'BlH_DDwHdnmDe2694',
					{
						attachments: [
							{
								path: waseet,
								cid: 'waseetLogo',
							},
						],
					}
				)
				.then((response) => {
					console.log(
						'Email sent successfully:',
						response.status,
						response.text
					);
				})
				.catch((error) => {
					console.error('Error sending email:', error);
				});
		}
		setRows((prevRows) => prevRows.filter((row) => row.id !== currentId));
		setOpenAcceptModal(false);
		setSnackbarOpenSuccess(true);
		setReason('');
	};

	const handleDeclineSubmit = () => {
		const declinedRow = rows.find((row) => row.id === currentId);
		console.log(`Declined request with id: ${currentId}`);
		console.log(`Reason: ${reason}`);

		deleteUserRequest(
			{ id: currentId },
			{
				onSuccess: () => {
					console.log('User request declined successfully.');
				},
				onError: (error) => {
					console.error('Error declining user request:', error);
				},
			}
		);

		if (declinedRow) {
			const toEmail = declinedRow.email;
			console.log(`Sending decline notification to: ${toEmail}`);
			emailjs
				.send(
					'service_lsxtrxe',
					'template_n1ahr6j',
					{
						id: currentId,
						reason: reason,
						to_name: declinedRow.name,
						to_email: toEmail,
					},
					'BlH_DDwHdnmDe2694',
					{
						attachments: [
							{
								path: waseet,
								cid: 'waseetLogo',
							},
						],
					}
				)
				.then((response) => {
					console.log(
						'Email sent successfully:',
						response.status,
						response.text
					);
				})
				.catch((error) => {
					console.error('Error sending email:', error);
				});
		}

		setRows((prevRows) => prevRows.filter((row) => row.id !== currentId));
		setOpenDeclineModal(false);
		setSnackbarOpenFailed(true);
		setReason('');
	};

	const handleClose = () => {
		setOpenAcceptModal(false);
		setOpenDeclineModal(false);
		setReason('');
	};

	const handleCloseDescriptionDialog = () => {
		setOpenDescriptionDialog(false);
		setCurrentRowData({});
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
								To Be Company Requests
							</label>
							<Box sx={{ flexGrow: 1, display: 'flex' }}>
								<DataGrid
									key={resizeKey}
									rows={rows}
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
			<Modal
				open={openAcceptModal || openDeclineModal}
				onClose={handleClose}
				aria-labelledby='modal-title'
				aria-describedby='modal-description'>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
					}}>
					<Typography
						id='modal-title'
						variant='h6'
						component='h2'>
						{openAcceptModal ? 'Accept Request' : 'Decline Request'}
					</Typography>
					<TextField
						fullWidth
						multiline
						rows={4}
						variant='outlined'
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						sx={{ mt: 2 }}
					/>
					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
						<Button
							onClick={
								openAcceptModal ? handleAcceptSubmit : handleDeclineSubmit
							}
							variant='contained'
							color='primary'>
							{openAcceptModal ? 'Accept' : 'Decline'}
						</Button>
						<Button
							onClick={handleClose}
							variant='contained'
							color='secondary'>
							Cancel
						</Button>
					</Box>
				</Box>
			</Modal>
			<Dialog
				open={openDescriptionDialog}
				onClose={handleCloseDescriptionDialog}>
				<DialogTitle>Request Information</DialogTitle>
				<DialogContent>
					<Typography
						variant='body1'
						className='p-4'>
						Description: {currentRowData.description}
					</Typography>
					<Typography
						variant='body2'
						className='p-4'>
						Company Name: {currentRowData.name}
					</Typography>
					<Typography
						variant='body2'
						className='p-4'>
						Company Location: {currentRowData.address}
					</Typography>
					<Typography
						variant='body2'
						className='p-4'>
						Company Email: {currentRowData.email}
					</Typography>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleCloseDescriptionDialog}
						color='primary'>
						Close
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
					Email Sent Successfuly
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
					Rejection Email Sent Successfuly
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AllCompanyRequests;
