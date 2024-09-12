import { request } from '../../../res/axios';

// Accept Requests

export const addUserRequestToBeCompany = async (obj) => {
	return request({
		url: `/DashCompany/${obj?.id}`,
		method: 'post',
	});
};

// Delete Requests

export const deleteUserRequestToBeCompany = async (obj) => {
	return request({
		url: `/RequestCompany/${obj?.id}`,
		method: 'delete',
	});
};
