import React, { useState } from 'react';

export default function({state, handler}){
    const [name, setName] = useState('')
    const {
        user,
        personType,
        userTodoCnt
    } = state;
    const {
        addPerson,
        deletePerson,
        deleteTodoPerson,
        setPerson,
    } = handler;
    
    return (
        <div className={'shadow-sm border p-1 bg-white'}>
            <div className={'border-bottom h5 p-1'}>PEOPLE 🧁</div>
            <div className={'d-flex flex-row justify-content-center align-items-center'}>
                <input 
                    type='text'
                    placeholder={'Add Person!'} 
                    className={'form-control d-inline-block w-75 m-2'} 
                    onChange={(e)=>{ setName(e.target.value) }}
                />
                <button
                    type='button'
                    className={'btn btn-sm btn-outline-primary h-50'}
                    onClick={(e)=> { 
                        addPerson(name);
                        setName('');
                    }}
                >
                추가
                </button>
            </div>
            <hr />
            {
                user.length ?
                ( 
                    <ul className={'list-group'}>
                        {
                            user.map(name=>{
                                return (
                                    <button type={'button'}
                                        onClick={(e)=>{setPerson(name)}}
                                        className={`list-group-item justify-content-between d-flex align-items-center ${personType === name ? 'active' : ''}`}
                                    >
                                        {personType === name ? '🙋‍♂️ ' : '🙍‍♂️ '}
                                        {name}
                                        <div>
                                            <span 
                                                onClick={(e)=>{
                                                    deletePerson(name);
                                                    deleteTodoPerson(name)
                                                    setPerson('');
                                                    e.stopPropagation();
                                                }} 
                                                class="badge badge-danger badge-pill mr-1"
                                            >
                                                삭제
                                            </span>
                                            <span class="badge badge-light badge-pill border shadow-sm">
                                                {userTodoCnt[name]}
                                            </span>
                                        </div>
                                    </button>
                                )
                                
                            }) 
                        
                        }
                    </ul>
                ):
                <p className={'text-danger p-2'}> 🤷‍♂️ 등록된 인원이 없습니다. </p>
            }
        </div>
    );
}