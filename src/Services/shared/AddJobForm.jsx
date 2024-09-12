import { useState, useEffect } from 'react';
import {
	Button,
	Stack,
	Typography,
	Snackbar,
	Alert,
	Box,
	CircularProgress,
	TextField,
	MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import useAuthUser from '../../utils/AuthUser';
import { useAddJobs } from '../hooks/new';
import { FormikForm, LocationSelectorWithSwitch } from '../../components';
import { jobTypes, jobValidationSchema } from '../../Data';

const SUBMISSION_TIMEOUT = 24 * 60 * 60 * 1000;

const AddJobForm = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
	const [snackbarOpenFailed, setSnackbarOpenFailed] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);
	const [isFormDisabled, setIsFormDisabled] = useState(false);
	const [remainingTime, setRemainingTime] = useState(null);

	const handleCloseSnackbar = () => {
		setSnackbarOpenSuccess(false);
		setSnackbarOpenFailed(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = await getUser();
				setUserData(user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userData) {
			const storageKey = `job_events${userData.company.id}_${userData.id}`;
			const lastSubmissionTime = localStorage.getItem(storageKey);
			if (lastSubmissionTime) {
				const elapsed = Date.now() - new Date(lastSubmissionTime).getTime();
				if (elapsed < SUBMISSION_TIMEOUT) {
					setIsFormDisabled(true);
					setRemainingTime(SUBMISSION_TIMEOUT - elapsed);
				}
			}
		}
	}, [userData]);

	useEffect(() => {
		let timer;
		if (remainingTime !== null && userData) {
			const storageKey = `job_events${userData.company.id}_${userData.id}`;
			timer = setInterval(() => {
				const newRemainingTime = remainingTime - 1000;
				if (newRemainingTime <= 0) {
					clearInterval(timer);
					setIsFormDisabled(false);
					setRemainingTime(null);
					localStorage.removeItem(storageKey);
				} else {
					setRemainingTime(newRemainingTime);
				}
			}, 1000);
		}
		return () => clearInterval(timer);
	}, [remainingTime, userData]);

	const { mutate: addNewJob } = useAddJobs();

	const formik = useFormik({
		initialValues: {
			name: '',
			place: '',
			job_title: '',
			phone: '',
			email: '',
			type: '',
			job_description: '',
			image: '',
		},
		validationSchema: jobValidationSchema,
		onSubmit: async (values) => {
			const storageKey = `job_events${userData.company.id}_${userData.id}`;
			addNewJob(
				{ id: userData.company.id, data: values },
				{
					onSuccess: () => {
						formik.resetForm();
						setImagePreview(null);
						setSnackbarOpenSuccess(true);
						localStorage.setItem(storageKey, new Date().toISOString());
						setIsFormDisabled(true);
						setRemainingTime(SUBMISSION_TIMEOUT);
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
		if (userData) {
			formik.setValues({
				name: userData?.company?.name ?? '',
				place: userData?.company?.address ?? '',
				job_title: '',
				phone: userData?.company?.phone ?? '',
				email: userData?.company?.email ?? '',
				type: '',
				job_description: '',
				image: '',
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

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

	const formatTime = (milliseconds) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		return `${hours}h ${minutes}m ${seconds}s`;
	};

	return !isFormDisabled ? (
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
						disabled={isFormDisabled}
					/>
					<label htmlFor='contained-button-file'>
						<Button
							variant='contained'
							component='span'
							color='primary'
							disabled={isFormDisabled}>
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
						disabled={isFormDisabled}
					/>
					<LocationSelectorWithSwitch
						label='Place'
						field='place'
						formik={formik}
					/>
					<FormikForm
						formik={formik}
						fieldName='job_title'
						label='Job Title'
						disabled={isFormDisabled}
					/>
					<FormikForm
						formik={formik}
						fieldName='phone'
						label='Phone'
						disabled={isFormDisabled}
					/>
					<FormikForm
						formik={formik}
						fieldName='email'
						label='Email'
						disabled={isFormDisabled}
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
						{jobTypes.map((option) => {
							{
								return (
									<MenuItem
										key={option.label}
										value={option.value}>
										{option.value}
									</MenuItem>
								);
							}
						})}
					</TextField>
					<FormikForm
						formik={formik}
						fieldName='job_description'
						label='Job Description'
						disabled={isFormDisabled}
					/>
				</Stack>
				<br />
				<Box textAlign='left'>
					<Button
						type='submit'
						variant='contained'
						disabled={isFormDisabled}>
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
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'
					sx={{ width: '100%' }}>
					حدث خطأ ما, حاول مجددا
				</Alert>
			</Snackbar>
		</Box>
	) : (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
			}}>
			<CircularProgress />
			<Typography
				variant='h6'
				sx={{ mt: 2 }}>
				Please wait, you can submit the form again in{' '}
				{formatTime(remainingTime)}.
			</Typography>
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
				onClose={handleCloseSnackbar}>
				<Alert
					onClose={handleCloseSnackbar}
					severity='error'
					sx={{ width: '100%' }}>
					حدث خطأ ما, حاول مجددا
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default AddJobForm;
