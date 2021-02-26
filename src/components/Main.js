import React from 'react';
import Application from './Application';
import Header from './Header';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Footer from './Footer';

function Main() {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/" component={Application} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </div>
    )
}

export default withRouter(Main);