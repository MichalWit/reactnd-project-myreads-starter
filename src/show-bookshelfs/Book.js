import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './../App.css'
import { Shelf } from '../main/BooksApp';
import PropTypes from 'prop-types'

class Book extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    onSelectOptionChange: PropTypes.func.isRequired,
    bookshelfId: PropTypes.number.isRequired
  }

  render() {
    const title = this.props.title;
    const authors = this.props.authors;
    const image = this.props.image;
    const children = this.props.children
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.bookshelfId} onChange={this.props.onSelectOptionChange}>
                <option value="move" disabled>Move to...</option>
                <option value={Shelf.CURRENTLY_READING}>Currently Reading</option>
                <option value={Shelf.WANT_TO_READ}>Want to Read</option>
                <option value={Shelf.READ}>Read</option>
                <option value={Shelf.NONE}>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
