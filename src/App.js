import React from 'react';
import {Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './App.css';
import './index.css';

import ListPosts from './components/Posts/ListPosts'
import PostDetail from './components/Posts/DetailPost'

const App = () => {
  return (
      <div className="app">
        <Route exact path="/" component={ListPosts}/>
        <Route exact path="/:category/" component={ListPosts}/>
        <Route exact path="/:category/:id" component={PostDetail}/>
      </div>
  )
};

export default App
