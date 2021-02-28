import React, { useState, useEffect } from 'react';
import { Instructions } from '../misc/instructions';
import { Motivations } from '../misc/motivations';
import { Creators } from '../misc/creators';
import {  Navbar, Nav, NavItem, 
        Button, Modal, ModalBody, ModalHeader, ListGroup, ListGroupItem } from 'reactstrap';
import './NavInfo.css';

const NavInfo = (props) => {

    const [tutModalOpen, setTutModalOpen] = useState(false);
    const [motivationModalOpen, setMotivationModalOpen] = useState(false);

    function toggleTutModal(){
        setTutModalOpen(!tutModalOpen);
    }
    function toggleMotivationModal(){
        setMotivationModalOpen(!motivationModalOpen);
    }
    
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
        <>
            <Navbar className="modal-buttons">
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button onClick={toggleTutModal} className="tutorial-icon ml-1 mr-1">
                            <i className="fas fa-graduation-cap fa-lg fa-fw"></i>
                        </Button>
                    </NavItem>
                    <NavItem>
                        <Button onClick={toggleMotivationModal} className="motivation-icon ml-1 mr-1">
                            <i className="far fa-lightbulb fa-lg fa-fw"></i>
                        </Button>
                    </NavItem>
                </Nav>
            </Navbar>
            <Modal isOpen={tutModalOpen} toggle={toggleTutModal} className="modal-w90">
                <ModalHeader toggle={toggleTutModal} charCode="x" >
                    Tutorial
                </ModalHeader>  
                <ModalBody>
                    <Tutorial />
                </ModalBody>
            </Modal>
            <Modal isOpen={motivationModalOpen} toggle={toggleMotivationModal} className="modal-w90">
                <ModalHeader toggle={toggleMotivationModal} charCode="x">
                    Project Motivations
                </ModalHeader>
                <ModalBody>
                    <Motivation />
                    <RenderCreators />
                </ModalBody>
            </Modal>
        </> 
    );
}

export default NavInfo;