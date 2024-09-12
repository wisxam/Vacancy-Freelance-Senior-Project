import { useQuery } from '@tanstack/react-query';
import {
	getSecurityEmployees,
	getSecurtiyVehicles,
	getSecurtiyWeapons,
} from '../../../api/securityServices';

// Weapons

export const useGetWeaponsTable = (id) => {
	const query = useQuery({
		queryKey: ['weapons', id],
		queryFn: () => getSecurtiyWeapons(id),
		enabled: !!id,
	});

	return query;
};

export const useGetSecurityEmployees = (id) => {
	const query = useQuery({
		queryKey: ['employees', id],
		queryFn: () => getSecurityEmployees(id),
		enabled: !!id,
	});

	return query;
};

export const useGetSecurityVehicles = (id) => {
	const query = useQuery({
		queryKey: ['vehicles', id],
		queryFn: () => getSecurtiyVehicles(id),
		enabled: !!id,
	});

	return query;
};
