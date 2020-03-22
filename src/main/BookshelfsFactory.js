import { Shelf } from './BooksApp'

class BookshelfsFactory {

  static buildEmptyBookshelfs = () => {
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

  static buildNewBookshelfs = (originalBookshelfs, id, source, destination) => {
    const { removedBook, withdrawnBookshelfs } = originalBookshelfs
      .reduce((result, bookshelf) => {
        if (bookshelf.id === source) {
          const { removedBook, newBookshelf } = BookshelfsFactory.#removeFromBookshelf(id, bookshelf)
          result.removedBook = removedBook;
          result.withdrawnBookshelfs.push(newBookshelf);
          return result
        } else {
          result.withdrawnBookshelfs.push(bookshelf);
          return result
        }
      },
        {
          removedBook: null,
          withdrawnBookshelfs: []
        }
      );
    const bookshelfsWithMovedBook = withdrawnBookshelfs.map((bookshelf) => {
      if (bookshelf.id === destination) {
        if(removedBook) bookshelf.books.push(removedBook)
        return bookshelf
      } else {
        return bookshelf
      }
    })
    return bookshelfsWithMovedBook
  }

  static buildNewBookshelfsAfterAddition = (originalBookshelfs, book, destination) => {
    if (book.bookshelfId === Shelf.NONE) {
      let bookOnProperShelf = JSON.parse(JSON.stringify(book))
      bookOnProperShelf.bookshelfId = destination
      return BookshelfsFactory.#addNewBook(
        originalBookshelfs,
        bookOnProperShelf
      )
    } else {
      return BookshelfsFactory.buildNewBookshelfs(
        originalBookshelfs,
        book.id,
        book.bookshelfId,
        destination
      )
    }
  }

  static #addNewBook = (originalBookshelfs, book) => {
    return originalBookshelfs
      .map((bookshelf) => {
          if (bookshelf.id === book.bookshelfId) {
            bookshelf.books.push(book);
            return bookshelf
          } else {
            return bookshelf
          }
        }
      );
  }

  static #partition = (toPartition, predicate) => {
    const [t, f] = toPartition
      .reduce((result, element) => {
        result[predicate(element) ? 0 : 1].push(element);
        return result;
      }, [[], []]);
    return [t, f]
  }

  static #removeFromBookshelf = (id, bookshelf) => {
    const [removedBookArray, newBooks] = BookshelfsFactory.#partition(bookshelf.books, (book) => {
      return book.id === id
    })
    const removedBook = removedBookArray[0]
    if (removedBook) {
      return {
        removedBook: removedBook,
        newBookshelf: { id: bookshelf.id, books: newBooks }
      }
    } else {
      return {
        removedBook: removedBook,
        newBookshelf: bookshelf
      }
    }
  }
}

export default BookshelfsFactory
