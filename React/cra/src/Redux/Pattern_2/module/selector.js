import { typeInterface } from './interface';

export const getTodoState = store => store.todo;

export const getTodoList = store =>
    getTodoState(store) ? getTodoState(store).allIds : [];

export const getTodoById = (store, id) => 
    getTodoState(store) ? { ...getTodoState(sotre).byIds[id]} : {}

export const getTodos = store =>
    getTodoList(store).map(id=> getTodoById(store, id));


export const nameFilter = (todos, name) =>
    name === '' ? todos : todos.filter(todo => todo.name === name );

export const getTodosByFilter = (store, typeFilter, nameFilter = '' ) => {
    const allTodos = getTodos(store);
    switch(typeFilter){
        case typeInterface.COMPLETE:
            return nameFilter(allTodos, nameFilter).filter(todo => todo.completed);
        case typeInterface.INCOMPLETE:
            return nameFilter(allTodos, nameFilter).filter(todo => !todo.completed);
        case typeInterface.ALL:
            return allTodos;
    }   
}