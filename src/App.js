import React from 'react';

class App extends React.Component {
  
  state = {
    toDo:[],
    toDoInput: '',
    isEdit: [false, 0],
  }

  addOne = (e) => {
    e.preventDefault();
    const {toDo: oldToDo} = this.state;
    const { value: toDoInput } = this.input;
    const toDo = [...oldToDo, toDoInput];
    this.setState({toDo});
    this.input.value = ''
  }

  deleteOne = (index) => {
    const {toDo: oldToDo} = this.state;
    const toDo = [...oldToDo];
    toDo.splice(index, 1);
    this.setState({toDo});
  }

  editOne = (index) => {
    const {value: toDoInput} = this.input;
    const {toDo: oldToDo} = this.state;
    const toDo = [...oldToDo];
    toDo[index] = toDoInput;
    this.setState({toDo});
  }

  openEditInput = (index) => {
    this.setState(prev => {
      const [isEdit] = prev.isEdit;
      return { isEdit: [!isEdit, index] };
    })
  }

  render() {
    const { toDo, isEdit } = this.state;
    return (
      <div>
        <form onSubmit={this.addOne}>
          <input type="text" ref={node => this.input = node} placeholder="add new todo"/>
          <button type="submit">Add One</button>
        </form>
        <ul>
          {toDo.map((item, index) => {
            return (<li key={index}>
              {item}&nbsp;&nbsp;&nbsp;
              <span onClick={() => this.deleteOne(index)}>d</span>
              &nbsp;&nbsp;&nbsp;
              <span onClick={() => this.openEditInput(index)}>e</span>
              {(isEdit[0]&&isEdit[1]===index) && <form onSubmit={() => this.setState({isEdit: [false, 0], toDoInput: ''})}>
                  <input type="text" ref={node => this.input = node} value={item} placeholder='enter the edit' onChange={() => this.editOne(index)} />
                </form>}
              </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default App;
