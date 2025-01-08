import * as moment from 'moment';

export const getItem = ( key ) =>
{
	return localStorage.getItem( key ) || null;
}

export const setItem = ( key, value ) =>
{
	localStorage.setItem( key, value );
}

export const removeItem = ( key ) =>
{
	localStorage.removeItem( key );
}

export const buildFilter = ( values ) =>
{

	let params = {};
	if ( values )
	{
		delete values.total;
		delete values.total_pages;
		delete values.count;
		let arrCondition = Object.entries( values );

		params = arrCondition.reduce( ( param, item ) =>
		{
			if ( item[ 1 ] != null )
			{
				param = { ...param, ...buildItemParam( item[ 0 ], item[ 1 ], param ) }
			}
			return param;
		}, {} );
	}
	return params;
}

export const buildItemParam = ( key, value, params ) =>
{
	if ( key == 'page' && !value )
	{
		params[ 'page' ] = value;
	} else if ( value )
	{
		params[ `${ key }` ] = value;
	}
	return params;
}

export const resetForm = ( form ) =>
{
	form.resetFields();
}

export const onFieldsChange = ( e, form, ee = null ) =>
{
	if ( e.length > 0 )
	{
		let value = typeof e[ 0 ].value === 'string' ? e[ 0 ].value : e[ 0 ].value;
		if ( e[ 0 ].name[ 0 ] === 'name' && value != '' )
		{
			// let slug = toSlug( value );
			form.setFieldsValue( { slug: value } );
		}
		let fieldValue = {
			[ String( e[ 0 ].name[ 0 ] ) ]: value
		}
		form.setFieldsValue( fieldValue );
	}
}


export const getMomentDate = () =>
{
	return moment().format( 'YYYY-MM-DD' );
}

export const customNumber = (number, valueCustom) => {
	// return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + valueCustom;
	return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫' || '';
}


export const formatTime = (time, format)  => {
	return moment(time).format(format)
}

export const logout =() => {
	removeItem('user');
	removeItem('access_token');
	window.location.href = '/login'
}
