import { request } from '../../../res/axios';

// Employees

export const getAllTransportationEmployees = async () => {
	return request({
		url: `/EmployeeByCompany`,
		method: 'get',
	});
};

// Busses

export const getAllTransportationBusses = async () => {
	return request({
		url: `/Busses`,
		method: 'get',
	});
};

// Routes

export const getAllBussesRoutes = async () => {
	return request({
		url: `/Route`,
		method: 'get',
	});
};
