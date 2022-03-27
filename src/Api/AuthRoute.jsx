import React, { Component } from 'react';
import Authentication  from './Authentication';
import  {Redirect, Route} from 'react-router-dom';
import axios from 'axios';


export default class AuthRoute extends Component {

    componentDidMount(){
        this.Interceptor('Bearer ' + sessionStorage.getItem("token"));
    }

    Interceptor = (token) =>{
        Authentication.setupAxiosInterceptors(token)
    }

    render(){
        if(!Authentication.isLogged()){
            return <Redirect to="/"></Redirect>
        } else {
            return <Route{...this.props}></Route>
        }

    }

}