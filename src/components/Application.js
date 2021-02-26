import React, {useState, useEffect} from 'react';
import './Application.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { WaitPhrases } from '../misc/waitphrases';

const Application = (props) => {

    const [storyPrompt, setStoryPrompt] = useState('One windy morning...');
    const [story, setStory] = useState('I wonder what\'s in store today...');
    const [storyLoading, setStoryLoading] = useState(false);
    const [storyLoaded, setStoryLoaded] = useState(false);
    const [waitPhrase, setWaitPhrase] = useState('What shall it be today?');


    useEffect(() => {
        // display phrases every interval while story is loading loaded yet
        const displayPhrases = setInterval(() => {
            if (storyLoading === true){
                var idx = Math.floor(Math.random() * WaitPhrases.length);
                console.log(idx);
                setWaitPhrase(WaitPhrases[idx]);
            }
        }, 2000);
        return () => clearInterval(displayPhrases);
    }, [storyLoading]);

    function changeStoryPrompt(event) {
        setStoryPrompt(event.value);
    }   

    async function getStory(event){
        // Things to do while story is loading
        setStoryLoaded(false);
        setStoryLoading(true);

        // Making request for story
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: ""
            })
        };
        event.preventDefault();
        await setTimeout(() => {
            console.log('waiting');
            setStoryLoaded(true);
            console.log(storyLoading);
            setStoryLoading(false);
            setWaitPhrase('Here\'s today\'s adventure!');
            setStory('hello');
        }, 10000);

        // Story loaded, turn off other stuff
        
        
    }

    return(
        <div className="main-block container">
            <div className="row">
                <div className="col-12 story-prompt text-center">
                    <h5>How does your bed-time story start?</h5>
                </div>
                <div className="col-12 story-input text-center">
                    <Form className="text-center">
                        <FormGroup className="flex flex-horizontal-center">
                            <Input type="textarea" name="prompt" id="storyprompt" className="col-md-8 story-input-box"
                                value={storyPrompt} onChange={changeStoryPrompt} />
                        </FormGroup>    
                        <FormGroup>
                            <Button className="btn btn-outline-info bg-light btn-lg"
                                onClick={getStory}>
                                <small>generate</small>
                            </Button>
                        </FormGroup>
                    </Form>     
                </div>
                <div className="col-12 story-title text-center">
                    <h5>
                        {waitPhrase}
                    </h5>
                </div>
                <div className="col-12 flex flex-horizontal-center">
                    <div className="story-story col-md-8">
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