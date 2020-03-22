import Search from './Search'
import { Shelf } from '../main/BooksApp'

it('should find proper bookshelf', () => {
  const given = [
    {
      id: 1,
      books: [ { id: "a" }, { id: "b" } ]
    },
    {
      id: 2,
      books: [ { id: "c" }, { id: "d" } ]
    },
    {
      id: 3,
      books: [ { id: "e" }, { id: "f" }, { id: "fff" } ]
    },
    {
      id: 4,
      books: [ { title: "g" }, { title: "h" } ]
    }
  ]

  const search = new Search()
  search.props = {bookshelfs: given}
  const result = search.searchForBookshelfId("f")

  expect(result).toEqual(3)
})

it('should return Shelf.NONE when book has not been found', () => {
  const given = [
    {
      id: 1,
      books: [ { id: "a" }, { id: "b" } ]
    },
    {
      id: 2,
      books: [ { id: "c" }, { id: "d" } ]
    },
    {
      id: 3,
      books: [ { id: "e" }, { id: "f" }, { id: "fff" } ]
    },
    {
      id: 4,
      books: [ { id: "g" }, { id: "h" } ]
    }
  ]

  const search = new Search()
  search.props = {bookshelfs: given}
  const result = search.searchForBookshelfId("asdf")

  expect(result).toEqual(Shelf.NONE)
})
