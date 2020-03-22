import React from 'react'
import { Route } from 'react-router-dom'
import './../App.css'
import ShowBookshelfs from './../show-bookshelfs/ShowBookshelfs'
import Search from '../search/Search'

export const Shelf = {
  CURRENTLY_READING: 1,
  WANT_TO_READ: 2,
  READ: 3,
  NONE: 4
}

class BooksApp extends React.Component {

  buildEmptyBookshelfs = () => {
    return (
      {
        bookshelfs: [
          { id: Shelf.CURRENTLY_READING, books: [] },
          { id: Shelf.WANT_TO_READ, books: [] },
          { id: Shelf.READ, books: [] }
        ]
      }
    )
  }

  state = this.buildEmptyBookshelfs()

  componentDidMount = () => {
    let retrievedState = localStorage.state;
    let parsedState = null;
    if (!retrievedState)
      parsedState = this.buildEmptyBookshelfs()
    else
      parsedState = JSON.parse(retrievedState)
    this.setState(() => (
      parsedState
    ))
  }

  componentDidUpdate = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  partition = (toPartition, predicate) => {
    const [t, f] = toPartition
      .reduce((result, element) => {
        result[predicate(element) ? 0 : 1].push(element);
        return result;
      }, [[], []]);
    return [t, f]
  }

  removeFromBookshelf = (id, bookshelf) => {
    const [removedBookArray, newBookshelf] = this.partition(bookshelf.books, (book) => (book.id == id))
    const removedBook = removedBookArray[0]
    if (removedBook) {
      return {
        removedBook: removedBook,
        newBookshelf: { id: bookshelf.id, books: newBookshelf }
      }
    } else {
      return bookshelf
    }
  }

  buildNewBookshelfs = (originalBookshelfs, id, source, destination) => {
    const reduceResult = originalBookshelfs
      .reduce((result, bookshelf) => {
        if (bookshelf.id == source) {
          const { removedBook, newBookshelf } = this.removeFromBookshelf(id, bookshelf)
          result.removedBook = removedBook;
          result.newBookshelfs.push(newBookshelf);
          return result
        } else {
          result.newBookshelfs.push(bookshelf);
          return result
        }
      },
        {
          removedBook: null,
          newBookshelfs: []
        }
      );
    const finalResult = reduceResult.newBookshelfs.map((bookshelf) => {
      if (bookshelf.id == destination) {
        bookshelf.books.push(reduceResult.removedBook)
        return bookshelf
      } else {
        return bookshelf
      }
    })
    return finalResult
  }

  buildNewBookshelfsAfterAddition = (originalBookshelfs, book, destination) => {
    return originalBookshelfs
      .map((bookshelf) => {
          if (bookshelf.id == destination) {
            bookshelf.books.push(book);
            return bookshelf
          } else {
            return bookshelf
          }
        }
      );
  }

  moveBook = (id, source, destination) => {
    this.setState((currentState) => {
      const newBookshelfs = this.buildNewBookshelfs(currentState.bookshelfs, id, source, destination)
      return {
        bookshelfs: newBookshelfs
      }
    })
  }

  addBook = (book, destination) => {
    this.setState((currentState) => {
      const newBookshelfs = this.buildNewBookshelfsAfterAddition(currentState.bookshelfs, book, destination)
      return {
        bookshelfs: newBookshelfs
      }
    })
  }

  getBookshelf = (bookshelfId) => {
    return this.state.bookshelfs.find((bookshelf) => (bookshelf.id == bookshelfId))
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
