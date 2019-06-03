/* eslint-disable react/jsx-no-bind */
import { hot } from 'react-hot-loader/root';
import React from 'react';
import PropTypes from 'prop-types';
import {
    Route,
    Switch
} from 'react-router-dom';
import Checkout from 'checkout/Checkout';
import Confirmation from 'confirmation/Confirmation';
import Search from 'search/Search';

const App = ({
    spots,
    getSpots,
    purchased
}) => {
    return (
        <Switch>
            <Route
                exact
                path="/"
                render={() => {
                    return (
                        <Search
                            getSpots={getSpots}
                            spots={spots}
                            purchased={purchased}
                        />);
                }}
            />
            <Route
                path="/checkout/:id"
                component={Checkout}
            />
            <Route
                path="/confirmation"
                component={Confirmation}
            />
            <Route
                render={() => {
                    return (
                        <Search
                            getSpots={getSpots}
                            spots={spots}
                        />);
                }}
            />
        </Switch>
    );
};

App.propTypes = {
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    getSpots: PropTypes.func.isRequired,
    purchased: PropTypes.arrayOf(PropTypes.object)
};

export default hot(App);
