import {React,Component} from 'react';
import '../Css/Style.css'
import '../App.css'
import NavBarComponent from "./NavBarComponent";

export default class ByeComponents extends Component {

    render () {
        return(
            <div>
                <NavBarComponent/>
                <div className="container" >
                    <section className="bye">
                        <div className="card">
                            <div className="card-body">
                                <div className="alert alert-success"><h5>La tua review è stata inserita con successo, Arrivederci!</h5> </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}