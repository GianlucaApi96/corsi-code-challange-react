import {React, Component} from 'react';
import '../App.css';
import '../Css/Style.css';
import {Nav, Navbar} from "react-bootstrap";
import {Container} from "@mui/material";

export default class NavBarComponent extends Component {

    render() {
        return(
            <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Corsi Code Challange</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/reviews">Recensioni</Nav.Link>
                        <Nav.Link href="/review">Nuova Recensione</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </div>
        )
    }
}