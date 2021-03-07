import React from 'react';
import { connect } from 'react-redux';
import { getTodosByFilter, getCountByPerson } from '../module/selector';
import { setType, setPerson } from '../module/filter';
import { addPerson, deletePerson } from '../module/person';
import { addTodo, deleteTodo, toggleTodo, deleteTodoPerson } from '../module/todo';

import TodoComponent from '../Component/Todo';
import PersonComponent from '../Component/Person';

import "./pattern_2.css";

const TodoApp = (props) => {
    
    const boxStyle = {
        display:'grid',
        gridTemplateColumns: 'repeat(2, 300px)',
        gridTemplateRows: '1fr',
        gap: '0px 20px',
        justifyContent:'center',
        padding:'1rem'
    }
    const todoProps = {
        state: {...props.state_todo},
        handler: {...props.listen_todo}
    };

    const personProps = {
        state: {...props.state_person},
        handler: {...props.listen_person}
    };

    return (
        <>
            <p className={'text-center'}>Write a todo list😉</p>
            <div style={boxStyle}>
                <TodoComponent {...todoProps} />
                <PersonComponent {...personProps} />
            </div>
        </>
    );
}


const mapStateToProps = (state) => {
    const { todoType, personType } = state.filter;
    const todo = getTodosByFilter(state, todoType, personType);
    const user = state.person;
    const userTodoCnt = {};
    user.forEach(name=> userTodoCnt[name] = getCountByPerson(state, name))
    
    return {
        state_todo: {
            todoType,
            todo,
            personType
        },
        state_person: {
            user,
            personType,
            userTodoCnt
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    listen_todo: {
        addTodo: (todo) => dispatch(addTodo(todo)),
        deleteTodo: (id) => dispatch(deleteTodo(id)), 
        toggleTodo: (id) => dispatch(toggleTodo(id)),
        setType: (todoType) => dispatch(setType(todoType))
    },
    listen_person: {
        addPerson: (name) => dispatch(addPerson(name)),
        deletePerson: (name) => dispatch(deletePerson(name)),
        deleteTodoPerson: (name) => dispatch(deleteTodoPerson(name)),
        setPerson: (name) => dispatch(setPerson(name))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp)

