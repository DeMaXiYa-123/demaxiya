import React from 'react'
import {BrowserRouter,NavLink,Route,Redirect,Switch} from 'react-router-dom'
import Index from '../pages/index'

class Router extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Route path='/admin' component={Index}></Route>
            </BrowserRouter>
        )
    }
}

export default Router