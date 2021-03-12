import { FocusEventHandler, KeyboardEventHandler, useState, VFC } from 'react'
import { useForm } from 'react-hook-form'
import Checkbox from '@material-ui/core/Checkbox'
import { Todo } from '@/type/Todo'
import { CSSTransition } from 'react-transition-group'
import { maxBodyLength } from '@/constants'
import { useDispatch } from 'react-redux'
import { todoAdded, todoUpdated, todoDeleted } from '@/slice/todosSlice'

type Props = {
  todo: Todo
}

const TodoItem: VFC<Props> = ({ todo }) => {
  const [composing, setComposing] = useState(false)

  const dispatch = useDispatch()

  const { register, errors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      todo: todo.body,
    },
  })

  const update = (body: string) => {
    const updatedTodo = { ...todo, body }
    dispatch(todoUpdated(updatedTodo))
    dispatch(todoAdded(updatedTodo))
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

  const handleChange = () => {
    const checkedTodo = { ...todo, checked: true }
    dispatch(todoUpdated(checkedTodo))
    setTimeout(() => dispatch(todoDeleted(todo.id)), 400)
  }

  return (
    <>
      <CSSTransition in={todo.checked} classNames="fade" timeout={200}>
        <li className="todo-item">
          <Checkbox
            checked={todo.checked}
            disabled={!todo.body}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <input
            className="textbox"
            type="text"
            name="todo"
            maxLength={maxBodyLength}
            ref={register({ maxLength: maxBodyLength - 1 })} // 最大文字数の入力時にエラー表示
            onCompositionStart={() => setComposing(true)}
            onBlur={handleBlur}
            onKeyUp={handlePressEnter}
          />
          {errors.todo && (
            <p className="error-message">
              {`※ 最大${maxBodyLength}文字まで入力可能です`}
            </p>
          )}
        </li>
      </CSSTransition>

      <style jsx>{`
        .textbox {
          color: #222;
          width: calc(100% - 100px);
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

export default TodoItem
