import React from 'react'
import { action, observable, makeAutoObservable } from 'mobx'
import { inject, observer  } from 'mobx-react';



export class counterStore {
  number = 0;
  constructor(){
      makeAutoObservable(this, {
          todos: observable,
          increase: action,
          decrease:action
      })
  }
  increase = () => {this.number++}
  decrease = () => {this.number--}
}

//@inject('counter')
@inject(stores => ({
  number: stores.counter.number,
  increase: stores.counter.increase,
  decrease: stores.counter.decrease,
}))

@observer
class CounterApp extends React.Component {
  constructor(prop) {
    super(prop)
  }

  render() {
    const { number, increase, decrease } = this.props;
    return (
      <>
        <p>{number}</p>
        <button onClick={increase}>1+</button>
        <button onClick={decrease}>1-</button>
      </>
    )
  }
}
export default CounterApp