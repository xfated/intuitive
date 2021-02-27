import React from 'react';


const Book = (props) => {
    return ( 
        <div>
            <p>
                {props.story}
            </p>
        </div>
    );
}

export default Book;