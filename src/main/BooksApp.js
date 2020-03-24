import React from 'react'
import { Route } from 'react-router-dom'
import './../App.css'
import ShowBookshelfs from './../show-bookshelfs/ShowBookshelfs'
import Search from '../search/Search'
import BookshelfsFactory from './BookshelfsFactory'
import * as BooksAPI from './../BooksAPI'

export const Shelf = {
  CURRENTLY_READING: "currentlyReading",
  WANT_TO_READ: "wantToRead",
  READ: "read",
  NONE: "none"
}

class BooksApp extends React.Component {

  state = BookshelfsFactory.buildEmptyBookshelfs()

  #resolveImageUrl = (object) => {
    if (object.imageLinks !== undefined && object.imageLinks.thumbnail !== undefined) {
      return object.imageLinks.thumbnail;
    } else {
      return 'http://localhost:3000/book.svg'
    }
  }

  #transformToBook = (object) => {
    return {
      id: object.id,
      title: object.title,
      authors: object.authors || [],
      image: this.#resolveImageUrl(object),
      bookshelfId: object.shelf
    }
  }

  componentDidMount = () => {
    BooksAPI
      .getAll()
      .then((resp) => {
        if (resp !== undefined && Array.isArray(resp)) {
          const books = resp.map((book) => this.#transformToBook(book))
          const wantToRead = books.filter((book) => (book.bookshelfId === Shelf.WANT_TO_READ))
          const read = books.filter((book) => (book.bookshelfId === Shelf.READ))
          const currentlyReading = books.filter((book) => (book.bookshelfId === Shelf.CURRENTLY_READING))
          this.setState(() => ({
            bookshelfs: [
              { id: Shelf.CURRENTLY_READING, books: currentlyReading },
              { id: Shelf.WANT_TO_READ, books: wantToRead },
              { id: Shelf.READ, books: read }
            ]
          }))
        }
      })
  }

  componentDidUpdate = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  moveBook = (id, source, destination) => {
    this.setState((currentState) => {
      const newBookshelfs = BookshelfsFactory.buildNewBookshelfs(currentState.bookshelfs, id, source, destination)
      return {
        bookshelfs: newBookshelfs
      }
    })
  }

  addBook = (book, destination) => {
    this.setState((currentState) => {
      const newBookshelfs = BookshelfsFactory.buildNewBookshelfsAfterAddition(currentState.bookshelfs, book, destination)
      return {
        bookshelfs: newBookshelfs
      }
    })
    BooksAPI
      .update(book.id, destination)
      .then((resp) => {
        if (resp !== undefined) {
          console.log(resp)
        } else {
          console.log("no resp?")
        }
      })
  }

  getBookshelf = (bookshelfId) => {
    return this.state.bookshelfs.find((bookshelf) => (bookshelf.id === bookshelfId))
  }

  render() {
    return (
      <div className="app" >
        <Route exact path='/' render={() => (
          <ShowBookshelfs
            currentlyReading={this.getBookshelf(Shelf.CURRENTLY_READING)}
            wantToRead={this.getBookshelf(Shelf.WANT_TO_READ)}
            read={this.getBookshelf(Shelf.READ)}
            onMoveBook={this.moveBook}
          />
        )} />
        <Route path='/search' render={() => (
          <Search
            onAddBook={this.addBook}
            bookshelfs={this.state.bookshelfs}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
