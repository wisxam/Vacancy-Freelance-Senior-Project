import { useQuery } from '@tanstack/react-query';
import { getApplicantsForCompanyById, getJobsById } from '../../api/shared';

// Jobs

export const useGetJobsById = (id) => {
	const query = useQuery({
		queryKey: ['jobs', id],
		queryFn: () => getJobsById(id),
		enabled: !!id,
	});

	return query;
};

// Applicants

export const useGetApplicantsForCompanyById = (id) => {
	const query = useQuery({
		queryKey: ['applicants', id],
		queryFn: () => getApplicantsForCompanyById(id),
		enabled: !!id,
	});

	return query;
};
