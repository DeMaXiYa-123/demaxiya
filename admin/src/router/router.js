import React from 'react'
import {BrowserRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Index from '../pages/index/index'
import Home from '../pages/index/index-cont'
import Notice from '../pages/notice/notice'
import Login from '../pages/user/login'

class Router extends React.Component{
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
                            </Switch>
                        </Index>                          
                    )

                }}></Route>
            </BrowserRouter>
        )
    }
}

export default Router