import React from 'react'
import { Link } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooksContent from './ListBooksContent'

class ShowBookshelfs extends React.Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <ListBooksContent
          currentlyReading={this.props.currentlyReading}
          wantToRead={this.props.wantToRead}
          read={this.props.read}
          onMoveBook={this.props.onMoveBook}
        />
        <Link to="/search" className="open-search">Add a book</Link>
      </div>
    )
  }
}

export default ShowBookshelfs
