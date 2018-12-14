import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book/Book";

const Books = props => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.booksList.map(book => (
                    <li key={book.id}>
                        <Book book={book} />
                    </li>
                ))}
            </ol>
        </div>
    );
};

Books.propTypes = {
    booksList: PropTypes.array.isRequired
};

export default Books;