import React, { useEffect } from "react";
import { useState } from "react";
import AddTodo from "./AddTodo";

export default function Calendar() {
    const [openModal, setOpenModal] = useState(false);
    const [day, setDay] = useState({});
    const [monthDay, setMonthDay] = useState([]);

    const date = new Date();
    const [currentYear, setCurrentYear] = useState((new Date(date).getFullYear()));
    const [currentMonth, setCurrentMonth] = useState(Number(new Date(date).getMonth()));

    const createCalendar = (date) => {

        console.log('createCalendar', date, 'currentMonth', currentMonth)

        const startDay = new Date(date).setDate(1);
        const firstDate = new Date(startDay).getDay();

        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        const limitDay = firstDate + lastDate;
        // const nextDay = Math.ceil(limitDay / 7) * 7;

        const day = [];

        for (let i = 1; i <= limitDay; i++) {
            if (i <= firstDate) {
                day.push({
                    day: '',
                    todoList: []
                })
            } else {
                day.push({
                    day: `${currentYear}-${currentMonth + 1}-${i - firstDate}`,
                    todoList: [{
                        todo: '',
                        check: false,
                    }]
                })
            }
        }
        return day;
    }

    const openTodoModal = (day) => {
        setDay(day);
        setOpenModal(true);
    }

    const saveLocalStorage = (monthDay) => {
        localStorage.setItem(`calendarTodo-${currentMonth + 1}`, JSON.stringify(monthDay));
    }

    const addDailyTodo = (event) => {
        setOpenModal(false);
        const { value } = event.target.todo;

        const copyDay = Object.assign({}, day);
        copyDay.todoList.push({
            todo: value,
            check: false,
        })

        const copyMonthDay = [...monthDay];
        //monthDay 배열에서 같은 날짜의 객체를 찾아 수정한 객체로 바꾼다
        const index = monthDay.findIndex((day) => day.day === copyDay.day);
        copyMonthDay[index] = copyDay;
        setMonthDay(copyMonthDay);
        saveLocalStorage(copyMonthDay);
    }

    const deleteDailyTodo = (e, todo, day) => {
        e.preventDefault();
        console.log(todo);//객체를 배열에서 지워준다. 
        const copyDay = Object.assign({}, day);

        const newTodo = copyDay.todoList.filter((item) => item.todo !== todo.todo);

        copyDay.todoList = newTodo;

        const newMonthDay = setCalendarDay(monthDay, copyDay);
        setMonthDay(newMonthDay);
        saveLocalStorage(newMonthDay);
        setDay(copyDay);
    }


    const setNextMonth = () => {
        setCurrentMonth(currentMonth + 1);
    }

    const setPrevMonth = () => {
        setCurrentMonth(currentMonth - 1);
    }


    const setCalendarDay = (monthDay, copyDay) => {
        const copyMonthDay = [...monthDay];
        const index = monthDay.findIndex((day) => day.day === copyDay.day);
        copyMonthDay[index] = copyDay;

        return copyMonthDay;
    }

    const setDayTodoItem = (day, copyItem) => {
        const copyDay = Object.assign({}, day);
        const itemIndex = copyDay.todoList.findIndex((todoitem) => todoitem.todo === copyItem.todo);
        copyDay.todoList[itemIndex] = copyItem;

        return copyDay;
    }

    const checkedTodo = (event, item, day) => {
        const copyItem = Object.assign({}, item);
        const value = event.target.checked;
        copyItem.check = value;

        const copyDay = setDayTodoItem(day, copyItem);
        const copyMonthDay = setCalendarDay(monthDay, copyDay);

        setMonthDay(copyMonthDay);
        saveLocalStorage(copyMonthDay);
    }

    useEffect(() => {
        console.log('useEffect current month', currentMonth);
        const localDay = localStorage.getItem(`calendarTodo-${currentMonth + 1}`);

        if (localDay && JSON.parse(localDay).length > 0) {
            console.log('get local day');
            setMonthDay(JSON.parse(localDay));
        } else {
            const dayList = createCalendar(new Date(currentYear, currentMonth))
            setMonthDay(dayList);
            saveLocalStorage(dayList);
        }
    }, [currentMonth])

    return (
        <>
            {openModal &&
                <AddTodo closeModal={() => setOpenModal(false)} deleteDailyTodo={deleteDailyTodo} day={day} addDailyTodo={addDailyTodo} />
            }
            <div className="container mx-auto w-/5 border-2 border-black">
                <h1 className="text-7xl font-thin">{currentYear} ({currentMonth + 1})</h1>
                <div className="flex justify-between">
                    <button onClick={() => setPrevMonth()}>(prev)</button>
                    <button onClick={() => setNextMonth()}>(next)</button>
                </div>
                <div className="grid grid-cols-7 text-white bg-black ">
                    <div>sun</div>
                    <div>mon</div>
                    <div>tue</div>
                    <div>wed</div>
                    <div>thu</div>
                    <div>fri</div>
                    <div>sat</div>
                </div>
                <div className="grid grid-cols-7">
                    {monthDay.map((day, i) => (
                        <div key={i + 1} className='h-44 text-4xl md:text-7xl font-thin tracking-tight border'>
                            <div className="flex justify-between items-end mb-2">
                                <h1>{day.day.slice(7, 10)}</h1>
                                <button className="text-sm border rounded-full w-2 h-2 p-2 mr-1 flex justify-center items-center font-normal hover:text-white hover:bg-black" onClick={() => openTodoModal(day)}>+</button>
                            </div>
                            {day.todoList.map((item) => (
                                <div className="flex justify-between mx-1">
                                    <h5 className="text-sm font-normal">{item.todo}</h5>
                                    {item.todo !== '' && <input type='checkbox' name="check" defaultChecked={item.check} onClick={(e) => checkedTodo(e, item, day)} />}
                                </div>
                            ))}
                        </div>))}
                </div>
            </div>
        </>
    )
}