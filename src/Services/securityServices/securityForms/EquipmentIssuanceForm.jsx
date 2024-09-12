import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
	employee_name: yup
		.string('Enter employee name')
		.required('Employee name is required'),
	equipment_description: yup
		.string('Enter equipment description')
		.required('Equipment description is required'),
	serial_number: yup
		.string('Enter serial number')
		.required('Serial number is required'),
	date_issued: yup
		.date('Enter date issued')
		.required('Date issued is required'),
	date_returned: yup.date('Enter date returned'),
	condition: yup.string('Enter condition').required('Condition is required'),
});

const EquipmentIssuanceForm = () => {
	const formik = useFormik({
		initialValues: {
			employee_name: '',
			equipment_description: '',
			serial_number: '',
			date_issued: '',
			date_returned: '',
			condition: '',
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			// Handle form submission
			console.log('Form values:', values);
		},
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				maxWidth: 600, // Set a maximum width for the form
				margin: '0 auto', // Center the form horizontally
				padding: 3, // Add some padding around the form
				boxShadow: 3, // Add some shadow for better visual separation
				borderRadius: 2, // Add border radius for rounded corners
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
					<TextField
						fullWidth
						id='employee_name'
						name='employee_name'
						label='Employee Name'
						value={formik.values.employee_name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.employee_name &&
							Boolean(formik.errors.employee_name)
						}
						helperText={
							formik.touched.employee_name && formik.errors.employee_name
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='equipment_description'
						name='equipment_description'
						label='Equipment Description'
						value={formik.values.equipment_description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.equipment_description &&
							Boolean(formik.errors.equipment_description)
						}
						helperText={
							formik.touched.equipment_description &&
							formik.errors.equipment_description
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='serial_number'
						name='serial_number'
						label='Serial Number'
						value={formik.values.serial_number}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.serial_number &&
							Boolean(formik.errors.serial_number)
						}
						helperText={
							formik.touched.serial_number && formik.errors.serial_number
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='date_issued'
						name='date_issued'
						label='Date Issued'
						type='date'
						InputLabelProps={{ shrink: true }}
						value={formik.values.date_issued}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.date_issued && Boolean(formik.errors.date_issued)
						}
						helperText={formik.touched.date_issued && formik.errors.date_issued}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='date_returned'
						name='date_returned'
						label='Date Returned'
						type='date'
						InputLabelProps={{ shrink: true }}
						value={formik.values.date_returned}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={
							formik.touched.date_returned &&
							Boolean(formik.errors.date_returned)
						}
						helperText={
							formik.touched.date_returned && formik.errors.date_returned
						}
						variant='filled'
					/>
					<TextField
						fullWidth
						id='condition'
						name='condition'
						label='Condition'
						value={formik.values.condition}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.condition && Boolean(formik.errors.condition)}
						helperText={formik.touched.condition && formik.errors.condition}
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
		</Box>
	);
};

export default EquipmentIssuanceForm;
