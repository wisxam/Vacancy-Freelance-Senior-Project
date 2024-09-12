import axios from 'axios';

const client = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/',
});

export const request = async ({ url, params = {}, ...rest }) => {
	if (sessionStorage.token)
		client.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
			sessionStorage.token
		)}`;

	const onSuccess = (response) => response;

	const onError = (error) => {
		return Promise.reject(error);
	};

	return client({ url, params, ...rest })
		.then(onSuccess)
		.catch(onError);
};
