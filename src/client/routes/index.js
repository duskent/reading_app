import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
// Components (Pages)
import Home from '../pages/Home'
import Books from '../pages/Books'
import Book from '../pages/Books/book'
import NewBook from '../pages/Books/new'
import Categories from '../pages/Categories'
import Category from '../pages/Categories/category'
import NewCategory from '../pages/Categories/new'

const Routes = () =>
  <div>
    <Route path="/" exact component={Home} />
    <Switch>
      <Route exact path="/books" component={Books} />
      <Route path="/books/new" component={NewBook} />
      <Route path="/books/:slug" component={Book} />
    </Switch>
    <Switch>
      <Route exact path="/categories" component={Categories} />
      <Route path="/categories/new" component={NewCategory} />
      <Route path="/categories/:slug" component={Category} />
    </Switch>
    <Redirect to="/" />
  </div>

export default Routes
