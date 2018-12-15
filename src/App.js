import React from 'react'
import './App.css';
import { Route, Switch } from "react-router-dom";
import * as api from "./Components/Utils/BooksAPI";
import Search from "./Components/Search/Search";
import Home from "./Components/Home/Home";

class BooksApp extends React.Component {
  state = {
    books: [],
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
      this.setState({ books }, function a() { this.removeLoader(); });
    });
  }

  queryChangeHandler = (text) => {
    this.setState({ query: text }, function a() { this.search() });
  }

  search = () => {
    if (this.state.query) {
      this.showLoader();
      api.search(this.state.query).then(res => {
        if (Array.isArray(res)) {
          this.setState({ books: res, errorMsg: '' }, function a() { this.removeLoader() });
        } else if (res.error) {
          this.setState({ books: [], errorMsg: '0 Items found' }, function a() { this.removeLoader() });
        }
      });
    }
  }

  moveBookToShelf = (book, shelf) => {
    this.showLoader();
    api.update(book, shelf).then((res) => this.fetchAllBooks());
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

    return (
      <div className="app">
        <div className={`ui ${this.state.showLoad} dimmer indeterminate`} style={{ position: 'fixed' }}>
          <div className="ui big text loader">Loading...</div>
        </div>
        <Switch>
          <Route exact path="/search" render={() => (<Search booksList={this.state.books} fetchAllBooks={this.fetchAllBooks}
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