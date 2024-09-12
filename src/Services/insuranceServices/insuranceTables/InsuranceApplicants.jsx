import { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const initialRows = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		phoneNumber: '123-456-7890',
		address: '123 Main St, City, Country',
		positionAppliedFor: 'Driver',
		experience: '5 years as a truck driver',
		skills: 'Commercial driving license, excellent navigation skills',
		education: 'High School Diploma',
		resumeCV: 'Link to resume/CV',
		applicationDate: '2024-05-15',
		status: 'Pending',
		interviewDate: null,
		backgroundCheck: 'Clear',
		references: 'John Smith (Supervisor) - 555-123-4567',
	},
	// Add more rows as needed
];

const columns = [
	{
		field: 'name',
		headerName: 'Name',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'email',
		headerName: 'Email',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'phoneNumber',
		headerName: 'Phone Number',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'address',
		headerName: 'Address',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'positionAppliedFor',
		headerName: 'Position Applied For',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'experience',
		headerName: 'Experience',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'skills',
		headerName: 'Skills',
		maxWidth: 100,
		flex: 1,
		minWidth: 50,
		editable: 'cell',
	},
	{
		field: 'education',
		headerName: 'Education',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'resumeCV',
		headerName: 'Resume/CV',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		renderCell: () => (
			<a
				href='https://google.com'
				target='_blank' // Open in a new tab
				rel='noopener noreferrer'>
				View Resume/CV
			</a>
		),
		maxWidth: 100,
	},
	{
		field: 'applicationDate',
		headerName: 'Application Date',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'status',
		headerName: 'Status',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'interviewDate',
		headerName: 'Interview Date',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'backgroundCheck',
		headerName: 'Background Check',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
	{
		field: 'references',
		headerName: 'References',
		flex: 1,
		minWidth: 50,
		editable: 'cell',
		maxWidth: 100,
	},
];

const InsuranceApplicants = () => {
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
				<DataGrid
					key={resizeKey}
					rows={rows}
					columns={columns}
					slots={{ toolbar: GridToolbar }}
					autoHeight={false}
					autoPageSize={false}
					onEditCellChange={handleEditCellChange}
				/>
			</Box>
		</Box>
	);
};

export default InsuranceApplicants;
