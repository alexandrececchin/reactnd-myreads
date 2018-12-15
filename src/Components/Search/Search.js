
import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Dashboard from "../Dashboard/Dashboard";

const Search = props => {
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search" onClick={() => props.fetchAllBooks()}>Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    <input type="text" style={{ width: '90%' }} placeholder="Search by title or author" value={props.value} onChange={(event) => props.queryChange(event.target.value)} />
                    <button className="ui primary button" onClick={() => props.search()} disabled={props.value === ''}>
                        <i className="search icon" />
                    </button>
                </div>
            </div>
            <div className="search-books-results">
                {props.errorMsg === '' ?
                    <Dashboard shelfTitle="Result" booksList={props.booksList} moveBookToShelf={props.moveBookToShelf} />
                    : <h2 style={{textAlign: 'center'}}><strong>{props.errorMsg}</strong></h2>
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