import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSelected } from 'spot/spot-actions';
import SpotList from './spot-list/SpotList';
import SearchContentModal from './search-content/SearchContentModal';
import { CSSTransition } from 'react-transition-group';

const Search = ({
    selected,
    spots,
    setSpot,
    getSpots,
    purchased
}) => {
    return (
        <div className="Search">
            <SpotList
                getSpots={getSpots}
                spots={spots}
                selectedSpot={selected}
                setSpot={setSpot}
                purchased={purchased}
            />
            <div className="Search-content">
                <CSSTransition
                    classNames="fade"
                    timeout={300}
                    in={Boolean(selected)}
                    unmountOnExit
                >
                    <SearchContentModal
                        selectedSpot={selected}
                        setSpot={setSpot}
                    />
                </CSSTransition>
            </div>
        </div>
    );
};

Search.propTypes = {
    selected: PropTypes.object,
    spots: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSpot: PropTypes.func.isRequired,
    getSpots: PropTypes.func.isRequired,
    purchased: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => {
    const { spot: { selected, purchased } } = state;

    return { selected, purchased };
};

const mapDispatchToProps = {
    setSpot: updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
