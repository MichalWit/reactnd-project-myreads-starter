import BookshelfsFactory from "./BookshelfsFactory"

it('should leave bookshelf intact when there is no desired book in the original bookshelf', () => {
  const given = [
    {
      id: 1,
      books: [ { id: "1" }, {  id: "2" } ]
    },
    {
      id: 2,
      books: [ { id: "3" } ]
    }
  ]

  const result = BookshelfsFactory.buildNewBookshelfs(given, "44", 2, 1)

  expect(result).toEqual(given)
})

it('should move book from one bookshelf to another 1', () => {
  const given = [
    {
      id: 1,
      books: [
        {
          id: "1"
        },
        {
          id: "2"
        }
      ]
    },
    {
      id: 2,
      books: [
        {
          id: "3"
        }
      ]
    }
  ]

  const result = BookshelfsFactory.buildNewBookshelfs(given, "3", 2, 1)

  expect(result).toEqual(
    [
      {
        id: 1,
        books: [
          {
            id: "1"
          },
          {
            id: "2"
          },
          {
            id: "3"
          }
        ]
      },
      {
        id: 2,
        books: []
      }
    ]
  )
})

it('should move book from one bookshelf to another 2', () => {
  const given = [
    {
      id: 1,
      books: [
        {id: "1"},
        {id: "2"}
      ]
    },
    {
      id: 2,
      books: [
        { id: "3"}
      ]
    }
  ]

  const result = BookshelfsFactory.buildNewBookshelfs(given, "2", 1, 2)

  expect(result).toEqual(
    [
      {
        id: 1,
        books: [
          {
            id: "1"
          }
        ]
      },
      {
        id: 2,
        books: [
          {
            id: "3"
          },
          {
            id: "2"
          }
        ]
      }
    ]
  )
})

it('should move book from one bookshelf to another 3', () => {
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

  const result = BookshelfsFactory.buildNewBookshelfs(given, "f", 3, 1)

  expect(result).toEqual(
    [{
      id: 1,
      books: [ { id: "a" }, { id: "b" }, { id: "f" } ]
    },
    {
      id: 2,
      books: [ { id: "c" }, { id: "d" } ]
    },
    {
      id: 3,
      books: [ { id: "e" }, { id: "fff" } ]
    },
    {
      id: 4,
      books: [ { id: "g" }, { id: "h" } ]
    }]
  )
})

it('should add a new book', () => {
  const given = [
    {
      id: 1,
      books: [ { id: "1", bookshelfId: 1}, {  id: "2", bookshelfId: 1} ]
    },
    {
      id: 2,
      books: [ { id: "3", bookshelfId: 2} ]
    }
  ]

  const result = BookshelfsFactory.buildNewBookshelfsAfterAddition(
    given,
    { id: "4", bookshelfId: 4},
    1
  )

  expect(result).toEqual([
    {
      id: 1,
      books: [ { id: "1", bookshelfId: 1}, {  id: "2", bookshelfId: 1}, { id: "4", bookshelfId: 1}]
    },
    {
      id: 2,
      books: [ { id: "3", bookshelfId: 2} ]
    }
  ])
})

it('should move book when existing one is to be added', () => {
  const given = [
    {
      id: 1,
      books: [ { id: "1", bookshelfId: 1}, {  id: "2", bookshelfId: 1} ]
    },
    {
      id: 2,
      books: [ { id: "3", bookshelfId: 2} ]
    }
  ]

  const result = BookshelfsFactory.buildNewBookshelfsAfterAddition(
    given,
    { id: "1", bookshelfId: 1},
    2
  )

  expect(result).toEqual([
    {
      id: 1,
      books: [ {  id: "2", bookshelfId: 1} ]
    },
    {
      id: 2,
      books: [ { id: "3", bookshelfId: 2}, { id: "1", bookshelfId: 1}]
    }
  ])
})
