import { Stack } from '@mui/material';
import { FirstRow, SecondRow, ThirdRow } from './index';
import { Header } from '../../../components';
import useAuthUser from '../../../utils/AuthUser';
import { useEffect, useState } from 'react';

const TransportationDashboard = () => {
	const [userData, setUserData] = useState(null);
	const { getUser } = useAuthUser();
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
	return (
		<div>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}>
				<Header
					isDashboard={true}
					title={userData?.company?.name}
					subTitle={'Welcome to your dashboard'}
				/>
			</Stack>
			<FirstRow />
			<SecondRow />
			<ThirdRow />
		</div>
	);
};

export default TransportationDashboard;
