import React from 'react';
import TodoItem from './TodoItem';

function TodoList ({todos, removeTodo, toggleComplete}) {
  let todoItems = todos.map(item =>
    <TodoItem
      key={item.id}
      item={item}
      removeTodo={removeTodo}
      toggleComplete={toggleComplete}
    />
  );

  return (
    <div className='todo-list'>
      <h3>Todo List</h3>
      <ul>
        {todoItems}
      </ul>
    </div>
  );
}

module.exports = TodoList;
