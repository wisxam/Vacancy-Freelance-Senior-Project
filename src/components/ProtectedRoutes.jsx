/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';
import useAuthUser from '../utils/AuthUser.jsx';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ allowedRoles }) => {
	const { getUser } = useAuthUser();
	const user = getUser();

	if (!user) {
		return <Navigate to='/log-in' />;
	}

	if (allowedRoles && !allowedRoles.includes(user?.company?.type)) {
		return <Navigate to='/not-authorized' />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
