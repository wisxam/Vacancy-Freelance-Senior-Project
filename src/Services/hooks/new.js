import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addJobsById } from '../../api/shared';

export const useAddJobs = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addJobsById,

		onSuccess: () => {
			queryClient.invalidateQueries('jobs');
		},
	});
};
