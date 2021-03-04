import React from 'react';

export default ({ state, handler }) => {

    return (
        <>
            <p>Count - [{state.number}]</p>
            <p>숫자 변경 버튼</p>
            <button onClick={handler.increase} type='button'>증가</button> 
            <button onClick={handler.decrease} type='button'>감소</button> 
            <p>숫자 변경 입력</p>
            <input type='number' value={state.number} onKeyDown={(e)=>{handler.update(e.target.value)}} />
        </>
        
    )
};