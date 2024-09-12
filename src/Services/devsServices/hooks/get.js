import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from '../../../api/devsServices/getAllEmployees';
import {
	getAllBussesRoutes,
	getAllTransportationBusses,
} from '../../../api/devsServices/getTransportation';
import {
	getAllSecurityVehicles,
	getSecurityWeapons,
} from '../../../api/devsServices/getSecurity';
import {
	getAllInsuranceBroaker,
	getAllInsurnaceReinsurer,
	getAllPartners,
} from '../../../api/devsServices/getInsurance';
import { getAllCleaningEquipment } from '../../../api/devsServices/getCleaning';
import { getAllToBeCompanyRequests } from '../../../api/devsServices/getRequests';

// Employees

export const useGetAllEmployees = () => {
	const query = useQuery({
		queryKey: ['employees'],
		queryFn: () => getAllEmployees(),
	});

	return query;
};

// Busses

export const useGetAllBusses = () => {
	const query = useQuery({
		queryKey: ['employees'],
		queryFn: () => getAllTransportationBusses(),
	});

	return query;
};

// Routes

export const useGetAllRoutes = () => {
	const query = useQuery({
		queryKey: ['employees'],
		queryFn: () => getAllBussesRoutes(),
	});

	return query;
};

// Weapons

export const useGetAllWeapon = () => {
	const query = useQuery({
		queryKey: ['weapons'],
		queryFn: () => getSecurityWeapons(),
	});

	return query;
};

// Broakers

export const useGetAllBroakers = () => {
	const query = useQuery({
		queryKey: ['broakers'],
		queryFn: () => getAllInsuranceBroaker(),
	});

	return query;
};

// Partners

export const useGetAllPartner = () => {
	const query = useQuery({
		queryKey: ['partners'],
		queryFn: () => getAllPartners(),
	});

	return query;
};

// Reinsurer

export const useGetAllReinsurers = () => {
	const query = useQuery({
		queryKey: ['reinsurers'],
		queryFn: () => getAllInsurnaceReinsurer(),
	});

	return query;
};

// Cleaning Equipment

export const useGetAllCleaningEquipment = () => {
	const query = useQuery({
		queryKey: ['cleaning-equipment'],
		queryFn: () => getAllCleaningEquipment(),
	});

	return query;
};

// Security Vehicles

export const useGetAllSecurityVehicles = () => {
	const query = useQuery({
		queryKey: ['security-vehicles'],
		queryFn: () => getAllSecurityVehicles(),
	});

	return query;
};

// All Requests To Be Company

export const useGetAllRequestsToBeCompany = () => {
	const query = useQuery({
		queryKey: ['company-requests'],
		queryFn: () => getAllToBeCompanyRequests(),
	});

	return query;
};
