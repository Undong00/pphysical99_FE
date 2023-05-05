import {createSlice} from '@reduxjs/toolkit'
/* 초기상태 설정 */
const initialState = {
    isEdit : false,
}
const componentModeSlice = createSlice({
    name: 'componentMode',
    initialState: initialState,
    reducers: {
        isEdit: (state, payload) => {
            state.isEdit = payload.payload
        },
    }
})


export const { isEdit } = componentModeSlice.actions
export default componentModeSlice.reducer