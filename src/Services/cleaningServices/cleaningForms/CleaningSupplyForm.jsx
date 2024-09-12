import {
	Alert,
	Button,
	MenuItem,
	Snackbar,
	Stack,
	Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import {
	cleaningCompaniesManufacturers,
	cleaningEquipmentSituations,
	cleaningEquipmentStatuses,
	cleaningEquipments,
	equipmentValidationSchema,
} from '../../../Data';
import { useEffect, useState } from 'react';
import useAuthUser from '../../../utils/AuthUser';
import { useAddCleaningEquipment } from '../hooks/new';

const CleaningSupplyForm = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	const { mutate: addNewEquipment } = useAddCleaningEquipment();

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
	};

	const handleCloseSnackbarFailed = () => {
		setSnackbarOpenFailed(false);
	};
	const formik = useFormik({
		initialValues: {
			type: '',
			quantity: '',
			image: '',
			name: '',
			status: '',
			situation: '',
			manufacturare: '',
			date: '',
		},
		validationSchema: equipmentValidationSchema,
		onSubmit: async (values) => {
			addNewEquipment(
				{
					id: userData?.company?.id,
					data: values,
				},
				{
					onSuccess: () => {
						formik.resetForm();
						setImagePreview(null);
						setSnackbarOpenSuccess(true);
					},
					onError: (error) => {
						console.error('Error updating data:', error);
						console.log(values);
						setSnackbarOpenFailed(true);
					},
				}
			);
		},
	});

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
				Equipment Form
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
						id='name'
						name='name'
						label='Name'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='type'
						name='type'
						label='Type'
						select
						value={formik.values.type}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.type && Boolean(formik.errors.type)}
						helperText={formik.touched.type && formik.errors.type}
						variant='filled'>
						{cleaningEquipments.map((option) => {
							{
								return (
									<MenuItem
										key={option.name}
										value={option.name}>
										{option.name}
									</MenuItem>
								);
							}
						})}
					</TextField>
					<TextField
						fullWidth
						id='quantity'
						name='quantity'
						label='Quantity'
						type='text'
						value={formik.values.quantity}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.quantity && Boolean(formik.errors.quantity)}
						helperText={formik.touched.quantity && formik.errors.quantity}
						variant='filled'
					/>
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
						{cleaningEquipmentStatuses.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='date'
						name='date'
						label='Date'
						type='date'
						InputLabelProps={{ shrink: true }}
						value={formik.values.date}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.date && Boolean(formik.errors.date)}
						helperText={formik.touched.date && formik.errors.date}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='situation'
						name='situation'
						label='Situation'
						select
						value={formik.values.situation}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.situation && Boolean(formik.errors.situation)}
						helperText={formik.touched.situation && formik.errors.situation}
						variant='filled'>
						{cleaningEquipmentSituations.map((option) => {
							return (
								<MenuItem
									key={option.name}
									value={option.label}>
									{option.label}
								</MenuItem>
							);
						})}
					</TextField>
					<TextField
						fullWidth
						id='manufacturare'
						name='manufacturare'
						label='Manufacturer'
						select
						value={formik.values.manufacturare}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.manufacturare &&
							Boolean(formik.errors.manufacturare)
						}
						helperText={
							formik.touched.manufacturare && formik.errors.manufacturare
						}
						variant='filled'>
						{cleaningCompaniesManufacturers.map((option) => {
							return (
								<MenuItem
									key={option.name}
									value={option.description}>
									{option.name}
								</MenuItem>
							);
						})}
					</TextField>
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

export default CleaningSupplyForm;
