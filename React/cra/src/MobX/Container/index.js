import React, { Component } from 'react';
import TodoComponent from '../Component/TodoTest'
import CounterComponent, { counterStore } from '../Component/Counter'
import { Provider } from 'mobx-react'
import RootContext from '../Module'
import User from '../Module/User'
import UserApp from '../Component/User'
import TestComponent from '../Component/Test'
import { when } from 'mobx';
const counter = new counterStore();
const store = {
    user: new User
}
class App extends Component {
    TodoApp = null
    CounterApp = null;
    UserAppClass = null;
    UserAppFunc = null;
    TestApp = null;

    constructor(props){
        super(props)
        this.TodoApp = () => <TodoComponent />

        this.CounterApp = () => (
            <Provider counter={counter}>
                <CounterComponent />
            </Provider> 
        )
            
        this.UserAppFunc = () => (
            <RootContext.Provider value={store}>
                <UserApp />
            </RootContext.Provider>
        )

        this.UserAppClass = () => (
            <Provider user={store}>
                <UserApp />
            </Provider>
        )
        this.TestApp = () => (
            <TestComponent />
        )
        
    }

    render() {
        const AppComponent = this.TestApp
        return (
            <AppComponent />
        )
    }
}


export default App