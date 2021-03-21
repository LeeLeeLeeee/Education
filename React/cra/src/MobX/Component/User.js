import React, { useContext, useEffect, useLayoutEffect } from 'react'
import { inject, observer  } from 'mobx-react';
import { autorun, reaction, observable } from 'mobx'
import RootContext from '../Module/'
/* class */

/* @inject(store=> store.user)
@observer
class UserTodo extends React.Component {
    userStore = {}
    constructor(props){
        super(props)
        this.userStore = props.user
        reaction(
            () => [this.userStore.userList],
            user => console.log(user)
            
        )
    }
    viewStore() {
        console.log(this.userStore);
    }
    render(){
        return(
            <>
                <button onClick={()=>this.userStore.addUser(this.userStore.user.length)}>+Person</button>
                <button onClick={()=>this.viewStore()}>ViewStore</button>
                {this.userStore.user.map(id => <p>{`Person - ${id}`}</p>)}
            </>
        )
        
    }
} */

/* Function */
const UserTodo = observer(()=>{
    const store = new useContext(RootContext).user
    return ( 
        <>
        <button onClick={()=>store.addUser(store.user.length)}>+Person</button>
            {store.user.map(id => <p>{`Person - ${id}`}</p>)}
        
        </>
        
    )
})

export default UserTodo

