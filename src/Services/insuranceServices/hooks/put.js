import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	updateInsuranceBroakersById,
	updateInsuranceEmployees,
	updateInsuranceReinsurerById,
	updatePartners,
} from '../../../api/insuranceServices';

const usePutInsuranceEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateInsuranceEmployees,

		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};

const usePutPartners = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updatePartners,
		onSuccess: () => {
			queryClient.invalidateQueries('partners');
		},
	});
};

const usePutInsuranceReinsurer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateInsuranceReinsurerById,
		onSuccess: () => {
			queryClient.invalidateQueries('reinsurer');
		},
	});
};

const usePutInsuranceBroakers = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateInsuranceBroakersById,
		onSuccess: () => {
			queryClient.invalidateQueries('broakers');
		},
	});
};

export {
	usePutInsuranceEmployee,
	usePutPartners,
	usePutInsuranceReinsurer,
	usePutInsuranceBroakers,
};
