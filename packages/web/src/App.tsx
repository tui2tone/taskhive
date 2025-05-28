import PageLayout from "./layouts/PageLayout";
import TaskLists from "./components/TaskLists/TaskLists";
import TaskInput from "./components/TaskInput/TaskInput";
import { TodoProvider } from "./contexts/Todo.provider";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <TodoProvider>
      <PageLayout>
        <TaskLists />
        <TaskInput />
        <Toaster />
      </PageLayout>
    </TodoProvider>
  );
}

export default App;
