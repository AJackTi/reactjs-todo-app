// import React from "react";
// import Header from "./layout/Header";
// import Todos from "./Todos";
// import AddTodo from "./AddTodo";
// import {v4} from "uuid";
// import axios from "axios";
//
// class TodoApp extends React.Component {
//     // state = {
//     //     todos: [{
//     //         id: v4(), title: "Setup development environment", completed: true
//     //     }, {
//     //         id: v4(), title: "Develop website and add content", completed: false
//     //     }, {
//     //         id: v4(), title: "Deploy to live server", completed: false
//     //     }
//     //     ]
//     // };
//
//     state = {todos: []};
//
//     handleCheckboxChange = id => {
//         this.setState({
//             todos: this.state.todos.map(todo => {
//                 if (todo.id === id) {
//                     todo.completed = !todo.completed;
//                 }
//                 return todo;
//             })
//         })
//     };
//
//     handleClick = id => {
//         // this.setState({
//         //     todos: [...this.state.todos.filter(todo => {
//         //         return todo.id !== id;
//         //     })]
//         // })
//
//         axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
//             .then(reponse => this.setState({
//                 todos: [...this.state.todos.filter(todo => {
//                     return todo.id !== id;
//                 })
//                 ]
//             }))
//     }
//
//     addTodo = title => {
//         // console.log(title);
//         // const newTodo = {id: v4(), title: title, completed: false};
//         // this.setState({
//         //     todos: [...this.state.todos, newTodo]
//         // })
//
//         const todoData = {title: title, completed: false}
//         axios.post("https://jsonplaceholder.typicode.com/todos", todoData).then(response => {
//             console.log(response.data)
//             this.setState({todos: [...this.state.todos, response.data]})
//         });
//     };
//
//     render() {
//         return (
//             // <div><h1>Hello from Create React App</h1> <p>I am in a React Component!</p>
//             // </div>
//             <div className="container">
//                 <Header/>
//                 <AddTodo addTodo={this.addTodo}/>
//                 {/*<ul>*/}
//                 {/*    {this.state.todos.map(todo => (*/}
//                 {/*        <li key={todo.id}>{todo.title}</li>*/}
//                 {/*    ))} */}
//                 {/*</ul>*/}
//                 <Todos todosThis={this.state.todos}
//                        handleChange={this.handleCheckboxChange}
//                        handleClick={this.handleClick}
//                 />
//             </div>
//         );
//     }
//
//     componentDidMount() {
//         const config = {
//             params: {_limit: 5}
//         }
//         axios.get("http://jsonplaceholder.typicode.com/todos", config)
//             .then(response => this.setState({todos: response.data}));
//     }
// }
//
// export default TodoApp;

import React, {useState, useEffect} from "react";
import Todos from "./Todos";
import Header from "../components/layout/Header";
import AddTodo from "./AddTodo"

//khai báo thư viện axios
import axios from "axios";
// import Footer from "./Footer";
import Footer from "../store/containers/Footer";

function TodoApp() {

    const [state, setState] = useState({
        todos: []
    });
    const handleCheckboxChange = id => {
        setState({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        });
    };
    const deleteTodo = id => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(reponse => setState({
                todos: [
                    ...state.todos.filter(todo => {
                        return todo.id !== id;
                    })
                ]
            }))
    };

    const addTodo = title => {
        const todoData = {
            title: title,
            completed: false
        }
        axios.post("https://jsonplaceholder.typicode.com/todos", todoData)
            .then(response => {
                console.log(response.data)
                setState({
                    todos: [...state.todos, response.data]
                })
            });
    };

    useEffect(() => {
        const config = {
            params: {
                _limit: 5
            }

        }
        // tạo GET request để lấy danh sách todos
        axios.get("https://jsonplaceholder.typicode.com/todos", config)
            .then(response => setState({todos: response.data}));
    }, []);

    return (
        <div className="container">
            <Header/>
            <AddTodo addTodo={addTodo}/>
            <Todos todosThis={state.todos}
                   handleChange={handleCheckboxChange}
                   deleteTodo={deleteTodo}/>
            <Footer/>
        </div>
    );

}

export default TodoApp;