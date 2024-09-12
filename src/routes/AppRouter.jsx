import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { ErrorPage, SignIn, SignUp, CompanyForm, Calender } from '../pages';
import {
	TransportationEmployeeForm,
	TransportationBusses,
	TransportationDashboard,
	TransportationPieChart,
	TransportationUserProfile,
	TransportationEmployees,
	TransportationBusForm,
	TransportationRoutes,
	TransportationRoutesForm,
} from '../Services/transportationServices';
import {
	EmployeeSecurityForm,
	SecurityWeapons,
	SecurityEmployeesTable,
	SecurityUserProfile,
	SecurityDashboard,
	SecurityPiechart,
	EquipmentIssuanceForm,
	WeaponInventoryForm,
	SecurityVehicles,
} from '../Services/securityServices';
import {
	CleaningDashboard,
	CleaningUserProfile,
	CleaningClients,
	CleaningSupplies,
	CleaningEmployeesForm,
	CleaningPieChart,
	CleaningSupplyForm,
	CleaningEmployeesTable,
} from '../Services/cleaningServices';
import {
	InsuranceDashboard,
	InsuranceEmployeeForm,
	InsuranceUserProfile,
	InsuranceEmployees,
	InsurancePartnersTable,
	InsurancePartnerForm,
	InsuranceReinsurerTable,
	InsuranceReinsurerForm,
	InsuranceBroakers,
	InsuranceBroakerForm,
} from '../Services/insuranceServices';
import {
	AllBroakers,
	AllBusses,
	AllCleaningSupplies,
	AllCompanyRequests,
	AllEmployeesTable,
	AllPartners,
	AllReinsurers,
	AllRoutes,
	AllSecurityVehicles,
	AllWeapons,
	CategoriesTable,
	DevsDashboard,
} from '../Services/devsServices';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoutes.jsx';
import InsurancePieChart from '../Services/insuranceServices/insuranceDashboard/InsurancePieChart.jsx';
import AnimatedRoutes from './AnimatedRoutes.jsx';
import AddJobForm from '../Services/shared/AddJobForm.jsx';
import DeployedJobs from '../Services/shared/DeployedJobs.jsx';
import Applicants from '../Services/shared/Applicants.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <AnimatedRoutes />,
				children: [
					{
						path: 'transportation',
						element: <ProtectedRoute allowedRoles={['Transportation']} />,
						children: [
							{
								index: true,
								element: <TransportationDashboard />,
							},
							{
								path: 'calender',
								element: <Calender />,
							},
							{
								path: 'employee-form',
								element: <TransportationEmployeeForm />,
							},
							{
								path: 'busses-table',
								element: <TransportationBusses />,
							},
							{
								path: 'pie-chart',
								element: <TransportationPieChart />,
							},
							{
								path: 'user-profile',
								element: <TransportationUserProfile />,
							},
							{
								path: 'employees-table',
								element: <TransportationEmployees />,
							},
							{
								path: 'bus-form',
								element: <TransportationBusForm />,
							},
							{
								path: 'route-form',
								element: <TransportationRoutesForm />,
							},
							{
								path: 'route-table',
								element: <TransportationRoutes />,
							},
							{
								path: 'vacant-form',
								element: <AddJobForm />,
							},
							{
								path: 'vacant-table',
								element: <DeployedJobs />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
						],
					},
					{
						path: 'security',
						element: <ProtectedRoute allowedRoles={['Security']} />,
						children: [
							{
								index: true,
								element: <SecurityDashboard />,
							},
							{
								path: 'employee-form',
								element: <EmployeeSecurityForm />,
							},
							{
								path: 'calender',
								element: <Calender />,
							},
							{
								path: 'weapons-table',
								element: <SecurityWeapons />,
							},
							{
								path: 'user-profile',
								element: <SecurityUserProfile />,
							},
							{
								path: 'employees-table',
								element: <SecurityEmployeesTable />,
							},
							{
								path: 'piechart',
								element: <SecurityPiechart />,
							},
							{
								path: 'equipment-form',
								element: <EquipmentIssuanceForm />,
							},
							{
								path: 'weapons-form',
								element: <WeaponInventoryForm />,
							},
							{
								path: 'pie-chart',
								element: <SecurityPiechart />,
							},
							{
								path: 'vehicles-table',
								element: <SecurityVehicles />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
							{
								path: 'vacant-form',
								element: <AddJobForm />,
							},
							{
								path: 'vacant-table',
								element: <DeployedJobs />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
						],
					},
					{
						path: 'cleaning',
						element: <ProtectedRoute allowedRoles={['Cleaning']} />,
						children: [
							{
								index: true,
								element: <CleaningDashboard />,
							},
							{
								path: 'user-profile',
								element: <CleaningUserProfile />,
							},
							{
								path: 'employees-table',
								element: <CleaningEmployeesTable />,
							},
							{
								path: 'employees-form',
								element: <CleaningEmployeesForm />,
							},
							{
								path: 'calender',
								element: <Calender />,
							},
							{
								path: 'clients-table',
								element: <CleaningClients />,
							},
							{
								path: 'supplies-table',
								element: <CleaningSupplies />,
							},
							{
								path: 'pie-chart',
								element: <CleaningPieChart />,
							},
							{
								path: 'supplies-form',
								element: <CleaningSupplyForm />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
							{
								path: 'vacant-form',
								element: <AddJobForm />,
							},
							{
								path: 'vacant-table',
								element: <DeployedJobs />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
						],
					},
					{
						path: 'insurance',
						element: <ProtectedRoute allowedRoles={['Insurance']} />,
						children: [
							{
								index: true,
								element: <InsuranceDashboard />,
							},
							{
								path: 'user-profile',
								element: <InsuranceUserProfile />,
							},
							{
								path: 'employees-table',
								element: <InsuranceEmployees />,
							},
							{
								path: 'employees-form',
								element: <InsuranceEmployeeForm />,
							},
							{
								path: 'calender',
								element: <Calender />,
							},
							{
								path: 'pie-chart',
								element: <InsurancePieChart />,
							},
							{
								path: 'partners-table',
								element: <InsurancePartnersTable />,
							},
							{
								path: 'partners-form',
								element: <InsurancePartnerForm />,
							},
							{
								path: 'reinsurer-table',
								element: <InsuranceReinsurerTable />,
							},
							{
								path: 'reinsurer-form',
								element: <InsuranceReinsurerForm />,
							},
							{
								path: 'broaker-table',
								element: <InsuranceBroakers />,
							},
							{
								path: 'broaker-form',
								element: <InsuranceBroakerForm />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
							{
								path: 'vacant-form',
								element: <AddJobForm />,
							},
							{
								path: 'vacant-table',
								element: <DeployedJobs />,
							},
							{
								path: 'applicants-table',
								element: <Applicants />,
							},
						],
					},
					{
						path: 'admin',
						element: <ProtectedRoute allowedRoles={['Admin']} />,
						children: [
							{
								index: true,
								element: <DevsDashboard />,
							},
							{
								path: 'categories',
								element: <CategoriesTable />,
							},
							{
								path: 'all-employees-table',
								element: <AllEmployeesTable />,
							},
							{
								path: 'all-busses-table',
								element: <AllBusses />,
							},
							{
								path: 'all-routes-table',
								element: <AllRoutes />,
							},
							{
								path: 'all-weapons-table',
								element: <AllWeapons />,
							},
							{
								path: 'all-broakers-table',
								element: <AllBroakers />,
							},
							{
								path: 'all-partners-table',
								element: <AllPartners />,
							},
							{
								path: 'all-reinsurers-table',
								element: <AllReinsurers />,
							},
							{
								path: 'all-cleaning-equipments-table',
								element: <AllCleaningSupplies />,
							},
							{
								path: 'all-security-vehicles-table',
								element: <AllSecurityVehicles />,
							},
							{
								path: 'all-company-requests',
								element: <AllCompanyRequests />,
							},
						],
					},
				],
			},
		],
	},
	{
		path: 'log-in',
		element: <SignIn />,
	},
	{
		path: 'register',
		element: <SignUp />,
	},
	{
		path: 'company-form',
		element: <CompanyForm />,
	},
]);

const AppRouter = () => {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
};

export default AppRouter;
