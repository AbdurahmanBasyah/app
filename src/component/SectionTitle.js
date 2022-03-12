import { useTaskContext } from "../contexts/task"

const SectionTitle = (props) => {
  const {  showFilter, setShowFilter } = useTaskContext()
    return (
        <div className="sectionTitle">
            <div className="title">{props.title}</div>
            {props.withFilter && 
            <div onClick={() => setShowFilter(!showFilter)} className="button white-button">
                Filter By
            </div>}
        </div>
    )
}

export default SectionTitle