import React,{Component} from 'react'
import {BrowserRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Day from './day'
import Week from './week'
import Month from './month'

export default class Internship extends Component {
  constructor (props) {
    super (props)
    this.state = {
      data1: []
    }
  }
  render () {
    return (
      <div>
        <h1>Internship</h1>
        <BrowserRouter>
          <Route path="/day" component={Day}></Route>
          <Route path="/week" component={Week}></Route>
          <Route path="/month" component={Month}></Route>
          <NavLink to="/day">day</NavLink>
          <NavLink to="/week">week</NavLink>
          <NavLink to="/month">month</NavLink>
        </BrowserRouter>
      </div>
    )
  }
}