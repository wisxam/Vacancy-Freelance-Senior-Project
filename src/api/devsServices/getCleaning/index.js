import { request } from '../../../res/axios';

// Employees

export const getCleaningEmployees = async () => {
	return request({
		url: `/EmployeeByCompany`,
		method: 'get',
	});
};

// Equipment

export const getAllCleaningEquipment = async () => {
	return request({
		url: `/Equipment`,
		method: 'get',
	});
};
