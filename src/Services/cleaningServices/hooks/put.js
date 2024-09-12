import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	updateCleaningEmployees,
	updateCleaningEquipment,
} from '../../../api/cleaningServices';

const usePutCleaningEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCleaningEmployees,

		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};

const usePutCleaningEquipment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCleaningEquipment,

		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};

export { usePutCleaningEmployee, usePutCleaningEquipment };
