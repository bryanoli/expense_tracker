import React from 'react';

const VirtualCreditCard = ({ cardNumber, expirationDate, cardholderName }) => {

    return (
        <div class="card text-bg-info mb-3">
            <div className="card-body">
                <h5 className="card-title">{cardNumber}</h5>
                <p className="card-text">{cardholderName}</p>
                <p className="card-text">{expirationDate}</p>
                <a href="#" className="btn btn-primary">Button</a>
            </div>
        </div>
        // <div className="card">
        // <div className="card-number">{cardNumber}</div>
        // <div className="expiration-date">{expirationDate}</div>
        // <div className="cardholder-name">{cardholderName}</div>
        // </div>
    );
}

export default VirtualCreditCard;