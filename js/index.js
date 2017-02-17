require('babel-polyfill');

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(<RepositoryList />, document.getElementById('app'))
);

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import RepositoryList from './components/repository-list';

document.addEventListener('DOMContentLoaded', () =>
    ReactDOM.render(
        <Provider store={store}>
            <RepositoryList />
        </Provider>,
        document.getElementById('app')
    )
);

import * as actions from './actions/index';
import store from './store';

console.log(store.getState());

store.dispatch(actions.addRepository('joe'));
console.log(store.getState()); // Logs [{ name: 'joe', rating: null}]

store.dispatch(actions.rateRepository('joe', 4));
console.log(store.getState());

store.dispatch(actions.addRepository('maraya'));
console.log(store.getState()); // Logs [{ name: 'joe', rating: null}]

store.dispatch(actions.rateRepository('maraya', 5));
console.log(store.getState());