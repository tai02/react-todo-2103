import { FocusEventHandler, KeyboardEventHandler, useState, VFC } from 'react'
import { useForm } from 'react-hook-form'
import Checkbox from '@material-ui/core/Checkbox'
import { Todo } from './index'
import { CSSTransition } from 'react-transition-group'

type Props = {
  todo: Todo
  createTodo: (todo: Todo, idEmpty: boolean) => void
  updateTodos: (todo: Todo) => void
  deleteTodo: (id: number) => void
}

const maxLength = 200 // 文字数の上限

export const TodoItem: VFC<Props> = ({
  todo,
  createTodo,
  updateTodos,
  deleteTodo,
}) => {
  const [checked, setChecked] = useState(false)
  const [composing, setComposing] = useState(false)

  const { register, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      todo: todo.body,
    },
  })

  const handleChange = () => {
    setChecked(true)
    deleteTodo(todo.id)
  }

  const update = (body: string) => {
    const updatedTodo = { ...todo, body }

    updateTodos(updatedTodo)
    createTodo(updatedTodo, !body)
  }

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    update(event.target.value)
  }

  const handlePressEnter: KeyboardEventHandler<HTMLInputElement> = (
    pressed
  ) => {
    if (pressed.key !== 'Enter') return

    // 日本語入力での変換中の場合、処理中断
    if (composing) {
      setComposing(false)
      return
    }

    const target = pressed.target as HTMLInputElement
    update(target.value)
  }

  return (
    <>
      <CSSTransition in={checked} classNames="fade" timeout={200}>
        <li className="todo-item">
          <Checkbox
            checked={checked}
            disabled={!todo.body}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <input
            className="textbox"
            type="text"
            name="todo"
            maxLength={maxLength}
            ref={register({ maxLength: maxLength - 1 })} // 最大文字数の入力時にエラー表示
            onCompositionStart={() => setComposing(true)}
            onBlur={handleBlur}
            onKeyUp={handlePressEnter}
          />
          {errors.todo && (
            <span className="error-message">
              {`※ 最大${maxLength}文字まで入力可能です`}
            </span>
          )}
        </li>
      </CSSTransition>

      <style jsx>{`
        .textbox {
          color: #222;
          width: 90%;
          height: 20px;
          font-size: 16px;
          outline: none;
          border: none;
          border-bottom: 2px solid #222;
        }

        .error-message {
          color: #f4a83b;
          font-weight: bold;
        }

        .fade-enter-active {
          opacity: 0;
          transition: opacity 200ms ease-in-out;
        }

        .fade-enter-done {
          opacity: 0;
        }
      `}</style>
    </>
  )
}
