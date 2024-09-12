// sidebarItems.js

import HomeIcon from '@mui/icons-material/Home';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import StoreIcon from '@mui/icons-material/Store';
import PeopleOutlined from '@mui/icons-material/PeopleOutlined';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import ConstructionIcon from '@mui/icons-material/Construction';

const transportationAO = [
	{
		name: 'Dashboard',
		icon: 'HomeIcon',
		path: 'transportation',
	},
	{
		name: 'Vacant Table',
		icon: 'InsertDriveFileIcon',
		path: 'transportation/vacant-table',
	},
	{
		name: 'Vacant Form',
		icon: 'InsertDriveFileIcon',
		path: 'transportation/vacant-form',
	},
	{
		name: 'Applicants',
		icon: 'PeopleOutlined',
		path: 'transportation/applicants-table',
	},
	{
		name: 'Busses',
		icon: 'DirectionsBusIcon',
		path: 'transportation/busses-table',
	},
	{
		name: 'Employees',
		icon: 'BadgeOutlinedIcon',
		path: 'transportation/employees-table',
	},
	{
		name: 'Calendar',
		icon: 'CalendarMonthIcon',
		path: 'transportation/calender',
	},
	{
		name: 'Employee Form',
		icon: 'BadgeOutlinedIcon',
		path: 'transportation/employee-form',
	},
	{
		name: 'Bus Form',
		icon: 'DirectionsBusIcon',
		path: 'transportation/bus-form',
	},
	{
		name: 'Pie Chart',
		icon: 'PieChartOutlineIcon',
		path: 'transportation/pie-chart',
	},
	{
		name: 'User Profile',
		icon: 'AccountBoxIcon',
		path: 'transportation/user-profile',
	},
	{
		name: 'Route Table',
		icon: 'DirectionsOutlinedIcon',
		path: 'transportation/route-table',
	},
	{
		name: 'Route Form',
		icon: 'InsertDriveFileIcon',
		path: 'transportation/route-form',
	},
];

const securityAO = [
	{
		name: 'Dashboard',
		icon: 'HomeIcon',
		path: 'security',
	},
	{
		name: 'Employees',
		icon: 'BadgeOutlinedIcon',
		path: 'security/employees-table',
	},
	{
		name: 'Weapons',
		icon: 'CrisisAlertIcon',
		path: 'security/weapons-table',
	},
	{
		name: 'Equipment',
		icon: 'HomeRepairServiceIcon',
		path: 'security/equipment-form',
	},
	{
		name: 'Weapons form',
		icon: 'InsertDriveFileIcon',
		path: 'security/weapons-form',
	},
	{
		name: 'Employee form',
		icon: 'InsertDriveFileIcon',
		path: 'security/employee-form',
	},
	{
		name: 'Calender',
		icon: 'CalendarMonthIcon',
		path: 'security/calender',
	},
	{
		name: 'Pie Chart',
		icon: 'PieChartOutlineIcon',
		path: 'security/pie-chart',
	},
	{
		name: 'User Profile',
		icon: 'AccountBoxIcon',
		path: 'security/user-profile',
	},
	{
		name: 'Vehicles',
		icon: 'AccountBoxIcon',
		path: 'security/vehicles-table',
	},
	{
		name: 'Applicants',
		icon: 'InsertDriveFileIcon',
		path: 'security/applicants-table',
	},
	{
		name: 'Vacant Table',
		icon: 'InsertDriveFileIcon',
		path: 'security/vacant-table',
	},
	{
		name: 'Vacant Form',
		icon: 'InsertDriveFileIcon',
		path: 'security/vacant-form',
	},
];

const cleaningAO = [
	{
		name: 'Dashboard',
		icon: 'HomeIcon',
		path: 'cleaning',
	},

	{
		name: 'Employees',
		icon: 'BadgeOutlinedIcon',
		path: 'cleaning/employees-table',
	},
	{
		name: 'Employees',
		icon: 'BadgeOutlinedIcon',
		path: 'cleaning/employees-form',
	},
	{
		name: 'User Profile',
		icon: 'AccountBoxIcon',
		path: 'cleaning/user-profile',
	},
	{
		name: 'Calender',
		icon: 'CalendarMonthIcon',
		path: 'cleaning/calender',
	},
	{
		name: 'Supplies',
		icon: 'InsertDriveFileIcon',
		path: 'cleaning/supplies-table',
	},
	{
		name: 'Pie Chart',
		icon: 'PieChartOutlineIcon',
		path: 'cleaning/pie-chart',
	},
	{
		name: 'Supplies',
		icon: 'InsertDriveFileIcon',
		path: 'cleaning/supplies-form',
	},
	{
		name: 'Applicants',
		icon: 'InsertDriveFileIcon',
		path: 'cleaning/applicants-table',
	},
	{
		name: 'Vacant Table',
		icon: 'InsertDriveFileIcon',
		path: 'cleaning/vacant-table',
	},
	{
		name: 'Vacant Form',
		icon: 'InsertDriveFileIcon',
		path: 'cleaning/vacant-form',
	},
];

const insuranceAO = [
	{
		name: 'Dashboard',
		icon: 'HomeIcon',
		path: 'insurance',
	},
	{
		name: 'Employees',
		icon: 'BadgeOutlinedIcon',
		path: 'insurance/employees-table',
	},
	{
		name: 'User Profile',
		icon: 'AccountBoxIcon',
		path: 'insurance/user-profile',
	},
	{
		name: 'Calender',
		icon: 'CalendarMonthIcon',
		path: 'insurance/calender',
	},
	{
		name: 'Clients',
		icon: 'StoreIcon',
		path: 'insurance/clients-table',
	},
	{
		name: 'Pie Chart',
		icon: 'PieChartOutlineIcon',
		path: 'insurance/pie-chart',
	},
	{
		name: 'Partners',
		icon: 'PieChartOutlineIcon',
		path: 'insurance/partners-table',
	},
	{
		name: 'Employees',
		icon: 'InsertDriveFileIcon',
		path: 'insurance/employees-form',
	},
	{
		name: 'Partners',
		icon: 'PieChartOutlineIcon',
		path: 'insurance/partners-form',
	},
	{
		name: 'Reinsurer',
		icon: 'PieChartOutlineIcon',
		path: 'insurance/reinsurer-table',
	},
	{
		name: 'Reinsurer',
		icon: 'PieChartOutlineIcon',
		path: 'insurance/reinsurer-form',
	},
	{
		name: 'Broaker',
		icon: 'PeopleOutlined',
		path: 'insurance/broaker-table',
	},
	{
		name: 'Broaker',
		icon: 'PeopleOutlined',
		path: 'insurance/broaker-form',
	},
	{
		name: 'Applicants',
		icon: 'InsertDriveFileIcon',
		path: 'insurance/applicants-table',
	},
	{
		name: 'Vacant Table',
		icon: 'InsertDriveFileIcon',
		path: 'insurance/vacant-table',
	},
	{
		name: 'Vacant Form',
		icon: 'InsertDriveFileIcon',
		path: 'insurance/vacant-form',
	},
];

const adminAO = [
	{
		name: 'Dashboard',
		icon: 'HomeIcon',
		path: 'admin',
	},
	{
		name: 'All Comp/Requests',
		icon: 'PeopleOutlined',
		path: 'admin/all-company-requests',
	},

	{
		name: 'All Employees',
		icon: 'PeopleOutlined',
		path: 'admin/all-employees-table',
	},
	{
		name: 'All Busses',
		icon: 'DirectionsBusIcon',
		path: 'admin/all-busses-table',
	},
	{
		name: 'All Routes',
		icon: 'DirectionsOutlinedIcon',
		path: 'admin/all-routes-table',
	},
	{
		name: 'All Weapons',
		icon: 'CrisisAlertIcon',
		path: 'admin/all-weapons-table',
	},
	{
		name: 'All Broakers',
		icon: 'GroupsIcon',
		path: 'admin/all-broakers-table',
	},
	{
		name: 'All Partners',
		icon: 'GroupsIcon',
		path: 'admin/all-partners-table',
	},
	{
		name: 'All Reinsurers',
		icon: 'GroupsIcon',
		path: 'admin/all-reinsurers-table',
	},
	{
		name: 'All C/Equipment',
		icon: 'ConstructionIcon',
		path: 'admin/all-cleaning-equipments-table',
	},
	{
		name: 'All S/Equipment',
		icon: 'HomeRepairServiceIcon',
		path: 'admin/all-security-vehicles-table',
	},
];

export {
	transportationAO,
	securityAO,
	cleaningAO,
	insuranceAO,
	adminAO,
	HomeIcon,
	DirectionsBusIcon,
	BadgeOutlinedIcon,
	CalendarMonthIcon,
	InsertDriveFileIcon,
	PieChartOutlineIcon,
	AccountBoxIcon,
	CrisisAlertIcon,
	HomeRepairServiceIcon,
	StoreIcon,
	PeopleOutlined,
	DirectionsOutlinedIcon,
	GroupsIcon,
	ConstructionIcon,
};
