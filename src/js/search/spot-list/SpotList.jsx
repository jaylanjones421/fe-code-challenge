import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextButton from 'common/TextButton';
import SpotItem from 'spot/SpotItem';

export default class SpotList extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        spots: PropTypes.arrayOf(PropTypes.object).isRequired,
        setSpot: PropTypes.func.isRequired,
        purchased: PropTypes.arrayOf(PropTypes.object)
    };

    _onDetailsClick = spot => {
        this.props.setSpot(spot);
    }

    render() {
        const {
            selectedSpot,
            spots,
            purchased
        } = this.props;
        const list = (purchased.length > 0) ? spots.filter(spot => !purchased.some(x => x.spotId === spot.id)) : spots;

        return (
            list && (
                <div className="SpotList">
                    <div className="SpotList-feature">
                        <div className="SpotList-breadcrumbs">
                            <TextButton>Chicago</TextButton> &gt; Millennium Park
                        </div>
                        <h1>Millennium Park</h1>
                        <p>{list.length} Spots Available</p>
                    </div>
                    <div className="SpotList-spots">
                        {list.map(spot => {
                            return (
                                <SpotItem
                                    key={spot.id}
                                    data={spot}
                                    isSelected={selectedSpot && selectedSpot.id === spot.id}
                                    onDetailsClick={this._onDetailsClick}
                                />
                            );
                        })}
                    </div>
                </div>
            )
        );
    }
}
