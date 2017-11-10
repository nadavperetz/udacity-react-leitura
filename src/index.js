import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';


import reducer from './reducers/reducer'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer,
    composeEnhancers(applyMiddleware(thunk))
)



ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>

    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
