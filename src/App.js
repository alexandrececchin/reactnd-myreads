import React from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import * as api from "./Components/Utils/BooksAPI";
import Search from "./Components/Search/Search";
import Home from "./Components/Home/Home";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: [],
    query: '',
    showLoad: '',
    errorMsg: ''
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = () => {
    this.showLoader();
    api.getAll().then((books) => {
      this.setState({ books: books, searchResults: [] }, function a() { this.removeLoader(); });
    });
  }

  queryChangeHandler = (text) => {
    this.setState({ query: text }, function a() { this.search() });
  }

  findShelf = (bookId) => {
    let bookShelf = this.state.books.filter(b => b.id === bookId).map(b => { return b.shelf });
    return bookShelf && bookShelf.length > 0 ? bookShelf : 'none';
  }

  search = () => {
    if (this.state.query) {
      this.showLoader();
      api.search(this.state.query).then(res => {
        if (Array.isArray(res)) {
          let searchResults = res.map((book) => {
            book.shelf = this.findShelf(book.id);
            return book;
          });
          this.setState({ searchResults: searchResults, errorMsg: '' }, function a() { this.removeLoader() });
        } else if (res.error) {
          this.setState({ books: [], errorMsg: '0 Items found' }, function a() { this.removeLoader() });
        }
      });
    }
  }

  moveBookToShelf = (book, newShelf) => {
    this.showLoader();
    api.update(book, newShelf).then((res) => {
      let books = this.state.books.map(b => book.id !== b.id ? b : Object.assign({}, b, { shelf: newShelf }));
      let searchResults = this.state.searchResults.map(b => book.id !== b.id ? b : Object.assign({}, b, { shelf: newShelf }));
      this.setState({ books: books, searchResults: searchResults }, function a() { this.removeLoader(); });
    });
  }

  showLoader = () => {
    this.setState({ showLoad: 'active' })
  }

  removeLoader = () => {
    this.setState({ showLoad: '' })
  }

  render() {
    const booksRead = this.state.books.filter(books => books.shelf === 'read');
    const booksToRead = this.state.books.filter(books => books.shelf === 'wantToRead');
    const reading = this.state.books.filter(books => books.shelf === 'currentlyReading');
    const searchResults = (this.state.errorMsg === '' && this.state.searchResults.length === 0) ? this.state.books : this.state.searchResults;

    return (
      <div className="app">
        <div className={`ui ${this.state.showLoad} dimmer indeterminate`} style={{ position: 'fixed' }}>
          <div className="ui big text loader">Loading...</div>
        </div>
        <Switch>
          <Route exact path="/search" render={() => (<Search booksList={searchResults} fetchAllBooks={this.fetchAllBooks}
            errorMsg={this.state.errorMsg} moveBookToShelf={this.moveBookToShelf} query={this.state.query}
            queryChange={this.queryChangeHandler} search={this.search} />)} />

          <Route exact path="/" render={() => (<Home reading={reading} booksToRead={booksToRead} booksRead={booksRead}
            moveBookToShelf={this.moveBookToShelf} />)} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp;