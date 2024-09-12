import { useState, useEffect } from 'react';
import {
	CircularProgress,
	Stack,
	useTheme,
	Menu,
	MenuItem,
	IconButton,
} from '@mui/material';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { Card } from '../../../components';
import { useNavigate } from 'react-router-dom';
import {
	useGetEmployeeStatsStatistics,
	useGetAllApplicantsForCompany,
	useGetAllBussesForCertainCompany,
	useGetBussesStatusByCompany,
	useGetEmployeeRatingPerCompany,
	useGetEmployeeCountForCertainCompany,
} from '../../hooks/sharedGet';
import useAuthUser from '../../../utils/AuthUser';
import { EventsCard } from '../../../components';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const FirstRow = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const { getUser } = useAuthUser();
	const [userData, setUserData] = useState(null);
	const [selectedValue, setSelectedValue] = useState('مكتبي');
	const [selectedValueBusses, setSelectedValueBusses] = useState('متوفر');
	const [selectedValueRatings, setSelectedValueRatings] = useState('1');
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorElBusses, setAnchorElBusses] = useState(null);
	const [anchorElRatings, setAnchorElRatings] = useState(null);
	const linkTo = userData?.company?.type.toLowerCase();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const user = getUser();
				setUserData(user);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getEventsData = localStorage.getItem(
		`company_events_${userData?.company?.id}_${userData?.id}`
	);

	const parsedEvents = JSON.parse(getEventsData);

	const {
		data: employeeStats1,
		refetch: refetchEmployeeStats,
		loading: employeeLoading,
	} = useGetEmployeeStatsStatistics(selectedValue, userData?.company?.id);

	const { data: companyApplicants } = useGetAllApplicantsForCompany(
		userData?.company?.id
	);

	const { data: busCount } = useGetAllBussesForCertainCompany(
		userData?.company?.id
	);

	const { data: bussesStatus, refetch: refetchBussesStatus } =
		useGetBussesStatusByCompany(selectedValueBusses, userData?.company?.id);

	const { data: employeeRating, refetch: refetchEmployeeRating } =
		useGetEmployeeRatingPerCompany(selectedValueRatings, userData?.company?.id);

	const { data: allEmployees } = useGetEmployeeCountForCertainCompany(
		userData?.company?.id
	);

	const handleNavigate = (path) => {
		navigate(path);
	};

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = (value) => {
		setAnchorEl(null);
		if (value !== selectedValue) {
			setSelectedValue(value);
		}
	};

	const handleMenuOpenBusses = (event) => {
		setAnchorElBusses(event.currentTarget);
	};

	const handleMenuCloseBusses = (value) => {
		setAnchorElBusses(null);
		if (value !== selectedValueBusses) {
			setSelectedValueBusses(value);
		}
	};

	const handleMenuOpenRatings = (event) => {
		setAnchorElRatings(event.currentTarget);
	};

	const handleMenuCloseRatings = (value) => {
		setAnchorElRatings(null);
		if (value !== selectedValueRatings) {
			setSelectedValueRatings(value);
		}
	};

	useEffect(() => {
		if (userData?.company?.id) {
			refetchEmployeeStats();
		}
		if (userData?.company?.id) {
			refetchBussesStatus();
		}
		if (userData?.company?.id) {
			refetchEmployeeRating();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedValue, selectedValueBusses, selectedValueRatings]);

	const data1 = [
		{
			id: selectedValue,
			label: selectedValue,
			value: employeeStats1?.data?.value,
			color: 'hsl(22, 90%, 90%)',
		},
		{
			id: 'applicants',
			label: 'Applicants',
			value: companyApplicants?.data?.value,
		},
	];

	const data2 = [
		{
			id: selectedValueBusses,
			label: selectedValueBusses,
			value: bussesStatus?.data?.value,
			color: 'hsl(22, 90%, 90%)',
		},
		{
			id: 'busses',
			label: 'Busses',
			value: busCount?.data?.value || 0,
			color: 'hsl(22, 90%, 90%)',
		},
	];

	const data3 = [
		{
			id: selectedValueRatings,
			label: `Rating ${selectedValueRatings}`,
			value: employeeRating?.data?.value,
			color: 'hsl(22, 90%, 90%)',
		},
		{
			id: 'busses',
			label: 'Busses',
			value: allEmployees?.data?.value,
			color: 'hsl(22, 90%, 90%)',
		},
	];

	return userData || employeeLoading ? (
		<Stack
			direction={'row'}
			flexWrap={'wrap'}
			gap={2}
			justifyContent={{ xs: 'center', sm: 'space-between' }}>
			<Card
				icon={
					<IconButton onClick={handleMenuOpen}>
						<AccessibilityIcon
							sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
						/>
					</IconButton>
				}
				title={`الموظفين ${selectedValue}: ${employeeStats1?.data?.value} `}
				className='hover:cursor-pointer'
				subTitle={`المتقدمين للوظائف
					: ${companyApplicants?.data?.value}`}
				data={data1}
				scheme={'nivo'}
				onClick={() => handleNavigate('/transportation/employees-table')}
			/>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}>
				<MenuItem onClick={() => handleMenuClose('مكتبي')}>مكتبي</MenuItem>
				<MenuItem onClick={() => handleMenuClose('على الارض')}>
					على الارض
				</MenuItem>
			</Menu>
			<Card
				icon={
					<IconButton onClick={handleMenuOpenBusses}>
						<DirectionsBusFilledIcon
							sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
						/>
					</IconButton>
				}
				title={`${selectedValueBusses}: ${bussesStatus?.data?.value || 0}`}
				subTitle={`Busses: ${busCount?.data?.value}`}
				data={data2}
				scheme={'category10'}
				onClick={() => handleNavigate('/transportation/busses-table')}
			/>
			<Menu
				anchorEl={anchorElBusses}
				open={Boolean(anchorElBusses)}
				onClose={() => setAnchorElBusses(null)}>
				<MenuItem onClick={() => handleMenuCloseBusses('متوفر')}>
					متوفر
				</MenuItem>
				<MenuItem onClick={() => handleMenuCloseBusses('غير متاح')}>
					غير متاح
				</MenuItem>
				<MenuItem onClick={() => handleMenuCloseBusses('في الصيانة')}>
					في الصيانة
				</MenuItem>
			</Menu>
			<Card
				icon={
					<IconButton onClick={handleMenuOpenRatings}>
						<PersonAddIcon
							sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
						/>
					</IconButton>
				}
				title={`Rating: ${employeeRating?.data?.value || 0}`}
				data={data3}
				subTitle={`Employees: ${allEmployees?.data?.value}`}
				scheme={'accent'}
				onClick={() => handleNavigate('/transportation/applicants-table')}
			/>
			<Menu
				anchorEl={anchorElRatings}
				open={Boolean(anchorElRatings)}
				onClose={() => setAnchorElRatings(null)}>
				<MenuItem onClick={() => handleMenuCloseRatings('1')}>ضعيف</MenuItem>
				<MenuItem onClick={() => handleMenuCloseRatings('2')}>مقبول</MenuItem>
				<MenuItem onClick={() => handleMenuCloseRatings('3')}>جيد</MenuItem>
				<MenuItem onClick={() => handleMenuCloseRatings('4')}>
					جيد جدًا
				</MenuItem>
				<MenuItem onClick={() => handleMenuCloseRatings('5')}>ممتاز</MenuItem>
			</Menu>
			<EventsCard
				icon={
					<CalendarMonthIcon
						sx={{ fontSize: '23px', color: theme.palette.secondary.main }}
					/>
				}
				events={parsedEvents}
				location={linkTo}
			/>
		</Stack>
	) : (
		<CircularProgress />
	);
};

export default FirstRow;
