import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Container, Stack, Typography } from '@mui/material';
import PageContent from '../../../components/pageContent';
const initialRows = [
	{
		id: 1,
		name: 'Alice Smith',
		email: 'alice@example.com',
		phoneNumber: '123-456-7890',
		address: '456 Oak St, City, Country',
		positionAppliedFor: 'Housekeeper',
		experience: '3 years as a housekeeper',
		skills: 'Cleaning, Organizing, Attention to detail',
		education: 'High School Diploma',
		resumeCV: 'https://example.com/resume/alice-smith',
		status: 'Pending',
	},
	{
		id: 2,
		name: 'Bob Johnson',
		email: 'bob@example.com',
		phoneNumber: '234-567-8901',
		address: '789 Elm St, City, Country',
		positionAppliedFor: 'Janitor',
		experience: '5 years as a janitor',
		skills: 'Floor care, Waste management',
		education: 'Associate Degree in Building Maintenance',
		resumeCV: 'https://example.com/resume/bob-johnson',
		status: 'Interview Scheduled',
	},
	{
		id: 3,
		name: 'Eva Garcia',
		email: 'eva@example.com',
		phoneNumber: '345-678-9012',
		address: '123 Maple St, City, Country',
		positionAppliedFor: 'Office Cleaner',
		experience: '2 years as an office cleaner',
		skills: 'Surface cleaning, Restocking supplies',
		education: 'High School Diploma',
		resumeCV: 'https://example.com/resume/eva-garcia',
		status: 'Hired',
	},
];

const columns = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'phoneNumber',
		headerName: 'Phone Number',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'address',
		headerName: 'Address',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'positionAppliedFor',
		headerName: 'Position Applied For',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'experience',
		headerName: 'Experience',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'skills',
		headerName: 'Skills',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'education',
		headerName: 'Education',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
	{
		field: 'resumeCV',
		headerName: 'Resume/CV',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
		renderCell: () => (
			<a
				href='https://google.com'
				target='_blank' // Open in a new tab
				rel='noopener noreferrer'>
				View Resume/CV
			</a>
		),
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		minWidth: 70,
		editable: 'cell',
	},
];

const CleaningApplicants = () => {
	const [resizeKey, setResizeKey] = useState(0);
	const [rows, setRows] = useState(initialRows);

	const handleEditCellChange = (updatedCell) => {
		setRows((prevRows) =>
			prevRows.map((row) =>
				row.id === updatedCell.id
					? { ...row, [updatedCell.field]: updatedCell.value }
					: row
			)
		);
	};

	useEffect(() => {
		const handleResize = () => {
			setResizeKey((prevKey) => prevKey + 1);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '60vh',
				width: '100%',
			}}>
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
				<PageContent height={'100vh'}>
					<Container maxWidth='lg'>
						<Stack spacing={2}>
							<Typography variant='h4'>Applicants</Typography>
							<DataGrid
								key={resizeKey}
								rows={rows}
								columns={columns}
								slots={{ toolbar: GridToolbar }}
								autoHeight={false}
								autoPageSize={false}
								onRowClick={handleEditCellChange}
							/>
						</Stack>
					</Container>
				</PageContent>
			</Box>
		</Box>
	);
};

export default CleaningApplicants;
