import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Shelf } from './App';
var md5 = require('md5');

class Book extends React.Component {

  render() {
    const title = this.props.title;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.image})` }}></div>
            <div className="book-shelf-changer">
              <select
                onChange={(event) => {
                  this.props.onMoveBook(title, event.target.value)
                }}
              >
                <option value="move" disabled>Move to...</option>
                <option value={Shelf.CURRENTLY_READING}>Currently Reading</option>
                <option value={Shelf.WANT_TO_READ}>Want to Read</option>
                <option value={Shelf.READ}>Read</option>
                <option value={Shelf.NONE}>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
        </div>
      </li>
    )
  }
}

class Bookshelf extends React.Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <Book
                key={md5(book.title)}
                title={book.title}
                authors={book.authors}
                image={book.image}
                onMoveBook={this.props.onMoveBook}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

class ListBooksContent extends React.Component {

  render() {
    return (
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
    )
  }
}

export default ListBooksContent
