import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	updateTransportationBussesById,
	updateBussesRoutesById,
	updateTransportationEmployees,
	updateTransportationJobsById,
} from '../../../api/transportationServices';

const usePutBussesTableFormById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateTransportationBussesById,

		onSuccess: () => {
			queryClient.invalidateQueries('busses');
		},
	});
};

const usePutBussesRoutesTableById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateBussesRoutesById,

		onSuccess: () => {
			queryClient.invalidateQueries('routes');
		},
	});
};

// Transportation Employees

const usePutTransportationEmployees = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateTransportationEmployees,

		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};

// Jobs

const usePutTransportationJobs = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateTransportationJobsById,

		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		},
	});
};

export {
	usePutBussesRoutesTableById,
	usePutBussesTableFormById,
	usePutTransportationEmployees,
	usePutTransportationJobs,
};
