import {React, Component} from 'react';
import '../App.css';
import '../Css/Style.css'
import Select from "react-select";
import ReviewApi from "../Api/ReviewApi";
import {Rating} from "@mui/material";
import NavBarComponent from "./NavBarComponent";

const options = [
    {
        value:'gianluca',
        label:'gianluca'
    },
    {
        value:'francesco',
        label:'francesco'
    },
    {
        value:'andrea',
        label:'andrea'
    },
    {
        value:'giovanni',
        label:'giovanni'
    },
    {
        value:'luca',
        label:'luca'
    },
]

export default class ReviewListComponent extends Component {

    state = {
        reviews:[

        ],
        filter:null,
        msg: null,
        errMsg:null,
        rating:null,
        revNum:null,
        offset: 0,
        data:[],
        elements: [],
        perPage: 3,
        currentPage: 0,
    }

    onSelect = (e) => {
        this.state.filter=e.value;
    }


    handleError = (error) => {
        this.setState({
            errMsg: error.response.data.message,
        });
    }


    findReview = () => {

        if(this.state.filter){
            this.resetValue();
            ReviewApi.listReviewByEmployee(this.state.filter)
                .then(response => this.handleResponse(response))
                .catch(error => this.handleError(error))
        }else {
            this.setState({errMsg:'Selezionare il dipendente'})
        }
    }

    handleResponse = (response) => {

        this.setState(
            {
                reviews : this.state.reviews.concat(response.data)
            }
        )
        this.setState(
            {
                revNum : this.state.reviews.length,
                data: this.state.reviews,
                msg:response.data.message,
            }
        )
    }

    resetValue = () => {
        this.setState({reviews: [],errMsg:''});
    }

    render(){

        return(
            <div>
                <NavBarComponent/>
                    <div className="container-review">
                        <section className="section">
                            <div className="card">
                                <div className="card-body">
                                    {this.state.msg && <div className="alert alert-success">{this.state.msg}</div>}
                                    {this.state.errMsg && <div className="alert alert-danger">{this.state.errMsg}</div>}
                                    <h3 className="card-title mb-4">Recensioni Dipendenti</h3>
                                    <Select options={options}  onChange={this.onSelect}></Select>
                                    <button type="submit" className="button" onClick={this.findReview}>Search</button>
                                </div>
                                <div className="card-body">
                                    <div className="row g-2 ls-2">
                                        <div className="col-md-9 ">
                                            <div className="form-row">
                                                {this.state.reviews.map((review)=>
                                                    <ul className="list-group" key={review.id}>
                                                        <div className="row g-2 ls-2">
                                                            <div className="col-md-9 ">
                                                                <div className="form-row">
                                                                    <label>Descrizione</label>
                                                                    <textarea type="text" readOnly={true} value={review.description} className="form-control"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div className="form-row">
                                                                    <label>Rating</label>
                                                                    <Rating value={review.stars} readOnly={true} weight="24"></Rating>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ul>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                <div>
                </div>
            </div>

        )
    }
}