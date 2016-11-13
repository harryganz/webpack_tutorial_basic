import React from 'react';

function TodoItem ({item, removeTodo, toggleComplete}) {
  return (
    <li className='todo-item'>
      <input type='checkbox'
        checked={item.isComplete}
        onClick={() => toggleComplete(item.id)}
      />
      <span className='description'>{item.description}</span>
      <button className='btn btn-danger'
        onClick={() => removeTodo(item.id)}
      >Remove</button>
    </li>
  );
}

module.exports = TodoItem;
