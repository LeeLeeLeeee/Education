import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import PostApp from './Container';


export default function App(){
    return (
        <Provider store={store}>
            <PostApp />
        </Provider>
    )
}