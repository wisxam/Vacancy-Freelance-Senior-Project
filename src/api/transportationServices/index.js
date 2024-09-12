import { request } from '../../res/axios';

// Busses

export const getTransportationBusses = async () => {
	return request({
		url: `/Busses`,
		method: 'get',
	});
};

export const getTransportationBussesById = async (id) => {
	return request({
		url: `/Busses/${id}`,
		method: 'get',
	});
};

export const updateTransportationBussesById = async (obj) => {
	return request({
		url: `/Busses/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addTransportationBusses = async (obj) => {
	return request({
		url: `/Busses/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Busses delete

export const deleteTransportationBusses = async (obj) => {
	return request({
		url: `/Busses/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

// Routes

export const getBussesRoutes = async () => {
	return request({
		url: `/Route`,
		method: 'get',
	});
};

export const getBussesRoutesById = async (id) => {
	return request({
		url: `/Route/${id}`,
		method: 'get',
	});
};

export const updateBussesRoutesById = async (obj) => {
	return request({
		url: `/Route/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const addTransportationRoutes = async (obj) => {
	return request({
		url: `/Route/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

export const deleteTransportationRoutes = async (obj) => {
	return request({
		url: `/Route/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

// Employees transportation

export const getTransportationEmployees = async () => {
	return request({
		url: `/EmployeeByCompany`,
		method: 'get',
	});
};

export const getTransportationEmployeesById = async (id) => {
	return request({
		url: `/EmployeeByCompany/${id}`,
		method: 'get',
	});
};

export const updateTransportationEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deleteTransportationEmployees = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addTransportationEmployee = async (obj) => {
	return request({
		url: `/EmployeeByCompany/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Jobs

export const getTransportationJobsById = async (id) => {
	return request({
		url: `/RerquestJob/${id}`,
		method: 'get',
	});
};

export const updateTransportationJobsById = async (obj) => {
	return request({
		url: `/RerquestJob/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deleteTransportationJobsById = async (obj) => {
	return request({
		url: `/RerquestJob/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addTransportationJobsById = async (obj) => {
	return request({
		url: `/RerquestJob/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};
