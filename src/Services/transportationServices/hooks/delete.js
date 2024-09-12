import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteTransportationRoutes,
	deleteTransportationBusses,
	deleteTransportationEmployees,
	deleteTransportationJobsById,
} from '../../../api/transportationServices';

const useDeleteBusById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTransportationBusses,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['busses', id]);
		},
	});
};

const useDeleteBusRouteById = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTransportationRoutes,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['routes', id]);
		},
	});
};

const useDeleteTransportationEmployee = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTransportationEmployees,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['routes', id]);
		},
	});
};

// Jobs

const useDeleteTransportationJobs = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTransportationJobsById,
		onSuccess: (_, id) => {
			queryClient.invalidateQueries(['jobs', id]);
		},
	});
};

export {
	useDeleteBusById,
	useDeleteBusRouteById,
	useDeleteTransportationEmployee,
	useDeleteTransportationJobs,
};
