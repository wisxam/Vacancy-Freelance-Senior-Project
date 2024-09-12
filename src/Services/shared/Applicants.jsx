/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
	Box,
	Typography,
	Container,
	Stack,
	Snackbar,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import useAuthUser from '../../utils/AuthUser';
import { useGetApplicantsForCompanyById } from '../hooks/get';
import PageContent from '../../components/pageContent';
import { Link, useNavigate } from 'react-router-dom';

const Applicants = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedRowData] = useState(null);
	const navigate = useNavigate();

	const linkTo = userData?.company?.type.toLowerCase();

	const { data } = useGetApplicantsForCompanyById(userData?.company?.id);

	const columns = [
		{ field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
		{ field: 'name', headerName: 'Name', flex: 1, minWidth: 100 },
		{
			field: 'email',
			headerName: 'Email',
			flex: 1,
			minWidth: 100,
		},
		{ field: 'phone', headerName: 'Phone', flex: 1, minWidth: 100 },
		{
			field: 'job_title',
			headerName: 'Job Description',
			flex: 1,
			minWidth: 100,
		},
		{ field: 'type', headerName: 'Type', flex: 1, minWidth: 50 },
		{ field: 'place', headerName: 'Place', flex: 1, minWidth: 50 },
		{
			field: 'request_id',
			headerName: 'Request ID',
			flex: 1,
			minWidth: 50,
			renderCell: (params) => (
				<Link to={`/${linkTo}/vacant-table`}>{params.value}</Link>
			),
		},
		{ field: 'education', headerName: 'Education', flex: 1, minWidth: 50 },
		{ field: 'experiences', headerName: 'Experiences', flex: 1, minWidth: 50 },
		{
			field: 'CV',
			headerName: 'CV/Resume',
			flex: 1,
			minWidth: 100,
			renderCell: (params) => <LinkToCV value={params.value} />,
		},
		{
			field: 'actions',
			headerName: 'Send Data',
			flex: 1,
			minWidth: 150,
			renderCell: (params) => (
				<Button
					color='primary'
					onClick={() => handleRowButtonClick(params.row)}>
					Confirm
				</Button>
			),
		},
	];

	const LinkToCV = ({ value }) => {
		const handleClick = () => {
			if (value.toLowerCase()) {
				window.open(value, '_blank');
			} else {
				setOpenSnackbar(true);
			}
		};

		return (
			<Button
				style={{ cursor: 'pointer' }}
				onClick={handleClick}>
				View CV
			</Button>
		);
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const handleRowButtonClick = (row) => {
		navigate(`/${linkTo}/employee-form`, {
			state: { selectedRowData: row },
		});
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

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
				height: '100%',
			}}>
			<PageContent height={'90%'}>
				<Container maxWidth='lg'>
					<Stack spacing={1}>
						<Typography
							color='cyan'
							variant='h3'>
							{userData?.company?.name}
						</Typography>
						<Typography>All Applicants</Typography>
						<Box sx={{ width: '100%', flexGrow: 1, display: 'flex' }}>
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
							/>
						</Box>
					</Stack>
				</Container>
			</PageContent>

			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}>
				<DialogTitle>Row Details</DialogTitle>
				<DialogContent>
					{selectedRowData && (
						<Stack spacing={2}>
							<DialogContentText>ID: {selectedRowData.id}</DialogContentText>
							<DialogContentText>
								Name: {selectedRowData.name}
							</DialogContentText>
							<DialogContentText>
								Email: {selectedRowData.email}
							</DialogContentText>
						</Stack>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseDialog}
						color='primary'>
						Close
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message='Error: Not a PDF CV'>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'
					sx={{ width: '100%' }}>
					Error: Not a PDF CV
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default Applicants;
