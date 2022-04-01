import {React, Component} from 'react';
import '../App.css';
import '../Css/Style.css';
import { Formik, FormikProps, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import Authentication from "../Api/Authentication";
import {responsiveFontSizes} from "@mui/material";
import ReviewApi from "../Api/ReviewApi";

export default class SignUpComponent extends Component {
    state = {
        email: '',
        errMessage: '',
        okMsg:''
    }

    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleError = (error) => {
        this.setState({errMsg: error.response.data.message});
    }

    ValidateInfo = () => {

        let errors = {}

        if(!this.state.email) {
            errors.email = 1
            this.setState({errMsg:'il campo email è obbligatorio'});
        }

        return errors;
    }


    signup = () => {
       Authentication.signup(this.state.email
        ).then((response)=>{
            this.setState({okMsg:response.data.message})
            this.props.history.push(`/`);
        }).catch(error=>this.handleError(error));
    }


    render() {

        let {email} =this.state;

        return (

            <div className="container">
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">SignUp</h3>
                            <Formik
                                validate={this.ValidateInfo}
                                initialValues={{email}}
                                enableReinitialize={true}
                                onSubmit={this.signup}
                                validateOnBlur={false}
                                validateOnChange={false}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            {this.state.okMsg && <div className="alert alert-success"><h5>{this.state.okMsg}</h5> </div>}
                                            {this.state.errMsg && <div className="alert alert-danger"><h5>{this.state.errMsg}</h5></div>}
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Email *</label>
                                                <Field type="email" name="email" className="col-sm-9" onChange={this.handleChange} value={this.state.email} />
                                            </div>
                                            <button type="subimt" className="button" >SignUp</button>

                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

