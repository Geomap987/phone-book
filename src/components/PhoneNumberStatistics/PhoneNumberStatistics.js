import React from 'react';
import './PhoneNumberStatistics.css'

function PhoneNumberStatistics({ number, amount }) {

    return (
        <section className="phone-statistics">
            <h2 className="phone-statistics__title">{`Phone number +${number} has ${amount} calls`}</h2>
        </section>
    );
}


export default PhoneNumberStatistics;
