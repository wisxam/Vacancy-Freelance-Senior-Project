import {
	Button,
	Stack,
	Typography,
	MenuItem,
	Snackbar,
	Alert,
	Box,
	TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import useAuthUser from '../../../utils/AuthUser';
import { useAddTransportationBusses } from '../hooks/new';
import {
	busManufacturers,
	busValidationSchema,
	busStatus,
} from '../../../Data';

const TransportationBusForm = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

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

	const { mutate: addNewBus } = useAddTransportationBusses();

	const formik = useFormik({
		initialValues: {
			status: '',
			license_plate: '',
			capacity: '',
			make: '',
			model: '',
			year: '',
			image: '', // Store Base64 string of image here
		},
		validationSchema: busValidationSchema,
		onSubmit: async (values) => {
			addNewBus(
				{
					id: userData?.company?.id,
					data: values, // Submit formik values directly
				},
				{
					onSuccess: () => {
						formik.resetForm();
						setImagePreview(null);
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

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result?.toString();
				formik.setFieldValue('image', base64String);
				setImagePreview(base64String);
			};
			reader.readAsDataURL(file);
		}
	};

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
				Bus Form
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Stack
					direction='column'
					gap={3}>
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
					{imagePreview && (
						<Box
							component='img'
							src={imagePreview}
							alt='Selected'
							sx={{ width: '100%', marginTop: 2 }}
						/>
					)}
					<TextField
						fullWidth
						id='status'
						name='status'
						label='Status'
						select
						value={formik.values.status}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.status && Boolean(formik.errors.status)}
						helperText={formik.touched.status && formik.errors.status}
						variant='filled'>
						{busStatus.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='license_plate'
						name='license_plate'
						label='License Plate'
						value={formik.values.license_plate}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.license_plate &&
							Boolean(formik.errors.license_plate)
						}
						helperText={
							formik.touched.license_plate && formik.errors.license_plate
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='capacity'
						name='capacity'
						label='Capacity'
						type='text'
						value={formik.values.capacity}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.capacity && Boolean(formik.errors.capacity)}
						helperText={formik.touched.capacity && formik.errors.capacity}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='make'
						name='make'
						label='Manufacturer'
						select
						value={formik.values.make}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.make && Boolean(formik.errors.make)}
						helperText={formik.touched.make && formik.errors.make}
						variant='filled'>
						{busManufacturers.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='model'
						name='model'
						label='Model'
						value={formik.values.model}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.model && Boolean(formik.errors.model)}
						helperText={formik.touched.model && formik.errors.model}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='year'
						name='year'
						label='Year'
						value={formik.values.year}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.year && Boolean(formik.errors.year)}
						helperText={formik.touched.year && formik.errors.year}
						variant='filled'
					/>
				</Stack>
				<br />
				<Box textAlign='left'>
					<Button
						type='submit'
						variant='contained'>
						Submit
					</Button>
				</Box>
			</form>
			<Snackbar
				open={snackbarOpenSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='success'
					sx={{ width: '100%' }}>
					Operation completed successfully
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
					An error occurred, please try again
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default TransportationBusForm;
