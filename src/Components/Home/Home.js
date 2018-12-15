import React from 'react'
import PropTypes from 'prop-types';
import Dashboard from "../../Components/Dashboard/Dashboard";
import { Link } from "react-router-dom";


const Home = (props) => {
  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads<i className="hear-icon"/></h1>
        </div>
        <div className="list-books-content">
          <div>
            <Dashboard shelfTitle="Currently Reading" booksList={props.reading} moveBookToShelf={props.moveBookToShelf} />
            <Dashboard shelfTitle="Want to Read" booksList={props.booksToRead} moveBookToShelf={props.moveBookToShelf} />
            <Dashboard shelfTitle="Read" booksList={props.booksRead} moveBookToShelf={props.moveBookToShelf} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button className="ui icon button primary"><i className="plus circle icon"></i></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

Home.prototype = {
  booksList: PropTypes.array.isRequired,
  booksToRead: PropTypes.array.isRequired,
  booksRead: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
}

export default Home;