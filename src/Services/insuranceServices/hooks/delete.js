import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteInsuranceBroakersById,
	deleteInsuranceEmployees,
	deleteInsuranceReinsurerById,
	deletePartners,
} from '../../../api/insuranceServices';

const useDeleteInsuranceEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteInsuranceEmployees,
		onSuccess: (id) => {
			queryClient.invalidateQueries(['employee', id]);
		},
	});
};

const useDeletePartner = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deletePartners,
		onSuccess: (id) => {
			queryClient.invalidateQueries(['partner', id]);
		},
	});
};

const useDeleteInsuranceReinsurer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteInsuranceReinsurerById,
		onSuccess: (id) => {
			queryClient.invalidateQueries(['reinsurer', id]);
		},
	});
};

const useDeleteInsuranceBroakers = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteInsuranceBroakersById,
		onSuccess: (id) => {
			queryClient.invalidateQueries(['Broakers', id]);
		},
	});
};

export {
	useDeleteInsuranceEmployee,
	useDeletePartner,
	useDeleteInsuranceReinsurer,
	useDeleteInsuranceBroakers,
};
