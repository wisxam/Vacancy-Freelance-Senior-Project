import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteSecurityEmployees,
	deleteSecurityVehicles,
	deleteSecurityWeapons,
} from '../../../api/securityServices';

const useDeleteSecurityEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSecurityEmployees,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['employee', id]);
		},
	});
};

const useDeleteSecurityWeapons = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSecurityWeapons,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['weapons', id]);
		},
	});
};

const useDeleteSecurityVehicles = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteSecurityVehicles,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['vehicles', id]);
		},
	});
};

export {
	useDeleteSecurityEmployee,
	useDeleteSecurityWeapons,
	useDeleteSecurityVehicles,
};
