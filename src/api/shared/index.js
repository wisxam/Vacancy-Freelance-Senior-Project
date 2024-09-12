import { request } from '../../res/axios';

// Jobs

export const getJobsById = async (id) => {
	return request({
		url: `/RerquestJob/${id}`,
		method: 'get',
	});
};

export const updateJobsById = async (obj) => {
	return request({
		url: `/RerquestJob/${obj?.id}`,
		method: 'put',
		data: obj.data,
	});
};

export const deleteJobsById = async (obj) => {
	return request({
		url: `/RerquestJob/${obj?.id}`,
		method: 'delete',
		data: obj.data,
	});
};

export const addJobsById = async (obj) => {
	return request({
		url: `/RerquestJob/${obj?.id}`,
		method: 'post',
		data: obj.data,
	});
};

// Applicants

export const getApplicantsForCompanyById = async (id) => {
	return request({
		url: `/Applicants/${id}`,
		method: 'get',
	});
};

// ------------------------- Statistics ---------------------------- //

// Company Employees Statistics

export const getEmployeesStatistics = async () => {
	return request({
		url: `/EmpPerComp`,
		method: 'get',
	});
};

// Employee Stats

export const getEmployeeStatsStatistics = async (status, company_id) => {
	return request({
		url: `/EmpStatusPerComp/${status}/${company_id}`,
		method: 'get',
	});
};

// Employee Count (FOR DASHBOARD)

export const getAllEmployeesCountForAdmin = async () => {
	return request({
		url: `/EmpCount`,
		method: 'get',
	});
};

// Employee Rating

export const getEmployeeRatingPerCompany = async (status, company_id) => {
	return request({
		url: `/EmpRatingsPerComp/${status}/${company_id}`,
		method: 'get',
	});
};

// Employee Count (FOR CERTAIN COMPANY)

export const getEmployeeCountForCertainCompany = async (id) => {
	return request({
		url: `/EmpByComp/${id}`,
		method: 'get',
	});
};

// ------------------------------------------------------------------- //

// Busses

export const getBussesStatistics = async () => {
	return request({
		url: `/busPerComp`,
		method: 'get',
	});
};

// Busses Status Per Company

export const getBussesStatusByCompany = async (status, company_id) => {
	return request({
		url: `/busStatusByComp/${status}/${company_id}`,
		method: 'get',
	});
};

// Busses Count (FOR ADMIN)

export const getAllBussesCount = async () => {
	return request({
		url: `/busCount`,
		method: 'get',
	});
};

// Busses Count (FOR COMPANIES)

export const getAllBussesForCertainCompany = async (id) => {
	return request({
		url: `/busByComp/${id}`,
		method: 'get',
	});
};

// ---------------------------------------------------- //

// Applicants

export const getAllApplicantsForCompany = async (id) => {
	return request({
		url: `/applicantsCountByCompany/${id}`,
		method: 'get',
	});
};
