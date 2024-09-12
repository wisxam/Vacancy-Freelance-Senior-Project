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
import { useAddCleaningEmployee } from '../hooks/new';
import {
	cleaningEmployeeTypes,
	employeeRatingsForm,
	securityValidationSchema,
	status_activity,
} from '../../../Data';
import { useLocation } from 'react-router-dom';

const CleaningEmployeesForm = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const location = useLocation();
	const selectedRowData = location.state?.selectedRowData || [];

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
	const { mutate: addNewEmployee } = useAddCleaningEmployee();
	const formik = useFormik({
		initialValues: {
			name: selectedRowData?.name || '',
			status: '',
			type: '',
			date: '',
			email: selectedRowData?.email || '',
			address: '',
			cv: selectedRowData?.CV || '',
			phone_number: selectedRowData?.phone || '',
			rate: '',
		},
		validationSchema: securityValidationSchema,
		onSubmit: async (values) => {
			addNewEmployee(
				{ id: userData?.company?.id, data: values },
				{
					onSuccess: () => {
						setSnackbarOpenSuccess(true);
						formik.resetForm();
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
				Employee Form
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Stack
					direction='column'
					gap={3}>
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
						variant='filled'></TextField>
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
						{status_activity.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
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
						{cleaningEmployeeTypes.map((option) => (
							<MenuItem
								key={option.id}
								value={option.name}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='date'
						name='date'
						label='Date'
						type='date'
						value={formik.values.date}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.date && Boolean(formik.errors.date)}
						helperText={formik.touched.date && formik.errors.date}
						variant='filled'></TextField>
					<TextField
						fullWidth
						id='phone_number'
						name='phone_number'
						label='Phone Number'
						value={formik.values.phone_number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.phone_number && Boolean(formik.errors.phone_number)
						}
						helperText={
							formik.touched.phone_number && formik.errors.phone_number
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='email'
						name='email'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='address'
						name='address'
						label='Address'
						value={formik.values.address}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.address && Boolean(formik.errors.address)}
						helperText={formik.touched.address && formik.errors.address}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='cv'
						name='cv'
						label='CV/Resume Link'
						value={formik.values.cv}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.cv && Boolean(formik.errors.cv)}
						helperText={formik.touched.cv && formik.errors.cv}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='rate'
						name='rate'
						label='Rate'
						select
						value={formik.values.rate}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.rate && Boolean(formik.errors.rate)}
						helperText={formik.touched.rate && formik.errors.rate}
						variant='filled'>
						{employeeRatingsForm.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Stack>
				<br />
				<Box textAlign='left'>
					<Button
						type='submit'
						variant='contained'>
						موافق
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

export default CleaningEmployeesForm;
