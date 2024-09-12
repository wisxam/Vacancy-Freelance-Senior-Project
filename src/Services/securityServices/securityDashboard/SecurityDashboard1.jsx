import Button from '@mui/material/Button';
import { DownloadOutlined } from '@mui/icons-material';
import { Box, Stack } from '@mui/material';
import { FirstRow, SecondRow, ThirdRow } from './index';
import { Header } from '../../../components';

const SecurityDashboard = () => {
	return (
		<div>
			<Stack
				direction={'row'}
				justifyContent={'space-between'}
				alignItems={'center'}>
				<Header
					isDashboard={true}
					title={'DASHBOARD'}
					subTitle={'Welcome to your dashboard'}
				/>

				<Box sx={{ textAlign: 'right', mb: 1.3 }}>
					<Button
						sx={{ padding: '6px 8px', textTransform: 'capitalize' }}
						variant='contained'
						color='primary'>
						<DownloadOutlined />
						Download Reports
					</Button>
				</Box>
			</Stack>
			<FirstRow />
			<SecondRow />
			<ThirdRow />
		</div>
	);
};

export default SecurityDashboard;
