const INITIAL_STATE = {
	ticketsHistory: null,
	faqListing: null,
	faqCategories: null,
	loading: false,
};

function tickets(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'LIST_ZENDESK_TICKET_REQUEST':
			return Object.assign({}, state, {
				loading: true,
			});
		case 'LIST_ZENDESK_TICKET_SUCCESS':
			return Object.assign({}, state, {
				ticketsHistory: action.payload,
				loading: false,
			});
		case 'LIST_ZENDESK_TICKET_FAIL':
			return Object.assign({}, state, {
				loading: false,
			});

		case 'GET_FAQ_CATEGORIES_REQUEST':
			return Object.assign({}, state, {
				loading: true,
			});
		case 'GET_FAQ_CATEGORIES_SUCCESS':
			return Object.assign({}, state, {
				faqCategories: action.payload,
				loading: false,
			});
		case 'GET_FAQ_CATEGORIES_FAIL':
			return Object.assign({}, state, {
				loading: false,
			});

		case 'LIST_FAQ_REQUEST':
			return Object.assign({}, state, {
				loading: true,
			});
		case 'LIST_FAQ_SUCCESS':
			return Object.assign({}, state, {
				faqListing: action.payload,
				loading: false,
			});
		case 'LIST_FAQ_FAIL':
			return Object.assign({}, state, {
				loading: false,
			});

		default:
			return state;
	}
}

export default tickets;
