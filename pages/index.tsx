import { VFC } from 'react'
import { Provider } from 'react-redux'

import store from '@/store'
import TodoList from '@/components/TodoList'

const App: VFC = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
}

export default App
