import React, {useState} from 'react';
import './Application.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const Application = (props) => {

    const [storyPrompt, setStoryPrompt] = useState('One windy morning...')
    const [story, setStory] = useState('I wonder what\'s in story today...')

    function changeStoryPrompt(event) {
        setStoryPrompt(event.value);
    }   

    function submitStoryPrompt(){

    }
    
    return(
        <div className="main-block container">
            <div className="row">
                <div className="col-12 story-prompt text-center">
                    <h5>How does your bed-time story start?</h5>
                </div>
                <div className="col-12 story-input text-center">
                    <Form className="text-center">
                        <FormGroup>
                            <Input type="textarea" name="prompt" id="storyprompt" className="story-input-box"
                                value={storyPrompt} onChange={changeStoryPrompt} />
                        </FormGroup>    
                        <FormGroup>
                            <Button type="submit" className="btn btn-outline-info bg-light btn-lg">
                                <small>generate</small>
                            </Button>
                        </FormGroup>
                    </Form>     
                </div>
                <div className="col-12 story-title text-center">
                    <h5>
                        Your long awaited story!
                    </h5>
                </div>
                <div className="col-12 text-center">
                    <div className="story-story offset-md-2 col-md-8 text-left">
                        <p className="story-content">
                            {story}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default Application;