/* eslint-disable react/prop-types */
import TextField from '@mui/material/TextField';

const ReusableTextField = ({
	margin,
	name,
	label,
	type,
	fullWidth,
	value,
	onChange,
}) => {
	return (
		<TextField
			margin={margin || 'dense'}
			name={name}
			label={label}
			type={type || 'text'}
			fullWidth={fullWidth !== undefined ? fullWidth : true}
			value={value || ''}
			onChange={onChange}
		/>
	);
};

export default ReusableTextField;
