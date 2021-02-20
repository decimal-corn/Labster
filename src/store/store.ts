import {
  createSlice,
  configureStore,
  PayloadAction,
  combineReducers,
} from '@reduxjs/toolkit'
import { Dictionary } from '../types'

export type RootState = {
  dictionaries: Record<string, Dictionary>
}

const initialState: Record<string, Dictionary> = {
  // Uncomment to see default entry in app
  /* '4349fd1c-fb96-4d57-9812-b1e26afef962': {
    name: 'First dict',
    data: [
      { from: 'ph', to: 'Biology' },
      { from: 'Atoms', to: 'Chemistry' },
      { from: 'Circuit Building', to: 'Physics' },
    ],
  }, */
}

export const {
  reducer: dictionariesReducer,
  actions: { pushDictionary, removeDictionary },
} = createSlice({
  name: 'dictionaries',
  initialState,
  reducers: {
    pushDictionary: (
      state,
      action: PayloadAction<{ dictionary: Dictionary; id: string }>,
    ) => {
      state[action.payload.id] = action.payload.dictionary
    },
    removeDictionary: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id
      if (state[id]) {
        delete state[id]
      }
    },
  },
})

export const rootReducer = combineReducers({
  dictionaries: dictionariesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
