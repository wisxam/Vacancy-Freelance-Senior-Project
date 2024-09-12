import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUserRequestToBeCompany } from '../../../api/devsServices/acceptOrDelete';

const useAddUserRequestToBeCompany = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addUserRequestToBeCompany,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['request-company', id]);
		},
	});
};

export { useAddUserRequestToBeCompany };
