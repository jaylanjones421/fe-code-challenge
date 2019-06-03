import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Button from 'common/Button';
import Image from 'common/Image';
import { updateSelected } from 'spot/spot-actions';

class Confirmation extends PureComponent {
    static propTypes = {
        email: PropTypes.string.isRequired,
        selected: PropTypes.object,
        pushTo: PropTypes.func.isRequired,
        updateSelected: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        const {
            selected,
            pushTo
        } = props;

        // if you refresh on confirmation and there isn't a selectedSpot, make sure to go back to search and render nothing here
        if (!selected) {
            pushTo('/');
        }
    }

    _onPurchaseAnotherClick = evt => {
        const {
            pushTo,

        } = this.props;
        this.props.updateSelected(null);
        pushTo('/');
    }

    render() {
        const {
            email,
            selected,
            pushTo

        } = this.props;

        if (!selected) {
            pushTo('/');
        }

        return (
            <div className="Confirmation">
                <h1>Park it like its hot!</h1>
                <p>You successfully purchased parking at <strong>{selected && selected.title}</strong> for <strong>${selected && (selected.price / 100).toFixed(2)}</strong>.</p>
                <Image src={selected.image} />
                <p>We emailed a receipt to <a href={`mailto:${email}`}>{email}</a>.</p>
                <Button
                    color="primary"
                    onClick={this._onPurchaseAnotherClick}
                >
                    Purchase Another Spot!
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {
        checkout: {
            email
        },
        spot: {
            selected
        }
    } = state;

    return {
        email,
        selected,

    };
};

const mapDispatchToProps = {
    pushTo: push,
    updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
