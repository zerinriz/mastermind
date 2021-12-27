import React from 'react'

export class Board extends React.Component {
  render() {
    let rows = [];
    for (let i = 0; i < this.props.state.totalRows; i++) {
      rows.push(
        <Row
          key={'row_' + i}
          id={'row_' + i}
          state={this.props.state}
          pegAction={this.props.pegAction}
          checkAction={this.props.checkAction} />
        )
    }
    return (
      <div className='board'>
        {rows}
      </div>
    )
  }
}


const Row = (props) => {
  let active = ''
  if (+props.id.substr(4) === props.state.activeRow) {
    active = 'active'
  }

  return (
    <div className={'row ' + active} id={props.id}>
      <Circles
        rowId={props.id}
        state={props.state}
        pegAction={props.pegAction} />
      <OkButton
        state={props.state}
        rowId={props.id}
        checkAction={props.checkAction} />
      <Hints
        state={props.state}
        rowId={props.id} />
    </div>
  )
}

class Circles extends React.Component {
  render() {
    const rowId = this.props.rowId.substr(4)
    let Pegs = []
    for (let i = 0; i < 4; i++) {
      Pegs.push(
        <Peg
          state={this.props.state}
          pegAction={this.props.pegAction}
          key={'p' + rowId + '-' + i}
          pegId={'p' + rowId + '-' + i} />)
    }

    return <div className='circles'> {Pegs} </div>
  }
}


class Peg extends React.Component {
  render() {
    const pegId = +this.props.pegId.substr(this.props.pegId.indexOf('-') + 1)
    const rowId = +this.props.pegId.substr(1, this.props.pegId.indexOf('-') - 1)
    let clase = ''
    if (this.props.state.activeRow === rowId) {
      clase = this.props.state.currentRow[pegId]
    } else {
      for (let i in this.props.state.previousRows) {
        if (+i === +rowId) {
          clase = this.props.state.previousRows[rowId][pegId]
        }
      }
    }

    return (
      <span
        id={this.props.pegId}
        className={'peg ' + clase}
        onClick={() =>
          this.props.pegAction(this.props.state.activeColor, this.props.pegId)} >
      </span>
    )
  }
}

const Hints = (props) => {
  let allHints = []
  let hintClass = ''
  const rowId = +props.rowId.substr(4)
  const hintArr = props.state.hints
  const prevHints = props.state.previousHints

  for (let i = 0; i < hintArr.length; i++) {
    if (rowId === props.state.activeRow) {
      hintClass = hintArr[i] === 2 ? 'exact' : (hintArr[i] === 1 ? 'partial' : '')
    } else {
      for (let j = 0; j < prevHints.length; j++) {
        if (rowId === j) {
          hintClass = prevHints[j][i] === 2 ? 'exact' : (prevHints[j][i] === 1 ? 'partial' : '')
        }
      }
    }

    allHints.push(
      <CheckBox
        hintClass={hintClass}
        key={'h_' + rowId + i}
        id={'h_' + rowId + i} />
    )
  }
  return (
    <div className='hints'>
      {allHints}
    </div>
  )
}

const CheckBox = (props) => (
  <span
    className={props.hintClass}
    id={props.id}>
  </span>
)

const OkButton = (props) => {
  const row = +props.rowId.substr(4)
  let disabled = 'disabled'
  const doNothing = () => (false)

  if (props.state.activeRow === row) {
    disabled = props.state.canCheck ? '' : 'disabled'
  }
  const checkAction = disabled === 'disabled' ? doNothing : props.checkAction

  return (
    <div
      className={'ok-button ' + disabled}
      onClick={checkAction}>
      check
    </div>
  )
}
