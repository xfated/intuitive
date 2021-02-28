import React from 'react';


const Book = (props) => {
    return ( 
        <div className="text-justify">
            <p>
                {props.story}
            </p>
        </div>
    );
}

export default Book;