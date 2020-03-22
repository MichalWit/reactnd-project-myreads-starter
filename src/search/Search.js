import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './../App.css'
import PropTypes from 'prop-types'
import Book from './../show-bookshelfs/Book'
import { Shelf } from '../main/BooksApp'

class Search extends React.Component {

  static propTypes = {
    bookshelfs: PropTypes.array.isRequired,
    onAddBook: PropTypes.func.isRequired
  }

  state = {
    query: "",
    searchResult: []
  }

  resolveImageUrl = (object) => {
    if (object.imageLinks !== undefined && object.imageLinks.thumbnail != undefined) {
      return object.imageLinks.thumbnail;
    } else {
      return 'http://localhost:3000/book.svg'
    }
  }

  transformToBook = (object) => {
    return {
      id: object.id,
      title: object.title,
      authors: object.authors || [],
      image: this.resolveImageUrl(object),
      bookshelfId: this.searchForBookshelfId(object.id)
    }
  }

  searchForBooksAndUpdateState = (query) => {
    this.updateQuery(query)
    BooksAPI
      .search(query)
      .then((booksFieldFromResp) => {
        if (booksFieldFromResp !== undefined && Array.isArray(booksFieldFromResp)) {
          const books = booksFieldFromResp.map((object) => this.transformToBook(object))
          const uniq = [...new Set(books)];
          this.updateSearchResult(uniq)
        } else {
          this.updateSearchResult([])
        }
      })
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))
  }

  updateSearchResult = (books) => {
    this.setState(() => ({
      searchResult: books
    }))
  }

  onAddBook = (book) => (event) => {
    event.preventDefault()
    const destination = event.target.value
    this.props.onAddBook(
      book,
      destination
    )
  }

  searchForBookshelfId = (idToFind) => {
    const bookshelf = this.props.bookshelfs.find((bookshelf) => {
      return bookshelf.books.find((book) => book.id === idToFind) !== undefined
    })
    if (bookshelf) {
      return bookshelf.id
    } else {
      return Shelf.NONE
    }
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
                key={book.id}
                title={book.title}
                authors={book.authors}
                image={book.image}
                bookshelfId={book.bookshelfId}
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
