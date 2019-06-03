import { UPDATE_CHECKOUT } from './checkout-actions';

const initialState = {
    email: null
};

export default function checkout(state = initialState, { type, payload }) {
    switch (type) {
        case UPDATE_CHECKOUT: {
            return {
                ...state,
                email: payload || null
            };
        }

        default:
            return state;
    }
}
