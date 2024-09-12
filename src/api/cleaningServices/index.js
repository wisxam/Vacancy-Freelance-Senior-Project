import { request } from '../../res/axios';

// Employees

export const getCleaningEmployees = async (id) => {
	return request({
		url: `/EmployeeByCompany/${id}`,
		method: 'get',
	});
};

export const deleteCleaningEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const updateCleaningEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addCleaningEmployee = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Equipment

export const getCleaningEquipment = async () => {
	return request({
		url: `/Equipment`,
		method: 'get',
	});
};

export const getCleaningEquipmentById = async (id) => {
	return request({
		url: `/Equipment/${id}`,
		method: 'get',
	});
};

export const updateCleaningEquipment = async (obj) => {
	return request({
		url: `/Equipment/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addCleaningEquipment = async (obj) => {
	return request({
		url: `/Equipment/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

export const deleteCleaningEquipment = async (obj) => {
	return request({
		url: `/Equipment/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};
