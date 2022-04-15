import React, {useState} from 'react'
import axios from 'axios'

export default function AppFunctional(props) {
  const [state, setState] = useState({
      x: 2,
      y: 2,
      steps: 0,
      board:[
        [null, null, null], 
        [null, "B", null], 
        [null, null, null]],
      email:'',
      message:'',
  })

  const resetForm = () => {
    setState({
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

  // //Making email submit
 const onChange = e =>{
    const {value} = e.target // has to be word value
    setState({ 
      ...state, email: value})
  }
  
// //cleanup helpers
  const postOnSubmit = () =>{
    axios.post('http://localhost:9000/api/result', { x: state.x, y: state.y, steps: state.steps, email: state.email } )
    .then(res => {
      setState({
        ...state,
        message: res.data.message,
        board:[
          [null, null, null], 
          [null, "B", null], 
          [null, null, null]],
        email: '',
      })
      
    })
    .catch(err => {
      setState({
        ...state,
        message: err.response.data.message,
        
      })
    
    })
  }

  const onSubmit = e => {
    e.preventDefault();
    postOnSubmit();
  }

  const onClick = (varX, varY) => {
  
    if(state.x + varX > 3) {
      setState( {
        ...state,
        message: "You can't go right"
      })
    } else if (state.x + varX < 1) {
      setState( {
        ...state,
        message: "You can't go left"
      })
    } else if (state.y + varY > 3) {
      setState( {
        ...state,
        message: "You can't go down"
      })
    } else if (state.y + varY < 1) {
      setState( {
        ...state,
        message: "You can't go up"
      })
    } else {
      const idxX = (state.x-1);
      const idxY = (state.y-1);
      const idxXB = (idxX + varX);
      const idxYB = (idxY + varY)
      const updatedBoard = [...state.board];
      updatedBoard[idxY][idxX] = null
      updatedBoard[idxYB][idxXB] = 'B'
      
      setState({
        ... state,
        x: state.x+ varX,
        y: state.y+ varY,
        steps: state.steps + 1,
        board: updatedBoard,
        message: ''
      })
    }
  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">{`Coordinates (${state.x}, ${state.y})`}</h3>
          {state.steps === 1 ? <h3 id="steps">You moved 1 time</h3> : <h3 id="steps">You moved {state.steps} times</h3> } 
          {/* account for 1 time */}
        </div>
        <div id="grid">
        {state.board.flat().map(val=>{
          return <div className={`${val? 'square active' : 'square'}`}>{val}</div>
        })}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => onClick(-1,0)} id="left">LEFT</button>
          <button onClick={() => onClick(0, -1)} id="up">UP</button>
          <button onClick={() => onClick(1, 0)} id="right">RIGHT</button>
          <button onClick={() => onClick(0, 1)} id="down">DOWN</button>
          <button onClick={resetForm} id="reset">reset</button>
        </div>
        <form id="form-wrapper" onSubmit={onSubmit}>
          <input 
          onChange={onChange} 
          value={state.email} 
          id="email" type="email" 
          placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
    </div>
  )
}
