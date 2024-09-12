import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addSecurityWeapons,
	addSecurityEmployee,
	addSecurityVehicles,
} from '../../../api/securityServices';

const useAddSecurityWeapons = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addSecurityWeapons,
		onSuccess: () => {
			queryClient.invalidateQueries('weapons');
		},
	});
};

const useAddSecurityEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addSecurityEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries('employee');
		},
	});
};

const useAddSecurityVehicles = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addSecurityVehicles,
		onSuccess: () => {
			queryClient.invalidateQueries('busses');
		},
	});
};

export {
	useAddSecurityWeapons,
	useAddSecurityEmployee,
	useAddSecurityVehicles,
};
