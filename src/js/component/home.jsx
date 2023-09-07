import React, { useEffect, useState } from "react";
import List from "./List";
import ListItem from "./ListItem";
import { getData, putData } from "../services/fetch";

const Home = () => {
  const [task, setTask] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    getData()
      .then((res) => {
        if (res === null) {
          setToDoList([]);
        } else {
          setToDoList(res);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  const handleDeleteButton = (id) => {
    const newToDoDataList = toDoList.filter((element) => element.id !== id);

    putData(newToDoDataList)
      .then((res) => {
        setToDoList(res);
      })
      .catch((err) => console.log(err));

	console.log(toDoList)
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

	if(task === "") {
		return alert("Empty task, please put a valid one")
	}
	
	const taskExistCheck = () => {
		const taskList = toDoList.map(toDo => toDo.task);
		return taskList.includes(task)
	} 
		
    if (taskExistCheck()){
		return alert("This task already exist, please put a new one")
	}
	const getLastId = () => {
      const ids = toDoList.map((toDo) => toDo.id);
      if (ids.length === 0) {
        return 0;
      }
      return Math.max(...ids) + 1;
    };

    const newTask = {
      id: getLastId(),
      task,
    };

    const newToDoList = [ newTask, ...toDoList];

    putData(newToDoList)
      .then((res) => {
        setToDoList(res);
      })
      .catch((err) => console.log(err));

    setTask("");
  };

  return (
    <List>
      <ListItem>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="taskCreator"
            name="taskCreator"
            value={task}
            onChange={handleNewTask}
          />
        </form>
      </ListItem>
      {!toDoList ? setToDoList([]) : toDoList.map((toDo) => (
        <ListItem
          key={`task-${toDo.id}`}
          id={`task-${toDo.id}`}
          isTask={true}
          toDelete={() => handleDeleteButton(toDo.id)}
        >
          {toDo.task}
        </ListItem>
      ))}
      <ListItem id="items-left">{!toDoList ? setToDoList([]) : toDoList.length} items left.</ListItem>
    </List>
  );
};

export default Home;
