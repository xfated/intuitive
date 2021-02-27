import React, { Component } from 'react';
import { Row, Container, Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
        Button, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import './Header.css';
import { Instructions } from '../misc/instructions';

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
                    <ListGroupItem>
                        <div className="row">
                            <div className="col-6">
                                {instruction.text}
                            </div>
                            <div className="col-6">
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
        return(
            <React.Fragment>
                <Navbar className="modal-buttons">
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={this.toggleTutModal} className="tutorial-icon ml-1 mr-1">
                                <i class="fas fa-chalkboard-teacher fa-lg"></i>
                            </Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={this.toggleMotivationModal} className="motivation-icon ml-1 mr-1">
                                <i class="far fa-lightbulb fa-lg"></i>
                            </Button>
                        </NavItem>
                    </Nav>
                </Navbar>
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
                <Modal isOpen={this.state.isTutModalOpen} toggle={this.toggleTutModal} className="tutorial-modal">
                    <ModalHeader toggle={this.toggleTutModal} charCode="x" >
                        Tutorial
                    </ModalHeader>  
                    <ModalBody>
                        <Tutorial />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.isMotivationModalOpen} toggle={this.toggleMotivationModal}>
                    <ModalHeader toggle={this.toggleMotivationModal} charCode="x">
                        Project Motivations
                    </ModalHeader>
                    <ModalBody>
                        
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;