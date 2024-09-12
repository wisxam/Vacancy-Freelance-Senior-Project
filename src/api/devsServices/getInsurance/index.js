import { request } from '../../../res/axios';

// Employees

export const getAllInsuranceEmployees = async () => {
	return request({
		url: `/EmployeeByCompany`,
		method: 'get',
	});
};

// Partners

export const getAllPartners = async () => {
	return request({
		url: `/Partners`,
		method: 'get',
	});
};

// Reinsurer

export const getAllInsurnaceReinsurer = () => {
	return request({
		url: `/Reinsurers`,
		method: 'get',
	});
};

// Broakers

export const getAllInsuranceBroaker = async () => {
	return request({
		url: `/Broakers`,
		method: 'get',
	});
};
