import { VFC } from 'react'
import { useSelector } from 'react-redux'

import TodoItem from '@/components/TodoItem'
import { StoreState } from '@/type/Store'
import { Todo } from '@/type/Todo'
import { maxTodoCount } from '@/constants'

const TodoList: VFC = () => {
  const todos = useSelector<StoreState, Todo[]>((state) => state.todos)

  const todoItems = todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)

  return (
    <>
      <main className="container">
        <h1 className="heading">
          TODO
          <span className="note">{`（最大${maxTodoCount}件）`}</span>
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
