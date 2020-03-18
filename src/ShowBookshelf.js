import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooksContent from './ListBooksContent'

class ShowBookshelf extends React.Component {

  render() {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <ListBooksContent/>
          <Link to="/search">Add a book</Link>
        </div>
    )
  }
}

export default ShowBookshelf
