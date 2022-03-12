import './App.css';
import { Button, Container, Form, FormControl, FormLabel, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import TaskCard from './component/taskCard';
import SectionTitle from './component/SectionTitle';
import { useTaskContext } from './contexts/task';
import { useEffect, useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  const [currentModalPage, setCurrentModalPage] = useState(1)
  const [inputName, setInputName] = useState("")
  const [inputDate, setInputDate] = useState("")
  const [inputDescription, setInputDescription] = useState("")
  const [inputTags, setInputTags] = useState([])
  const [filteredTags, setFilteredTags] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])

  const tagOptions = ["Health", "On Going", "To Do", "Refreshing", "Completed", "College", "Internship", "Programming"]
  const handleClose = () => { setShow(false); setCurrentModalPage(1) }
  const handleShow = () => setShow(true);
  const { tasks, setTasks, showFilter, setShowFilter } = useTaskContext()

  const handleCloseFilter = () => [
    setFilteredTags([]),
    setShowFilter(false)
  ]

  useEffect(() => {
    console.log(inputName);
    console.log(inputDate);
    console.log(inputDescription);
    console.log(inputTags);
  }, [inputName, inputDate, inputDescription, inputTags])

  const handleNewTask = () => {
    const newTask = {
      title: inputName,
      deadlineDate: inputDate,
      tags: inputTags,
      description: inputDescription
    }
    setTasks([...tasks, newTask])
    handleClose()
  }

  useEffect(() => {
    const newFilteredTasks = []
    console.log(filteredTags)
    tasks.forEach((el) => {
      let flag = false
      for (let i = 0; i < filteredTags.length; i++) {
        const element = filteredTags[i];
        if (el.tags.indexOf(element) === -1) {
          flag = true
          break
        }
      }
      if (!flag) {
        newFilteredTasks.push(el)
      }
    })
    setFilteredTasks(newFilteredTasks)
  }, [filteredTags, tasks])


  const handleTags = (index) => {
    const currentTag = document.getElementById(`tag${index}`)
    if (inputTags.indexOf(tagOptions[index]) === -1) {
      currentTag.classList.add("tag-clicked")
      currentTag.classList.remove("tag-option")
      setInputTags([...inputTags, tagOptions[index]])
    } else {
      currentTag.classList.add("tag-option")
      currentTag.classList.remove("tag-clicked")
      const newInputTags = inputTags.filter((el) => tagOptions[index] !== el)
      setInputTags(newInputTags)
    }
  }

  const handleFilteredTags = (index) => {
    const currentTag = document.getElementById(`tag-filter${index}`)
    if (filteredTags.indexOf(tagOptions[index]) === -1) {
      currentTag.classList.add("tag-clicked")
      currentTag.classList.remove("tag-option")
      setFilteredTags([...filteredTags, tagOptions[index]])
    } else {
      currentTag.classList.add("tag-option")
      currentTag.classList.remove("tag-clicked")
      const newFilteredTags = filteredTags.filter((el) => tagOptions[index] !== el)
      setFilteredTags(newFilteredTags)
    }
  }

  useEffect(() => {
    if (!show) {
      setInputDate("")
      setInputName("")
      setInputDescription("")
      setInputTags([])
    }
  }, [show])

  return (
    <div className="App">
      <Container className='container font-roboto'>
        <div className='header'>
          <h2>TUGAS FUKI</h2>
          <div className='button green-button' onClick={handleShow}>Add Task</div>
        </div>
        <SectionTitle title="Task" withFilter />
        {tasks.map((el, index) => {
          return (<TaskCard
            title={el.title}
            deadlineDate={el.deadlineDate}
            tags={el.tags}
            description={el.description}
            index={index}
          />)
        })}

        <Modal show={show} onHide={handleClose}>
          <ModalHeader closeButton>
            <ModalTitle>
              <SectionTitle title="New Task" />
            </ModalTitle>
          </ModalHeader>
          {currentModalPage === 1 ?
            <ModalBody className='mx-3'>
              <FormLabel htmlFor="input-name">
                <h5 classname="label">Nama Tugas</h5>
              </FormLabel>
              <InputGroup className="mb-3">
                <FormControl defaultValue={inputName} id="input-name" onChange={(e) => setInputName(e.target.value)} />
              </InputGroup>
              <FormLabel classname="label" htmlFor="input-deadline">
                <h5 classname="label">Deadline</h5>
              </FormLabel>
              <InputGroup className="mb-3">
                <FormControl defaultValue={inputDate} onChange={(e) => setInputDate(e.target.value)} id="input-deadline" type='datetime-local' />
              </InputGroup>
              <FormLabel classname="label" htmlFor="input-tags">
                <h5 classname="label">Tags</h5>
              </FormLabel>
              <InputGroup className="mb-3" id='input-tags'>
                {tagOptions.map((el, index) => {
                  if (el.toUpperCase() === "COMPLETED") {
                    return (
                      <div id={`tag${index}`} onClick={() => handleTags(index)} className="tag-item mt-2 bg-tag-completed button tag-option" style={{ borderRadius: "30px" }}>{el}</div>)
                  } else if (el.toUpperCase() === "ON GOING") {
                    return (
                      <div id={`tag${index}`} onClick={() => handleTags(index)} className="tag-item tag-option mt-2 bg-tag-ongoing" style={{ borderRadius: "30px" }}>{el}</div>
                    )
                  } else {
                    return (
                      <div onClick={() => handleTags(index)}
                        id={`tag${index}`} className="tag-item tag-option mt-2 bg-tag-normal" style={{ borderRadius: "30px" }}>{el}</div>)
                  }
                })}

              </InputGroup>
            </ModalBody> : <ModalBody className='mx-3'>
              <FormLabel htmlFor="input-description">
                <h5 classname="label">Deskripsi</h5>
              </FormLabel>
              <InputGroup className="mb-3">
                <FormControl defaultValue={inputDescription} id="input-description" onChange={(e) => setInputDescription(e.target.value)} />
              </InputGroup>
            </ModalBody>}

          {currentModalPage === 1 ? <ModalFooter>
            <div className='button gray-button' variant="secondary" onClick={handleClose}>
              Close
            </div>
            <button className='button green-button' disabled={!inputName || !inputDate || inputTags.length === 0} onClick={() => setCurrentModalPage(2)}>
              Next
            </button>
          </ModalFooter> : <ModalFooter>
            <div className='button gray-button' variant="secondary" onClick={() => setCurrentModalPage(1)}>
              Back
            </div>
            <div className='button green-button' onClick={() => handleNewTask()}>
              Add
            </div>
          </ModalFooter>}
        </Modal>
        <Modal show={showFilter} onHide={handleCloseFilter}>
          <ModalHeader closeButton>
            <ModalTitle>
              <SectionTitle title="Filter Task" />
            </ModalTitle>
          </ModalHeader>
          <ModalBody className='mx-3'>
            {tagOptions.map((el, index) => {
              if (el.toUpperCase() === "COMPLETED") {
                return (
                  <div id={`tag-filter${index}`} onClick={() => handleFilteredTags(index)} className="tag-item mt-2 bg-tag-completed button tag-option" style={{ borderRadius: "30px" }}>{el}</div>)
              } else if (el.toUpperCase() === "ON GOING") {
                return (
                  <div id={`tag-filter${index}`} onClick={() => handleFilteredTags(index)} className="tag-item tag-option mt-2 bg-tag-ongoing" style={{ borderRadius: "30px" }}>{el}</div>
                )
              } else {
                return (
                  <div onClick={() => handleFilteredTags(index)}
                    id={`tag-filter${index}`} className="tag-item tag-option mt-2 bg-tag-normal" style={{ borderRadius: "30px" }}>{el}</div>)
              }
            })}
            {filteredTasks.map((el, idx) => {
              console.log(filteredTags);
              return (<TaskCard
                title={el.title}
                deadlineDate={el.deadlineDate}
                tags={el.tags}
                description={el.description}
                index={idx}
                isFiltered
              />)
            })}
          </ModalBody>

          <ModalFooter>
            <div className='button gray-button' variant="secondary" onClick={handleCloseFilter}>
              Close
            </div>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
