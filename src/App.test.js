import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

/** 
 This course is not designed to teach Test Driven Development. 
 Feel free to use this file to test your application, but it 
 is not required.
**/

/*
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})
*/

it('should move book from one bookshelf to another 1', () => {
  const given = [
    {
      id: 1,
      books: [
        {
          title: "To Kill a Mockingbird"
        },
        {
          title: "Ender's Game"
        }
      ]
    },
    {
      id: 2,
      books: [
        {
          title: "The Hobbit"
        }
      ]
    }
  ]

  const result = new App().buildNewBookshelfs(given, "The Hobbit", 2, 1)

  expect(result).toEqual(
    [
      {
        id: 1,
        books: [
          {
            title: "To Kill a Mockingbird"
          },
          {
            title: "Ender's Game"
          },
          {
            title: "The Hobbit"
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
        {
          title: "To Kill a Mockingbird"
        },
        {
          title: "Ender's Game"
        }
      ]
    },
    {
      id: 2,
      books: [
        {
          title: "The Hobbit"
        }
      ]
    }
  ]

  const result = new App().buildNewBookshelfs(given, "To Kill a Mockingbird", 1, 2)

  expect(result).toEqual(
    [
      {
        id: 1,
        books: [
          {
            title: "Ender's Game"
          }
        ]
      },
      {
        id: 2,
        books: [
          {
            title: "The Hobbit"
          },
          {
            title: "To Kill a Mockingbird"
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

  const result = new App().buildNewBookshelfs(given, "f", 3, 1)

  expect(result).toEqual(
    [{
      id: 1,
      books: [ { title: "a" }, { title: "b" }, { title: "f" } ]
    },
    {
      id: 2,
      books: [ { title: "c" }, { title: "d" } ]
    },
    {
      id: 3,
      books: [ { title: "e" }, { title: "fff" } ]
    },
    {
      id: 4,
      books: [ { title: "g" }, { title: "h" } ]
    }]
  )
})
