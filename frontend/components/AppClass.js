import React from 'react'
import axios from 'axios'

export default class AppClass extends React.Component {
  state ={
    x: 2,
    y: 2,
    steps: 0,
    board:["", "", "", "", "B", "","", "", ""],
    email: '',
  }



  //Making email submit
//   onChange = e =>{
//     const {value} = e.target // has to be word value
//     this.setState({ ...this.state, email: value})
//   }
  
//   //axios
//   setAxiosResponseError = err => {
//     this.setState({ ...this.state, error: err.response.message})
//   }
// //cleanup helpers
  postOnSubmit = () =>{
    axios.post('http://localhost:9000/api/result')
    .then(res => {
      debugger
      //this.fetchAllTodos() // avoid multiple requests
      //this.resetForm() // a lot cleaner to do this
    })
    .catch(err => {
      this.setState({
        ...this.state,
        error: err.response.data.message
      })
      
    })
  }

  onSubmit = e => {
    e.preventDefault();
    this.postOnSubmit()
  }
  
//Left up down



onClickL = () => {
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x -1,
      y: this.state.y 
    })
  }

onClickR = () => {
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x +1,
      y: this.state.y 
    })
  }

  onClickU = () => {
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x,
      y: this.state.y +1
    })
  }

  onClickD = () => {
    this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      x: this.state.x,
      y: this.state.y -1
    })
  }
  


  render() {
    const { className } = this.props
    
    const flattenedBoard= this.state.board.flat()
    console.log()
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
        {flattenedBoard.map((val, idx)=>{
          return <div key={idx} onClick={() => this.handleTurn()} className={`${val? 'square active' : 'square'}`}>{val}</div>
        })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.error}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.onClickL} id="left">LEFT</button>
          <button onClick={this.onClickU} id="up">UP</button>
          <button onClick={this.onClickR} id="right">RIGHT</button>
          <button onClick={this.onClickD} id="down">DOWN</button>
          <button onClick={this.onClick} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
      
    )
  }
}
