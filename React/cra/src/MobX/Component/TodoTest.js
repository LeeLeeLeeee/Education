import React, { useState } from 'react';
import { makeAutoObservable, action, computed, observable } from 'mobx';
import { observer } from 'mobx-react-lite'


class TodoItem {
    id = Math.random();
    title = ''
    finished = false
    constructor(title){
        makeAutoObservable(this,{
            title:observable,
            finished:observable,
            toggle:action,
        })
        this.title = title;
    }

    toggle(){
        this.finished = !this.finished
    }
}

class TodoList {
    todos = [];
    constructor(){
        makeAutoObservable(this, {
            todos: observable,
            unfinishedTodoCount: computed,
            add:action
        })
    }
    get unfinishedTodoCount() {
        console.log('calculate -- unfinishedCount')
        return this.todos.filter(item => !item.finished).length
    }
    
    add(todo){
        this.todos.push(todo);
    }
}

//const store = new TodoList()

export default function(){
    const [store] = useState(new TodoList())
    const [todoStat, setTodoStat] = useState(1)
    const addHandler = () => {
        store.add(new TodoItem(todoStat))
        setTodoStat(todoStat+1)
    }
    
    const TodoListView = observer( ({todoList}) => (
        <div>
            <ul>
            {todoList.todos.map(todo => (
                <label>
                    <input type="checkbox" onClick={()=>todo.toggle()}></input>    
                    {todo.title}
                </label>
            ))}
            </ul>
            Tasks left: {todoList.unfinishedTodoCount}
        </div>
    ))

    return (
        <>
            <p>Todo List</p>
            <button type="button" onClick={addHandler}>add</button>
            <TodoListView todoList={store} />
        </>
    )
}