import { request } from '../../res/axios';

// Employees

export const getInsuranceEmployees = async () => {
	return request({
		url: `/EmployeeByCompany`,
		method: 'get',
	});
};

export const getInsuranceEmployeesById = async (id) => {
	return request({
		url: `/EmployeeByCompany/${id}`,
		method: 'get',
	});
};

export const updateInsuranceEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deleteInsuranceEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addInsuranceEmployee = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Partners

export const getPartners = async () => {
	return request({
		url: `/Partners`,
		method: 'get',
	});
};

export const getPartnersById = async (id) => {
	return request({
		url: `/Partners/${id}`,
		method: 'get',
	});
};

export const updatePartners = async (obj) => {
	return request({
		url: `/Partners/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deletePartners = async (obj) => {
	return request({
		url: `/Partners/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addPartners = async (obj) => {
	return request({
		url: `/Partners/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Reinsurers

export const getInsurnaceReinsurer = () => {
	return request({
		url: `/Reinsurers`,
		method: 'get',
	});
};

export const getInsuranceReinsurerById = async (id) => {
	return request({
		url: `/Reinsurers/${id}`,
		method: 'get',
	});
};

export const updateInsuranceReinsurerById = async (obj) => {
	return request({
		url: `/Reinsurers/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deleteInsuranceReinsurerById = async (obj) => {
	return request({
		url: `/Reinsurers/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addInsuranceReinsurerById = async (obj) => {
	return request({
		url: `/Reinsurers/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Broakers

export const getInsuranceBroaker = async () => {
	return request({
		url: `/Broakers`,
		method: 'get',
	});
};

export const getInsuranceBroakersById = async (id) => {
	return request({
		url: `/Broakers/${id}`,
		method: 'get',
	});
};

export const updateInsuranceBroakersById = async (obj) => {
	return request({
		url: `/Broakers/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deleteInsuranceBroakersById = async (obj) => {
	return request({
		url: `/Broakers/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addInsuranceBroakersById = async (obj) => {
	return request({
		url: `/Broakers/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};
