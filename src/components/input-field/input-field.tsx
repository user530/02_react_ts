import React from 'react';
import './input-field.css'

interface InputFieldProps {
    newTask: string,
    setNewTask: React.Dispatch<React.SetStateAction<string>>;
    addTaskHandler: ((e: React.FormEvent) => void);
}

const InputField: React.FC<InputFieldProps> = (props: InputFieldProps)=>{
    const {newTask, setNewTask, addTaskHandler} = props;
    const inputRef = React.useRef<HTMLInputElement>(null);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewTask(e.target.value);
    }

    return (
    <form className="input" 
        onSubmit={(e: React.FormEvent)=>{
            addTaskHandler(e);
            if(inputRef.current)
                inputRef.current.blur();
        }}>
        <input 
        ref={inputRef}
        type="input" 
        placeholder='Enter new task' 
        className='input__box' 
        onChange={inputHandler}
        value={newTask}
        />
        <input type='submit' className='input__submit' value='Add'/>
    </form>
    )
}

export default InputField;