import React from 'react'
import {BrowserRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Index from '../pages/index/index'
import Home from '../pages/index/index-cont'
import Notice from '../pages/notice/notice'
import Login from '../pages/user/login'
import Day from '../pages/list/day'
import Week from '../pages/list/week'
import Month from '../pages/list/month'


class Router extends React.Component{
    componentDidMount(){
        console.log(this)
    }
    render(){
        
        return(
            <BrowserRouter>
            <Route path='/login' component={Login}></Route>
                <Route path='/admin' render={()=>{
                    return(
                        <Index>
                            <Switch>
                                <Redirect exact from ='/admin' to='/admin/home'></Redirect>
                                <Route  path='/admin/home' component={Home}></Route>
                                <Route  path='/admin/schoolNotice' component={Notice}></Route>
                                <Route path="/admin/day" component={Day}></Route>
                                <Route path="/admin/week" component={Week}></Route>
                                <Route path="/admin/month" component={Month}></Route>
                            </Switch>
                        </Index>                          
                    )

                }}></Route>
            </BrowserRouter>
        )
    }
}

export default Router