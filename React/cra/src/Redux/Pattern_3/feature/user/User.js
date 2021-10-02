import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { insertUserAsync, userAdd, userList, userFilter, setFilterValue } from './userSlice';

export default function() {
    const users = useSelector(userList);
    const filteredUser = useSelector(userFilter);
    const filterValue = useSelector(state=> state.user.filterValue)
    const loading = useSelector(state=> state.user.loading);
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    return (
        <>
            <input type="text" placeholder="영어 이름을 입력해주세요" onChange={(e)=>{setName(e.target.value)}} value={name}/>
            <button type="button" className={'btn btn-sm btn-dark m-1'} onClick={()=>{ dispatch(userAdd(name))}}>
                추가
            </button>
            <button type="button" className={'btn btn-sm btn-dark m-1'} onClick={()=>{ dispatch(insertUserAsync(name))}}>
                비동기 추가 {loading ? 'Loading...' : ''}
            </button>
            <div>
                추가된 인원 [{users.map(item=>item.name).join(',')}]
            </div>
            <input type="text" placeholder="검색할 이름을 입력해주세요" onChange={(e)=>{dispatch(setFilterValue(e.target.value))}} />
            <div>
                검색된 인원 [{filteredUser.map(item=>item.name).join(',')}]
            </div>
        </>
    )

}
