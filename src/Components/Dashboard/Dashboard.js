import React from 'react';
import PropTypes from 'prop-types';
import Books from '../Books/Books';

const Dashboard = props => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.shelfTitle}</h2>
            <Books booksList={props.booksList} />
        </div>
    );
};

Dashboard.propTypes = {

};

export default Dashboard;