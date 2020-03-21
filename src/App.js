import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ShowBookshelfs from './show-bookshelfs/ShowBookshelfs'
import Search from './search/Search'
import * as BooksAPI from './BooksAPI'

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
            authors: "Harper Lee"
          },
          {
            image: "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
            title: "Ender's Game",
            authors: "Orson Scott Card"
          }
        ]
      },
      {
        id: Shelf.WANT_TO_READ,
        books: [
          {
            image: "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
            title: "1776",
            authors: "David McCullough"
          },
          {
            image: "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
            title: "Harry Potter and the Sorcerer's Stone",
            authors: "J.K. Rowling",
          }
        ]
      },
      {
        id: Shelf.READ,
        books: [
          {
            image: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
            title: "The Hobbit",
            authors: "J.R.R. Tolkien"
          },
          {
            image: "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api",
            title: "Oh, the Places You'll Go!",
            authors: "Seuss",
          },
          {
            image: "http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api",
            title: "The Adventures of Tom Sawyer",
            authors: "Mark Twain",
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

  moveBook = (title, source, destination) => {
    this.setState((currentState) => {
      const finalResult = this.buildNewBookshelfs(currentState.bookshelfs, title, source, destination)
      return {
        bookshelfs: finalResult
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
        <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
