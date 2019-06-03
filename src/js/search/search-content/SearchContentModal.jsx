import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextButton from '../../common/TextButton';
import Button from '../../common/Button';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default class SearchContentModal extends PureComponent {
    static propTypes = {
        selectedSpot: PropTypes.object,
        setSpot: PropTypes.func.isRequired

    };
    state = {
        title: '',
        description: '',
        price: '',
        id: null
    }

    componentDidMount() {
        const { selectedSpot } = this.props;
        // componentWillMount is now an UNSAFE method
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            title: selectedSpot.title,
            description: selectedSpot.description,
            price: selectedSpot.price,
            id: selectedSpot.id
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { selectedSpot } = this.props;

        if (Boolean(this.props.selectedSpot) && this.props.selectedSpot !== prevProps.selectedSpot) {
            // componentWillReceiveProps is now an UNSAFE method
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                title: selectedSpot.title,
                description: selectedSpot.description,
                price: selectedSpot.price
            });
        }
    }

    _onCloseClick = () => {
        this.props.setSpot(null);
    }

    render() {
        const { title, description, price, id } = this.state;
        const formattedPrice = (parseFloat(price) / 100).toFixed(2);

        return (
            <div id="search-content-modal">
                <div className="exit-search-content-modal-container">
                    <Button
                        id="exit-search-content-modal-button"
                        children={<MdClose />}
                        onClick={this._onCloseClick}
                    />
                </div>
                <div className="header">
                    <h2>Spot Details</h2>
                </div>
                <div id="search-content-container">
                    <h2 id="selected-spot-title">{title}</h2>
                    <p id="selected-spot-description" >
                        {description}
                    </p>

                </div>
                <Link to={`/checkout/${id}`}>
                    <TextButton
                        id="book-search-item"
                        children={`$${formattedPrice} | Book It!`}

                    />
                </Link>
            </div>

        );
    }
}
