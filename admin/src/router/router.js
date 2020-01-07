import React from 'react'
import {BrowserRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Index from '../pages/index/index'
import Home from '../pages/index/index-cont'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Route path='/admin' render={()=>{
                    return(
                        <Index>
                            <Switch>
                                <Redirect exact from ='/admin' to='/admin/home'></Redirect>
                                <Route  path='/admin/home' component={Home}></Route>
                            </Switch>
                        </Index>                          
                    )

                }}></Route>
            </BrowserRouter>
        )
    }
}

export default Router