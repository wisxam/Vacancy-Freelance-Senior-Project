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
import { useAddPartners } from '../hooks/new';
import { validationSchemaPartners } from '../../../Data';
import { employeeInsuranceType } from '../../../Data';
import { contractStatuses } from '../../../Data';

const InsurancePartnerForm = () => {
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
	const { mutate: addNewPartner } = useAddPartners();
	const formik = useFormik({
		initialValues: {
			name: '',
			type: '',
			contract_status: '',
			Certificate: '',
			email: '',
			phone: '',
			specialization: '',
		},
		validationSchema: validationSchemaPartners,
		onSubmit: async (values) => {
			addNewPartner(
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
				Partners Form
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
						{employeeInsuranceType.map((option) => (
							<MenuItem
								key={option.id}
								value={option.name}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='contract_status'
						name='contract_status'
						label='Contract Status'
						select
						value={formik.values.contract_status}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.contract_status &&
							Boolean(formik.errors.contract_status)
						}
						helperText={
							formik.touched.contract_status && formik.errors.contract_status
						}
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
						id='Certificate'
						name='Certificate'
						label='Certificate'
						value={formik.values.Certificate}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.Certificate && Boolean(formik.errors.Certificate)
						}
						helperText={formik.touched.Certificate && formik.errors.Certificate}
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
						id='specialization'
						name='specialization'
						label='Specialization'
						value={formik.values.specialization}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.specialization &&
							Boolean(formik.errors.specialization)
						}
						helperText={
							formik.touched.specialization && formik.errors.specialization
						}
						variant='filled'
					/>
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

export default InsurancePartnerForm;
