import React from 'react';
import './Footer.css'

const Footer = (props) => {
    return(
        <div className="footer">
           <div className="footer-content flex flex-vertical-center flex-horizontal-center"> 
                <blockquote className="blockquote text-center">
                    <p className="quote mb-0">
                        <i className="quote-icon fa fa-broom fa-pull-left"></i>
                        breadcrumb trails . . .
                    </p>
                </blockquote>
            </div>
        </div>
    );
}

export default Footer;