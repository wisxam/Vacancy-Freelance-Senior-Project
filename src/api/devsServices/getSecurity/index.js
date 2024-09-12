import { request } from '../../../res/axios';

// Employees

export const getSecurityEmployees = async (id) => {
	return request({
		url: `/EmployeeByCompany/${id}`,
		method: 'get',
	});
};

// Weapons

export const getSecurityWeapons = async () => {
	return request({
		url: `/Wepons`,
		method: 'get',
	});
};

// Security Vehicles

export const getAllSecurityVehicles = async () => {
	return request({
		url: '/Vehicle',
		method: 'get',
	});
};
