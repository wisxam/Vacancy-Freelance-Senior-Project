import {
	Button,
	Stack,
	Typography,
	// MenuItem,
	Snackbar,
	Alert,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import useAuthUser from '../../../utils/AuthUser';
import { useAddTransportationJobs } from '../hooks/new';
import { jobValidationSchema } from '../../../Data';
import FormikForm from '../../../components/FormikForm';

const TransportationAddJobForm = () => {
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

	const { mutate: addNewJob } = useAddTransportationJobs();

	const formik = useFormik({
		initialValues: {
			place: '',
			name: '',
			job_title: '',
			phone: '',
			email: '',
			type: '',
			job_description: '',
			image: '',
		},
		validationSchema: jobValidationSchema,
		onSubmit: async (values) => {
			addNewJob(
				{ id: userData.company.id, data: values },
				{
					onSuccess: () => {
						formik.resetForm();
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
				Vacant Form
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
					<FormikForm
						formik={formik}
						fieldName='name'
						label='Name'
					/>
					<FormikForm
						formik={formik}
						fieldName='place'
						label='Place'
					/>
					<FormikForm
						formik={formik}
						fieldName='job_title'
						label='Job Title'
					/>
					<FormikForm
						formik={formik}
						fieldName='phone'
						label='Phone'
					/>
					<FormikForm
						formik={formik}
						fieldName='email'
						label='Email'
					/>
					<FormikForm
						formik={formik}
						fieldName='type'
						label='Type'
					/>
					<FormikForm
						formik={formik}
						fieldName='job_description'
						label='Job Description'
					/>
					{/* <FormikForm
						formik={formik}
						fieldName='CV'
						label='Job Description'
					/> */}
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

export default TransportationAddJobForm;
