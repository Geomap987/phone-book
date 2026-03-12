import React from 'react';
import './SearchForm.css';
import { Link } from 'react-router-dom';

function SearchForm({onSearchWord}) {
    const [searchWord, setSearchWord] = React.useState('');
    function handleSearchWord(e) {
        setSearchWord(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSearchWord(searchWord)
    }

    return (
        <section className="search-form">
        <h1 className="search-form__title">Customer Call Information</h1>
        <div className="search-form__container">
            <form onSubmit={handleSubmit} className="search-form__form">
                <input className="search-form__input"
                    placeholder="Phone number in format 78121234567 or operator ID"
                    value={searchWord}
                    onChange={handleSearchWord}
                    required></input>
                <button className="search-form__button">Search</button>
            </form>
            <div className="search-form__statistics-container">
                <p className="search-form__subtitle">Call statistics by&nbsp;different&nbsp;parameters</p>
                <Link to="/stat" className="search-form__statistic-button">Open</Link>
            </div>
            </div>
        </section>
    );
}


export default SearchForm;
