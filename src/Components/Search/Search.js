
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
                    {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
                    <input type="text" style={{ width: '90%' }} placeholder="Search by title or author" value={props.value} onChange={(event)=> props.queryChange(event.target.value)}/>
                    <button className="ui primary button" onClick={() => props.search()} disabled={props.value === ''}>
                        <i className="search icon" />
                    </button>
                </div>
            </div>
            <div className="search-books-results">
                <Dashboard shelfTitle="Result" booksList={props.booksList} moveBookToShelf={props.moveBookToShelf} />
            </div>
        </div>
    );
};

Search.propTypes = {
    booksList: PropTypes.array.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
};

export default Search;