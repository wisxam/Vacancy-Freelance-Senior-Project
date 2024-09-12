import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Snackbar,
	Container,
	Typography,
	Box,
} from '@mui/material';
import { Stack } from '@mui/system';
import PageContent from '../../../components/pageContent';

const contactMethods = [
	{ value: 'phone', label: 'Phone' },
	{ value: 'email', label: 'Email' },
];

const initialRows = [
	{
		id: 1,
		firstName: 'John',
		lastName: 'Doe',
		phoneNumber: '123-456-7890',
		email: 'john@example.com',
		address: '123 Main St',
		city: 'Springfield',
		state: 'IL',
		zipCode: '62704',
		preferredContactMethod: 'phone',
	},
	{
		id: 2,
		firstName: 'Jane',
		lastName: 'Smith',
		phoneNumber: '987-654-3210',
		email: 'jane@example.com',
		address: '456 Elm St',
		city: 'Shelbyville',
		state: 'IL',
		zipCode: '62565',
		preferredContactMethod: 'email',
	},
	// Add more rows as needed
];

const columns = [
	{ field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
	{ field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
	{ field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150 },
	{ field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
	{ field: 'address', headerName: 'Address', flex: 1, minWidth: 200 },
	{ field: 'city', headerName: 'City', flex: 1, minWidth: 150 },
	{ field: 'state', headerName: 'State', flex: 1, minWidth: 100 },
	{ field: 'zipCode', headerName: 'Zip Code', flex: 1, minWidth: 100 },
	{
		field: 'preferredContactMethod',
		headerName: 'Preferred Contact Method',
		flex: 1,
		minWidth: 200,
	},
];

const CleaningClients = () => {
	const [rows, setRows] = useState(initialRows);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [resizeKey, setResizeKey] = useState(0);

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedRow(null);
	};

	const handleRowClick = (params) => {
		console.log('Old data:', selectedRow);
		setSelectedRow(params.row);
		setOpen(true);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log('New data:', selectedRow);
		setRows((prevRows) =>
			prevRows.map((row) =>
				row.id === selectedRow.id ? { ...selectedRow } : row
			)
		);
		handleClose();
		setSnackbarOpen(true);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setSelectedRow((prev) => ({ ...prev, [name]: value }));
	};

	useEffect(() => {
		const handleResize = () => {
			setResizeKey((prevKey) => prevKey + 1);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<>
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
				<PageContent height={'100vh'}>
					<Container maxWidth='lg'>
						<Stack spacing={2}>
							<Typography variant='h4'>Clients</Typography>
							<DataGrid
								key={resizeKey}
								sx={{ maxHeight: '100%' }}
								rows={rows}
								columns={columns}
								slots={{ toolbar: GridToolbar }}
								autoHeight={false}
								autoPageSize={false}
								onRowClick={handleRowClick}
							/>
						</Stack>
					</Container>
				</PageContent>
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}>
				<DialogTitle>Edit Client</DialogTitle>
				<DialogContent>
					<form onSubmit={handleFormSubmit}>
						<TextField
							margin='dense'
							name='firstName'
							label='First Name'
							type='text'
							fullWidth
							value={selectedRow?.firstName || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='lastName'
							label='Last Name'
							type='text'
							fullWidth
							value={selectedRow?.lastName || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='phoneNumber'
							label='Phone Number'
							type='text'
							fullWidth
							value={selectedRow?.phoneNumber || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='email'
							label='Email'
							type='email'
							fullWidth
							value={selectedRow?.email || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='address'
							label='Address'
							type='text'
							fullWidth
							value={selectedRow?.address || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='city'
							label='City'
							type='text'
							fullWidth
							value={selectedRow?.city || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='state'
							label='State'
							type='text'
							fullWidth
							value={selectedRow?.state || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='zipCode'
							label='Zip Code'
							type='text'
							fullWidth
							value={selectedRow?.zipCode || ''}
							onChange={handleInputChange}
						/>
						<TextField
							margin='dense'
							name='preferredContactMethod'
							label='Preferred Contact Method'
							select
							fullWidth
							value={selectedRow?.preferredContactMethod || ''}
							onChange={handleInputChange}>
							{contactMethods.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<DialogActions>
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
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={3000}
				onClose={handleCloseSnackbar}
				message={'Changes saved successfully!'}
			/>
		</>
	);
};

export default CleaningClients;
