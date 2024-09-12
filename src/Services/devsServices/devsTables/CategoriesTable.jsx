import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
	Box,
	IconButton,
	Button,
	Modal,
	Typography,
	TextField,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import emailjs from 'emailjs-com';

const CategoriesTable = () => {
	const [rows, setRows] = useState([
		{
			id: 1,
			category_name: 'Books',
			email: 'wissamkh1@hotmail.com',
			category_sender: 'John Doe',
			description: 'Request to add a Books category',
			created_at: '2023-05-01',
		},
		{
			id: 2,
			category_name: 'Electronics',
			email: 'mahdiraafat3@gmail.com',
			category_sender: 'Jane Smith',
			description: 'Request to add an Electronics category',
			created_at: '2023-05-02',
		},
	]);
	const [, setResizeKey] = useState(0);
	const [openAcceptModal, setOpenAcceptModal] = useState(false);
	const [openDeclineModal, setOpenDeclineModal] = useState(false);
	const [currentId, setCurrentId] = useState(null);
	const [reason, setReason] = useState('');

	useEffect(() => {
		const handleResize = () => {
			setResizeKey((prevKey) => prevKey + 1);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleAccept = (id) => {
		setCurrentId(id);
		setOpenAcceptModal(true);
	};

	const handleDecline = (id) => {
		setCurrentId(id);
		setOpenDeclineModal(true);
	};

	const handleAcceptSubmit = () => {
		console.log(`Accepted request with id: ${currentId}`);
		const acceptedRow = rows.find((row) => row.id === currentId);
		if (acceptedRow) {
			const toEmail = acceptedRow.email;
			console.log(`Sending acceptance notification to: ${toEmail}`);
			emailjs
				.send(
					'service_lsxtrxe', // Replace with your EmailJS service ID
					'template_kim9obq', // Replace with your EmailJS template ID
					{
						id: currentId,
						reason: reason,
						to_name: acceptedRow.category_sender,
						to_email: toEmail,
					},
					'BlH_DDwHdnmDe2694' // Replace with your EmailJS user ID
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
	};

	const handleDeclineSubmit = () => {
		console.log(`Declined request with id: ${currentId}`);
		console.log(`Reason: ${reason}`);

		const declinedRow = rows.find((row) => row.id === currentId);
		if (declinedRow) {
			const toEmail = declinedRow.email;
			console.log(`Sending decline notification to: ${toEmail}`);
			emailjs
				.send(
					'service_lsxtrxe', // Replace with your EmailJS service ID
					'template_n1ahr6j', // Replace with your EmailJS template ID
					{
						id: currentId,
						reason: reason,
						to_name: declinedRow.category_sender,
						to_email: toEmail,
					},
					'BlH_DDwHdnmDe2694' // Replace with your EmailJS user ID
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
		setReason('');
	};

	const handleClose = () => {
		setOpenAcceptModal(false);
		setOpenDeclineModal(false);
		setReason('');
	};

	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			flex: 0.5,
			minWidth: 100,
		},
		{
			field: 'category_name',
			headerName: 'Category',
			flex: 1,
			minWidth: 150,
			editable: true,
		},
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
			minWidth: 150,
			editable: true,
		},
		{
			field: 'category_sender',
			headerName: 'Requester Name',
			flex: 1,
			minWidth: 200,
			editable: true,
		},
		{
			field: 'description',
			headerName: 'Description',
			flex: 1,
			minWidth: 150,
			editable: true,
		},
		{
			field: 'created_at',
			headerName: 'Requested At',
			flex: 1,
			minWidth: 200,
			editable: false,
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

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '60vh',
				width: '100%',
			}}>
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
				<DataGrid
					rows={rows}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
					autoHeight={false}
					autoPageSize={false}
				/>
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
		</Box>
	);
};

export default CategoriesTable;
