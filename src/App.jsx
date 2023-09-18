import React from 'react'
import Todo from './components/api/Todo'
import useSWR, { preload } from "swr"
import { baseUrl, retrieveListTodos } from './api/todos'
preload(baseUrl, retrieveListTodos)

function App() {
  return (
    <div className='px-[15%] py-[5%] space-y-5'>

      <Todo />
    </div>
  )
}

export default App