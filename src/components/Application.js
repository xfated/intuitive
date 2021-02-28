import React, {useState, useEffect} from 'react';
import './Application.css'
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { WaitPhrases } from '../misc/waitphrases';
import Book from './Book';
import { TransitionGroup, CSSTransition } from 'react-transition-group'; 

const Application = (props) => {

    const [storyPrompt, setStoryPrompt] = useState('I saw an elf today...');
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
        setStoryPrompt(event.target.value);
    }   

    async function getStory(event){
        // Things to do while story is loading
        setStoryLoaded(false);
        setStoryLoading(true);

        // Making request for story
        var requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "promptText": `${storyPrompt}`,
            })
        };
        // console.log(requestOptions);
        event.preventDefault();
        //https://zxismlb0q7.execute-api.us-east-1.amazonaws.com/dev/records/ https://zxismlb0q7.execute-api.us-east-1.amazonaws.com/dev/test/
        try{
            // submit prompt and retrieve record id 
            var result = await fetch('https://zxismlb0q7.execute-api.us-east-1.amazonaws.com/dev/records/', requestOptions);
            var data = await result.json();
            var message = data.message;
            var recordId = data.recordId;
            console.log('message is: ' + message);
            console.log('record id is: ' + recordId);
            
            // fetch story after 10seconds (takes time to generate)
            await setTimeout(async () => {
                var requestOptions = {
                    method: 'GET',
                };
                var reqAddress = `https://zxismlb0q7.execute-api.us-east-1.amazonaws.com/dev/records/${recordId}`;
                console.log('Getting story from: ' + reqAddress);
                var result = await fetch(`https://zxismlb0q7.execute-api.us-east-1.amazonaws.com/dev/records/${recordId}`, requestOptions);
                var data = await result.json();
                var generatedStory = data.story;
                console.log('story is: ' + generatedStory);
                if(generatedStory !== undefined){
                    setStory(generatedStory);
                    setStoryLoaded(true);
                }   
                else{
                    setStory('I\'m sorry :( we ran out of ideas');
                    setStoryLoaded(false);
                }
                // Story loaded, turn off other stuff
                setStoryLoading(false);
            }, 10000);
        }
        catch (e) {
            console.log('Error' + e);
        }
            
        // console.log('data is: ' + data);
        // await setTimeout(() => {
        //     console.log('waiting');
        //     setStoryLoaded(true);
        //     console.log(storyLoading);
        //     setStoryLoading(false);
        //     setWaitPhrase('Here\'s today\'s adventure!');
        //     setStory('Inserts story here');
        // }, 10000);


        
    }

    // Downloads the story as a .txt file for user
    function downloadStory() {
        const element = document.createElement("a");
        const file = new Blob([story], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = storyPrompt.replace(/[^a-z0-9]/gi, '') + '.txt';
        document.body.appendChild(element);
        element.click();
    }

    return(
        <div>
            <div className="main-block container">
                <div className="col-12 text-center section-header p-7">
                    <h1 className="mb-0 section-title">The Story Teller</h1>
                    <h6>A tiny prompt for a world of adventure</h6>
                    <div className="offset-2 col-8 border-bottom"></div>
                </div>
                <div className="row">
                    <div className="col-12 story-prompt text-center">
                        <h5>How does your story start?</h5>
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
                                    <small>Generate</small>
                                    <i class="fas fa-book fa-lg ml-2"></i>
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
                                    {
                                        storyLoaded &&
                                        <Button className="read-aloud-button">
                                            <i className="ml-4 fas fa-bullhorn fa-lg"></i>
                                        </Button>
                                    }
                                </h5>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                    <div className="col-12 flex flex-horizontal-center">
                        <div className="story-story col-12 col-md-8">
                            <div className="story-content">
                                {
                                    storyLoading &&
                                    <div className="text-center">
                                        <i class="fas fa-circle-notch fa-spin"></i>
                                    </div>
                                }
                                {
                                    !storyLoading &&
                                    <Book story={story} />
                                }
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
        </div>
    );    
}

export default Application;