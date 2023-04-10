import React from 'react';
import logo from './logo.svg';
import './App.css';

import InputField from './components/input-field/input-field';
import TaskList from './components/task-list/task-list';
import { Task } from './model';

const App: React.FC = ()=>{
    const [newTask, setNewTask] = React.useState<string>('');
    const [tasks, setTasks] = React.useState<Task[]>([]);

    const addTaskHandler = (e: React.FormEvent) => {
      e.preventDefault();
      if(newTask)
        setTasks([...tasks, {id: Date.now(), taskName: newTask, isDone: false}]);

      setNewTask('');
    }
  
  return (
    <div className='App'>
      <h1 className='heading'>Taskify</h1>
      <InputField newTask={newTask} setNewTask={setNewTask} addTaskHandler={addTaskHandler}/>
      <TaskList taskList={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
