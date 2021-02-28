import React, { Component } from 'react';
import { Container, Jumbotron } from 'reactstrap';        
import { CSSTransition } from "react-transition-group";
import './Header.css';

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'TattleTale',
            mounted: false,
            description: '',
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
                        <h1 className="display-3 profile-header text-center">
                            <img src="assets/images/tattletale.png" className="main-logo" alt="TattleTale"></img>
                        </h1>
                        <CSSTransition in={this.state.mounted} classNames="profile-desc-trans" timeout={1000}>
                            <blockquote className="quote-seuss blockquote text-center">
                                <i className="fa fa-quote-left fa-pull-left"></i>
                                <p className="mb-0">
                                The more that you read, the more things you will know. The more you learn, the more places you'll go.
                                </p>
                                <i className="fa fa-quote-right fa-pull-right"></i>
                                <footer className="blockquote-footer">
                                    <cite title="Source Title">Dr. Seuss</cite>
                                </footer>
                            </blockquote>
                        </CSSTransition>
                    </Container>
                </Jumbotron>
                
            </React.Fragment>
        );
    }
}

export default Header;