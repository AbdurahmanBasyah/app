import { useEffect, useState } from "react";
import { useTaskContext } from "../contexts/task";

const TaskCard = (props) => {
    const [countDay, setCountDay] = useState(0)
    const [countHour, setCountHour] = useState(0)
    const [countMinute, setCountMinute] = useState(0)
    const [currentDay, setCurrentDay] = useState("")
    const [currentDate, setCurrentDate] = useState("")
    const [currentMonth, setCurrentMonth] = useState("")
    const [currentYear, setCurrentYear] = useState("")
    const [isExpanded, setIsExpanded] = useState(false)

    const {deleteItem} = useTaskContext()

    var countdown = new Date(props.deadlineDate)
    var countDownDate = countdown.getTime();

    const monthArr = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

    const dayArr = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]

    useEffect(() => {
        setCurrentDay(dayArr[countdown.getDay()])
        setCurrentDate(countdown.getDate())
        setCurrentMonth(monthArr[countdown.getMonth()])
        setCurrentYear(countdown.getUTCFullYear())
    }, [])

    useEffect(() => {
        console.log(isExpanded);
    }, [isExpanded])

    const {tasks} = useTaskContext()

    useEffect(() => {
        const interval = setInterval(function () {
            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            setCountDay(days)
            setCountHour(hours)
            setCountMinute(minutes)
        }, 1000);
    
      return () => {
        clearInterval(interval)
      }
    }, [tasks])

    return (
        <div className="taskCard">
            <div className={props.isFiltered ? "" : "title-timer"}>
                <div>
                    <div className="task-title">
                        {props.title}
                    </div>

                    <p className="deadlineDate">
                        {`${currentDate} ${currentMonth} ${currentYear}, ${currentDay}`}
                    </p>
                </div>
                <div className="timerContainer">
                    <div className="timerItem">
                        {countDay}
                        <p>days</p>
                    </div>
                    <div className="timerItem">
                        {countHour}
                        <p>hours</p>
                    </div>
                    <div className="timerItem">
                        {countMinute}
                        <p>minutes</p>
                    </div>
                </div>
            </div>
            <div className="tags-container">
                {props.tags.map((el, index) => {
                    return (
                        (() => {
                            if (el.toUpperCase() === "COMPLETED") {
                                return (
                                    <div className="tag-item bg-tag-completed">{el}</div>)
                            } else if (el.toUpperCase() === "ON GOING") {
                                return (
                                    <div className="tag-item  bg-tag-ongoing">{el}</div>
                                )
                            } else {
                                return (
                                    <div className="tag-item  bg-tag-normal">{el}</div>)
                            }
                        })()
                    )

                })}
            </div>
            {isExpanded && <div className="description-container">
                <hr />
                <div className="description">{props.description}</div>
            </div>}
            {isExpanded && !props.isFiltered &&
                <div onClick={() => deleteItem(props.index)} className="button delete-button">
                    Delete
                </div>}
            <div onClick={() => setIsExpanded(!isExpanded)} className="button green-button detail-button">{isExpanded ? "Close" : "Details"}</div>
        </div>
    )
}
export default TaskCard