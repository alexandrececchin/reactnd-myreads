import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
    const thumbnail = props.book.imageLinks && props.book.imageLinks.thumbnail ? props.book.imageLinks.thumbnail: '';
    const autor = props.book.authors ? props.book.authors: '';
    const title = props.book.title ? props.book.title: '';
    const shelf = props.book.shelf;
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={shelf} onChange={(e) => props.moveBookToShelf(props.book, e.target.value)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{autor}</div>
        </div>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
};

export default Book;