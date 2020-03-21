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

  state = {
    bookshelfs: [
      {
        id: Shelf.CURRENTLY_READING,
        books: [
          {
            image: "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
            title: "To Kill a Mockingbird",
            authors: ["Harper Lee"]
          },
          {
            authors: ["Mike Hendrickson", "Brian Sawyer"],
            title: "Best Android Apps",
            image: "http://books.google.com/books/content?id=bUybAgAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
          }
        ]
      },
      {
        id: Shelf.WANT_TO_READ,
        books: [
          {
            image: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
            title: "1776",
            authors: ["David McCullough"]
          }
        ]
      },
      {
        id: Shelf.READ,
        books: [
          {
            image: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
            title: "The Hobbit",
            authors: ["J.R.R. Tolkien"]
          }
        ]
      }
    ]
  }

  partition = (toPartition, predicate) => {
    const [t, f] = toPartition
      .reduce((result, element) => {
        result[predicate(element) ? 0 : 1].push(element);
        return result;
      }, [[], []]);
    return [t, f]
  }

  removeFromBookshelf = (title, bookshelf) => {
    const [removedBookArray, newBookshelf] = this.partition(bookshelf.books, (book) => (book.title == title))
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

  buildNewBookshelfs = (originalBookshelfs, title, source, destination) => {
    const reduceResult = originalBookshelfs
      .reduce((result, bookshelf) => {
        if (bookshelf.id == source) {
          const { removedBook, newBookshelf } = this.removeFromBookshelf(title, bookshelf)
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

  moveBook = (title, source, destination) => {
    this.setState((currentState) => {
      const newBookshelfs = this.buildNewBookshelfs(currentState.bookshelfs, title, source, destination)
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
