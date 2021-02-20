import { pushDictionary, store } from '../store/store'
import { Dictionary } from '../types'

export const TEST_DICTIONARY_1 = {
  name: 'Dictionary name',
  data: [{ from: 'From-1', to: 'To-1' }],
}

export const TEST_DICTIONARY_1_ID = 'id-1'

export const pushTestDictionary = (
  mockStore: typeof store,
  dictionary: Dictionary,
  id: string,
) => {
  mockStore.dispatch(
    pushDictionary({
      dictionary,
      id,
    }),
  )
}
