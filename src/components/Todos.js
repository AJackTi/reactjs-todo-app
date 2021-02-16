import React from "react";
import TodoItem from "./TodoItem";

class Todos extends React.Component {
    render() {
        return (
            // <div> Hello from Todos </div>
            <div>
                <ul>
                    {this.props.todosThis.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            handleChange={this.props.handleChange}
                            handleClick={this.props.handleClick}/>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Todos;