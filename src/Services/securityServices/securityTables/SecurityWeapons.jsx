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
	MenuItem,
} from '@mui/material';
import useAuthUser from '../../../utils/AuthUser';
import { usePutSecurityWeapons } from '../hooks/put';
import { useGetWeaponsTable } from '../hooks/get';
import PageContent from '../../../components/pageContent';
import { useDeleteSecurityWeapons } from '../hooks/delete';
import { weaponCategories, weaponConditions, weaponTypes } from '../../../Data';

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
	{ field: 'Wepon_Name', headerName: 'Weapon Name', flex: 1, minWidth: 100 },
	{
		field: 'Wepon_Number',
		headerName: 'Serial Number',
		flex: 1,
		minWidth: 100,
	},
	{
		field: 'Wepon_Type',
		headerName: 'Wepon Type',
		flex: 1,
		minWidth: 100,
	},
	{
		field: 'Wepon_Category',
		headerName: 'Wepon Category',
		flex: 1,
		minWidth: 100,
	},
	{
		field: 'Acquisition_Date',
		headerName: 'Acquisition Date',
		flex: 1,
		minWidth: 50,
	},
	{
		field: 'rarity',
		headerName: 'Condition',
		flex: 1,
		minWidth: 50,
		renderCell: (params) => {
			const condition = weaponConditions.find(
				(cond) => cond.name === params.value
			);
			return (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						height: '100%',
					}}>
					<Typography style={{ color: condition?.color }}>
						{condition?.name}
					</Typography>
				</Box>
			);
		},
	},
];

const SecurityWeapons = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [selectedRow, setSelectedRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [confirmOpen, setConfirmOpen] = useState(false);
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);

	const { mutate: updateWeapon } = usePutSecurityWeapons();
	const { mutate: deleteWeapon } = useDeleteSecurityWeapons();

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

	const { data } = useGetWeaponsTable(userData?.company?.id);

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
		const weaponType = weaponTypes.find(
			(type) => type.name === params.row.Wepon_Type
		)
			? params.row.Wepon_Type
			: '';
		const weaponCondition = weaponConditions.find(
			(type) => type.name === params.row.rarity
		)
			? params.row.rarity
			: '';
		setSelectedRow({
			...params.row,
			Wepon_Type: weaponType,
			rarity: weaponCondition,
		});
		setOpen(true);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const updateWeapons = {
			Wepon_Name: selectedRow.Wepon_Name,
			Wepon_Number: selectedRow.Wepon_Number,
			Wepon_Type: selectedRow.Wepon_Type,
			Wepon_Category: selectedRow.Wepon_Category,
			image: selectedRow.image,
			Acquisition_Date: selectedRow.Acquisition_Date,
			rarity: selectedRow.rarity,
		};

		updateWeapon(
			{ id: selectedRow.id, data: updateWeapons },
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

	const handleDelete = () => {
		setConfirmOpen(true);
	};

	const handleDeleteConfirm = () => {
		deleteWeapon(
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
								variant='h4'>
								{userData?.company?.name}
							</Typography>
							Security Company Weapons
						</label>
						<Box
							sx={{
								width: '100%',
								flexGrow: 1,
								display: 'flex',
								minHeight: '300px',
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
						Update Weapon
					</Typography>
				</DialogTitle>
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
										alt='Selected Weapon'
										sx={{ width: '100%', marginTop: 2 }}
									/>
								)}
								<TextField
									margin='dense'
									name='Wepon_Name'
									label='Weapon Name'
									fullWidth
									value={selectedRow?.Wepon_Name || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='Wepon_Number'
									label='Serial Number'
									type='text'
									fullWidth
									value={selectedRow.Wepon_Number || ''}
									onChange={handleInputChange}></TextField>
								<TextField
									margin='dense'
									name='Wepon_Type'
									label='Weapon Type'
									fullWidth
									select
									value={selectedRow?.Wepon_Type || ''}
									onChange={handleInputChange}>
									{weaponTypes.map((option) => (
										<MenuItem
											key={option.name}
											value={option.name}>
											{option.name}
										</MenuItem>
									))}
								</TextField>
								<TextField
									margin='dense'
									name='Wepon_Category'
									label='Wepon Category'
									fullWidth
									select
									value={selectedRow?.Wepon_Category || ''}
									onChange={handleInputChange}>
									{weaponCategories.map((option) => {
										return (
											<MenuItem
												key={option.id}
												value={option.name}>
												{option.name}
											</MenuItem>
										);
									})}
								</TextField>
								<TextField
									margin='dense'
									name='Acquisition_Date'
									label='Acquisition Date'
									type='text'
									fullWidth
									value={selectedRow.Acquisition_Date || ''}
									onChange={handleInputChange}
								/>
								<TextField
									margin='dense'
									name='rarity'
									label='Condition'
									select
									fullWidth
									value={selectedRow.rarity || ''}
									onChange={handleInputChange}>
									{weaponConditions.map((option) => (
										<MenuItem
											key={option.id}
											value={option.name}
											style={{ color: option.color }}>
											{option.name}
										</MenuItem>
									))}
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
						هل تريد ان تمسح هذا السلاح من قاعدة البيانات نهائيا؟
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

export default SecurityWeapons;
