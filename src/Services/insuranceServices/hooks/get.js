import { useQuery } from '@tanstack/react-query';
import {
	getInsuranceBroakersById,
	getInsuranceEmployeesById,
	getInsuranceReinsurerById,
	getPartnersById,
} from '../../../api/insuranceServices';

// Employees

export const useGetInsuranceEmployees = (id) => {
	const query = useQuery({
		queryKey: ['employees', id],
		queryFn: () => getInsuranceEmployeesById(id),
		enabled: !!id,
	});

	return query;
};

// Partners

export const useGetPartners = (id) => {
	const query = useQuery({
		queryKey: ['partners', id],
		queryFn: () => getPartnersById(id),
		enabled: !!id,
	});

	return query;
};

// Reinsurer

export const useGetInsuranceReinsurerById = (id) => {
	const query = useQuery({
		queryKey: ['reinsurer', id],
		queryFn: () => getInsuranceReinsurerById(id),
		enabled: !!id,
	});

	return query;
};

// Broakers

export const useGetInsuranceBroakers = (id) => {
	const query = useQuery({
		queryKey: ['broaker', id],
		queryFn: () => getInsuranceBroakersById(id),
		enabled: !!id,
	});

	return query;
};
