/* eslint-disable react/prop-types */
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EventsCard = ({ icon, events, location }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Paper
			sx={{
				flexGrow: 1,
				width: '250px',
				p: 2,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				backgroundColor: theme.palette.background.default,
				borderRadius: '20px',
				boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
			}}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					overflowX: 'auto',
					'&::-webkit-scrollbar': {
						height: '6px',
					},
					// '&::-webkit-scrollbar-thumb': {
					// 	backgroundColor: theme.palette.secondary.main,
					// 	borderRadius: '10px',
					// },
				}}>
				{icon}
				{events?.map((option) => (
					<Box
						key={option.id}
						sx={{
							p: 2,
							boxShadow: theme.shadows[15],
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							minWidth: '200px',
							margin: '10px',
							position: 'relative',
							borderRadius: '4px',
							cursor: 'pointer',
							transition: 'transform 0.2s, box-shadow 0.2s',
							'&:hover': {
								transform: 'scale(1.05)',
								boxShadow: theme.shadows[4],
							},
						}}
						onClick={() => {
							navigate(`/${location}/calender`);
						}}>
						<Typography
							variant='body2'
							sx={{
								fontSize: '15px',
								zIndex: 1,
								color: theme.palette.text.primary,
								padding: '2px',
								textAlign: 'center',
								lineHeight: '1.2',
							}}>
							{option.title}
						</Typography>
						<Typography
							variant='body2'
							sx={{
								fontSize: '14px',
								color: theme.palette.text.secondary,
								zIndex: 1,
								padding: '4px 8px',
								textAlign: 'center',
								lineHeight: '1.2',
							}}>
							{`Start: ${new Date(
								option.start
							).toLocaleDateString()} - End: ${new Date(
								option.end
							).toLocaleDateString()}`}
						</Typography>
					</Box>
				))}
			</Box>
		</Paper>
	);
};

export default EventsCard;
