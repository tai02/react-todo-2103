import { configureStore } from '@reduxjs/toolkit'

import { Todo } from '@/type/Todo'

import todosReducer from '@/slice/todosSlice'
import inputReducer from '@/slice/isComposingSlice'

export type StoreState = {
  todos: Todo[]

  /* 日本語入力時、変換中かどうか */
  isComposing: boolean
}

export default configureStore<StoreState>({
  reducer: {
    todos: todosReducer,
    isComposing: inputReducer,
  },
})
