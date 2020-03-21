import React from 'react'
import ReactDOM from 'react-dom'
import Search from './Search'
import { Shelf } from '../main/BooksApp'

it('should find proper bookshelf', () => {
  const given = [
    {
      id: 1,
      books: [ { title: "a" }, { title: "b" } ]
    },
    {
      id: 2,
      books: [ { title: "c" }, { title: "d" } ]
    },
    {
      id: 3,
      books: [ { title: "e" }, { title: "f" }, { title: "fff" } ]
    },
    {
      id: 4,
      books: [ { title: "g" }, { title: "h" } ]
    }
  ]

  const search = new Search()
  search.props = {bookshelfs: given}
  const result = search.searchForBookshelfId({title: "f"})

  expect(result).toEqual(3)
})

it('should return Shelf.NONE when book has not been found', () => {
  const given = [
    {
      id: 1,
      books: [ { title: "a" }, { title: "b" } ]
    },
    {
      id: 2,
      books: [ { title: "c" }, { title: "d" } ]
    },
    {
      id: 3,
      books: [ { title: "e" }, { title: "f" }, { title: "fff" } ]
    },
    {
      id: 4,
      books: [ { title: "g" }, { title: "h" } ]
    }
  ]

  const search = new Search()
  search.props = {bookshelfs: given}
  const result = search.searchForBookshelfId({title: "asdf"})

  expect(result).toEqual(Shelf.NONE)
})
