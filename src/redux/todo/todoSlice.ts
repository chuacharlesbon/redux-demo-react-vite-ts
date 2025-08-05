import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ToDoModel } from '../../interfaces/todo';

export interface ToDoState {
    pendingValue: ToDoModel[];
    ongoingValue: ToDoModel[];
    fulfilledValue: ToDoModel[];
}

const initialState: ToDoState = {
    pendingValue: [],
    ongoingValue: [],
    fulfilledValue: [],
}

export const toDoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        clearAll: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.pendingValue = [];
            state.ongoingValue = [];
            state.fulfilledValue = [];
        },
        clearPending: (state) => {
            state.pendingValue = [];
        },
        clearOngoing: (state) => {
            state.ongoingValue = [];
        },
        clearFulfilled: (state) => {
            state.fulfilledValue = [];
        },
        addPending: (state, action: PayloadAction<ToDoModel>) => {
            state.pendingValue = [...state.pendingValue, action.payload];
        },
        pendingToOngoing: (state, action: PayloadAction<ToDoModel>) => {
            const tempPendingList = [...state.pendingValue];
            const newPendingList = tempPendingList.filter((item: ToDoModel) => item.id !== action.payload.id);
            state.pendingValue = newPendingList;
            state.ongoingValue = [...state.ongoingValue, action.payload];
        },
        ongoingToFulfilled: (state, action: PayloadAction<ToDoModel>) => {
            const tempOngoingList = [...state.ongoingValue];
            const newOngoingList = tempOngoingList.filter((item: ToDoModel) => item.id !== action.payload.id);
            state.ongoingValue = newOngoingList;
            state.fulfilledValue = [...state.fulfilledValue, action.payload];
        },
        deleteFulfilledItem: (state, action: PayloadAction<ToDoModel>) => {
            const tempFulfilledList = [...state.fulfilledValue];
            const newFulfilledList = tempFulfilledList.filter((item: ToDoModel) => item.id !== action.payload.id);
            state.fulfilledValue = newFulfilledList;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    clearAll,
    clearPending,
    clearOngoing,
    clearFulfilled,
    addPending,
    pendingToOngoing,
    ongoingToFulfilled,
    deleteFulfilledItem,
} = toDoSlice.actions

export default toDoSlice.reducer