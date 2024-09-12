import {
	Button,
	Stack,
	Typography,
	MenuItem,
	Snackbar,
	Alert,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import useAuthUser from '../../../utils/AuthUser';
import { useAddSecurityWeapons } from '../../securityServices/hooks/new';
import {
	validationSchemaWeapons,
	weaponCategories,
	weaponConditions,
	weaponTypes,
} from '../../../Data';

const WeaponInventoryForm = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
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

	const { mutate: addNewWeapon } = useAddSecurityWeapons();
	const formik = useFormik({
		initialValues: {
			Wepon_Name: '',
			Wepon_Number: '',
			Wepon_Type: '',
			Wepon_Category: '',
			Acquisition_Date: '',
			rarity: '',
		},
		validationSchema: validationSchemaWeapons,
		onSubmit: async (values) => {
			addNewWeapon(
				{ id: userData?.company?.id, data: values },
				{
					onSuccess: () => {
						setSnackbarOpenSuccess(true);
					},
					onError: (error) => {
						console.error('Error updating data:', error);
						setSnackbarOpenFailed(true);
					},
				}
			);
		},
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				maxWidth: 600,
				margin: '0 auto',
				padding: 3,
				boxShadow: 3,
				borderRadius: 2,
				background: '#272727',
			}}
			noValidate
			autoComplete='off'>
			<Typography
				variant='h5'
				sx={{ mb: 2, color: 'white' }}>
				Weapon Inventory Form
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Stack
					direction='column'
					gap={3}>
					<TextField
						fullWidth
						id='Wepon_Name'
						name='Wepon_Name'
						label='Weapon Name'
						value={formik.values.Wepon_Name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.Wepon_Name && Boolean(formik.errors.Wepon_Name)
						}
						helperText={formik.touched.Wepon_Name && formik.errors.Wepon_Name}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='Wepon_Number'
						name='Wepon_Number'
						label='Serial Number'
						value={formik.values.Wepon_Number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.Wepon_Number && Boolean(formik.errors.Wepon_Number)
						}
						helperText={
							formik.touched.Wepon_Number && formik.errors.Wepon_Number
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='Wepon_Type'
						name='Wepon_Type'
						label='Weapon Type'
						select
						value={formik.values.Wepon_Type}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.Wepon_Type && Boolean(formik.errors.Wepon_Type)
						}
						helperText={formik.touched.Wepon_Type && formik.errors.Wepon_Type}
						variant='filled'>
						{weaponTypes.map((option) => (
							<MenuItem
								key={option.id}
								value={option.name}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='Wepon_Category'
						name='Wepon_Category'
						label='Weapon Category'
						select
						value={formik.values.Wepon_Category}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.Wepon_Category &&
							Boolean(formik.errors.Wepon_Category)
						}
						helperText={
							formik.touched.Wepon_Category && formik.errors.Wepon_Category
						}
						variant='filled'>
						{weaponCategories.map((option) => (
							<MenuItem
								key={option.id}
								value={option.name}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='Acquisition_Date'
						name='Acquisition_Date'
						label='Acquisition Date'
						type='date'
						value={formik.values.Acquisition_Date}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.Acquisition_Date &&
							Boolean(formik.errors.Acquisition_Date)
						}
						helperText={
							formik.touched.Acquisition_Date && formik.errors.Acquisition_Date
						}
						variant='filled'
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						fullWidth
						id='rarity'
						name='rarity'
						label='Condition'
						select
						value={formik.values.rarity}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.rarity && Boolean(formik.errors.rarity)}
						helperText={formik.touched.rarity && formik.errors.rarity}
						variant='filled'>
						{weaponConditions.map((option) => (
							<MenuItem
								key={option.id}
								value={option.name}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<Button
						color='primary'
						variant='contained'
						type='submit'
						fullWidth>
						Submit
					</Button>
				</Stack>
			</form>
			<Snackbar
				open={snackbarOpenSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'>
					Operation Successful!
				</Alert>
			</Snackbar>
			<Snackbar
				open={snackbarOpenFailed}
				autoHideDuration={6000}
				onClose={handleCloseSnackbarFailed}>
				<Alert
					onClose={handleCloseSnackbarFailed}
					severity='error'>
					Operation Failed!
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default WeaponInventoryForm;
