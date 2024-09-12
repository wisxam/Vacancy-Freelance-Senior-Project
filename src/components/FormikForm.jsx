/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';

const FormikForm = ({ formik, fieldName, label }) => {
	return (
		<TextField
			fullWidth
			id={fieldName}
			name={fieldName}
			label={label}
			value={formik.values[fieldName]}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			error={formik.touched[fieldName] && Boolean(formik.errors[fieldName])}
			helperText={formik.touched[fieldName] && formik.errors[fieldName]}
			variant='filled'
		/>
	);
};

export default FormikForm;
