import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJobsById } from '../../api/shared';

export const useDeleteJobs = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteJobsById,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['jobs', id]);
		},
	});
};
