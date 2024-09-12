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
		resumeCV: 'https://example.com/resume/john-doe',
		status: 'Pending',
		interviewDate: null,
		backgroundCheck: 'Clear',
		references: 'John Smith (Supervisor) - 555-123-4567',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@example.com',
		phoneNumber: '234-567-8901',
		address: '456 Elm St, City, Country',
		positionAppliedFor: 'Security Guard',
		experience: '3 years as a security guard',
		skills: 'Surveillance, First Aid',
		education: 'Associate Degree in Criminal Justice',
		resumeCV: 'https://example.com/resume/jane-smith',
		status: 'Pending',
		interviewDate: '2024-06-01',
		backgroundCheck: 'Pending',
		references: 'Mark Johnson (Manager) - 555-234-5678',
	},
	{
		id: 3,
		name: 'Robert Johnson',
		email: 'robert@example.com',
		phoneNumber: '345-678-9012',
		address: '789 Pine St, City, Country',
		positionAppliedFor: 'IT Security Specialist',
		experience: '8 years in IT security',
		skills: 'Network security, Cybersecurity',
		education: 'Bachelor’s Degree in Information Technology',
		resumeCV: 'https://example.com/resume/robert-johnson',
		status: 'Interview Scheduled',
		interviewDate: '2024-05-25',
		backgroundCheck: 'Clear',
		references: 'Emily Davis (Director) - 555-345-6789',
	},
	{
		id: 4,
		name: 'Emily Davis',
		email: 'emily@example.com',
		phoneNumber: '456-789-0123',
		address: '123 Oak St, City, Country',
		positionAppliedFor: 'Security Analyst',
		experience: '6 years as a security analyst',
		skills: 'Risk assessment, Incident response',
		education: 'Master’s Degree in Cybersecurity',
		resumeCV: 'https://example.com/resume/emily-davis',
		status: 'Hired',
		interviewDate: '2024-05-20',
		backgroundCheck: 'Clear',
		references: 'Michael Brown (Team Lead) - 555-456-7890',
	},
	{
		id: 5,
		name: 'Michael Brown',
		email: 'michael@example.com',
		phoneNumber: '567-890-1234',
		address: '456 Birch St, City, Country',
		positionAppliedFor: 'Patrol Officer',
		experience: '4 years as a patrol officer',
		skills: 'Patrolling, Conflict resolution',
		education: 'High School Diploma',
		resumeCV: 'https://example.com/resume/michael-brown',
		status: 'Rejected',
		interviewDate: '2024-05-18',
		backgroundCheck: 'Clear',
		references: 'Lisa Wilson (Supervisor) - 555-567-8901',
	},
];

const columns = [
	{ field: 'name', headerName: 'Name', flex: 1, minWidth: 150, editable: true },
	{
		field: 'email',
		headerName: 'Email',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
	{
		field: 'phoneNumber',
		headerName: 'Phone Number',
		flex: 1,
		minWidth: 150,
		editable: true,
	},
	{
		field: 'address',
		headerName: 'Address',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
	{
		field: 'positionAppliedFor',
		headerName: 'Position Applied For',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
	{
		field: 'experience',
		headerName: 'Experience',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
	{
		field: 'skills',
		headerName: 'Skills',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
	{
		field: 'education',
		headerName: 'Education',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
	{
		field: 'resumeCV',
		headerName: 'Resume/CV',
		flex: 1,
		minWidth: 200,
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
		minWidth: 150,
		editable: true,
	},
	{
		field: 'interviewDate',
		headerName: 'Interview Date',
		flex: 1,
		minWidth: 150,
		editable: true,
	},
	{
		field: 'backgroundCheck',
		headerName: 'Background Check',
		flex: 1,
		minWidth: 150,
		editable: true,
	},
	{
		field: 'references',
		headerName: 'References',
		flex: 1,
		minWidth: 200,
		editable: true,
	},
];

const SecurityApplicants = () => {
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

export default SecurityApplicants;
