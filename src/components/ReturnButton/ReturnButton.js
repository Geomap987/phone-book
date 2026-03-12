import React from 'react';
import { Link } from 'react-router-dom';
import './ReturnButton.css'

function ReturnButton() {
    return (
        <Link to="/" className="return">Back to Home &#8634;</Link>
    );
}

export default ReturnButton;
