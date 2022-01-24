import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import './TaskList.css'

function TaskList() {

    const [todos, setTodos] = useState([]);

    const getTodos = () => {
    axios.get('https://mern-todo-beginner.herokuapp.com/todos')
    .then(response => {return response})
    .then(tasks => setTodos(tasks.data))
    }

    useEffect(() => {
      getTodos();
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();

      const todo = e.target.task.value;
      const todoStatus = "incomplete";
      
      axios.post('https://mern-todo-beginner.herokuapp.com/todos/add', {todo,todoStatus})
      .then(response => getTodos());

      e.target.task.value=("");
    }

    const deleteTask = (taskId) => {
      let id = taskId;
      
      axios.delete(`https://mern-todo-beginner.herokuapp.com/todos/${id}`)
      .then(response => getTodos());
    }

    const changeStatus = (taskId, status, task) => {
      let id = taskId;
      let todoStatus = status;
      let todo = task;

      if(todoStatus =="incomplete"){
        console.log("onclick incomplete working");
        axios.put(`https://mern-todo-beginner.herokuapp.com/todos/update/${id}`, {todo, todoStatus:"completed"})
        .then(response => getTodos())
      }else if(todoStatus === "completed"){
        axios.put(`https://mern-todo-beginner.herokuapp.com/todos/update/${id}`, {todo, todoStatus:"incomplete"})
        .then(response => getTodos())
      }
    }

    const editTask = (taskId, status, task) => {
      let id = taskId;
      let todoStatus = status;
      let todo = prompt("Enter new task", task);

      axios.put(`https://mern-todo-beginner.herokuapp.com/todos/update/${id}`, {todo, todoStatus})
      .then(response => getTodos());
    }

  return( 
    <>
    
    <center>
    <h1>Todo List</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" name="task"></input>
      <Button variant="outline-success" type="submit">Add</Button>
    </form>
    </center>

    <Table striped bordered hover variant="dark">
      <tbody>
    {todos.map((task) =>{
      if(task.todoStatus == "incomplete"){
        return(
        <tr>
        <td>{task.todo}</td> 
        <td><Button variant="outline-success" onClick={() => changeStatus(task._id, task.todoStatus, task.todo)}>{task.todoStatus}</Button></td>
        <td><Button variant="primary" onClick = {() => editTask(task._id, task.todoStatus, task.todo)}>Edit</Button></td>
        <td><Button variant="danger" value={task._id} onClick={() => {deleteTask(task._id)}}>Delete</Button></td>
        </tr>
        )}
      else{
        return(
          <tr>
          <td style={{textDecoration:"line-through"}}>{task.todo}</td> 
          <td><Button variant="outline-success" onClick={() => changeStatus(task._id, task.todoStatus, task.todo)}>{task.todoStatus}</Button></td>
          <td><Button variant="primary" onClick = {() => editTask(task._id, task.todoStatus, task.todo)}>Edit</Button></td>
          <td><Button variant="danger" value={task._id} onClick={() => {deleteTask(task._id)}}>Delete</Button></td>
          </tr>
        )}
})}
    </tbody>
  </Table>
    </>
  );
}

export default TaskList;
