import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Navbar from './Navbar'
// Pages
import Home from '../pages/Home'
import Books from '../pages/Books'
import Book from '../pages/Books/book.js'
import Categories from '../pages/Categories'
import Category from '../pages/Categories/category'

const App = () =>
  <div>
    <Navbar />
    <Route path="/" exact component={Home} />
    <Route exact path="/books" component={Books} />
    <Route path="/books/:slug" component={Book} />
    <Route exact path="/categories" component={Categories} />
    <Route path="/categories/:slug" component={Category} />
    <Redirect to="/" />
  </div>

export default App
