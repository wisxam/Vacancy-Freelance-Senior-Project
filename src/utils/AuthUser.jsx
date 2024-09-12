import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAuthUser = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);

	const getToken = () => {
		const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		return userToken;
	};

	const getUser = () => {
		const userString = sessionStorage.getItem('user');
		const userDetails = JSON.parse(userString);
		return userDetails;
	};

	const getUserCompany = () => {
		const userDetails = getUser();
		if (userDetails && userDetails.company) {
			return userDetails.company.type;
		}
		return null;
	};

	const saveToken = (user, token) => {
		sessionStorage.setItem('token', JSON.stringify(token));
		sessionStorage.setItem('user', JSON.stringify(user));
		setToken(token);
		setUser(user);
		navigate('/');
	};

	const http = axios.create({
		baseURL: 'http://127.0.0.1:8000/api',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token ? `Bearer ${token}` : '',
		},
	});

	useEffect(() => {
		http.defaults.headers.Authorization = token ? `Bearer ${token}` : '';
	}, [http.defaults.headers, token]);

	return {
		setToken: saveToken,
		token,
		user,
		getToken,
		http,
		getUser,
		getUserCompany,
	};
};

export default useAuthUser;
