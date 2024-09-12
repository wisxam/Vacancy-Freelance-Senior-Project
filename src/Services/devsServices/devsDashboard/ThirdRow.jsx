import { Paper, Stack, Typography, useTheme } from '@mui/material';
import SecurityPiechart from './SecurityPiechart';

const ThirdRow = () => {
	const theme = useTheme();
	return (
		<Stack
			gap={1.5}
			direction={'row'}
			flexWrap={'wrap'}
			mt={1.4}>
			<Paper sx={{ flexGrow: 1, minWidth: '400px', width: '28%' }}>
				<Typography
					color={theme.palette.secondary.main}
					sx={{ padding: '30px 30px 0 30px' }}
					variant='h6'
					fontWeight='600'>
					General Data Overview
				</Typography>

				<SecurityPiechart isDashbord={true} />
				<Typography
					variant='h6'
					align='center'
					sx={{ mt: '15px' }}></Typography>
			</Paper>
		</Stack>
	);
};

export default ThirdRow;
