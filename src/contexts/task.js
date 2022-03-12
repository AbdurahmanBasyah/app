import { createContext, useContext, useState } from "react";

const taskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [showFilter, setShowFilter] = useState(false)

    const deleteItem = (index) => {
        const prevItems = tasks.slice(0, index)
        const nextItem = tasks.slice(index + 1,)
        console.log(nextItem);
        const newTasks = [...prevItems, ...nextItem]
        setTasks(newTasks)
        return newTasks
    }

    const value = {
        tasks,
        setTasks,
        deleteItem,
        showFilter, 
        setShowFilter
    }

    return (
        <taskContext.Provider value={value}>
            {children}
        </taskContext.Provider>
    )
}

export const useTaskContext = () => {
    return useContext(taskContext)
}