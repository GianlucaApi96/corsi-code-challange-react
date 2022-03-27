import {React, Component} from 'react';
import '../App.css';
import '../Css/Style.css';
import { Formik, FormikProps, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import Authentication from "../Api/Authentication";

export default class LoginComponent extends Component {
    state = {
        token:'',
        email: '',
        isLogged: '',
        noLogged: '',
        errMessage: ''
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

    login = () => {
        Authentication.sanctumAuth(this.state.email).then((response) => {
            this.setState({token:response.data.token})
            Authentication.saveUserInfo(this.state.email,this.state.token);
            this.props.history.push(`/reviews`);
        }).catch((error ) => {
            this.handleError(error)
            this.setState({isLogged:false})
            this.setState({noLogged:true})
        })
    }


    render() {

        let {email} =this.state;

        return (

            <div className="container">
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Login</h3>
                            <Formik
                                validate={this.ValidateInfo}
                                initialValues={{email}}
                                enableReinitialize={true}
                                onSubmit={this.login}
                                validateOnBlur={false}
                                validateOnChange={false}
                            >
                                {
                                    (props) => (
                                        <Form>

                                            {this.state.errMsg && <div className="alert alert-danger"><h5>{this.state.errMsg}</h5></div>}
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Email *</label>
                                                <Field type="email" name="email" className="col-sm-9" onChange={this.handleChange} value={this.state.email} />
                                            </div>
                                            <button type="subimt" className="button" >Login</button>

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

