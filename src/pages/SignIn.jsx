import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import AuthUser from '../utils/AuthUser';
import { services } from '../assets';

const validationSchema = yup.object({
	email: yup
		.string('ادخل البريد الالكتروني')
		.email('ادخل حساب صحيح')
		.required('مطلوب'),
	password: yup.string('أدخل كلمة السر').required('مطلوب'),
});

const SignIn = () => {
	const { http, setToken } = AuthUser();
	const [errorMessage, setErrorMessage] = useState('');
	const [isHovered, setIsHovered] = useState(false);

	const handleFormSubmit = (values) => {
		const formData = new FormData();
		formData.append('email', values.email);
		formData.append('password', values.password);
		sendDataToApi(formData);
	};

	const sendDataToApi = (formData) => {
		http
			.post('/auth/login', formData)
			.then((res) => {
				setToken(res.data.user, res.data.access_token);
				setErrorMessage('');
			})
			.catch((error) => {
				if (error.response && error.response.status === 404) {
					setErrorMessage('البريد الالكتروني أو كلمة المرور غير صحيحة');
				} else {
					setErrorMessage('حدث خطأ ما. الرجاء المحاولة مرة أخرى.');
				}
			});
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: handleFormSubmit,
	});

	return (
		<Box
			className={`relative h-screen flex justify-center items-center transition-all duration-200 ${
				isHovered ? 'bg-[#1A2130]' : 'bg-[#FFF5E1]'
			} bg-opacity-70`}>
			<img
				src={services}
				alt='Background GIF'
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					zIndex: -1,
					transition: 'opacity 0.4s ease',
					opacity: isHovered ? 0.2 : 1,
				}}
			/>
			<Box
				sx={{
					backgroundColor: isHovered ? '#f7efd7e0' : '#1A2130',
					color: isHovered ? '#1A2130' : '#FFF5E1',
					borderRadius: '15px',
					padding: '40px',
					width: '100%',
					maxWidth: '500px',
					textAlign: 'center',
					transition: 'background-color 0.4s, color 0.4s',
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				<p className='text-2xl font-medium flex justify-center p-10 '>
					.مرحبا بك, قم بتسجيل الدخول هنا
				</p>
				<form onSubmit={formik.handleSubmit}>
					{errorMessage && (
						<p className='text-red-500 text-center'>{errorMessage}</p>
					)}
					<TextField
						fullWidth
						id='email'
						name='email'
						label='البريد الالكتروني'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
						sx={{
							marginBottom: '20px',
							'& .MuiInputBase-input': {
								color: isHovered ? '#1A2130' : '#FFF5E1',
							},
							'& .MuiFormLabel-root': {
								color: isHovered ? '#1A2130' : '#FFF5E1',
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '10px',
								'& fieldset': {
									borderColor: isHovered ? '#1A2130' : '#FFF5E1',
								},
								'&:hover fieldset': {
									borderColor: isHovered ? '#1A2130' : '#FFF5E1',
								},
								'&.Mui-focused fieldset': {
									borderColor: isHovered ? '#1A2130' : '#FFF5E1',
								},
							},
						}}
					/>
					<TextField
						fullWidth
						id='password'
						name='password'
						label='كلمة السر'
						type='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
						sx={{
							marginBottom: '20px',
							'& .MuiInputBase-input': {
								color: isHovered ? '#1A2130' : '#FFF5E1',
							},
							'& .MuiFormLabel-root': {
								color: isHovered ? '#1A2130' : '#FFF5E1',
							},
							'& .MuiOutlinedInput-root': {
								borderRadius: '10px',
								'& fieldset': {
									borderColor: isHovered ? '#1A2130' : '#FFF5E1',
								},
								'&:hover fieldset': {
									borderColor: isHovered ? '#1A2130' : '#FFF5E1',
								},
								'&.Mui-focused fieldset': {
									borderColor: isHovered ? '#1A2130' : '#FFF5E1',
								},
							},
						}}
					/>
					<Button
						color='primary'
						variant='contained'
						fullWidth
						type='submit'
						sx={{
							backgroundColor: isHovered ? '#1A2130' : '#FFF5E1',
							color: isHovered ? '#FFF5E1' : '#1A2130',
							'&:hover': {
								backgroundColor: '#FFF5E1',
								color: '#1A2130',
							},
							marginBottom: '20px',
						}}>
						تسجيل دخول
					</Button>
				</form>
				<div className='flex justify-center p-[20px]'>
					<Link
						to='/register'
						className='underline hover:font-bold'>
						.قم بانشاء حسابك الان
					</Link>
					<span> ليس لديك حساب؟ </span>
				</div>
				<div className='flex justify-center p-[20px]'>
					<Link
						to='/reset-password'
						className='underline hover:font-bold'>
						انقر هنا للحصول على كلمة سر جديدة
					</Link>
					<span> نسيت كلمة السر؟ </span>
				</div>
			</Box>
		</Box>
	);
};

export default SignIn;
