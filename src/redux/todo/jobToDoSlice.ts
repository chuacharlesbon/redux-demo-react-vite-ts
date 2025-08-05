import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ToDoModel } from '../../interfaces/todo';

export interface JobToDoState {
    pendingValue: ToDoModel[];
    ongoingValue: ToDoModel[];
    fulfilledValue: ToDoModel[];
}

const initialState: JobToDoState = {
    pendingValue: [],
    ongoingValue: [],
    fulfilledValue: [],
}

export const jobToDoSlice = createSlice({
    name: 'jobtodo',
    initialState,
    reducers: {
        clearAllJob: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.pendingValue = [];
            state.ongoingValue = [];
            state.fulfilledValue = [];
        },
        clearPendingJob: (state) => {
            state.pendingValue = [];
        },
        clearOngoingJob: (state) => {
            state.ongoingValue = [];
        },
        clearFulfilledJob: (state) => {
            state.fulfilledValue = [];
        },
        addPendingJob: (state, action: PayloadAction<ToDoModel>) => {
            state.pendingValue = [...state.pendingValue, action.payload];
        },
        pendingToOngoingJob: (state, action: PayloadAction<ToDoModel>) => {
            const tempPendingList = [...state.pendingValue];
            const newPendingList = tempPendingList.filter((item: ToDoModel) => item.id !== action.payload.id);
            state.pendingValue = newPendingList;
            state.ongoingValue = [...state.ongoingValue, action.payload];
        },
        ongoingToFulfilledJob: (state, action: PayloadAction<ToDoModel>) => {
            const tempOngoingList = [...state.ongoingValue];
            const newOngoingList = tempOngoingList.filter((item: ToDoModel) => item.id !== action.payload.id);
            state.ongoingValue = newOngoingList;
            state.fulfilledValue = [...state.fulfilledValue, action.payload];
        },
        deleteFulfilledItemJob: (state, action: PayloadAction<ToDoModel>) => {
            const tempFulfilledList = [...state.fulfilledValue];
            const newFulfilledList = tempFulfilledList.filter((item: ToDoModel) => item.id !== action.payload.id);
            state.fulfilledValue = newFulfilledList;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    clearAllJob,
    clearPendingJob,
    clearOngoingJob,
    clearFulfilledJob,
    addPendingJob,
    pendingToOngoingJob,
    ongoingToFulfilledJob,
    deleteFulfilledItemJob,
} = jobToDoSlice.actions

export default jobToDoSlice.reducer