import React from 'react'
import { Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './../App.css'
import { Shelf } from './../App'
import Bookshelf from './Bookshelf'

class ShowBookshelfs extends React.Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              books={this.props.currentlyReading}
              onMoveBook={this.props.onMoveBook(Shelf.CURRENTLY_READING)}
            />
            <Bookshelf
              title='Want to Read'
              books={this.props.wantToRead}
              onMoveBook={this.props.onMoveBook(Shelf.WANT_TO_READ)}
            />
            <Bookshelf
              title='Read'
              books={this.props.read}
              onMoveBook={this.props.onMoveBook(Shelf.READ)}
            />
          </div>
        </div>
        <Link to="/search" className="open-search">Add a book</Link>
      </div>
    )
  }
}

export default ShowBookshelfs
