import { useQuery } from '@tanstack/react-query';
import {
	getAllApplicantsForCompany,
	getAllBussesForCertainCompany,
	getAllEmployeesCountForAdmin,
	getBussesStatusByCompany,
	getEmployeeCountForCertainCompany,
	getEmployeeRatingPerCompany,
	getEmployeeStatsStatistics,
	getEmployeesStatistics,
} from '../../api/shared';

// Employees

export const useGetEmployeesStatistics = () => {
	const query = useQuery({
		queryKey: ['statistics'],
		queryFn: () => getEmployeesStatistics(),
	});

	return query;
};

export const useGetEmployeeStatsStatistics = (status, company_id) => {
	const query = useQuery({
		queryKey: ['statistics'],
		queryFn: () => getEmployeeStatsStatistics(status, company_id),
		enabled: !!status && !!company_id,
	});

	return query;
};

export const useGetAllEmployeesCountForAdmin = () => {
	const query = useQuery({
		queryKey: ['statistics'],
		queryFn: () => getAllEmployeesCountForAdmin(),
	});

	return query;
};

export const useGetEmployeeCountForCertainCompany = (id) => {
	const query = useQuery({
		queryKey: ['jobs', id],
		queryFn: () => getEmployeeCountForCertainCompany(id),
		enabled: !!id,
	});

	return query;
};

// --------------------------------------------------------------------- //

// Busses

export const useGetBussesStatusByCompany = (status, company_id) => {
	const query = useQuery({
		queryKey: ['busses_statistics'],
		queryFn: () => getBussesStatusByCompany(status, company_id),
		enabled: !!status && !!company_id,
	});
	return query;
};

export const useGetAllBussesForCertainCompany = (id) => {
	const query = useQuery({
		queryKey: ['busses', id],
		queryFn: () => getAllBussesForCertainCompany(id),
		enabled: !!id,
	});

	return query;
};

// Applicants

export const useGetAllApplicantsForCompany = (id) => {
	const query = useQuery({
		queryKey: ['applicants', id],
		queryFn: () => getAllApplicantsForCompany(id),
		enabled: !!id,
	});

	return query;
};

// Employee Ratings

export const useGetEmployeeRatingPerCompany = (status, company_id) => {
	const query = useQuery({
		queryKey: ['employee_statistics'],
		queryFn: () => getEmployeeRatingPerCompany(status, company_id),
		enabled: !!status && !!company_id,
	});
	return query;
};
