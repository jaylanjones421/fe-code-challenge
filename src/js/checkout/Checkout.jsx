/* eslint-disable react/jsx-no-bind */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import TextButton from '../common/TextButton';
import axios from 'axios';
import { MdChevronLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { purchase, updateSelected } from 'spot/spot-actions';
import { updateCheckout } from 'checkout/checkout-actions';

class Checkout extends PureComponent {
    static propTypes = {
        selected: PropTypes.object,
        match: PropTypes.object,
        history: PropTypes.object,
        purchase: PropTypes.func,
        updateCheckout: PropTypes.func,
        updateSelected: PropTypes.func
    };

    state = {
        spot: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        phoneNumberError: false,
        emailError: false

    }
    componentDidMount() {
        (this.props.selected) ?
            // ComponentWillMount is UNSAFE now
            // eslint-disable-next-line react/no-did-mount-set-state
            this.setState({
                spot: this.props.selected
            })

            : this._loadSelected();
    }

    _onSubmit = event => {
        const { phoneNumberError, emailError, email, phoneNumber } = this.state;
        event.preventDefault();
        this.validateEmail(email);
        this.validatePhone(phoneNumber);

        return (Boolean(phoneNumberError) || Boolean(emailError)) ? null : this._purchaseSelected();
    }

    handleChange(val, key) {
        this.setState({
            [key]: val
        });
        if (key === 'email') {
            this.validateEmail(val);
        } else if (key === 'phoneNumber') {
            this.validatePhone(val);
        }
    }

    async _loadSelected() {
        try {
            const {
                data
                // had to step away and had to rerun npm start, lead to proxy @ port 9000?
            } = await axios.get(`http://localhost:8000/spots/${this.props.match.params.id}`);

            this.setState({
                spot: data
            });
            this.props.updateSelected(data);
        } catch (error) {
            console.log('Error loading spot data: ', error); // eslint-disable-line no-console
        }
    }

    _purchaseSelected() {
        const { spot, email, phoneNumber, firstName, lastName } = this.state;

        const reqBody = {
            spotId: spot && spot.id,
            firstName,
            lastName,
            email,
            phone: phoneNumber
        };

        axios.post(`http://localhost:8000/reservations`, reqBody)
            .then(res => this.props.purchase(res.data))
            .then(this.props.updateCheckout(this.state.email))
            .then(() => this.props.history.push('/confirmation'))
            .catch(error => { console.log('Error loading spot data: ', error); } // eslint-disable-line no-console
            );
    }

    validateEmail = str => {
        return ((str !== '' && str.split('').includes('@')) ? this.setState({ emailError: false }) : this.setState({ emailError: true }));
    }

    validatePhone = str => {
        return ((str !== '' && str.length !== 10) ? this.setState({ phoneNumberError: true }) : this.setState({ phoneNumberError: false }));
    }

    render() {
        const { firstName, lastName, email, phoneNumber, spot, emailError, phoneNumberError } = this.state;
        const formattedPrice = price => (parseFloat(price) / 100).toFixed(2);

        return (
            <div id="checkout-container">
                <div id="checkout-modal">
                    <div id="checkout-navbar">
                        <Link to="/"><TextButton children={<div><MdChevronLeft />Back to search</div>} /></Link>
                    </div>
                    <div id="checkout-body">
                        <div id="checkout-header">
                            <img
                                src={spot && spot.image}
                                alt={`Spot #${spot && spot.id} image`}
                            />
                            <div id="checkout-header-details">
                                <h2>
                                    {spot && spot.title}
                                </h2>
                                <p>
                                    {spot && spot.distance}
                                </p>
                            </div>
                        </div>
                        <form
                            formNoValidate
                            id="checkout-form"
                            onSubmit={this._onSubmit}
                        >
                            <label htmlFor="first-name-input">First Name</label>
                            <input
                                id="first-name-input"
                                className="checkout-form-input"
                                type="text"
                                value={firstName}
                                onChange={e => this.handleChange(e.target.value, 'firstName')}
                            />
                            <label htmlFor="last-name-input">Last Name</label>
                            <input
                                id="last-name-input"
                                className="checkout-form-input"
                                type="text"
                                value={lastName}
                                onChange={e => this.handleChange(e.target.value, 'lastName')}
                            />
                            <label
                                htmlFor="email-input"
                                style={{ color: emailError && 'red' }}
                            >
                                Email
                            </label>
                            <input
                                id="email-input"
                                type="email"
                                className="checkout-form-input"
                                value={email}
                                onChange={e => this.handleChange(e.target.value, 'email')}
                            />
                            {emailError && <p className="error-message">Please enter valid email.</p>}
                            <label
                                htmlFor="phone-number-input"
                                style={{ color: phoneNumberError && 'red' }}
                            >
                                Phone Number
                            </label>
                            <input
                                id="phone-number-input"
                                type="number"
                                // pattern="((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}"
                                className="checkout-form-input"
                                value={phoneNumber}
                                onChange={e => this.handleChange(e.target.value, 'phoneNumber')}
                            />
                            {phoneNumberError && <p className="error-message">Please enter valid phone number.</p>}
                            <input
                                type="submit"
                                formNoValidate
                                disabled={!email || !phoneNumber || phoneNumberError || emailError}
                                id="submit-checkout"
                                value={`Purchase for $${spot && formattedPrice(spot.price)}`}
                            />
                        </form>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    const {
        spot: { selected, purchased }
    } = state;

    return { selected, purchased };
};

const mapDispatchToProps = {
    purchase,
    updateCheckout,
    updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
