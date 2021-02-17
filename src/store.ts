import {
  createSlice,
  configureStore,
  PayloadAction,
  combineReducers,
} from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { Dictionary } from './types'

export type RootState = {
  dictionaries: Record<string, Dictionary>
}

const initialState: Record<string, Dictionary> = {
  [uuid()]: {
    name: 'First dict',
    data: [
      ['ph', 'Biology'],
      ['Atoms', 'Chemistry'],
      ['Circuit Building', 'Physics'],
    ],
  },
}

export const {
  reducer: dictionariesReducer,
  actions: { push, remove },
} = createSlice({
  name: 'dictionaries',
  initialState,
  reducers: {
    push: {
      prepare: (dictionary: Dictionary) => {
        return { payload: { dictionary, id: uuid() } }
      },
      reducer: (
        state,
        action: PayloadAction<{ dictionary: Dictionary; id: string }>,
      ) => {
        state[action.payload.id] = action.payload.dictionary
      },
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id
      if (state[id]) {
        delete state[id]
      }
    },
  },
})

const rootReducer = combineReducers({ dictionaries: dictionariesReducer })

export const store = configureStore({
  reducer: rootReducer,
})
