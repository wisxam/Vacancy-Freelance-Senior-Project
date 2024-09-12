import { request } from '../../res/axios';

export const getSecurityWeapons = async () => {
	return request({
		url: `/Wepons`,
		method: 'get',
	});
};

export const getSecurtiyWeapons = async (id) => {
	return request({
		url: `/Wepons/${id}`,
		method: 'get',
	});
};

export const getSecurityEmployees = async (id) => {
	return request({
		url: `/EmployeeByCompany/${id}`,
		method: 'get',
	});
};

export const updateSecurityEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addSecurityEmployee = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

export const deleteSecurityEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const deleteSecurityWeapons = async (obj) => {
	return request({
		url: `/Wepons/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const updateSecurityWeapons = async (obj) => {
	return request({
		url: `/Wepons/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addSecurityWeapons = async (obj) => {
	return request({
		url: `/Wepons/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Vehicles

export const getSecurtiyVehicles = async (id) => {
	return request({
		url: `/Vehicle/${id}`,
		method: 'get',
	});
};

export const deleteSecurityVehicles = async (obj) => {
	return request({
		url: `/Vehicle/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const updateSecurityVehicles = async (obj) => {
	return request({
		url: `/Vehicle/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addSecurityVehicles = async (obj) => {
	return request({
		url: `/Vehicle/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};
