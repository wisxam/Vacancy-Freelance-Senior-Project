import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addInsuranceBroakersById,
	addInsuranceEmployee,
	addInsuranceReinsurerById,
	addPartners,
} from '../../../api/insuranceServices';

const useAddPartners = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addPartners,
		onSuccess: () => {
			queryClient.invalidateQueries('partners');
		},
	});
};

const useAddInsuranceEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addInsuranceEmployee,
		onSuccess: () => {
			queryClient.invalidateQueries('employee');
		},
	});
};

const useAddInsuranceReinsurer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addInsuranceReinsurerById,
		onSuccess: () => {
			queryClient.invalidateQueries('reinsurer');
		},
	});
};

const useAddInsuranceBroakers = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addInsuranceBroakersById,
		onSuccess: () => {
			queryClient.invalidateQueries('broakers');
		},
	});
};

export {
	useAddPartners,
	useAddInsuranceEmployee,
	useAddInsuranceReinsurer,
	useAddInsuranceBroakers,
};
