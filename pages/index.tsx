import { useState, VFC } from 'react'
import { TodoItem } from './TodoItem'

export type Todo = {
  id: number
  body: string
}

const maxCount = 20 // 登録件数の上限

const TodoList: VFC = () => {
  const initialTodo: Todo = { id: 1, body: '' }
  const [todos, setTodos] = useState([initialTodo])
  const [id, setId] = useState(initialTodo.id)

  const createTodo = async (focused: Todo, isEmpty: boolean) => {
    if (todos.length >= maxCount) return

    const latest = todos.slice(-1)[0]
    const isLatest = focused.id === latest.id
    if (!latest.body && isLatest === isEmpty) return

    setId((id) => id + 1)
    const newTodo = { id: id + 1, body: '' }
    setTodos((todos) => [...todos, newTodo])
  }

  const updateTodos = (updated: Todo) =>
    setTodos((todos) =>
      todos.map((todo) => (todo.id === updated.id ? updated : todo))
    )

  const deleteTodo = (id: number) =>
    setTimeout(
      () => setTodos((todos) => todos.filter((todo) => todo.id !== id)),
      400
    )

  const todoItems = todos.map((todo) => (
    <TodoItem
      key={todo.id}
      todo={todo}
      createTodo={createTodo}
      updateTodos={updateTodos}
      deleteTodo={deleteTodo}
    />
  ))

  return (
    <>
      <main className="container">
        <h1 className="heading">
          TODO
          <span className="note">{`（最大${maxCount}件）`}</span>
        </h1>
        <ol>{todoItems}</ol>
      </main>

      <style jsx>{`
        .container {
          width: 60vw;
          margin: 100px auto;
        }

        .heading {
          text-align: center;
        }

        .note {
          font-size: 20px;
        }
      `}</style>
    </>
  )
}

export default TodoList
