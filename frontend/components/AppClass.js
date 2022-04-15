import React from 'react'
import axios from 'axios'

export default class AppClass extends React.Component {
  state ={
    x: 2,
    y: 2,
    steps: 0,
    board:["", "", "", "", "B", "","", "", ""],
    email:'',
    message:''
  }

//reset
resetForm = () => {
  this.setState({ ...this.state, 
    x: 2,
    y: 2,
    steps: 0,
    board:["", "", "", "", "B", "","", "", ""],
    email: '',
    
  })
}

  //Making email submit
  onChange = e =>{
    const {value} = e.target // has to be word value
    this.setState({ 
      ...this.state, email: value})
  }
  
// //cleanup helpers
  postOnSubmit = () =>{
    axios.post('http://localhost:9000/api/result', { x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email } )
    .then(res => {
      this.setState({
        ...this.state,
        message: res.data.message,
        x: 2,
        y: 2,
        steps: 0,
        board:["", "", "", "", "B", "","", "", ""],
        email: '',
      })
      
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message,
        
      })
    
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.postOnSubmit();
    
  }
  
//Left up down

arraymove =(arr, fromIndex, toIndex) =>{
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

onClickL = () => {
  const indexB = this.state.board.indexOf('B')
  const boardArray = this.state.board
  if (indexB === 1 || indexB === 2 ||indexB === 4 || indexB === 5 ||indexB === 7 || indexB === 8 ){
    this.arraymove(boardArray, indexB, (indexB-1))
  }
  let errorMessage =''
    if(indexB === 0 || indexB === 3 || indexB === 6) {
      errorMessage = 'You can\'t go left'
    }
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x <= 3 && this.state.x > 1? this.state.x -1: this.state.x,
      y: this.state.y,
      board: boardArray,
      message: errorMessage
       
    })
  }

onClickR = () => {
  const indexB = this.state.board.indexOf('B')
  const boardArray = this.state.board
  if (indexB === 0 || indexB === 1 ||indexB === 3 || indexB === 4 ||indexB === 6 || indexB === 7 ){
    this.arraymove(boardArray, indexB, (indexB+1))
  }
  let errorMessage =''
    if(indexB === 2 || indexB === 5 || indexB === 8) {
      errorMessage = 'You can\'t go right'
    }
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x < 3 && this.state.x >= 1? this.state.x +1: this.state.x,
      y: this.state.y,
      message: errorMessage
    })
  }

  onClickU = () => {
    const indexB = this.state.board.indexOf('B')
    const boardArray = this.state.board
    if (indexB === 3 || indexB === 4 || indexB === 5 || indexB === 6 || indexB === 7 || indexB === 8 ){
      this.arraymove(boardArray, indexB, (indexB-3))
    }
    let errorMessage =''
    if(indexB === 0 || indexB === 1 || indexB === 2) {
      errorMessage = 'You can\'t go up'
    }
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x,
      y: this.state.y <= 3 && this.state.y > 1? this.state.y -1 : this.state.y,
      message: errorMessage
    })
  }

  onClickD = () => {
    const indexB = this.state.board.indexOf('B')
    const boardArray = this.state.board
    if (indexB === 1 || indexB === 2 || indexB === 3 || indexB === 4 || indexB === 5 || indexB === 0 ){
      this.arraymove(boardArray, indexB, (indexB+3))
    }
    let errorMessage =''
    if(indexB === 6 || indexB === 7 || indexB === 8) {
      errorMessage = 'You can\'t go down'
    }
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x,
      y: this.state.y < 3 && this.state.y >= 1? this.state.y +1 : this.state.y,
      message: errorMessage
    })
  }
  

  render() {
    const { className } = this.props
    
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
        {this.state.board.map(val=>{
          return <div className={`${val? 'square active' : 'square'}`}>{val}</div>
        })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.onClickL} id="left">LEFT</button>
          <button onClick={this.onClickU} id="up">UP</button>
          <button onClick={this.onClickR} id="right">RIGHT</button>
          <button onClick={this.onClickD} id="down">DOWN</button>
          <button onClick={this.resetForm} id="reset">reset</button>
        </div>
        <form id="form-wrapper" onSubmit={this.onSubmit}>
          <input 
          onChange={this.onChange} 
          value={this.state.email} 
          id="email" type="email" 
          placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
      
    )
  }
}
