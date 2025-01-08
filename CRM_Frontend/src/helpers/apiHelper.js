import axios from 'axios';
import { buildFilter, logout } from './common';

// Get API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;;
// const API_URL = import.meta.env.VITE_API_URL;

const getToken = () =>
{
	return localStorage.getItem( 'access_token' ) || localStorage.getItem( 'token' );
};

// Generic API call helper
const apiCall = async ( endpoint, method = 'GET', data = null, header = {} ) =>
{
	console.log("data", data);
	const token = getToken();
	// Configure headers, including Authorization if token exists
	const headers = {
		'Content-Type': 'application/json',
		...( token && { Authorization: `Bearer ${ token }` } ),
		...header
	};

	let config = {
		url: `${ API_URL }${ endpoint }`,
		method,
		headers,
	}
	if ( method == 'GET' )
	{
		config[ 'params' ] = data
	} else
	{
		config = { ...config, data }
	}
	if(method == 'DELETE') {
		delete(config.data);
	}
	console.log(config);
	try
	{
		const response = await axios( config );

		return response.data;
	} catch ( error )
	{
		let responseError = error?.response;
		if ( responseError?.status == 401 )
		{
			logout();
		}
		console.log( 'API call error:', error?.response );
		return {
			status: 'error',
			message: responseError?.data?.message || 'Network error'
		}
	}
};

export const API_SERVICE = {
	get: async ( endpoint, params, header ) => apiCall( endpoint, 'GET', buildFilter( params ), header ),
	post: async ( endpoint, data, header ) => apiCall( endpoint, 'POST', data, header ),
	put: async ( endpoint, data, header ) => apiCall( endpoint, 'PUT', data, header ),
	delete: async ( endpoint ) => apiCall( endpoint, 'DELETE' ),
	uploadFile: async ( file ) =>
	{
		const formData = new FormData();
		formData.append( 'file', file );
		return await axios.post( `${ API_URL }` + `uploads/image`,
			formData, {
				headers: {
					'Accept': '*',
					'Content-Type': 'multipart/form-data'

				}
		} ).then( ( res ) =>
		{
			return res?.data;
		} ).catch( err => ( {
			status: "error",
			message: err?.response?.data?.message || "Lỗi form"
		} ) );
	},
	paymentOrder: async ( data ) =>
	{
	
		let newData = {
			order_id: data.id,
			url_return: window.location.origin + '/payment/success',
			amount: data.sub_total,
			service_code: "hotel",
			url_callback: window.location.origin + '/payment/failure'
		}
		return await axios.post( "https://123code.net/api/v1/payment/add", newData ).then( ( res ) =>
		{
			return res?.data;
		} ).catch( err => ( {
			status: "error",
			message: err?.response?.data?.message || "Lỗi form"
		} ) );
	}
}
