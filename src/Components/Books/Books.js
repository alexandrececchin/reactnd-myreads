import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book/Book";
const Books = props => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                <li>
                    <Book />
                </li>
            </ol>
        </div>
    );
};

Books.propTypes = {

};

export default Books;