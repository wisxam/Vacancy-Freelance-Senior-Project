import { useEffect, useState } from 'react';
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
import * as yup from 'yup';
import { useFormik } from 'formik';
import useAuthUser from '../../../utils/AuthUser';
import { useAddTransportationRoute } from '../hooks/new';
import LocationSelectorWithSwitch from '../../../components/LocationSelectorWithSwitch';

const route_type = [
	{ value: 'ذهاب', label: 'ذهاب' },
	{ value: 'عودة', label: 'عودة' },
];

const route_name = [
	{ value: 'ميسات', label: 'ميسات' },
	{ value: 'حاميش', label: 'حاميش' },
	{ value: 'عدوي', label: 'عدوي' },
	{ value: 'المالكي', label: 'المالكي' },
	{ value: 'غير ذلك', label: 'غير ذلك' },
];

const validationSchema = yup.object({
	name: yup.string().required('Name is required'),
	type: yup.string().required('Type is required'),
	Starting: yup.string().required('Starting is required'),
	start_location: yup.string().required('Start location is required'),
	end_location: yup.string().required('End location is required'),
	distance: yup.string().required('Distance is required'),
	duration: yup.string().required('Duration is required'),
	checkpoints: yup.string().required('Check points are required'),
});

const TransportationRoutesForm = () => {
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

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

	const { mutate: addNewRoute } = useAddTransportationRoute();

	const formik = useFormik({
		initialValues: {
			name: 'غير ذلك',
			type: '',
			Starting: '',
			start_location: '',
			end_location: '',
			distance: '',
			duration: '',
			checkpoints: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			addNewRoute(
				{ id: userData?.company?.id, data: values },
				{
					onSuccess: () => {
						formik.resetForm();
						setSnackbarOpen(true);
					},
					onError: (error) => {
						console.error('Error updating data:', error);
					},
				}
			);
		},
	});

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const generateTimeIntervals = (start, end, interval) => {
		const times = [];
		let current = start;

		while (current <= end) {
			const hours = Math.floor(current / 60);
			const minutes = current % 60;
			const timeString = `${hours.toString().padStart(2, '0')}:${minutes
				.toString()
				.padStart(2, '0')}`;
			times.push({ value: timeString, label: timeString });
			current += interval;
		}

		return times;
	};

	const timeIntervals = generateTimeIntervals(0, 24 * 60, 90);

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
				Routes Form
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<Stack
					direction='column'
					gap={3}>
					<TextField
						fullWidth
						id='name'
						name='name'
						label='Route Name'
						select
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						variant='filled'>
						{route_name.map((option) => (
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
						label='Route Type'
						select
						value={formik.values.type}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.type && Boolean(formik.errors.type)}
						helperText={formik.touched.type && formik.errors.type}
						variant='filled'>
						{route_type.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						fullWidth
						id='Starting'
						name='Starting'
						label='Starting'
						select
						value={formik.values.Starting}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.Starting && Boolean(formik.errors.Starting)}
						helperText={formik.touched.Starting && formik.errors.Starting}
						variant='filled'>
						{timeIntervals.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<LocationSelectorWithSwitch
						label='Start Location'
						field='start_location'
						formik={formik}
					/>
					<LocationSelectorWithSwitch
						label='End Location'
						field='end_location'
						formik={formik}
					/>
					<TextField
						fullWidth
						id='distance'
						name='distance'
						label='Distance'
						value={formik.values.distance}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.distance && Boolean(formik.errors.distance)}
						helperText={formik.touched.distance && formik.errors.distance}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='duration'
						name='duration'
						label='Duration'
						value={formik.values.duration}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.duration && Boolean(formik.errors.duration)}
						helperText={formik.touched.duration && formik.errors.duration}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='checkpoints'
						name='checkpoints'
						label='Check points'
						value={formik.values.checkpoints}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.checkpoints && Boolean(formik.errors.checkpoints)
						}
						helperText={formik.touched.checkpoints && formik.errors.checkpoints}
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
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleSnackbarClose}>
				<Alert
					onClose={handleSnackbarClose}
					severity='success'
					sx={{ width: '100%' }}>
					تمت العملية بنجاح
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default TransportationRoutesForm;
