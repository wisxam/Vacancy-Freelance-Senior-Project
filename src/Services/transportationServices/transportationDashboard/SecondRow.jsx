import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Transactions } from './data';

const SecondRow = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	return (
		<Stack
			direction={'row'}
			flexWrap={'wrap'}
			gap={1.2}
			mt={1.3}>
			<Box
				sx={{
					overflow: 'auto',
					borderRadius: '4px',
					minWidth: '280px',
					maxHeight: 355,
					flexGrow: 1,
				}}>
				<Paper>
					<Typography
						color={theme.palette.secondary.main}
						fontWeight={'bold'}
						p={1.2}
						variant='h6'>
						Recent Employee Requests
					</Typography>
				</Paper>
				{Transactions.map((item) => {
					return (
						<Paper
							className='hover:cursor-pointer'
							key={item.user}
							onClick={() => {
								navigate('/transportation/applicants-table');
							}}
							sx={{
								mt: 0.4,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<Box p={1.2}>
								<Typography variant='body1'>Email: {item.mail}</Typography>
								<Typography variant='body2'>Name: {item.user} </Typography>
							</Box>
							<Typography variant='body1'>Date: {item.date} </Typography>
						</Paper>
					);
				})}
			</Box>
		</Stack>
	);
};

export default SecondRow;
