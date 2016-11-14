import React from 'react';
// import 'components/TodoItem.css';

function TodoItem ({item, removeTodo, toggleComplete}) {
  let classList = ['todo-item'];
  if (item.isComplete) {
    classList.push('complete')
  }
  return (
    <li className={classList.join(' ')}>
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
