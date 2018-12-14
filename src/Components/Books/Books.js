import React from 'react';
import PropTypes from 'prop-types';
import Book from "./Book/Book";

const Books = props => {
    return (
        <div className="bookshelf-books">
            <ol className="books-grid">
                {props.booksList.map(book => (
                    <li key={book.id}>
                        <Book book={book} moveBookToShelf={props.moveBookToShelf}/>
                    </li>
                ))}
            </ol>
        </div>
    );
};

Books.propTypes = {
    booksList: PropTypes.array.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
};

export default Books;