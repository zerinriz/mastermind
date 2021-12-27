import React from 'react';

export const Solution = (props) => {
  let solutionPegs = []
  let solutionClass = ''
  const isHidden = (props.state.defeat && !props.state.victory) ? '' : ' hidden'
  const playAgain = (props.state.defeat || props.state.victory) ? '' : ' hidden' 
  console.log(props.state.trueRow)
  console.log(playAgain)
  for (let i = 0; i < props.state.trueRow.length; i++) {
    solutionClass = props.state.trueRow[i]
    solutionPegs.push(
      <div
        className={'color-holder ' + solutionClass}
        key={'s_' + i}>
      </div>)
  }
  return (
    <div className='solution colors'>
      <div className={isHidden}>
        <p>Solution:</p>
        {solutionPegs}
      </div>
      <div className={playAgain}>
        <button className='playAgainBtn' onClick={props.newGame}> Play Again?</button>
      </div>
    </div>
  )
}