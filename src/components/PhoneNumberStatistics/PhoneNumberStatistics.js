import React from 'react';
import './PhoneNumberStatistics.css'

function PhoneNumberStatistics({ number, amount }) {

    return (
        <section className="phone-statistics">
            <h2 className="phone-statistics__title">{`По номеру телефона +${number} было совершено ${amount} звонков`}</h2>
        </section>
    );
}


export default PhoneNumberStatistics;