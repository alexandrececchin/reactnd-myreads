
import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Dashboard from "../Dashboard/Dashboard";
import { DebounceInput } from 'react-debounce-input';

const Search = props => {
    return (
        <div className="search-books">
            <Link to="/">
                <button className="close-search ui icon button primary" onClick={() => props.fetchAllBooks()}>
                    <i className="arrow left icon"></i>
                </button>
            </Link>
            <div className="search-books-bar">
                <div className="ui icon input">
                    <DebounceInput debounceTimeout={500} placeholder="Search by title or author"
                        value={props.value} onChange={event => props.queryChange(event.target.value)} />
                    <i className="search icon" />
                </div>
            </div>
            <div className="search-books-results">
                {props.errorMsg === '' ?
                    <Dashboard shelfTitle="Result" booksList={props.booksList} moveBookToShelf={props.moveBookToShelf} />
                    : <h2 style={{ textAlign: 'center' }}><strong>{props.errorMsg}</strong></h2>
                }
            </div>
        </div>
    );
};

Search.propTypes = {
    booksList: PropTypes.array.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
};

export default Search;