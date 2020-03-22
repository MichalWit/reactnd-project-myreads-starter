import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './../App.css'
import Book from './Book'
var md5 = require('md5');

class Bookshelf extends React.Component {

  onMoveBook = (id, bookshelfId) => (event) => {
    event.preventDefault()
    this.props.onMoveBook(
      id,
      bookshelfId,
      event.target.value
    )
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.bookshelf.books.map((book) => (
              <Book
                key={book.id}
                title={book.title}
                authors={book.authors || []}
                image={book.image}
                bookshelfId={this.props.bookshelf.id}
                onSelectOptionChange={this.onMoveBook(book.id, this.props.bookshelf.id)}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf
