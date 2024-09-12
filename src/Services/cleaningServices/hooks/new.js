import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addCleaningEmployee,
	addCleaningEquipment,
} from '../../../api/cleaningServices';

const useAddCleaningEquipment = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addCleaningEquipment,

		onSuccess: () => {
			queryClient.invalidateQueries('equipment');
		},
	});
};
// addCleaningEmployee

const useAddCleaningEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addCleaningEmployee,

		onSuccess: () => {
			queryClient.invalidateQueries('equipment');
		},
	});
};

export { useAddCleaningEquipment, useAddCleaningEmployee };
