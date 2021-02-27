import React, {useState, useEffect} from 'react';
import './Application.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { WaitPhrases } from '../misc/waitphrases';
import Book from './Book';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; 

const Application = (props) => {

    const [storyPrompt, setStoryPrompt] = useState('One windy morning...');
    const [story, setStory] = useState('I wonder what\'s in store today...');
    const [storyLoading, setStoryLoading] = useState(false);
    const [storyLoaded, setStoryLoaded] = useState(false);
    const [waitPhrase, setWaitPhrase] = useState('What shall it be today?');

    useEffect(() => {
        // display phrases every interval while story is loading loaded yet
        if (storyLoading === true){
            const displayPhrases = setInterval(() => {
                    var idx = Math.floor(Math.random() * WaitPhrases.length);
                    setWaitPhrase(WaitPhrases[idx]);
            }, 2000);
            return () => clearInterval(displayPhrases);
        }
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
            mode:'cors',
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                "Access-Control-Allow-Headers": "'Content-Type'",
                // 'Origin':'http://localhost:3000'
            },
            body: JSON.stringify({
                "promptText": "hello",
            })
        };
        console.log(requestOptions);
        event.preventDefault();
        // const response = await fetch('https://zxismlb0q7.execute-api.us-east-1.amazonaws.com/dev/records/', requestOptions);
        // const data = await response.json();
        // console.log('data obtained:' + data);
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

    // Downloads the story as a .txt file for user
    function downloadStory() {
        const element = document.createElement("a");
        const file = new Blob([story], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = storyPrompt.replace(/[^a-z]/gi, '') + '.txt';
        document.body.appendChild(element);
        element.click();
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
                            <Input type="textarea" name="prompt" id="storyprompt" className="col-12 col-md-8 story-input-box"
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
                    <TransitionGroup>
                        <CSSTransition
                            timeout={500}
                            key={waitPhrase}
                            classNames="wait-phrase">
                            <h5>
                                {waitPhrase}
                            </h5>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <div className="col-12 flex flex-horizontal-center">
                    <div className="story-story col-12 col-md-8">
                        <div className="story-content">
                            <Book story={story} />
                        </div>
                    </div>
                </div>
                <div className="col-12 flex flex-horizontal-center p-5">
                    <div>
                        <button onClick={downloadStory} className="btn btn-lg btn-outline-dark">
                            Download your Story!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );    
}

export default Application;