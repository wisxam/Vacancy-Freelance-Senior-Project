import { request } from '../../res/axios';

// Employees

export const getAllEmployees = async () => {
	return request({
		url: `/EmployeeByCompany`,
		method: 'get',
	});
};
