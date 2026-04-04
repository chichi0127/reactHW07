import { createSlice } from "@reduxjs/toolkit"

export const messageSlice = createSlice({
    name: 'message',
    initialState: [],
    reducers: {
        createMessage(state, action) {

        },
        removeMessage(state, action) {

        },
    },
})

export const { createMessage, removeMessage } = messageSlice.actions;

export default messageSlice.reducer;