import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync } from './counterSlice';

export default function() {
    const count = useSelector(state => state.counter.value);
    const loading = useSelector(state => state.counter.loading);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('3');
    return (
        <div>
            <p>Count - [{count}]</p>
            <div>
                <button type='button' className={'btn btn-sm btn-primary mr-1'} onClick={()=>dispatch(increment())}>
                    Increment
                </button>
                <button type='button' className={'btn btn-sm btn-primary'} onClick={()=>dispatch(decrement())}>
                    Decrement
                </button>
                <button type='button' className={'btn btn-sm btn-primary mr-1'} onClick={()=>dispatch(incrementAsync())}>
                    Increment Async {loading ? ' loading...': ''}
                </button>
            </div>
            <div>
                <input className={'form-control d-inline-block w-25 m-1'} value={incrementAmount} onChange={(e)=>{ setIncrementAmount(e.target.value) }} />
                <button type='button' className={'btn btn-sm btn-success'} onClick={(e)=>{ dispatch(incrementByAmount(incrementAmount)) }}>
                    Add Amount
                </button>

            </div>
            
        </div>
    )

}
