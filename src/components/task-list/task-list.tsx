import React from 'react';
import './task-list.css';
import { Task } from '../../model';

import TaskListItem from '../task-list-item/task-list-item';

interface TaskListProps {
    taskList: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<TaskListProps> = (props: TaskListProps) => {
    const {taskList, setTasks} = props;

    return (
        <div className='task-list'>
        {
            taskList.map(task=>
                <TaskListItem 
                key={task.id}
                task={task}
                taskList={taskList}
                setTasks={setTasks}
                />)
        }
        </div>
    )
};

export default TaskList;