import { useQuery } from '@tanstack/react-query';
import {
	getCleaningEmployees,
	getCleaningEquipmentById,
} from '../../../api/cleaningServices';

export const useGetCleaningEmployees = (id) => {
	const query = useQuery({
		queryKey: ['employees', id],
		queryFn: () => getCleaningEmployees(id),
		enabled: !!id,
	});

	return query;
};

export const useGetCleaningEquipment = (id) => {
	const query = useQuery({
		queryKey: ['equipment', id],
		queryFn: () => getCleaningEquipmentById(id),
		enabled: !!id,
	});

	return query;
};
