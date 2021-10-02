import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        loading: false,
    },
    reducers: {
        increment: state => { state.value += 1 },
        decrement: state => { state.value -= 1 },
        incrementByAmount: (state, action) => {state.value += +action.payload},
        toggleLoading: state => { state.loading = !state.loading }
    }
});



export const { increment, decrement, incrementByAmount, toggleLoading } = counterSlice.actions;

export const incrementAsync = (param) => dispatch => {
    dispatch(toggleLoading());
    setTimeout(()=>{
        dispatch(increment());
        dispatch(toggleLoading());
    }, 3000)
}

export default counterSlice.reducer;

