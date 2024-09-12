import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	addTransportationBusses,
	addTransportationEmployee,
	addTransportationJobsById,
	addTransportationRoutes,
} from '../../../api/transportationServices';

const useAddTransportationBusses = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addTransportationBusses,

		onSuccess: () => {
			queryClient.invalidateQueries('busses');
		},
	});
};

const useAddTransportationRoute = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addTransportationRoutes,

		onSuccess: () => {
			queryClient.invalidateQueries('routes');
		},
	});
};

const useAddTransportationEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addTransportationEmployee,

		onSuccess: () => {
			queryClient.invalidateQueries('employee');
		},
	});
};

// Jobs

const useAddTransportationJobs = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: addTransportationJobsById,

		onSuccess: () => {
			queryClient.invalidateQueries('jobs');
		},
	});
};

export {
	useAddTransportationBusses,
	useAddTransportationRoute,
	useAddTransportationEmployee,
	useAddTransportationJobs,
};
