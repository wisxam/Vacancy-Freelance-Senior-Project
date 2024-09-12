import { request } from '../../../res/axios';

// Get All Requests

export const getAllToBeCompanyRequests = async () => {
	return request({
		url: `/RequestCompany`,
		method: 'get',
	});
};
