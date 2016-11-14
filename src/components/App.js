import React, {Component} from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import 'components/App.css';
import smiley from 'images/smiley.png';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      todos: []
    };
    this._idSeq = 0;

    // Bind Methods
    this.addTodo = this.addTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo (description) {
    let id = ++this._idSeq;
    this.setState({
      todos: [...this.state.todos, {id: id, description: description, isComplete: false}]
    });
  }

  toggleComplete (id) {
    let newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {
          id: id,
          description: todo.description,
          isComplete: !todo.isComplete
        };
      } else {
        return todo;
      }
    });

    this.setState({todos: newTodos});
  }

  removeTodo (id) {
    let newTodos = this.state.todos.filter(todo => todo.id !== id);
    this.setState({todos: newTodos});
  }

  render () {
    return (
      <div className='app'>
        <div className='page-header'>
          <h1>
            {
              <img src={smiley} alt='smiley' width="32px" height="32px" />
            }
            Todo List Demo
          </h1>
        </div>
        <TodoForm addTodo={this.addTodo} />
        <TodoList
          todos={this.state.todos}
          toggleComplete={this.toggleComplete}
          removeTodo={this.removeTodo}
        />
      </div>
    );
  }
}

module.exports = App;
