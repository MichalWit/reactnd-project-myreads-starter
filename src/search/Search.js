import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './../App.css'
import PropTypes from 'prop-types'
import Book from './../show-bookshelfs/Book'
import { Shelf } from '../main/BooksApp'
const md5 = require('md5');

class Search extends React.Component {

  static propTypes = {
    bookshelfs: PropTypes.array.isRequired,
    onAddBook: PropTypes.func.isRequired
  }

  state = {
    query: "",
    searchResult: []
  }

  transformToBook = (object) => {
    return {
      title: object.title,
      authors: object.authors || [],
      image: object.imageLinks.thumbnail
    }
  }

  searchForBooksAndUpdateState = (query) => {
    this.updateQuery(query)
    BooksAPI
      .search(query)
      .then((resp) => {
        if (resp !== undefined && Array.isArray(resp)) {
          const books = resp.map((object) => this.transformToBook(object))
          const uniq = [...new Set(books)];
          this.updateSearchResult(uniq)
        }
      })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }

  updateSearchResult = (books) => {
    this.setState(() => ({
      searchResult: books
    }))
  }

  onAddBook = (book) => (event) => {
    event.preventDefault()
    this.props.onAddBook(
      book,
      event.target.value
    )
  }

  searchForBookshelfId = (book) => {
    const titleToFind = book.title
    const bookshelf = this.props.bookshelfs.find((bookshelf) => {
      return bookshelf.books.find((book) => book.title === titleToFind) !== undefined
    })
    if (bookshelf) {
      return bookshelf.id
    } else {
      return Shelf.NONE
    }
  }

  computeHashForBook = (book) => {
    return md5(book.title + (book.authors || []).join() + book.image)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => { this.searchForBooksAndUpdateState(event.target.value) }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
          {
            this.state.searchResult.map((book) => (
              <Book
                key={this.computeHashForBook(book)}
                title={book.title}
                authors={book.authors}
                image={book.image}
                bookshelfId={this.searchForBookshelfId(book)}
                onSelectOptionChange={this.onAddBook(book)}
              />
            ))
          }
        </div>
      </div>
    )
  }
}

export default Search
