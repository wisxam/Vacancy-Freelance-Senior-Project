import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUserRequestToBeCompany } from '../../../api/devsServices/acceptOrDelete';

const useDeleteuserRequestToBeCompany = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUserRequestToBeCompany,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['routes', id]);
		},
	});
};

export { useDeleteuserRequestToBeCompany };
