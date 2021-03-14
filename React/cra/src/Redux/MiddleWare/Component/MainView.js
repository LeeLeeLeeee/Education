import React from 'react'


export default function({loading, error, persons}){
    return (
        <div>
            <div className={'h5'}>THUNK</div>
            <div className={'d-flex flex-column justify-content-center align-items-center'}>
            {
                loading ? 
                (
                    <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                ) :
                error ? 
                (
                    <p>error!!</p>
                ) :
                persons.length > 1 ? 
                (
                    <pre>{persons.map(item=>JSON.stringify(item)).join('\n')}</pre>
                ) :
                (
                    <p>API를 호출해주세요!!</p>
                )
            }
            
            </div>
            <div className={'h5'}>SAGA</div>
        
        </div>
      
        
    )
}