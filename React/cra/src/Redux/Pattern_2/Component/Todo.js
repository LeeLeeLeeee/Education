import React, { useState } from 'react';

export default function({state, handler}){
    const [content, setContent]  = useState('');
    const {
        personType,
        todo,
        todoType
    } = state;
    
    const {
        addTodo,
        deleteTodo,
        toggleTodo,
        setType
    } = handler;
    return (
        <div className={'shadow-sm border p-1 bg-white'}>
            <div className={'border-bottom h5 p-1'}>TO-DO 📖</div>
            <div className={'d-flex flex-row justify-content-center align-items-center'}>
                <input 
                    type='text'
                    placeholder={'Add todo list!'} 
                    className={'form-control d-inline-block w-75 m-2'}
                    onChange={(e)=>{ setContent(e.target.value)}}
                />
                <button
                    type='button'
                    className={'btn btn-sm btn-outline-primary h-50'}
                    onClick={()=>{
                        let param = {
                            content,
                            person: personType
                        }
                        addTodo(param)
                    }}
                >
                추가
                </button>
            </div>
            <div>
                <div className={'d-flex flex-row justify-content-center m-1'}>
                    <div onClick={()=>{setType('all')}} className={`filter-btn ${todoType=='all' ? 'active' : ''}`}>All</div>
                    <div onClick={()=>{setType('complete')}} className={`filter-btn ${todoType=='complete' ? 'active' : ''}`}>Complete</div>
                    <div onClick={()=>{setType('incomplete')}} className={`filter-btn ${todoType=='incomplete' ? 'active' : ''}`}>Incomplete</div>
                </div>
            </div>
            <hr />
                {
                    todo.length ?
                    ( 
                        <ul className={'list-group'}>
                            {
                                todo.map(item=>{
                                    return (
                                        <li 
                                            className={
                                                `
                                                list-group-item d-flex justify-content-between align-items-center 
                                                ${item.completed? 'text-muted' : 'text-success'}
                                                `
                                            }
                                        >
                                            <a href='#' className={'text-reset'} onClick={()=>{ toggleTodo(item.id) }}>
                                                {item.completed? '📍 ' : '📌 '}
                                                {item.content}
                                            </a>

                                            <span 
                                                onClick={(e)=>{
                                                    deleteTodo(item.id);
                                                    e.stopPropagation();
                                                }} 
                                                class="badge badge-danger badge-pill mr-1"
                                            >
                                                삭제
                                            </span>
                                            
                                        </li>
                                    )
                                    
                                }) 
                            
                            }
                        </ul>
                    ):
                    <p className={'text-danger p-2'}> 🤷‍♂️ 등록된 TODO가 없습니다. </p>
                }
        </div>
    );
}