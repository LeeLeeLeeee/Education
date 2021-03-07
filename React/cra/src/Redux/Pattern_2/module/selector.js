import { typeInterface } from './interface';

export const getTodoState = store => store.todo;

export const getTodoList = store =>
    getTodoState(store) ? getTodoState(store).allIds : [];

export const getTodoById = (store, id) => 
    getTodoState(store) ? { ...getTodoState(store).byIds[id]} : {}

export const getTodos = store =>
    getTodoList(store).map(id=> getTodoById(store, id));

export const getTodoByName = (store, name) =>
    getTodoState(store).byPerson ?
        getTodoState(store).byPerson[name] ? 
        [...getTodoState(store).byPerson[name]] 
        : []
    : [];

export const getCountByPerson = (store, name) => getTodoByName(store, name).length

export const getTodosByFilter = (store, typeFilter, nameFilter = '' ) => {
    const todoList = nameFilter !== '' ?
    getTodoByName(store, nameFilter) :
    getTodos(store);

    switch(typeFilter){
        case typeInterface.COMPLETE:
            return todoList.filter(todo => todo.completed);
        case typeInterface.INCOMPLETE:
            return todoList.filter(todo => !todo.completed);
        case typeInterface.ALL:
            return todoList;
    }   
}

