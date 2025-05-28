import { useState } from "react";
import PageLayout from "./layouts/PageLayout";
import TaskLists from "./components/TaskLists/TaskLists";
import TaskInput from "./components/TaskInput/TaskInput";
import { TodoProvider } from "./contexts/Todo.provider";

function App() {
  return (
    <TodoProvider>
      <PageLayout>
        <TaskLists />
        <TaskInput />
      </PageLayout>
    </TodoProvider>
  );
}

export default App;
