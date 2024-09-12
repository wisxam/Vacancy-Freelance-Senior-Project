import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteCleaningEmployees,
	deleteCleaningEquipment,
} from '../../../api/cleaningServices';

const useDeleteCleaningEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCleaningEmployees,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['routes', id]);
		},
	});
};

const useDeleteCleaningEquipment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCleaningEquipment,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['equipment', id]);
		},
	});
};

export { useDeleteCleaningEmployee, useDeleteCleaningEquipment };
