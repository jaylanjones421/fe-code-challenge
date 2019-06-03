export const UPDATE_CHECKOUT = 'UPDATE_CHECKOUT';

export const updateCheckout = checkout => {
    return {
        type: UPDATE_CHECKOUT,
        payload: checkout
    };
};
