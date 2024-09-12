import { useState } from 'react';
import {
	Button,
	TextField,
	MenuItem,
	Container,
	Typography,
	Box,
} from '@mui/material';
import axios from 'axios';

const services = [
	{ value: 'transportation', label: 'Transportation' },
	{ value: 'cleaning', label: 'Cleaning' },
	{ value: 'insurance', label: 'Insurance' },
	{ value: 'security', label: 'Security' },
];

const CompanyForm = () => {
	const [formData, setFormData] = useState({
		companyName: '',
		description: '',
		email: '',
		service: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/create-company', formData, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store JWT in localStorage
				},
			});
			// Handle successful response (e.g., store new JWT)
			console.log('Company created:', response.data);
			localStorage.setItem('token', response.data.access_token);
		} catch (error) {
			// Handle error
			console.error('Error creating company:', error);
		}
	};

	return (
		<Container maxWidth='sm'>
			<Box mt={5}>
				<Typography
					variant='h4'
					component='h1'
					gutterBottom>
					Become a Company Owner
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField
						margin='dense'
						name='companyName'
						label='Company Name'
						type='text'
						fullWidth
						value={formData.companyName}
						onChange={handleChange}
						required
					/>
					<TextField
						margin='dense'
						name='description'
						label='Description'
						type='text'
						fullWidth
						value={formData.description}
						onChange={handleChange}
						required
					/>
					<TextField
						margin='dense'
						name='email'
						label='Email'
						type='email'
						fullWidth
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<TextField
						margin='dense'
						name='service'
						label='Service'
						select
						fullWidth
						value={formData.service}
						onChange={handleChange}
						required>
						{services.map((option) => (
							<MenuItem
								key={option.value}
								value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<Box mt={3}>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							fullWidth>
							Submit
						</Button>
					</Box>
				</form>
			</Box>
		</Container>
	);
};

export default CompanyForm;
