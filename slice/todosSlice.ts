import { maxTodoCount } from '@/constants'
import { Todo } from '@/type/Todo'
import { getId } from '@/util/id'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialTodo = { id: 1, body: '', checked: false }
const initialState = [initialTodo]

const todoSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<Todo>) {
      if (state.length >= maxTodoCount) return

      const focused = action.payload

      const latest = state.slice(-1)[0]
      const isLatest = focused.id === latest.id
      const isEmpty = !focused.body
      if (!latest.body && isLatest === isEmpty) return

      const newTodo = { ...initialTodo, id: getId() }
      state.push(newTodo)
    },
    todoUpdated(state, action: PayloadAction<Todo>) {
      const updated = action.payload
      return state.map((todo) => (todo.id === updated.id ? updated : todo))
    },
    todoDeleted(state, action: PayloadAction<number>) {
      const id = action.payload
      return state.filter((todo) => todo.id !== id)
    },
  },
})

export const { todoAdded, todoUpdated, todoDeleted } = todoSlice.actions

export default todoSlice.reducer
