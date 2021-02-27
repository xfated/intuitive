import React, { Component } from 'react';
import { Row, Container, Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
        Button, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import './Header.css';
import { Instructions } from '../misc/instructions';
import { Motivations } from '../misc/motivations';
import { Creators } from '../misc/creators';

class Header extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'TattleTale',
            mounted: false,
            description: '',
            isTutModalOpen: false,
            isMotivationModalOpen: false
        }
        this.toggleTutModal = this.toggleTutModal.bind(this);
        this.toggleMotivationModal = this.toggleMotivationModal.bind(this);
    }
    
    toggleTutModal(){
        this.setState({
            isTutModalOpen: !this.state.isTutModalOpen
        })
    }
    toggleMotivationModal(){
        this.setState({
            isMotivationModalOpen: !this.state.isMotivationModalOpen
        })
    }

    componentDidMount(){
        this.setState({
            mounted: true
        });
    }
    render(){
        const Tutorial = () => {
            const TutorialInstructions = Instructions.map((instruction) => {
                return( 
                    <ListGroupItem key={instruction.text}>
                        <div className="row">
                            <div className="col-4">
                                {instruction.text}
                            </div>
                            <div className="col-8">
                                <img src={instruction.image} width="100%" alt="instruction" />
                            </div>
                        </div>
                    </ListGroupItem>
                );
            });
            return (
                <ListGroup flush>
                    {TutorialInstructions}
                </ListGroup>
            );
        }
        const Motivation = () => {
            const MotivationParts = Motivations.map((motivation) => {
                return(
                    <ListGroupItem key={motivation.point}>
                        <div className="row">
                            <div className="col-12 col-md-4 border-right">
                                <h2>{motivation.point}</h2>
                            </div>
                            <div className="col-12 col-md-8">
                                <p>{motivation.description}</p>
                            </div>      
                        </div>
                    </ListGroupItem>
                );
            });
            return (
                <ListGroup flush>
                    {MotivationParts}
                </ListGroup>
            )
        }
        const RenderCreators = () => {
            const CreatorPics = Creators.map((creator) => {
                return(
                    <div key={creator.name} className="col-6 col-md-3 p-3">
                        <a href={creator.link} className="creator-link">
                            <div className="row">
                                <div className="col-12 flex flex-horizontal-center">
                                    <div className="profile-pic-frame">
                                        <img className="profile-pic" src={creator.image}
                                            alt={creator.name} />
                                    </div>
                                </div>
                                <div className="col-12 text-center mt-1 creator-profile-text">
                                    <span><strong>{creator.name}</strong></span>
                                </div>
                            </div>
                        </a>
                    </div>
                );
            });
            return(
                <div className="row">
                    {CreatorPics}
                </div>
            );
        }
        return(
            <React.Fragment>
                <Navbar className="modal-buttons">
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={this.toggleTutModal} className="tutorial-icon ml-1 mr-1">
                                <i class="fas fa-graduation-cap fa-lg fa-fw"></i>
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={this.toggleMotivationModal} className="motivation-icon ml-1 mr-1">
                                <i class="far fa-lightbulb fa-lg fa-fw"></i>
                            </Button>
                        </NavItem>
                    </Nav>
                </Navbar>
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
                <Modal isOpen={this.state.isTutModalOpen} toggle={this.toggleTutModal} className="modal-w90">
                    <ModalHeader toggle={this.toggleTutModal} charCode="x" >
                        Tutorial
                    </ModalHeader>  
                    <ModalBody>
                        <Tutorial />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isMotivationModalOpen} toggle={this.toggleMotivationModal} className="modal-w90">
                    <ModalHeader toggle={this.toggleMotivationModal} charCode="x">
                        Project Motivations
                    </ModalHeader>
                    <ModalBody>
                        <Motivation />
                        <RenderCreators />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;