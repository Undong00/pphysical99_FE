import { createSlice } from "@reduxjs/toolkit";
/* 초기상태 설정 */
const initialState = {
  isEdit: false,
};
const componentModeSlice = createSlice({
  name: "componentMode",
  initialState: initialState,
  reducers: {
    isEdit: (state, payload) => {
      state.isEdit = payload.payload;
    },
  },
});

//reducers 객체는 Redux store의 action type과 action creator 함수를 정의합니다. 여기서 isEdit 함수는 state와 payload 인자를 받는다. state 인자는 slice의 현재 상태를 의미하며, payload 인자는 action creator에서 전달받은 데이터를 의미한다. isEdit 함수는 state.isEdit 값을 payload.payload 값으로 업데이트한다.

export const { isEdit } = componentModeSlice.actions;
export default componentModeSlice.reducer;
