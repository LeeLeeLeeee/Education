import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { userCall } from './userApi';

export const insertUserAsync = createAsyncThunk(
    'user/success',
    async (nameParam) => {
        const name = await userCall(nameParam);
        return {
            name,
            createDt: Date.now()
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: { loading: false, entity: [], filterValue: ''},
    reducers: {
        setFilterValue: (state, action) => { console.log(action.payload); state.filterValue = action.payload},
        userAdd: {
            reducer: (state, action) => { state.entity.push(action.payload) },
            prepare: (name) => {
                return {
                    payload: {
                        name,
                        createDt: Date.now()
                    }
                }
            }
        },
    },
    extraReducers:{
        [insertUserAsync.pending]: (state, action)=>{
            state.loading = true
        },
        [insertUserAsync.fulfilled]: (state, action) => {
            console.log('user -success')
            state.loading = false;
            state.entity.push(action.payload)
        },
        [insertUserAsync.rejected]: (state, action) => {
            console.log('user -error')
            state.loading = false;
        }
        
    }
})


export const { userAdd, setFilterValue } = userSlice.actions;

export const userList = state => state.user.entity;

export const userFilter = createSelector(
    state => state.user.entity,
    state => state.user.filterValue,
    (user, filterValue) => user.filter(item => RegExp(filterValue).test(item.name) && filterValue !== '' )
)

export default userSlice.reducer;

