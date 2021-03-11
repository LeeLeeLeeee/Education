import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoApp from './Container';


export default function App(){
    store.subscribe(()=>{console.log(store.getState())});
    return (
        <Provider store={store}>
            <TodoApp />
        </Provider>
    )
}