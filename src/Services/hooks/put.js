import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateJobsById } from '../../api/shared';

export const usePutJobs = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateJobsById,

		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};
