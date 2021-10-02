import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import CounterApp from './Container';

export default function(){
    return (
        <Provider store={store}>
            <CounterApp />
        </Provider>
    );
    
}