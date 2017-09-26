import React from 'react'
import Navbar from '../src/client/components/Navbar'
import {BrowserRouter} from 'react-router-dom'
import { storiesOf } from '@kadira/storybook'

const NavBarStories = storiesOf('Navbar', module)
  .add('main state', () => {
    return <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  })

export default NavBarStories
