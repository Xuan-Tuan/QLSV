


export const ERROR_MESSAGE = ( field ) =>
{
	return {
		required: `${ field } không được để trống.`,
		minLength: ( minLength ) => `${ field } tối thiểu ${ minLength } ký tự.`,
		maxLength: ( maxLength ) => `${ field } tối đa ${ maxLength } ký tự.`,
		pattern: () => `${ field } không đúng định dạng.`,
	}
}

export const INIT_PAGING = {
	page: 1,
	page_size: 10,
	total: 0,
	total_page: 0
}

export const ORDER_STATUS = [
	{
		value: 'pending',
		name: 'Chờ duyệt',
		className: 'text-warning'
	},
	{
		value: 'processing',
		name: 'Đang xử lý',
		className: 'text-primary'
	},
	{
		value: 'completed',
		name: 'Hoàn thành',
		className: 'text-success'
	},
	{
		value: 'canceled',
		name: 'Hủy',
		className: 'text-danger'
	}
];

export const PAYMENT_STATUS = [
	{
		value: 'pending',
		name: 'Chờ thành toán',
		className: 'text-warning'
	},
	{
		value: 'refunding',
		name: 'Đang xử lý',
		className: 'text-primary'
	},
	{
		value: 'completed',
		name: 'Hoàn thành',
		className: 'text-success'
	},
	{
		value: 'refunded',
		name: 'Hoàn tiền',
		className: 'text-danger'
	}
]

