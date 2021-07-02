import React from 'react';
import './Header.css';
import logo from '../../logo.png';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Супербазы" />
        </header>
    );
}

export default Header;