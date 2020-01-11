import React,{Component} from 'react'
import DayHead from './assembly/day-head'
import H2 from './assembly/h2'
import Body from './assembly/body'
import styles from './day.module.less'

export default class Day extends Component {
  constructor (props) {
    super (props)
    this.state = {
        flag : false
    }
  }
  talkson(bol){
    console.log(bol,this)
    this.setState({flag:!this.state.flag})
  }
  render () {
    setTimeout(_=>{
      console.log(this.refs)
    },1000)
    return (
      <div>
        <h1>`</h1>
        <div className={styles.head}><DayHead son={this.talkson.bind(this)}></DayHead></div>
        <H2 ref="h2"></H2>
        <Body ref="Body" flag={this.state.flag}></Body>
      </div>
    )
  }
}