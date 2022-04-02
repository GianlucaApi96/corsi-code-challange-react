import {React, Component} from 'react';
import '../App.css';
import '../Css/Style.css';
import { Formik, FormikProps, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import Select from "react-select";
import ReactStars from "react-rating-stars-component";
import ReviewApi from '../Api/ReviewApi';
import NavBarComponent from "./NavBarComponent";
import Authentication from "../Api/Authentication";


export default class ReviewComponent extends Component {

    state = {
        stars:null,
        description:null,
        employees:[

        ],
        users:[],
        choice:null,
        errMsg: null,
        okMsg:null,
        err:false
    }

    componentDidMount() {
        this.fetchData()
    }

    handleError = (error) => {
        this.setState({errMsg: error.response.data.message});
    }


    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    onSelect = (e) => {
        this.state.choice=e.value;
    }

    ValidateInfo = () => {

        let errors = {}

        if(!this.state.description) {
            errors.description = 1
            this.setState({errMsg:'tutti i campi sono obbligatori'});
        }
        if(!this.state.stars) {
            errors.stars = 1
            this.setState({errMsg:'tutti i campi sono obbligatori'});
        }
        if(!this.state.choice) {
            errors.choice = 1
            this.setState({errMsg:'tutti i campi sono obbligatori'});
        }
        return errors;
    }

    fetchData = async () => {
        const response=await fetch(`http://localhost:8000/api/listEmployee/${Authentication.getUserId()}`)
        const data = await response.json();

        const options = data.map(d=>({
            "value":d.id,
            "label":d.email
        }))
        this.setState({users:options})
        console.log(this.state.users);
    }

    sendReview = () => {
        ReviewApi.createReview({
            stars:this.state.stars,
            user_id:this.state.choice,
            description:this.state.description
        }).then((response)=>{
            console.log(response.data)
            this.props.history.push(`/bye`);
        }).catch(error=>this.handleError(error));

    }

    ratingChanged = (newRating) => {
        this.state.stars=newRating
    }


    render() {

        let {description,selectedValue} =this.state;

        return (
            <div>
            <NavBarComponent/>
            <div className="container">
                <section className="section">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title mb-4">Review</h3>

                            <Formik
                                validate={this.ValidateInfo}
                                initialValues={{description,selectedValue}}
                                enableReinitialize={true}
                                onSubmit={this.sendReview}
                                validateOnBlur={false}
                                validateOnChange={false}
                            >
                                {
                                    (props) => (
                                        <Form>
                                            {this.state.okMsg && <div className="alert alert-success"><h5>{this.state.okMsg}</h5> </div>}
                                            {this.state.errMsg && <div className="alert alert-danger"><h5>{this.state.errMsg}</h5></div>}
                                            <div className="row g-2 ls-2">
                                                <div className="col-md-12 ">

                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <label>Seleziona dipendente</label>
                                                <Select options={this.state.users} onChange={this.onSelect} name="choice" />

                                            </div>
                                            <div className="form-row">
                                                <label>Votazione</label>
                                                <ReactStars
                                                    count={5}
                                                    onChange={this.ratingChanged}
                                                    size={30}
                                                    activeColor="#ffd700"
                                                />

                                            </div>
                                            <div className="row g-2 ls-2">
                                                <div className="col-md-12 ">
                                                    <div className="form-row">
                                                        <label>Descrizione *</label>
                                                        <Field as="textarea" type="text" name="description" className="form-control" onChange={this.handleChange} value={this.state.description}/>

                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit" className="button" >Send</button>

                                        </Form>
                                    )
                                }
                            </Formik>
                        </div>

                    </div>
                </section>
            </div>
            </div>

        )

    }
}