import PageLayout from "./layouts/PageLayout";
import TaskLists from "./components/TaskLists/TaskLists";
import TaskInput from "./components/TaskInput/TaskInput";
import { TodoProvider } from "./contexts/Todo.provider";
import { Toaster } from 'react-hot-toast';
import TaskFilter from "./components/TaskFilter/TaskInput";

function App() {
  return (
    <TodoProvider>
      <PageLayout>
        <TaskFilter />
        <TaskLists />
        <TaskInput />
        <Toaster />
      </PageLayout>
    </TodoProvider>
  );
}

export default App;
