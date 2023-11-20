import { useEffect, useState } from "react";


function Todo(){

    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(
            data => setTodos(data)
        )
        .catch(
            err => console.error(err)
        )

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!todoText){
            alert("Can't add an empty todo");
            return;
        }
        else{
            fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify({
                    title: todoText,
                    completed: false,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response => response.json())
            .then(
                (data) => {
                    // Add the new item to our list of todos
                    setTodos([data, ...todos]);
                    setTodoText('');
                }
            );
        }
    }

    const handleToggle = (e, index) => {
        e.preventDefault();
        let updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    }

    const handleDelete = (e, index) => {
        e.preventDefault();
        let updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
    }

    return (
        <div className="container p-5">
            <div>
                <h1 className="text-center">
                    TODO-LIST App
                </h1>
                <form onSubmit={handleSubmit} className="d-flex justify-content-between mb-5 mt-5">
                    <input
                        type="text"
                        className="form-control"
                        value={todoText}
                        onChange={(e) => setTodoText(e.target.value)}
                    />
                    <button className="btn btn-primary">Add Todo</button>
                </form>
            </div>
            <div>
                {todos.map((todo, index) => (
                    <div key={index} className="todo mb-3 d-flex align-items-center justify-content-between">
                        <div className="content border-bottom border-danger d-flex">
                            <div className="todo-id">{index + 1}.</div>
                            <div className="todo-title">{todo.title}</div>
                            <span className={todo.completed ? 'completed':'pending'}>{todo.completed ? 'Completed': 'Pending'}</span>
                        </div>
                        <div className="buttons d-flex justify-content-between">
                            <button className="btn btn-warning" onClick={(e) => handleToggle(e, index)}>Toggle</button>
                            <button className="btn btn-danger" onClick={(e) => handleDelete(e, index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Todo;