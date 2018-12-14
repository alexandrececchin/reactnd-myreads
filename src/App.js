import React from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import * as api from "./Components/Utils/BooksAPI";
import Search from "./Components/Search/Search";
import Home from "./Components/Home/Home";

class BooksApp extends React.Component {
  state = {
    books: [],
    reading: [],
    booksToRead: [],
    booksRead: []
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () => {
    api.getAll().then((books) => {
      this.setState({ books });
    });
  }

  render() {
    const booksRead = this.state.books.filter(books => books.shelf === 'read');
    const booksToRead = this.state.books.filter(books => books.shelf === 'wantToRead');
    const reading = this.state.books.filter(books => books.shelf === 'currentlyReading');

    return (
      <div className="app">
        <Switch>
          <Route exact path="/search" render={() => (<Search booksList={this.state.books} shelfTitle="Result" />)} />
          <Route exact path="/" render={() => (<Home reading={reading} booksToRead={booksToRead} booksRead={booksRead} />)} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp;