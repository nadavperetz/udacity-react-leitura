import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Router} from 'react-router-dom'
import {applyMiddleware, compose, createStore} from 'redux'
import createBrowserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';


import reducer from './reducers/reducer'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,
    composeEnhancers(applyMiddleware(thunk))
)


ReactDOM.render(
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <App/>
      </Router>

    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
