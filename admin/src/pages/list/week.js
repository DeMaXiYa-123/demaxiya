import React,{Component} from 'react'
import DayHead from './zhoubao/day-head'
import H2 from './zhoubao/h2'
import Body from './zhoubao/body'
import styles from './day.module.less'

export default class Day extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }
  render () {
    setTimeout(_=>{
      console.log(this.refs)
    },1000)
    return (
      <div>
        <h1>`</h1>
        <div className={styles.head}><DayHead></DayHead></div>
        <H2 ref="h2"></H2>
        <Body ref="Body"></Body>
      </div>
    )
  }
}