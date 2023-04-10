import React from 'react';
import {AiFillDelete, AiFillEdit, AiOutlineCheckSquare} from 'react-icons/ai'
import './task-list-item.css';
import { Task } from '../../model';

interface TaskListItemProps {
    task: Task;
    taskList: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskListItem: React.FC<TaskListItemProps> = (props: TaskListItemProps) => {
    const {task: {id, taskName, isDone}, taskList, setTasks} = props;
    const [isEdited, setIsEdited] = React.useState<boolean>(false);
    const [newTaskName, setNewTaskName] = React.useState<string>(taskName);
    
    const taskNameRef = React.useRef<HTMLInputElement>(null);

    const taskDoneHandler = (taskId: number) => {
        if(isEdited) return;

        const updatedTasks: Task[] = taskList.map((task: Task) =>
            task.id === taskId ? 
            {...task, isDone: !task.isDone} :
            task
        );

        setTasks(updatedTasks);
    }

    const taskEditHandler = () => {
        if(!isEdited && !isDone)
            setIsEdited(true);
    }

    const taskDeleteHandler = (taskId: number) => {
        if(isEdited) return;

        const newTasks: Task[] = taskList.filter((task: Task) => 
        task.id !== taskId);

        setTasks(newTasks);
    }

    const newTaskEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.target.value)
    }

    const newTaskSubmit = (e: React.FormEvent, taskId: number) => {
        e.preventDefault();
        const newTasks = taskList.map((task: Task) => 
                            task.id === taskId ? 
                            {...task, taskName: newTaskName} :
                            task
        );

        setTasks(newTasks);
        setIsEdited(false);
    }

    React.useEffect(()=>{
        if(taskNameRef.current)
            taskNameRef.current.focus();
    }, [isEdited])

    return (
        <form className='task__single' onSubmit={(e)=>{newTaskSubmit(e, id)}}>

            {isEdited ? 
            (<input 
                ref={taskNameRef}
                type="text" 
                className='task__single--text'
                value={newTaskName}
                onChange={newTaskEditHandler}
                /> )
            : (
            <span className={`task__single--text ${isDone ? 'done' : ''}`}>
                {taskName}
            </span>
            )}
            

            <div className='task__single-wrapper'>
                <span 
                onClick={()=>taskDoneHandler(id)}
                className="task__single--icon"
                ><AiOutlineCheckSquare/></span>
                <span 
                onClick={taskEditHandler}
                className="task__single--icon"
                ><AiFillEdit/></span>
                <span 
                onClick={()=>{taskDeleteHandler(id)}}
                className="task__single--icon"
                ><AiFillDelete/></span>
            </div>
        </form>
    )
};

export default TaskListItem;