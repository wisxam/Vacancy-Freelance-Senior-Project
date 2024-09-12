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
import { useAddInsuranceReinsurer } from '../hooks/new';
import { validationSchemaReinsurer } from '../../../Data';
import { contractStatuses } from '../../../Data';
import { LocationSelectorWithSwitch } from '../../../components';
import { reinsurerTypes } from '../../../Data';

const InsuranceReinsurerForm = () => {
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
	const { mutate: addNewReinsurer } = useAddInsuranceReinsurer();
	const formik = useFormik({
		initialValues: {
			name: '',
			address: '',
			email: '',
			phone: '',
			fax: '',
			reinsurer_type: '',
		},
		validationSchema: validationSchemaReinsurer,
		onSubmit: async (values) => {
			addNewReinsurer(
				{ id: userData?.company?.id, data: values },
				{
					onSuccess: () => {
						setSnackbarOpenSuccess(true);
						formik.resetForm();
					},
					onError: (error) => {
						console.log(values);
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
				Reinsurer Form
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
					<LocationSelectorWithSwitch
						label='Address'
						field='address'
						formik={formik}
					/>
					<TextField
						fullWidth
						id='fax'
						name='fax'
						label='Fax'
						value={formik.values.fax}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.fax && Boolean(formik.errors.fax)}
						helperText={formik.touched.fax && formik.errors.fax}
						variant='filled'>
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
						id='phone'
						name='phone'
						label='Phone'
						value={formik.values.phone}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.phone && Boolean(formik.errors.phone)}
						helperText={formik.touched.phone && formik.errors.phone}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='reinsurer_type'
						name='reinsurer_type'
						label='Reinsurer Type'
						value={formik.values.reinsurer_type}
						select
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.reinsurer_type &&
							Boolean(formik.errors.reinsurer_type)
						}
						helperText={
							formik.touched.reinsurer_type && formik.errors.reinsurer_type
						}
						variant='filled'>
						{reinsurerTypes.map((option) => {
							return (
								<MenuItem
									key={option.id}
									value={option.value}>
									{option.value}
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

export default InsuranceReinsurerForm;
