export default function AddTodo({ closeModal, day, addDailyTodo, deleteDailyTodo }) {

    return (

        <div className="fixed z-100 w-full h-full bg-black/60">
            <div className="flex w-full h-screen justify-center items-center">
                <form className="bg-white w-2/3 p-2 border-4 border-black flex-col justify-center items-center " onSubmit={(e) => addDailyTodo(e)}>

                    <button onClick={() => closeModal()}>X</button>
                    <h1 className="text-4xl font-semibold pl-6  tracking-tight">{day.day.slice(5, 10).replace('-', '. ')}</h1>
                    <label className="w-full p-4 flex">
                        <input type='text' name='todo' className='p-2 border-b-2 focus:outline-0 focus:border-black rounded-sm w-full' placeholder="New Todo" />
                        <button type='submit' className="bg-black font-semibold text-white py-1 px-2 w-fit items-end">add</button>
                    </label>
                    <ul className="p-4">
                        {day.todoList.map((item) =>
                            <li className="flex justify-between">
                                <label className="text-sm font-normal">{item.todo}</label>
                                <div className='space-x-2'>
                                    {item.todo != '' &&
                                        <>
                                            <input type='checkbox' defaultChecked={item.check} />
                                            <button onClick={(e) => deleteDailyTodo(e, item, day)}>[del]</button>
                                        </>
                                    }
                                </div>
                            </li>)}
                    </ul>
                </form>

            </div>
        </div>
    )
}