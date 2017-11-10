import React from 'react'
import {Route} from 'react-router-dom'

import './App.css'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Base from './components/Base'

const App = () => {
  return (
      <div className="app">
        <Route exact path="/" component={Base}/>
        <Route exact path="/:id" component={Base}/>
      </div>
  )
};

export default App
