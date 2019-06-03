import { SPOT_UPDATE_SELECTED, SPOT_PURCHASE } from './spot-actions';

const initialState = {
    selected: null,
    purchased: []
};

export default function spot(state = initialState, { type, payload }) {
    switch (type) {
        case SPOT_UPDATE_SELECTED: {
            return {
                ...state,
                selected: payload || null
            };
        }
        case SPOT_PURCHASE: {
            const copy = state.purchased.slice();
            copy.push(payload);

            return {
                ...state,
                purchased: copy || null
            };
        }
        default:
            return state;
    }
}
