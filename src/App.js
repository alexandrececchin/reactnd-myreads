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
    booksRead: [],
    query: ''
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () => {
    api.getAll().then((books) => {
      this.setState({ books });
    });
  }

  queryChangeHandler = (text) => {
    this.setState({ query: text });
  }

  search = () => {
    console.log('Search by ' + this.state.query)
    api.search(this.state.query).then((res) => this.setState({ books: res }));
  }

  moveBookToShelf = (book, shelf) => {
    api.update(book, shelf).then((res) => this.fetchAllBooks());
  }


  render() {
    const booksRead = this.state.books.filter(books => books.shelf === 'read');
    const booksToRead = this.state.books.filter(books => books.shelf === 'wantToRead');
    const reading = this.state.books.filter(books => books.shelf === 'currentlyReading');
    return (
      <div className="app">
        <div className="loader2">
          <div className="ui active inline loader" style={{ display: 'none' }} />
        </div>
        <Switch>
          <Route exact path="/search" render={() => (<Search booksList={this.state.books} fetchAllBooks={this.fetchAllBooks} moveBookToShelf={this.moveBookToShelf}
            query={this.state.query} queryChange={this.queryChangeHandler} search={this.search} />)} />
          <Route exact path="/" render={() => (<Home reading={reading} booksToRead={booksToRead} booksRead={booksRead} moveBookToShelf={this.moveBookToShelf} />)} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp;