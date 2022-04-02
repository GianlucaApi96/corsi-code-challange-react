import React, { Component } from 'react';
import Authentication  from './Authentication';
import  {Redirect, Route} from 'react-router-dom';


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

            console.log(this.props)
            return <Route {...this.props} ></Route>
        }

    }

}