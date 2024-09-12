import { Card, CardContent } from '@mui/material';

// eslint-disable-next-line react/prop-types
export default function PageContent({ children, height, flex }) {
	return (
		<Card sx={{ height: height ? height : '20%', display: flex ? flex : '' }}>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
