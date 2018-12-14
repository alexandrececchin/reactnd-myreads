import React from 'react';
import PropTypes from 'prop-types';
import Books from '../Books/Books';

const Dashboard = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <Books booksList={props.booksList} moveBookToShelf={props.moveBookToShelf}/>
        </div>
    );
};

Dashboard.propTypes = {
    booksList: PropTypes.array.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
};

export default Dashboard;