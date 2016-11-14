import React, {Component} from 'react';
// import 'components/TodoForm.css';

class TodoForm extends Component {
  constructor (props) {
    super(props);

    // Bind functions
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit (e) {
    e.preventDefault();

    let description = this.refs.description.value;
    if (description) {
      this.props.addTodo(description);
      this.refs.form.reset();
    }
  }

  render () {
    return (
      <div className='todo-form'>
        <h3>Add New Todo Item</h3>
        <form ref='form' onSubmit={this._onSubmit}>
          <input className='text-input' type='text' placeholder='Enter Description' ref='description' />
          <input className='btn btn-submit' type='submit' value='Add' />
        </form>
      </div>
    );
  }
}

module.exports = TodoForm;
