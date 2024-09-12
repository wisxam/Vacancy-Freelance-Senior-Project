import { useQuery } from '@tanstack/react-query';
import {
	getBussesRoutesById,
	getTransportationBussesById,
	getTransportationEmployeesById,
	getTransportationJobsById,
} from '../../../api/transportationServices';

// Busses

export const useGetBussesTable = (id) => {
	const query = useQuery({
		queryKey: ['busses', id],
		queryFn: () => getTransportationBussesById(id),
		enabled: !!id,
	});

	return query;
};

// Routes

export const useGetBussesRoutesTable = (id) => {
	const query = useQuery({
		queryKey: ['routes', id],
		queryFn: () => getBussesRoutesById(id),
		enabled: !!id,
	});

	return query;
};

// Employees

export const useGetTransportationEmployees = (id) => {
	const query = useQuery({
		queryKey: ['employees', id],
		queryFn: () => getTransportationEmployeesById(id),
		enabled: !!id,
	});

	return query;
};

// Jobs

export const useGetTransportationJobsById = (id) => {
	const query = useQuery({
		queryKey: ['jobs', id],
		queryFn: () => getTransportationJobsById(id),
		enabled: !!id,
	});

	return query;
};
