import React, { useEffect } from "react"
import { useState } from "react";
export default function TodoList() {

    const [list, setList] = useState([]);

    useEffect(() => {
        const item = localStorage.getItem('todoList');
        if (item) {
            setList(JSON.parse(item));
        }
    }, [])


    const createTodo = (title) => {
        return {
            title,
            check: false,
        }
    }

    const setLocalStorage = () => {
        localStorage.setItem('todoList', JSON.stringify(list));
    }
    const submitTitle = (e) => {
        e.preventDefault();
        const todo = e.target[0].value;

        const copyList = [...list];
        copyList.push(createTodo(todo));

        setList(copyList);
        setLocalStorage();

        removeInputText(e);
    }

    const removeInputText = (e) => {
        e.target[0].value = '';

    }
    const checkTodo = (e, todo) => {
        console.log(e.target.checked)

        let copyTodo = Object.assign({}, todo);
        copyTodo.check = e.target.checked;

        const copyList = [...list];
        const index = copyList.findIndex((item) => (item.title === todo.title));

        copyList[index].check = e.target.checked;
        setList(copyList);

        setLocalStorage();
    }

    const deleteTodo = (todo) => {
        const newList = list.filter((item) => (item.title !== todo.title));
        setList(newList);
        setLocalStorage();
    }

    return (
        <div className="mx-auto flex flex-col items-center">
            <div className='w-2/3 flex justify-start'>
                <h1 className="text-5xl font-extralight">ToDoList</h1>
            </div>
            <div className="border-2 p-2 w-2/3 border-black mb-2 ">
                <form className="flex justify-between" onSubmit={(e) => submitTitle(e)}>
                    <input type='text' placeholder="오늘의 할일" className="p-2 w-full focus:outline-0 text-2xl font-normal" />
                </form>
            </div>
            <div className="border border-black w-2/3">
                {list.map((todo) => (
                    <div className="border p-2">
                        <div className="flex justify-between border-b">
                            <h5>{todo.title}</h5>
                            <div className="space-x-2">
                                <input type='checkbox' defaultChecked={todo.check} onChange={(e) => checkTodo(e, todo)} />
                                <button onClick={() => deleteTodo(todo)}>del</button>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </div>)
}