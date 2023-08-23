import React, { useEffect, useState } from "react";
import List from "./List";
import ListItem from "./ListItem";
import { getData, putData, deleteData } from "../services/fetch";


const Home = () => {
	const [task, setTask] = useState(""); // Estado para poder escuchar el value del input.
	const [toDoList, setToDoList] = useState([]); // Estado para actualizar la lista.
	useEffect(() => {
		getData()
		.then(res => setToDoList(res))
		.catch(err => console.log(err))
	}, []);
	console.log(toDoList)

	const handleNewTask = (e) => {  //Función handle para que el input sea "variable", dando valor a value = contenido del input.
		setTask(e.target.value)
	}
	
	const handleDeleteButton = (id) => {
		const newToDoDoDataList = toDoList.filter((element) => element.id !== id)
		return (
			setToDoList(newToDoDoDataList)// Renderizado del estado de la lista
			)
	}
	
	const handleSubmit = (e) => { // Función handle para el submit. Con esto controlamos la acción del submit del al ejecutarlo.
		e.preventDefault(e);

		const getLastId = () => {
			let ids = toDoList.map(toDo => toDo.id);
			if (ids[0] === undefined){
				const lastId = 0
				return lastId;
			};
			const lastId = Math.max(...ids) + 1;
			return lastId
		};

		const newTask = {  //Creo un objeto con el id más alto y con el valor de la key task igual al promt value del input con id o name = taskCreator
			id : getLastId(),
			task
		}
		
		setToDoList(prev => [newTask, ...prev])
	}

	const handlePutData = () => {putData(URL, toDoList)}

	return (
		<List>
			<ListItem>
				<form onSubmit={handleSubmit} >
				<input
					type="text"
					id="taskCreator"
					name="taskCreator"
					value={task}
					onChange={handleNewTask}
          		/>
				</form>
			</ListItem>
			{
				toDoList.map((toDo) => { 
					return (
						<ListItem id={`task-${toDo.id}`} isTask={true}  toDelete={() => handleDeleteButton(toDo.id)}>
							{toDo.task}
						</ListItem>
					)
				})
			}
			
			<ListItem id="items-left">
				{toDoList.length} items left.
			</ListItem>
		</List>
	);
};

export default Home;
