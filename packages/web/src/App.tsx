import { useState } from 'react'
import PageLayout from './layouts/PageLayout'
import TaskLists from './components/TaskLists/TaskLists'
import TaskInput from './components/TaskInput/TaskInput'

function App() {
  return (
    <PageLayout>
      <TaskLists />
      <TaskInput />
    </PageLayout>
  )
}

export default App
