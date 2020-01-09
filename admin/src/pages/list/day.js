import React,{Component} from 'react'
import DayHead from './assembly/day-head'
import H2 from './assembly/h2'
import Body from './assembly/body'
import styles from './day.module.less'

export default class Day extends Component {
  constructor (props) {
    super (props)
    this.state = {

    }
  }
  render () {
    return (
      <div>
        <h1>Day</h1>
        <div className={styles.head}><DayHead></DayHead></div>
        <H2></H2>
        <Body ref="fnc"></Body>
      </div>
    )
  }
}