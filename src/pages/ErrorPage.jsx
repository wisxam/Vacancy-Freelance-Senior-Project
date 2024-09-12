import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<div className='text-center p-[10%]  opacity-75 hover:opacity-100'>
			<h1 className='font-bold text-[130px]'>{error.status}</h1>
			<p className='font-bold text-[50px]'>{error.statusText}</p>
			<Link
				className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
				to='/'
				replace={true}>
				{''}
				looks like you tried to reach something that does not exist at the
				moment
			</Link>
		</div>
	);
};

export default ErrorPage;
