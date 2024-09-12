import { Stack, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
// import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrafficIcon from '@mui/icons-material/Traffic';
import { data1, data3, data4 } from './data';
import { Card } from '../../../components';

const FirstRow = () => {
	const theme = useTheme();
	return (
		<Stack
			direction={'row'}
			flexWrap={'wrap'}
			gap={1}
			justifyContent={{ xs: 'center', sm: 'space-between' }}>
			<Card
				icon={
					<EmailIcon
						sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
					/>
				}
				title={'23'}
				subTitle={'Emails Sent'}
				data={data1}
				scheme={'nivo'}
			/>

			{/* <Card
				icon={
					<PointOfSaleIcon
						sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
					/>
				}
				title={'431,225'}
				subTitle={'Sales obtained'}
				increase={'+21%'}
				data={data2}
				scheme={'category10'}
			/> */}

			<Card
				icon={
					<PersonAddIcon
						sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
					/>
				}
				title={'12'}
				subTitle={'New Companies'}
				data={data3}
				scheme={'accent'}
			/>
			<Card
				icon={
					<TrafficIcon
						sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
					/>
				}
				title={'42'}
				subTitle={'Company Requests'}
				data={data4}
				scheme={'dark2'}
			/>
		</Stack>
	);
};

export default FirstRow;
