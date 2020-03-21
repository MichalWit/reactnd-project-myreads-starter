import React from 'react'
import {BrowserRouter} from 'react-router-dom' 
import ReactDOM from 'react-dom'
import './index.css'
import BooksApp from './main/BooksApp'

ReactDOM.render(<BrowserRouter><BooksApp /></BrowserRouter>, document.getElementById('root'))
