import { createSelector } from 'reselect'
import { RootState } from './store'

const getDictionariesState = (state: RootState) => state.dictionaries

export const getDictionaries = createSelector(
  getDictionariesState,
  (dictionaries) => dictionaries,
)

export const getDictionary = createSelector(
  getDictionariesState,
  (_: RootState, id: string) => id,
  (dictionaries, id) => dictionaries[id],
)
