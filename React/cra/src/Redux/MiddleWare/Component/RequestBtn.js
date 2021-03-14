import React, { useState } from 'react';


export default function({axiosApi, fetchApi, fetchSagaApi, axiosSagaApi}){
    const [personId, setPersonId] = useState('')
 
    return (
        <div className={'d-flex flex-column p-1 border-right'}>
            <b>Request Button🔔</b>
            <div className={'h4'}>FETCH</div>
            <div className={'d-flex flex-column p-1 m-1 bg-dark'}>
                <div className={'text-white m-0 h3 d-flex flex-row justify-content-between mb-1'}>
                    <div className={'flex-grow-1'}>
                    FETCH - THUNK
                    </div>
                    
                </div>
                <button onClick={() => {fetchApi({type:'GET'})}} className={'btn btn-sm text-left btn-success mb-1'}> GET API </button>
                <button onClick={() => {fetchApi({type:'POST'})}} className={'btn btn-sm text-left btn-success mb-1'}> POST API </button>
                <button onClick={() => {fetchApi({type:'WAIT'})}} className={'btn btn-sm text-left btn-success mb-1'}> WAIT API </button>
                <button onClick={() => {fetchApi({type:'ERROR'})}} className={'btn btn-sm text-left btn-success mb-1'}> ERROR API </button>
            </div>
            <div className={'d-flex flex-column p-1 m-1 bg-dark'}>
                <div className={'text-white m-0 h3 d-flex flex-row justify-content-between mb-1'}>
                    <div className={'flex-grow-1'}>
                    AXIOS - THUNK
                    </div>
                    
                </div>
                <button onClick={() => {axiosApi({type:'GET'})}} className={'btn btn-sm text-left btn-success mb-1'}> GET API </button>
                <button onClick={() => {axiosApi({type:'POST'})}} className={'btn btn-sm text-left btn-success mb-1'}> POST API </button>
                <button onClick={() => {axiosApi({type:'WAIT'})}} className={'btn btn-sm text-left btn-success mb-1'}> WAIT TIME OUT API </button>
                <button onClick={() => {axiosApi({type:'ERROR'})}} className={'btn btn-sm text-left btn-success mb-1'}> ERROR API </button>
            </div>
            <div className={'h4'}>SAGA</div>
            <div className={'d-flex flex-column p-1 m-1 bg-dark'}>
                <div className={'text-white m-0 h3 d-flex flex-row justify-content-between mb-1'}>
                    <div className={'flex-grow-1'}>
                    FETCH - SAGA
                    </div>
                    
                </div>
                <button onClick={() => {fetchSagaApi({type:'GET'})}} className={'btn btn-sm text-left btn-success mb-1'}> GET API </button>
                <button onClick={() => {fetchSagaApi({type:'POST'})}} className={'btn btn-sm text-left btn-success mb-1'}> POST API </button>
                <button onClick={() => {fetchSagaApi({type:'WAIT'})}} className={'btn btn-sm text-left btn-success mb-1'}> WAIT TIME OUT API </button>
                <button onClick={() => {fetchSagaApi({type:'ERROR'})}} className={'btn btn-sm text-left btn-success mb-1'}> ERROR API </button>
            </div>
            <div className={'d-flex flex-column p-1 m-1 bg-dark'}>
                <div className={'text-white m-0 h3 d-flex flex-row justify-content-between mb-1'}>
                    <div className={'flex-grow-1'}>
                    AXIOS - SAGA
                    </div>
                    
                </div>
                <button onClick={() => {axiosSagaApi({type:'GET'})}} className={'btn btn-sm text-left btn-success mb-1'}> GET API </button>
                <button onClick={() => {axiosSagaApi({type:'POST'})}} className={'btn btn-sm text-left btn-success mb-1'}> POST API </button>
                <button onClick={() => {axiosSagaApi({type:'WAIT'})}} className={'btn btn-sm text-left btn-success mb-1'}> WAIT TIME OUT API </button>
                <button onClick={() => {axiosSagaApi({type:'ERROR'})}} className={'btn btn-sm text-left btn-success mb-1'}> ERROR API </button>
            </div>
    
        </div>
    )
}