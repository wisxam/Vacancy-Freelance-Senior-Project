import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	updateSecurityEmployees,
	updateSecurityVehicles,
	updateSecurityWeapons,
} from '../../../api/securityServices';

const usePutSecurityEmployees = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSecurityEmployees,
		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};

const usePutSecurityWeapons = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSecurityWeapons,
		onSuccess: () => {
			queryClient.invalidateQueries('weapons');
		},
	});
};

const usePutSecurityVehicles = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateSecurityVehicles,
		onSuccess: () => {
			queryClient.invalidateQueries('vehicles');
		},
	});
};

export {
	usePutSecurityEmployees,
	usePutSecurityWeapons,
	usePutSecurityVehicles,
};
