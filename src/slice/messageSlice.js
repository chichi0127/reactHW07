import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const messageSlice = createSlice({
    name: 'message',
    initialState: [],
    //初始是空陣列
    reducers: {
        createMessage(state, action) {
            //這邊的state就是那個咚咚上
            state.push({
                id: action.payload.id,
                type: action.payload.success ? "success" : "danger",
                title: action.payload.success ? "成功" : "失敗",
                text: action.payload.message,
            })
        },
        removeMessage(state, action) {
            //找到想要刪除的資訊是哪個
            const index = state.findIndex((message) => message.id === action.payload);
            //如果沒找到就回傳-1，有找到就回傳在陣列的哪裡
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
})

export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async (payload, { dispatch, requestId }) => {
        dispatch(messageSlice.actions.createMessage({
            ...payload,
            id: requestId,
        }));
        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage(requestId))
        }, 2000);
    }
);

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;