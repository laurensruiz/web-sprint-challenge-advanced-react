import React from 'react'
import axios from 'axios'


export default class AppClass extends React.Component {
  state ={
    x: 2,
    y: 2,
    steps: 0,
    board:[
      [null, null, null], 
      [null, "B", null], 
      [null, null, null]],
    email:'',
    message:''
  }

//reset
resetForm = () => {
  this.setState({
    x: 2,
    y: 2,
    steps: 0,
    board:[
      [null, null, null], 
      [null, "B", null], 
      [null, null, null]],
    email: '',
    message:''
    
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
        board:[
          [null, null, null], 
          [null, "B", null], 
          [null, null, null]],
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

onClick = (varX, varY) => {
  
    if(this.state.x + varX > 3) {
      this.setState( {
        ...this.state,
        message: "You can't go right"
      })
    } else if (this.state.x + varX < 1) {
      this.setState( {
        ...this.state,
        message: "You can't go left"
      })
    } else if (this.state.y + varY > 3) {
      this.setState( {
        ...this.state,
        message: "You can't go down"
      })
    } else if (this.state.y + varY < 1) {
      this.setState( {
        ...this.state,
        message: "You can't go up"
      })
    } else {
      const idxX = (this.state.x-1);
      const idxY = (this.state.y-1);
      const idxXB = (idxX + varX);
      const idxYB = (idxY + varY)
      const updatedBoard = [...this.state.board];
      updatedBoard[idxY][idxX] = null
      updatedBoard[idxYB][idxXB] = 'B'
      
      this.setState({
        ... this.state,
        x: this.state.x+ varX,
        y: this.state.y+ varY,
        steps: this.state.steps + 1,
        board: updatedBoard,
        message: ''
      })
    }
  }
  
  


  render() {
    const { className } = this.props
    const flattenedBoard = this.state.board.flat();
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x}, ${this.state.y})`}</h3>
          {this.state.steps === 1 ? <h3 id="steps">You moved 1 time</h3> : <h3 id="steps">You moved {this.state.steps} times</h3> } 
          {/* account for 1 time */}
        </div>
        <div id="grid">
        {flattenedBoard.map(val=>{
          return <div className={`${val? 'square active' : 'square'}`}>{val}</div>
        })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => this.onClick(-1,0)} id="left">LEFT</button>
          <button onClick={() => this.onClick(0, -1)} id="up">UP</button>
          <button onClick={() => this.onClick(1, 0)} id="right">RIGHT</button>
          <button onClick={() => this.onClick(0, 1)} id="down">DOWN</button>
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
