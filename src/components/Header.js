import React, { Component } from 'react';
import { Row, Container, Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import './Header.css';


class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'TattleTale',
            mounted: false,
            description: ''
        }
    }
    
    componentDidMount(){
        this.setState({
            mounted: true
        });
    }
    render(){

        return(
            <React.Fragment>
                <Jumbotron style={{ backgroundImage: `url('assets/images/wallpaper.jfif')`, backgroundSize: 'cover', 
                                borderRadius: "0px"}}>
                    <Container className="text-center">
                        <h1 className="display-3 profile-header">
                            {this.state.title}
                        </h1>
                        <CSSTransition in={this.state.mounted} classNames="profile-desc-trans" timeout={1000}>
                            <p className="lead profile-desc">{this.state.description}</p>
                        </CSSTransition>
                    </Container>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Header;