import { configureStore } from '@reduxjs/toolkit'

import todosReducer from '@/slice/todosSlice'

export default configureStore({
  reducer: {
    todos: todosReducer,
  },
})
