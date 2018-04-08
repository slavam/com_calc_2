import React from 'react';

export default class AccountLine extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state={
//       sum: 0,
//       valueCounter: this.props.utility.last_value_counter
//     };
//     this.valueCounterChange = this.valueCounterChange.bind(this);
//   }
    render(){
      let total = 0;
      this.props.sums.map((s) =>  total += +s);
      return(
        <tr key="0"><td>Итого</td><td>{(+total).toFixed(2)}</td></tr>
      );
    }
}