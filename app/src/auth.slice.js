import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user,loading } = action.payload
            state.loading = loading
            state.user = user
        }
    },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer