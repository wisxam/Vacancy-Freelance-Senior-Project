import {
	Box,
	// IconButton,
	Paper,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
// import { DownloadOutlined } from '@mui/icons-material';
import { Transactions } from './data';

const SecondRow = () => {
	const theme = useTheme();
	return (
		<Stack
			direction={'row'}
			flexWrap={'wrap'}
			gap={1.2}
			mt={1.3}>
			{/* <Paper sx={{ maxWidth: 900, flexGrow: 1, minWidth: '400px' }}>
				<Stack
					alignItems={'center'}
					direction={'row'}
					flexWrap={'wrap'}
					justifyContent={'space-between'}>
					<Box>
						<Typography
							color={theme.palette.secondary.main}
							mb={1}
							mt={2}
							ml={4}
							variant='h6'
							fontWeight={'bold'}></Typography>
						<Typography
							variant='body2'
							ml={4}></Typography>
					</Box>

					<Box>
						<IconButton sx={{ mr: 3 }}>
							<DownloadOutlined />
						</IconButton>
					</Box>
				</Stack>
			</Paper> */}

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
						Recent Companies
					</Typography>
				</Paper>
				{Transactions.map((item) => {
					return (
						<Paper
							key={item.txId}
							sx={{
								mt: 0.4,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<Box p={1.2}>
								<Typography variant='body2'>User Name: {item.user} </Typography>
								<Typography variant='body2'>Email: {item.mail} </Typography>
							</Box>
							<Typography variant='body1'>Joined in: {item.date} </Typography>
						</Paper>
					);
				})}
			</Box>
		</Stack>
	);
};

export default SecondRow;
